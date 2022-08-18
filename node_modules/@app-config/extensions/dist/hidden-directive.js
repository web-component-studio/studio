"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hiddenDirective = void 0;
const extension_utils_1 = require("@app-config/extension-utils");
/** Properties that are removed, used by references */
function hiddenDirective() {
    return (0, extension_utils_1.named)('$hidden', (0, extension_utils_1.forKey)('$hidden', () => async (parse) => {
        return parse({}, { shouldMerge: true });
    }));
}
exports.hiddenDirective = hiddenDirective;
//# sourceMappingURL=hidden-directive.js.map