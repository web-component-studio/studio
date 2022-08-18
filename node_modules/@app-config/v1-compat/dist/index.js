"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const utils_1 = require("@app-config/utils");
const extension_utils_1 = require("@app-config/extension-utils");
const core_1 = require("@app-config/core");
const node_1 = require("@app-config/node");
const logging_1 = require("@app-config/logging");
/** V1 app-config compatibility */
function v1Compat(shouldShowDeprecationNotice) {
    return (0, extension_utils_1.named)('v1-compat', (value, [_, key], parentKeys) => {
        var _a;
        // only apply in top-level app-config property
        if (((_a = parentKeys[parentKeys.length - 1]) === null || _a === void 0 ? void 0 : _a[0]) !== core_1.Root) {
            return false;
        }
        if (key === 'app-config' && (0, utils_1.isObject)(value)) {
            return async (parse, _, ctx) => {
                const resolveAmbiguousFilename = async (filepath) => {
                    let resolvedPath = filepath;
                    // resolve filepaths that are relative to the current FileSource
                    if (ctx instanceof node_1.FileSource) {
                        resolvedPath = (0, path_1.join)((0, path_1.dirname)(ctx.filePath), filepath);
                    }
                    switch ((0, path_1.extname)(resolvedPath)) {
                        case '.yml':
                        case '.yaml':
                        case '.json':
                        case '.json5':
                        case '.toml':
                            return resolvedPath;
                        default: {
                            if (await (0, fs_extra_1.pathExists)(`${resolvedPath}.yml`))
                                return `${resolvedPath}.yml`;
                            if (await (0, fs_extra_1.pathExists)(`${resolvedPath}.yaml`))
                                return `${resolvedPath}.yaml`;
                            if (await (0, fs_extra_1.pathExists)(`${resolvedPath}.json`))
                                return `${resolvedPath}.json`;
                            if (await (0, fs_extra_1.pathExists)(`${resolvedPath}.json5`))
                                return `${resolvedPath}.json5`;
                            if (await (0, fs_extra_1.pathExists)(`${resolvedPath}.toml`))
                                return `${resolvedPath}.toml`;
                            return resolvedPath;
                        }
                    }
                };
                // TODO: multiple properties defined
                if ('extends' in value) {
                    if (shouldShowDeprecationNotice) {
                        logging_1.logger.warn('Detected deprecated use of @app-config/v1-compat parsing extension. Please install @app-config/v1-compat and add it to your meta file "parsingExtensions".');
                    }
                    return parse({ $extends: await resolveAmbiguousFilename(value.extends) }, { shouldMerge: true });
                }
                if ('extendsOptional' in value) {
                    if (shouldShowDeprecationNotice) {
                        logging_1.logger.warn('Detected deprecated use of @app-config/v1-compat parsing extension. Please install @app-config/v1-compat and add it to your meta file "parsingExtensions".');
                    }
                    return parse({
                        $extends: {
                            path: await resolveAmbiguousFilename(value.extendsOptional),
                            optional: true,
                        },
                    }, { shouldMerge: true });
                }
                if ('override' in value) {
                    if (shouldShowDeprecationNotice) {
                        logging_1.logger.warn('Detected deprecated use of @app-config/v1-compat parsing extension. Please install @app-config/v1-compat and add it to your meta file "parsingExtensions".');
                    }
                    return parse({ $override: await resolveAmbiguousFilename(value.override) }, { shouldOverride: true });
                }
                if ('overrideOptional' in value) {
                    if (shouldShowDeprecationNotice) {
                        logging_1.logger.warn('Detected deprecated use of @app-config/v1-compat parsing extension. Please install @app-config/v1-compat and add it to your meta file "parsingExtensions".');
                    }
                    return parse({
                        $override: {
                            path: await resolveAmbiguousFilename(value.overrideOptional),
                            optional: true,
                        },
                    }, { shouldOverride: true });
                }
                return parse(value);
            };
        }
        return false;
    });
}
exports.default = v1Compat;
//# sourceMappingURL=index.js.map