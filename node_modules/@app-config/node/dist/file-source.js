"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFilepath = exports.FlexibleFileSource = exports.FileSource = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const core_1 = require("@app-config/core");
const logging_1 = require("@app-config/logging");
const environment_1 = require("./environment");
/** Read configuration from a single file */
class FileSource extends core_1.ConfigSource {
    constructor(filePath, fileType) {
        super();
        this.filePath = (0, path_1.resolve)(filePath);
        this.fileType = fileType !== null && fileType !== void 0 ? fileType : (0, core_1.filePathAssumedType)(this.filePath);
    }
    async readContents() {
        try {
            const content = await (0, fs_extra_1.readFile)(this.filePath);
            logging_1.logger.verbose(`FileSource read ${this.filePath}`);
            return [content.toString('utf-8'), this.fileType];
        }
        catch (err) {
            if (err && typeof err === 'object' && err.code === 'ENOENT') {
                throw new core_1.NotFoundError(`File ${this.filePath} not found`, this.filePath);
            }
            throw err;
        }
    }
}
exports.FileSource = FileSource;
/** Read configuration from a file, found via "glob-like" search (any file format, with support for environment specific files) */
class FlexibleFileSource extends core_1.ConfigSource {
    constructor(filePath, environmentOverrideOrFileExtensions, environmentAliasesOrEnvironmentOptions, fileExtensions, environmentSourceNames) {
        var _a;
        super();
        this.filePath = filePath;
        const defaultFileExtensions = ['yml', 'yaml', 'toml', 'json', 'json5'];
        if ((Array.isArray(environmentOverrideOrFileExtensions) ||
            environmentOverrideOrFileExtensions === undefined) &&
            (environmentAliasesOrEnvironmentOptions
                ? 'aliases' in environmentAliasesOrEnvironmentOptions ||
                    'envVarNames' in environmentAliasesOrEnvironmentOptions
                : true) &&
            fileExtensions === undefined &&
            environmentSourceNames === undefined) {
            this.fileExtensions = environmentOverrideOrFileExtensions !== null && environmentOverrideOrFileExtensions !== void 0 ? environmentOverrideOrFileExtensions : defaultFileExtensions;
            this.environmentOptions =
                (_a = environmentAliasesOrEnvironmentOptions) !== null && _a !== void 0 ? _a : environment_1.defaultEnvOptions;
        }
        else {
            logging_1.logger.warn(`Detected deprecated usage of FlexibleFileSource constructor loading ${filePath}`);
            this.fileExtensions = fileExtensions !== null && fileExtensions !== void 0 ? fileExtensions : defaultFileExtensions;
            this.environmentOptions = (0, environment_1.asEnvOptions)(environmentOverrideOrFileExtensions, environmentAliasesOrEnvironmentOptions, environmentSourceNames);
        }
    }
    // share 'resolveSource' so that read() returns a ParsedValue pointed to the FileSource, not FlexibleFileSource
    async resolveSource(context) {
        const environment = (0, environment_1.currentEnvFromContext)(context !== null && context !== void 0 ? context : {}, this.environmentOptions);
        const aliasesForCurrentEnv = environment
            ? (0, environment_1.aliasesFor)(environment, this.environmentOptions.aliases)
            : [];
        const filesToTry = [];
        for (const ext of this.fileExtensions) {
            if (environment)
                filesToTry.push(`${this.filePath}.${environment}.${ext}`);
            for (const alias of aliasesForCurrentEnv) {
                filesToTry.push(`${this.filePath}.${alias}.${ext}`);
            }
        }
        // try these after trying environments, which take precedent
        for (const ext of this.fileExtensions) {
            filesToTry.push(`${this.filePath}.${ext}`);
        }
        logging_1.logger.verbose(`FlexibleFileSource is trying to find [${filesToTry.join(', ')}]`);
        for (const filepath of filesToTry) {
            if (await (0, fs_extra_1.pathExists)(filepath)) {
                logging_1.logger.verbose(`FlexibleFileSource found successful match at ${filepath}`);
                return new FileSource(filepath);
            }
        }
        throw new core_1.NotFoundError(`FlexibleFileSource could not find file with ${this.filePath}.{yml|yaml|toml|json|json5}`, this.filePath);
    }
    async readContents() {
        return this.resolveSource().then((source) => source.readContents());
    }
    async read(extensions, context) {
        const source = await this.resolveSource(context);
        return source.read(extensions, Object.assign(Object.assign({}, context), { environmentOptions: this.environmentOptions }));
    }
}
exports.FlexibleFileSource = FlexibleFileSource;
function resolveFilepath(source, filepath) {
    let resolvedPath = filepath;
    // resolve filepaths that are relative to the current FileSource
    if (!(0, path_1.isAbsolute)(filepath) && source instanceof FileSource) {
        resolvedPath = (0, path_1.join)((0, path_1.dirname)(source.filePath), filepath);
        if ((0, path_1.resolve)(source.filePath) === resolvedPath) {
            throw new core_1.AppConfigError(`An extension tried to resolve to it's own file (${resolvedPath}).`);
        }
    }
    return resolvedPath;
}
exports.resolveFilepath = resolveFilepath;
//# sourceMappingURL=file-source.js.map