"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDirective = void 0;
const core_1 = require("@app-config/core");
const extension_utils_1 = require("@app-config/extension-utils");
/** Provides string parsing */
function parseDirective() {
    return (0, extension_utils_1.named)('$parse', (0, extension_utils_1.composeExtensions)([
        (0, extension_utils_1.forKey)('$parseBool', (value) => async (parse) => {
            const parsed = await parse(value);
            const primitive = parsed.asPrimitive();
            if (typeof primitive === 'string') {
                return parse(primitive.toLowerCase() === 'true' || primitive.toLowerCase() === '1', {
                    shouldFlatten: true,
                });
            }
            return parse(!!parsed.toJSON(), { shouldFlatten: true });
        }),
        (0, extension_utils_1.forKey)('$parseFloat', (value) => async (parse) => {
            const parsed = await parse(value);
            const primitive = parsed.asPrimitive();
            if (typeof primitive === 'number') {
                return parse(primitive, { shouldFlatten: true });
            }
            if (typeof primitive === 'string') {
                const floatValue = Number.parseFloat(primitive);
                if (Number.isNaN(floatValue)) {
                    throw new core_1.AppConfigError(`Failed to $parseFloat(${primitive})`);
                }
                return parse(floatValue, { shouldFlatten: true });
            }
            throw new core_1.AppConfigError(`Failed to $parseFloat(${parsed.toJSON()}) - invalid input type`);
        }),
        (0, extension_utils_1.forKey)('$parseInt', (value) => async (parse) => {
            const parsed = await parse(value);
            const primitive = parsed.asPrimitive();
            if (typeof primitive === 'number') {
                // eslint-disable-next-line no-bitwise
                return parse(primitive | 0, { shouldFlatten: true });
            }
            if (typeof primitive === 'string') {
                const intValue = Number.parseInt(primitive, 10);
                if (Number.isNaN(intValue)) {
                    throw new core_1.AppConfigError(`Failed to $parseInt(${primitive})`);
                }
                return parse(intValue, { shouldFlatten: true });
            }
            throw new core_1.AppConfigError(`Failed to $parseInt(${parsed.toJSON()}) - invalid input type`);
        }),
    ]));
}
exports.parseDirective = parseDirective;
//# sourceMappingURL=parse-directive.js.map