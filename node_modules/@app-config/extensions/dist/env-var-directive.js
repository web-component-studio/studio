"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVarDirective = void 0;
const extension_utils_1 = require("@app-config/extension-utils");
const core_1 = require("@app-config/core");
const node_1 = require("@app-config/node");
const logging_1 = require("@app-config/logging");
/** Substitutes environment variables */
function envVarDirective(aliases = node_1.defaultAliases, environmentOverride, environmentSourceNames) {
    return (0, extension_utils_1.named)('$envVar', (0, extension_utils_1.forKey)('$envVar', (value, key, parentKeys, context) => async (parse) => {
        let name;
        let parseInt = false;
        let parseFloat = false;
        let parseBool = false;
        if (typeof value === 'string') {
            name = value;
        }
        else {
            validateObject(value, [...parentKeys, key]);
            if (Array.isArray(value))
                throw new core_1.AppConfigError('$envVar was given an array');
            const resolved = (await parse(value.name)).toJSON();
            validateString(resolved, [...parentKeys, key, [core_1.InObject, 'name']]);
            parseInt = !!(await parse(value.parseInt)).toJSON();
            parseFloat = !!(await parse(value.parseFloat)).toJSON();
            parseBool = !!(await parse(value.parseBool)).toJSON();
            name = resolved;
            if (parseInt) {
                logging_1.logger.warn(`Detected use of deprecated of 'parseInt' option in $envVar - use $parseInt directive instead`);
            }
            if (parseFloat) {
                logging_1.logger.warn(`Detected use of deprecated of 'parseFloat' option in $envVar - use $parseFloat directive instead`);
            }
            if (parseBool) {
                logging_1.logger.warn(`Detected use of deprecated of 'parseBool' option in $envVar - use $parseBool directive instead`);
            }
        }
        const parseValue = (strValue) => {
            if (parseBool) {
                const parsed = strValue !== null && (strValue.toLowerCase() === 'true' || strValue === '1');
                return parse(parsed, { shouldFlatten: true });
            }
            if (strValue === null) {
                return parse(null, { shouldFlatten: true });
            }
            if (parseInt) {
                const parsed = Number.parseInt(strValue, 10);
                if (Number.isNaN(parsed)) {
                    throw new core_1.AppConfigError(`Failed to parseInt(${strValue})`);
                }
                return parse(parsed, { shouldFlatten: true });
            }
            if (parseFloat) {
                const parsed = Number.parseFloat(strValue);
                if (Number.isNaN(parsed)) {
                    throw new core_1.AppConfigError(`Failed to parseFloat(${strValue})`);
                }
                return parse(parsed, { shouldFlatten: true });
            }
            return parse(strValue, { shouldFlatten: true });
        };
        let resolvedValue = process.env[name];
        if (name === 'APP_CONFIG_ENV') {
            const environment = (0, node_1.currentEnvFromContext)(context, (0, node_1.asEnvOptions)(environmentOverride, aliases, environmentSourceNames));
            resolvedValue = environment;
        }
        if (resolvedValue) {
            return parseValue(resolvedValue);
        }
        if (typeof value === 'object') {
            if (value.fallback !== undefined) {
                const fallback = (await parse(value.fallback)).toJSON();
                const allowNull = (await parse(value.allowNull)).toJSON();
                if (allowNull) {
                    validateStringOrNull(fallback, [...parentKeys, key, [core_1.InObject, 'fallback']]);
                }
                else {
                    validateString(fallback, [...parentKeys, key, [core_1.InObject, 'fallback']]);
                }
                return parseValue(fallback);
            }
            const allowMissing = (await parse(value.allowMissing)).toJSON();
            if (allowMissing) {
                return parseValue(null);
            }
        }
        throw new core_1.AppConfigError(`$envVar could not find ${name} environment variable`);
    }));
}
exports.envVarDirective = envVarDirective;
const validateObject = (0, extension_utils_1.validationFunction)(({ emptySchema }) => emptySchema().addAdditionalProperties());
const validateString = (0, extension_utils_1.validationFunction)(({ stringSchema }) => stringSchema());
const validateStringOrNull = (0, extension_utils_1.validationFunction)(({ fromJsonSchema }) => fromJsonSchema({ type: ['null', 'string'] }));
//# sourceMappingURL=env-var-directive.js.map