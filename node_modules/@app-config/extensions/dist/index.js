"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unescape$Directives = exports.markAllValuesAsSecret = exports.parseDirective = exports.environmentVariableSubstitution = exports.substituteDirective = exports.envVarDirective = exports.timestampDirective = exports.overrideDirective = exports.extendsSelfDirective = exports.extendsDirective = exports.envDirective = exports.hiddenDirective = exports.eqDirective = exports.ifDirective = exports.tryDirective = void 0;
const extension_utils_1 = require("@app-config/extension-utils");
var try_directive_1 = require("./try-directive");
Object.defineProperty(exports, "tryDirective", { enumerable: true, get: function () { return try_directive_1.tryDirective; } });
var if_directive_1 = require("./if-directive");
Object.defineProperty(exports, "ifDirective", { enumerable: true, get: function () { return if_directive_1.ifDirective; } });
var eq_directive_1 = require("./eq-directive");
Object.defineProperty(exports, "eqDirective", { enumerable: true, get: function () { return eq_directive_1.eqDirective; } });
var hidden_directive_1 = require("./hidden-directive");
Object.defineProperty(exports, "hiddenDirective", { enumerable: true, get: function () { return hidden_directive_1.hiddenDirective; } });
var env_directive_1 = require("./env-directive");
Object.defineProperty(exports, "envDirective", { enumerable: true, get: function () { return env_directive_1.envDirective; } });
var extends_directive_1 = require("./extends-directive");
Object.defineProperty(exports, "extendsDirective", { enumerable: true, get: function () { return extends_directive_1.extendsDirective; } });
Object.defineProperty(exports, "extendsSelfDirective", { enumerable: true, get: function () { return extends_directive_1.extendsSelfDirective; } });
Object.defineProperty(exports, "overrideDirective", { enumerable: true, get: function () { return extends_directive_1.overrideDirective; } });
var timestamp_directive_1 = require("./timestamp-directive");
Object.defineProperty(exports, "timestampDirective", { enumerable: true, get: function () { return timestamp_directive_1.timestampDirective; } });
var env_var_directive_1 = require("./env-var-directive");
Object.defineProperty(exports, "envVarDirective", { enumerable: true, get: function () { return env_var_directive_1.envVarDirective; } });
var substitute_directive_1 = require("./substitute-directive");
Object.defineProperty(exports, "substituteDirective", { enumerable: true, get: function () { return substitute_directive_1.substituteDirective; } });
var substitute_directive_2 = require("./substitute-directive");
Object.defineProperty(exports, "environmentVariableSubstitution", { enumerable: true, get: function () { return substitute_directive_2.substituteDirective; } });
var parse_directive_1 = require("./parse-directive");
Object.defineProperty(exports, "parseDirective", { enumerable: true, get: function () { return parse_directive_1.parseDirective; } });
/** Marks all values recursively as fromSecrets, so they do not trigger schema errors */
function markAllValuesAsSecret() {
    return (0, extension_utils_1.named)('markAllValuesAsSecret', (value) => (parse) => parse(value, { fromSecrets: true }));
}
exports.markAllValuesAsSecret = markAllValuesAsSecret;
/** When a key $$foo is seen, change it to be $foo and mark with meta property fromEscapedDirective */
function unescape$Directives() {
    return (0, extension_utils_1.named)('unescape$', (value, [_, key]) => {
        if (typeof key === 'string' && key.startsWith('$$')) {
            return async (parse) => {
                return parse(value, { rewriteKey: key.slice(1), fromEscapedDirective: true });
            };
        }
        return false;
    });
}
exports.unescape$Directives = unescape$Directives;
//# sourceMappingURL=index.js.map