"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envDirective = void 0;
const core_1 = require("@app-config/core");
const extension_utils_1 = require("@app-config/extension-utils");
const node_1 = require("@app-config/node");
/** Looks up an environment-specific value ($env) */
function envDirective(aliases = node_1.defaultAliases, environmentOverride, environmentSourceNames) {
    const metadata = { shouldOverride: true };
    return (0, extension_utils_1.named)('$env', (0, extension_utils_1.forKey)('$env', (0, extension_utils_1.validateOptions)((SchemaBuilder) => SchemaBuilder.emptySchema().addAdditionalProperties(), (value, _, parentKeys, context) => (parse) => {
        const environment = (0, node_1.currentEnvFromContext)(context, (0, node_1.asEnvOptions)(environmentOverride, aliases, environmentSourceNames));
        if (!environment) {
            if ('none' in value) {
                return parse(value.none, metadata);
            }
            if ('default' in value) {
                return parse(value.default, metadata);
            }
            const path = (0, extension_utils_1.keysToPath)(parentKeys);
            throw new core_1.AppConfigError(`An $env directive was used (in ${path}), but current environment (eg. NODE_ENV) is undefined`);
        }
        for (const [envName, envValue] of Object.entries(value)) {
            if (envName === environment || aliases[envName] === environment) {
                return parse(envValue, metadata);
            }
        }
        if ('default' in value) {
            return parse(value.default, metadata);
        }
        const found = Object.keys(value).join(', ');
        const path = (0, extension_utils_1.keysToPath)(parentKeys);
        throw new core_1.AppConfigError(`An $env directive was used (in ${path}), but none matched the current environment (wanted ${environment}, saw [${found}])`);
    }, 
    // $env is lazy so that non-applicable envs don't get evaluated
    { lazy: true })));
}
exports.envDirective = envDirective;
//# sourceMappingURL=env-directive.js.map