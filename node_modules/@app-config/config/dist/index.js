"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadValidatedConfig = exports.loadUnvalidatedConfig = void 0;
const path_1 = require("path");
const utils_1 = require("@app-config/utils");
const core_1 = require("@app-config/core");
const logging_1 = require("@app-config/logging");
const node_1 = require("@app-config/node");
const extensions_1 = require("@app-config/extensions");
const default_extensions_1 = require("@app-config/default-extensions");
const schema_1 = require("@app-config/schema");
const meta_1 = require("@app-config/meta");
async function loadUnvalidatedConfig({ directory = '.', fileNameBase = '.app-config', secretsFileNameBase = `${fileNameBase}.secrets`, environmentVariableName = 'APP_CONFIG', extensionEnvironmentVariableNames = ['APP_CONFIG_EXTEND', 'APP_CONFIG_CI'], environmentOverride, environmentAliases: environmentAliasesArg, environmentSourceNames: environmentSourceNamesArg, parsingExtensions: parsingExtensionsArg, secretsFileExtensions: secretsFileExtensionsArg, environmentExtensions = (0, default_extensions_1.defaultEnvExtensions)(), defaultValues, } = {}) {
    var _a;
    // before trying to read .app-config files, we check for the APP_CONFIG environment variable
    const env = new node_1.EnvironmentSource(environmentVariableName);
    logging_1.logger.verbose(`Trying to read ${environmentVariableName} for configuration`);
    try {
        let parsed = await env.read(environmentExtensions);
        if (defaultValues) {
            parsed = core_1.ParsedValue.merge(core_1.ParsedValue.literal(defaultValues), parsed);
        }
        verifyParsedValue(parsed);
        return {
            parsed,
            fullConfig: parsed.toJSON(),
            // NOTE: not checking meta values here
            environment: (0, node_1.currentEnvironment)((0, node_1.asEnvOptions)(environmentOverride, environmentAliasesArg !== null && environmentAliasesArg !== void 0 ? environmentAliasesArg : node_1.defaultAliases, environmentSourceNamesArg)),
        };
    }
    catch (error) {
        // having no APP_CONFIG environment variable is normal, and should fall through to reading files
        if (!core_1.NotFoundError.isNotFoundError(error))
            throw error;
    }
    const meta = await (0, meta_1.loadMetaConfig)({ directory });
    const environmentSourceNames = environmentSourceNamesArg !== null && environmentSourceNamesArg !== void 0 ? environmentSourceNamesArg : meta.value.environmentSourceNames;
    const environmentAliases = (_a = environmentAliasesArg !== null && environmentAliasesArg !== void 0 ? environmentAliasesArg : meta.value.environmentAliases) !== null && _a !== void 0 ? _a : node_1.defaultAliases;
    const environmentOptions = (0, node_1.asEnvOptions)(environmentOverride, environmentAliases, environmentSourceNames);
    const parsingExtensions = parsingExtensionsArg !== null && parsingExtensionsArg !== void 0 ? parsingExtensionsArg : (0, default_extensions_1.defaultExtensions)(environmentAliases, environmentOverride, undefined, environmentSourceNames);
    const secretsFileExtensions = secretsFileExtensionsArg !== null && secretsFileExtensionsArg !== void 0 ? secretsFileExtensionsArg : parsingExtensions.concat((0, extensions_1.markAllValuesAsSecret)());
    logging_1.logger.verbose(`Loading extra parsing extensions`);
    const extraParsingExtensions = await (0, meta_1.loadExtraParsingExtensions)(meta);
    logging_1.logger.verbose(`${extraParsingExtensions.length} user-defined parsing extensions found`);
    parsingExtensions.splice(0, 0, ...extraParsingExtensions);
    secretsFileExtensions.splice(0, 0, ...extraParsingExtensions);
    logging_1.logger.verbose(`Trying to read files for configuration`);
    const [mainConfig, secrets] = await Promise.all([
        new node_1.FlexibleFileSource((0, path_1.join)(directory, fileNameBase), undefined, environmentOptions).read(parsingExtensions),
        new node_1.FlexibleFileSource((0, path_1.join)(directory, secretsFileNameBase), undefined, environmentOptions)
            .read(secretsFileExtensions)
            .catch((error) => {
            // NOTE: secrets are optional, so not finding them is normal
            if (core_1.NotFoundError.isNotFoundError(error, (0, path_1.join)(directory, secretsFileNameBase))) {
                logging_1.logger.verbose('Did not find secrets file');
                return undefined;
            }
            throw error;
        }),
    ]);
    let parsed = secrets ? core_1.ParsedValue.merge(mainConfig, secrets) : mainConfig;
    if (defaultValues) {
        parsed = core_1.ParsedValue.merge(core_1.ParsedValue.literal(defaultValues), parsed);
    }
    // the APP_CONFIG_EXTEND and APP_CONFIG_CI can "extend" the config (override it), so it's done last
    if (extensionEnvironmentVariableNames.length > 0) {
        logging_1.logger.verbose(`Checking [${extensionEnvironmentVariableNames.join(', ')}] for configuration extension`);
        const extension = new core_1.FallbackSource(extensionEnvironmentVariableNames.map((varName) => new node_1.EnvironmentSource(varName)));
        try {
            const parsedExtension = await extension.read(environmentExtensions);
            logging_1.logger.verbose(`Found configuration extension in $${parsedExtension.assertSource(node_1.EnvironmentSource).variableName}`);
            parsed = core_1.ParsedValue.merge(parsed, parsedExtension);
        }
        catch (error) {
            // having no APP_CONFIG_CI environment variable is normal, and should fall through to reading files
            if (!core_1.NotFoundError.isNotFoundError(error))
                throw error;
        }
    }
    const filePaths = new Set();
    for (const source of mainConfig.allSources()) {
        if (source instanceof node_1.FileSource) {
            filePaths.add(source.filePath);
        }
    }
    if (secrets) {
        for (const source of secrets.allSources()) {
            if (source instanceof node_1.FileSource) {
                filePaths.add(source.filePath);
            }
        }
    }
    verifyParsedValue(parsed);
    return {
        parsed,
        parsedSecrets: secrets,
        parsedNonSecrets: mainConfig.cloneWhere((v) => !v.meta.fromSecrets),
        environment: (0, node_1.currentEnvironment)(environmentOptions),
        fullConfig: parsed.toJSON(),
        filePaths: Array.from(filePaths),
    };
}
exports.loadUnvalidatedConfig = loadUnvalidatedConfig;
async function loadValidatedConfig(options, schemaOptions) {
    const [{ validate, validationFunctionCode, schema }, _a] = await Promise.all([
        (0, schema_1.loadSchema)(Object.assign({ directory: options === null || options === void 0 ? void 0 : options.directory, fileNameBase: (options === null || options === void 0 ? void 0 : options.fileNameBase) ? `${options.fileNameBase}.schema` : undefined, environmentVariableName: (options === null || options === void 0 ? void 0 : options.environmentVariableName)
                ? `${options.environmentVariableName}_SCHEMA`
                : undefined, environmentOverride: options === null || options === void 0 ? void 0 : options.environmentOverride, environmentAliases: options === null || options === void 0 ? void 0 : options.environmentAliases, environmentSourceNames: options === null || options === void 0 ? void 0 : options.environmentSourceNames }, schemaOptions)),
        loadUnvalidatedConfig(options),
    ]), { fullConfig, parsed } = _a, rest = __rest(_a, ["fullConfig", "parsed"]);
    if (!(0, utils_1.isObject)(fullConfig)) {
        throw new core_1.WasNotObject('Configuration was not an object');
    }
    logging_1.logger.verbose('Config was loaded, validating now');
    validate(fullConfig, parsed);
    return Object.assign({ fullConfig, parsed, schema, validationFunctionCode }, rest);
}
exports.loadValidatedConfig = loadValidatedConfig;
function verifyParsedValue(parsed) {
    parsed.visitAll((value) => {
        var _a;
        for (const [key, item] of Object.entries((_a = value.asObject()) !== null && _a !== void 0 ? _a : {})) {
            if (key.startsWith('$') && !item.meta.fromEscapedDirective) {
                throw new core_1.ReservedKeyError(`Saw a '${key}' key in an object, which is a reserved key name. Please escape the '$' like '$${key}' if you intended to make this a literal object property.`);
            }
        }
    });
}
//# sourceMappingURL=index.js.map