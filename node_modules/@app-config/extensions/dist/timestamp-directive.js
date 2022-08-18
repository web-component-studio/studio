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
exports.timestampDirective = void 0;
const core_1 = require("@app-config/core");
const extension_utils_1 = require("@app-config/extension-utils");
/** Provides the current timestamp using { $timestamp: true } */
function timestampDirective(dateSource = () => new Date()) {
    return (0, extension_utils_1.named)('$timestamp', (0, extension_utils_1.forKey)('$timestamp', (0, extension_utils_1.validateOptions)((SchemaBuilder) => SchemaBuilder.oneOf(SchemaBuilder.booleanSchema(), SchemaBuilder.emptySchema()
        .addString('day', {}, false)
        .addString('month', {}, false)
        .addString('year', {}, false)
        .addString('weekday', {}, false)
        .addString('locale', {}, false)
        .addString('timeZone', {}, false)
        .addString('timeZoneName', {}, false)), (value) => (parse) => {
        let formatted;
        const date = dateSource();
        if (value === true) {
            formatted = date.toISOString();
        }
        else if (typeof value === 'object') {
            const { locale } = value, options = __rest(value, ["locale"]);
            formatted = date.toLocaleDateString(locale, options);
        }
        else {
            throw new core_1.AppConfigError('$timestamp was provided an invalid option');
        }
        return parse(formatted, { shouldFlatten: true });
    })));
}
exports.timestampDirective = timestampDirective;
//# sourceMappingURL=timestamp-directive.js.map