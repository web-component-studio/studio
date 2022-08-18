"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentEnvFromContext = exports.environmentOptionsFromContext = exports.aliasesFor = exports.currentEnvironment = exports.asEnvOptions = exports.defaultEnvOptions = exports.defaultEnvVarNames = exports.defaultAliases = void 0;
const logging_1 = require("@app-config/logging");
/** Default aliases that app-config will resolve for you */
exports.defaultAliases = {
    prod: 'production',
    dev: 'development',
};
/** Default environment variables that app-config will read */
exports.defaultEnvVarNames = ['APP_CONFIG_ENV', 'NODE_ENV', 'ENV'];
/** Default options for {@link currentEnvironment} */
exports.defaultEnvOptions = {
    aliases: exports.defaultAliases,
    envVarNames: exports.defaultEnvVarNames,
};
/** Conversion function useful for old usage of the deprecated {@link currentEnvironment} form */
function asEnvOptions(override, aliases = exports.defaultAliases, environmentSourceNames = exports.defaultEnvVarNames) {
    return {
        override,
        aliases,
        envVarNames: typeof environmentSourceNames === 'string'
            ? [environmentSourceNames]
            : environmentSourceNames,
    };
}
exports.asEnvOptions = asEnvOptions;
function currentEnvironment(...args) {
    var _a;
    let environmentSourceNames = exports.defaultEnvVarNames;
    let environmentAliases = exports.defaultAliases;
    let environmentOverride;
    if (args[0] &&
        typeof args[0] === 'object' &&
        ('override' in args[0] || 'aliases' in args[0] || 'envVarNames' in args[0])) {
        const options = args[0];
        if (options.override) {
            environmentOverride = options.override;
        }
        if (options.aliases) {
            environmentAliases = options.aliases;
        }
        if (options.envVarNames) {
            environmentSourceNames = options.envVarNames;
        }
    }
    else {
        if (args[0]) {
            environmentAliases = args[0];
            logging_1.logger.warn('Detected deprecated usage of currentEnvironment');
        }
        if (Array.isArray(args[1])) {
            environmentSourceNames = args[1];
            logging_1.logger.warn('Detected deprecated usage of currentEnvironment');
        }
        else if (typeof args[1] === 'string') {
            environmentSourceNames = [args[1]];
            logging_1.logger.warn('Detected deprecated usage of currentEnvironment');
        }
    }
    if (environmentOverride) {
        if (environmentAliases[environmentOverride]) {
            return environmentAliases[environmentOverride];
        }
        return environmentOverride;
    }
    let value;
    for (const name of environmentSourceNames) {
        if ((_a = process.env[name]) === null || _a === void 0 ? void 0 : _a.length) {
            value = process.env[name];
            break;
        }
    }
    if (!value)
        return undefined;
    if (environmentAliases[value]) {
        return environmentAliases[value];
    }
    return value;
}
exports.currentEnvironment = currentEnvironment;
/** Reverse lookup of any aliases for some environment */
function aliasesFor(env, aliases) {
    return Object.entries(aliases)
        .filter(([, value]) => value === env)
        .map(([key]) => key);
}
exports.aliasesFor = aliasesFor;
function environmentOptionsFromContext(context) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return context.environmentOptions;
}
exports.environmentOptionsFromContext = environmentOptionsFromContext;
function currentEnvFromContext(context, options) {
    const environmentOptions = environmentOptionsFromContext(context);
    if (environmentOptions) {
        return currentEnvironment(environmentOptions);
    }
    return currentEnvironment(options);
}
exports.currentEnvFromContext = currentEnvFromContext;
//# sourceMappingURL=environment.js.map