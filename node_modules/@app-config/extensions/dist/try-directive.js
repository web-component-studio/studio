"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryDirective = void 0;
const core_1 = require("@app-config/core");
const extension_utils_1 = require("@app-config/extension-utils");
/** Try an operation, with a fallback ($try, $value and $fallback) */
function tryDirective() {
    return (0, extension_utils_1.named)('$try', (0, extension_utils_1.forKey)('$try', (0, extension_utils_1.validateOptions)((SchemaBuilder) => SchemaBuilder.emptySchema()
        .addProperty('$value', SchemaBuilder.fromJsonSchema({}))
        .addProperty('$fallback', SchemaBuilder.fromJsonSchema({}))
        .addBoolean('$unsafe', {}, false), (value) => async (parse) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { $value, $fallback, $unsafe } = value;
        try {
            return await parse($value, { shouldFlatten: true });
        }
        catch (error) {
            if (error instanceof core_1.Fallbackable || $unsafe) {
                return parse($fallback, { shouldFlatten: true });
            }
            throw error;
        }
    }, { lazy: true })));
}
exports.tryDirective = tryDirective;
//# sourceMappingURL=try-directive.js.map