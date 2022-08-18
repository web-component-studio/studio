"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchema = void 0;
const path_1 = require("path");
const ajv_1 = __importStar(require("ajv"));
const standalone_1 = __importDefault(require("ajv/dist/standalone"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const json_schema_ref_parser_1 = __importStar(require("json-schema-ref-parser"));
const utils_1 = require("@app-config/utils");
const core_1 = require("@app-config/core");
const logging_1 = require("@app-config/logging");
const node_1 = require("@app-config/node");
async function loadSchema({ directory = '.', fileNameBase = '.app-config.schema', environmentVariableName = 'APP_CONFIG_SCHEMA', environmentOverride, environmentAliases, environmentSourceNames, parsingExtensions = [], } = {}) {
    var _a, _b, _c, _d;
    const env = new node_1.EnvironmentSource(environmentVariableName);
    logging_1.logger.verbose(`Trying to read ${environmentVariableName} for schema`);
    let parsed;
    parsed = await env.read(parsingExtensions).catch((error) => {
        // having no APP_CONFIG_SCHEMA environment variable is normal, and should fall through to reading files
        if (core_1.NotFoundError.isNotFoundError(error)) {
            return undefined;
        }
        return Promise.reject(error);
    });
    if (!parsed) {
        logging_1.logger.verbose(`Searching for ${fileNameBase} file`);
        const environmentOptions = (0, node_1.asEnvOptions)(environmentOverride, environmentAliases, environmentSourceNames);
        const source = new node_1.FlexibleFileSource((0, path_1.join)(directory, fileNameBase), undefined, environmentOptions);
        parsed = await source.read(parsingExtensions);
    }
    const parsedObject = parsed.toJSON();
    if (!(0, utils_1.isObject)(parsedObject))
        throw new core_1.WasNotObject('JSON Schema was not an object');
    logging_1.logger.verbose(`Loaded schema from ${(_d = (_b = (_a = parsed.getSource(node_1.FileSource)) === null || _a === void 0 ? void 0 : _a.filePath) !== null && _b !== void 0 ? _b : (_c = parsed.getSource(node_1.EnvironmentSource)) === null || _c === void 0 ? void 0 : _c.variableName) !== null && _d !== void 0 ? _d : 'unknown source'}`);
    // default to draft 07
    if (!parsedObject.$schema) {
        parsedObject.$schema = 'http://json-schema.org/draft-07/schema#';
    }
    const normalized = await normalizeSchema(parsedObject, directory);
    const ajv = new ajv_1.default({
        strict: true,
        strictTypes: true,
        allErrors: true,
        code: {
            es5: true,
            lines: true,
            source: true,
            formats: (0, ajv_1._) `require("ajv-formats/dist/formats.js").fullFormats`,
        },
    });
    (0, ajv_formats_1.default)(ajv);
    ajv.addKeyword({
        keyword: 'secret',
        schemaType: 'boolean',
        errors: false,
        error: {
            message: 'should not be present in non-secret files (and not encrypted)',
        },
        validate(value, _data, _parentSchema, ctx) {
            const { dataPath } = ctx !== null && ctx !== void 0 ? ctx : {};
            if (!dataPath || !value)
                return true;
            const [, ...key] = dataPath.split('/');
            // check that any properties marked as secret were from secrets file
            const found = currentlyParsing === null || currentlyParsing === void 0 ? void 0 : currentlyParsing.property(key);
            if (found) {
                const arr = found.asArray();
                if (arr) {
                    return arr.every((v) => v.meta.fromSecrets);
                }
                if (!found.meta.fromSecrets) {
                    // arrays that are "secret" don't need to be secret themselves, just the items in that array do
                    return false;
                }
            }
            return true;
        },
    });
    const validate = ajv.compile(normalized);
    let currentlyParsing;
    const validationFunctionCode = ((esm) => {
        let code = (0, standalone_1.default)(ajv, validate);
        // resolve imports to absolute paths relative to _this_ package
        // this allows users of the webpack project not to have ajv as a dependency
        const resolvedAjvPath = (0, path_1.join)(require.resolve('ajv/package.json'), '..');
        const resolvedAjvFormatsPath = (0, path_1.join)(require.resolve('ajv-formats/package.json'), '..');
        code = code.replace(/require\("ajv\/(.+)"\)/g, (_, match) => `require("${(0, path_1.join)(resolvedAjvPath, match).replace(/\\/g, '\\\\\\\\')}")`);
        code = code.replace(/require\("ajv-formats\/(.+)"\)/g, (_, match) => `require("${(0, path_1.join)(resolvedAjvFormatsPath, match).replace(/\\/g, '\\\\\\\\')}")`);
        if (esm) {
            return requiresAsImports(code);
        }
        return code;
    });
    const validationFunctionModule = ((esm) => {
        let code;
        let imports = '';
        if (esm) {
            [imports, code] = schema.validationFunctionCode(true);
        }
        else {
            code = schema.validationFunctionCode();
        }
        return `${imports}
      const validateConfigModule = {};

      (function(module){${code}})(validateConfigModule);

      return validateConfigModule.exports;
    `;
    });
    const schema = {
        schema: normalized,
        validate(fullConfig, parsedConfig) {
            currentlyParsing = parsedConfig;
            const valid = validate(fullConfig);
            currentlyParsing = undefined;
            if (!valid) {
                const err = new core_1.ValidationError(`Config is invalid: ${ajv.errorsText(validate.errors, { dataVar: 'config' })}`);
                err.stack = undefined;
                throw err;
            }
        },
        validationFunctionCode,
        validationFunctionModule,
        get validationFunction() {
            const fnCode = schema.validationFunctionModule();
            // eslint-disable-next-line
            return new Function('require', fnCode)(require);
        },
    };
    return schema;
}
exports.loadSchema = loadSchema;
async function normalizeSchema(schema, directory) {
    // NOTE: http is enabled by default
    const resolveOptions = {
        file: {
            async read(file) {
                // resolves file:// urls, windows compat
                const path = toFileSystemPath(file.url);
                // we get passed in filepaths that are relative to CWD, but we want to ignore that
                const relativePath = (0, path_1.relative)(process.cwd(), path);
                // instead, we want to resolve the path relative to the provided directory
                const absolutePath = (0, path_1.resolve)(directory, relativePath);
                const [contents] = await new node_1.FileSource(absolutePath).readContents();
                return contents;
            },
        },
    };
    const options = {
        resolve: resolveOptions,
        parse: {
            json: false,
            yaml: false,
            text: false,
            any: {
                order: 1,
                canParse: ['.yml', '.yaml', '.json', '.json5', '.toml'],
                async parse(file) {
                    const text = file.data.toString('utf8');
                    const fileType = (0, core_1.filePathAssumedType)(file.url);
                    const parsed = await (0, core_1.parseRawString)(text, fileType);
                    if (!(0, utils_1.isObject)(parsed)) {
                        throw new core_1.WasNotObject(`JSON Schema was not an object (${file.url})`);
                    }
                    return parsed;
                },
            },
        },
    };
    // @ts-ignore
    const normalized = await json_schema_ref_parser_1.bundle.apply(json_schema_ref_parser_1.default, [schema, options]);
    return normalized;
}
// ALL BELOW IS FROM https://github.com/APIDevTools/json-schema-ref-parser/blob/d3bc1985a9a1d301a5eddc7a4bbfaca542887d8c/lib/util/url.js
const forwardSlashPattern = /\//g;
const urlDecodePatterns = [/%23/g, '#', /%24/g, '$', /%26/g, '&', /%2C/g, ',', /%40/g, '@'];
function toFileSystemPath(path) {
    let retPath = decodeURI(path);
    for (let i = 0; i < urlDecodePatterns.length; i += 2) {
        retPath = retPath.replace(urlDecodePatterns[i], urlDecodePatterns[i + 1]);
    }
    let isFileUrl = retPath.substr(0, 7).toLowerCase() === 'file://';
    if (isFileUrl) {
        retPath = retPath[7] === '/' ? retPath.substr(8) : retPath.substr(7);
        if (utils_1.isWindows && retPath[1] === '/') {
            retPath = `${retPath[0]}:${retPath.substr(1)}`;
        }
        isFileUrl = false;
        retPath = utils_1.isWindows ? retPath : `/${retPath}`;
    }
    if (utils_1.isWindows && !isFileUrl) {
        retPath = retPath.replace(forwardSlashPattern, '\\');
        if (retPath.substr(1, 2) === ':\\') {
            retPath = retPath[0].toUpperCase() + retPath.substr(1);
        }
    }
    return retPath;
}
// roughly inspired by https://github.com/jameswomack/replace-require-with-import/blob/master/index.js
// const createStore = require('redux')
const r1 = /^(let|var|const) +([a-zA-Z_$][a-zA-Z0-9_$]*) += +(require)\((('|")[a-zA-Z0-9-_.:/\\]+('|"))\)/gm;
// const createStore = require('redux').createStore
const r2 = /^(let|var|const) +([a-zA-Z_$][a-zA-Z0-9_$]*) += +(require)\((('|")[a-zA-Z0-9-_.:/\\]+('|"))\)\.([a-zA-Z][a-zA-Z0-9]+)/gm;
// const { createStore } = require('redux')
const r3 = /^(let|var|const) +(\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}) += +(require)\((('|")[a-zA-Z0-9-_.:/\\]+('|"))\)/gm;
// const uri = require('redux').formats.uri
const r4 = /^(let|var|const) +([a-zA-Z_$][a-zA-Z0-9_$]*) += +(require)\((('|")[a-zA-Z0-9-_.:/\\]+('|"))\)\.([a-zA-Z][a-zA-Z0-9]+)\.([a-zA-Z][a-zA-Z0-9]+)/gm;
function requiresAsImports(text) {
    const withImports = text
        // const format0 = require('ajv-formats').formats.uri
        // import { formats } from 'ajv-formats';
        // const { uri: format0 } = formats;
        .replace(r4, `import { $7 } from $4; const { $8: $2 } = $7;`)
        // const { formats } = require('ajv-formats');
        // import { formats } from 'ajv-formats';
        .replace(r3, `import { $3 } from $5;`)
        // const f = require('ajv-formats').formats;
        // import { formats as f } from 'ajv-formats';
        .replace(r2, `import { $7 as $2 } from $4;`)
        // const formats = require('ajv-formats');
        // import formats from 'ajv-formats';
        .replace(r1, `import $2 from $4;`);
    const importReg = /import .+;/gm;
    const imports = importReg.exec(withImports);
    if (imports) {
        return [withImports.replace(importReg, ''), imports.join('\n')];
    }
    return [withImports, ''];
}
//# sourceMappingURL=index.js.map