"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@app-config/utils");
const config_1 = require("@app-config/config");
const schema_1 = require("@app-config/schema");
function appConfigRollup(options = {}) {
    const currentFilePaths = [];
    return {
        name: '@app-config/rollup',
        currentFilePaths,
        resolveId(id) {
            if (shouldTransform(id)) {
                return { id, moduleSideEffects: false, external: false };
            }
        },
        async load(id) {
            if (shouldTransform(id)) {
                return loadConfig(options, currentFilePaths);
            }
        },
        async transform(_, id) {
            if (shouldTransform(id)) {
                return loadConfig(options, currentFilePaths);
            }
        },
    };
}
exports.default = appConfigRollup;
function shouldTransform(id) {
    return !!utils_1.packageNameRegex.exec(id) || !!utils_1.appConfigImportRegex.exec(id);
}
async function loadConfig({ loadingOptions, schemaLoadingOptions, injectValidationFunction = true, noBundledConfig, useGlobalNamespace, readGlobal, }, currentFilePaths) {
    var _a;
    if (noBundledConfig) {
        const { validationFunctionCode } = await (0, schema_1.loadSchema)(schemaLoadingOptions);
        return (0, utils_1.generateModuleText)(undefined, {
            environment: undefined,
            useGlobalNamespace: true,
            validationFunctionCode: injectValidationFunction ? validationFunctionCode : undefined,
            esmValidationCode: true,
        });
    }
    const { fullConfig, environment, validationFunctionCode, filePaths } = await (0, config_1.loadValidatedConfig)(loadingOptions, schemaLoadingOptions);
    if (filePaths) {
        currentFilePaths.splice(0);
        currentFilePaths.push(...filePaths);
    }
    const code = (0, utils_1.generateModuleText)(fullConfig, {
        environment,
        useGlobalNamespace: (_a = useGlobalNamespace !== null && useGlobalNamespace !== void 0 ? useGlobalNamespace : readGlobal) !== null && _a !== void 0 ? _a : true,
        validationFunctionCode: injectValidationFunction ? validationFunctionCode : undefined,
        esmValidationCode: true,
    });
    return {
        code,
        moduleSideEffects: false,
    };
}
//# sourceMappingURL=index.js.map