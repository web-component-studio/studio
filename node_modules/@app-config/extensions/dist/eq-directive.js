"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eqDirective = void 0;
const extension_utils_1 = require("@app-config/extension-utils");
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
/** Checks if two values are equal */
function eqDirective() {
    return (0, extension_utils_1.named)('$eq', (0, extension_utils_1.forKey)('$eq', (0, extension_utils_1.validateOptions)((SchemaBuilder) => SchemaBuilder.arraySchema(SchemaBuilder.fromJsonSchema({})), (values) => async (parse) => {
        for (const a of values) {
            for (const b of values) {
                if (a === b)
                    continue;
                if ((0, lodash_isequal_1.default)(a, b))
                    continue;
                return parse(false, { shouldFlatten: true });
            }
        }
        return parse(true, { shouldFlatten: true });
    })));
}
exports.eqDirective = eqDirective;
//# sourceMappingURL=eq-directive.js.map