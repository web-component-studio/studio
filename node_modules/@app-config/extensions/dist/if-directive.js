"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifDirective = void 0;
const extension_utils_1 = require("@app-config/extension-utils");
/** Checks a condition, uses then/else */
function ifDirective() {
    return (0, extension_utils_1.named)('$if', (0, extension_utils_1.forKey)('$if', (0, extension_utils_1.validateOptions)((SchemaBuilder) => SchemaBuilder.emptySchema()
        .addProperty('$check', SchemaBuilder.fromJsonSchema({}))
        .addProperty('$then', SchemaBuilder.fromJsonSchema({}))
        .addProperty('$else', SchemaBuilder.fromJsonSchema({})), (value) => async (parse) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { $check, $then, $else } = value;
        const condition = (await parse($check)).toJSON();
        if (condition) {
            return parse($then, { shouldFlatten: true });
        }
        return parse($else, { shouldFlatten: true });
    }, { lazy: true })));
}
exports.ifDirective = ifDirective;
//# sourceMappingURL=if-directive.js.map