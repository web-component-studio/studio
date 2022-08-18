"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationFunction = exports.validateOptions = exports.ParsingExtensionInvalidOptions = exports.keysToPath = exports.forKey = exports.named = exports.composeExtensions = void 0;
const core_1 = require("@app-config/core");
const schema_builder_1 = require("@serafin/schema-builder");
function composeExtensions(extensions) {
    const composed = (value, [k], _, context) => {
        // only applies to the root - override the parsing extensions
        if (k !== core_1.Root)
            return false;
        return (_, __, source, baseExtensions) => 
        // restart the parse tree, but with additional extensions included
        (0, core_1.parseValue)(value, source, 
        // ensures that a recursion doesn't happen
        baseExtensions.concat(extensions).filter((v) => v !== composed), { shouldFlatten: true }, context);
    };
    return composed;
}
exports.composeExtensions = composeExtensions;
function named(name, parsingExtension) {
    Object.defineProperty(parsingExtension, 'extensionName', { value: name });
    return parsingExtension;
}
exports.named = named;
function forKey(key, parsingExtension) {
    const shouldApply = ([_, k]) => {
        if (typeof k !== 'string')
            return false;
        if (Array.isArray(key)) {
            return key.includes(k);
        }
        return key === k;
    };
    return (value, currentKey, parentKeys, context) => {
        if (shouldApply(currentKey)) {
            return parsingExtension(value, currentKey, parentKeys, context);
        }
        return false;
    };
}
exports.forKey = forKey;
function keysToPath(keys) {
    if (keys.length === 0)
        return 'root';
    return (keys
        .map(([, k]) => k)
        .filter((v) => v)
        .join('.') || 'root');
}
exports.keysToPath = keysToPath;
class ParsingExtensionInvalidOptions extends core_1.AppConfigError {
}
exports.ParsingExtensionInvalidOptions = ParsingExtensionInvalidOptions;
function validateOptions(builder, extension, { lazy = false } = {}) {
    const validate = validationFunction(builder);
    return (value, key, parentKeys, context) => {
        return async (parse, ...args) => {
            let valid;
            if (lazy) {
                valid = value;
            }
            else {
                valid = (await parse(value)).toJSON();
            }
            validate(valid, [...parentKeys, key]);
            const call = extension(valid, key, parentKeys, context);
            if (call) {
                return call(parse, ...args);
            }
            throw new core_1.AppConfigError(`A parsing extension returned as non-applicable, when using validateOptions. This isn't supported.`);
        };
    };
}
exports.validateOptions = validateOptions;
function validationFunction(builder) {
    const schema = builder(schema_builder_1.SchemaBuilder);
    schema.cacheValidationFunction();
    return (value, parentKeys) => {
        try {
            schema.validate(value);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'unknown';
            throw new ParsingExtensionInvalidOptions(`Validation failed in "${keysToPath(parentKeys)}": ${message}`);
        }
    };
}
exports.validationFunction = validationFunction;
//# sourceMappingURL=index.js.map