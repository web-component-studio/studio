"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLogWriter = exports.setLogLevel = exports.logger = exports.getInitialLogLevel = exports.checkTTY = exports.isTestEnvAndShouldNotPrompt = exports.LogLevel = void 0;
const utils_1 = require("@app-config/utils");
var LogLevel;
(function (LogLevel) {
    LogLevel["Verbose"] = "verbose";
    LogLevel["Info"] = "info";
    LogLevel["Warn"] = "warn";
    LogLevel["Error"] = "error";
    LogLevel["None"] = "none";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
let isTest = utils_1.isNode && process.env.NODE_ENV === 'test';
function isTestEnvAndShouldNotPrompt(newValue) {
    if (newValue !== undefined) {
        isTest = newValue;
    }
    return isTest;
}
exports.isTestEnvAndShouldNotPrompt = isTestEnvAndShouldNotPrompt;
function checkTTY() {
    return utils_1.isNode && process.stdin.isTTY && process.stdout.isTTY && !isTestEnvAndShouldNotPrompt();
}
exports.checkTTY = checkTTY;
function getInitialLogLevel() {
    if (!utils_1.isNode)
        return LogLevel.Warn;
    if (process.env.APP_CONFIG_LOG_LEVEL) {
        return process.env.APP_CONFIG_LOG_LEVEL;
    }
    if (process.env.NODE_ENV === 'test') {
        return LogLevel.None;
    }
    if (checkTTY()) {
        return LogLevel.Info;
    }
    return LogLevel.Warn;
}
exports.getInitialLogLevel = getInitialLogLevel;
let logLevel = getInitialLogLevel();
let writeMsg = utils_1.isNode ? process.stderr.write.bind(process.stderr) : console.info;
exports.logger = {
    setWriter(write) {
        writeMsg = write;
    },
    setLevel(level) {
        logLevel = level;
    },
    verbose(message) {
        switch (logLevel) {
            case LogLevel.Verbose:
                writeMsg(`[app-config][VERBOSE] ${message}\n`);
                break;
            default:
                break;
        }
    },
    info(message) {
        switch (logLevel) {
            case LogLevel.Verbose:
            case LogLevel.Info:
                writeMsg(`[app-config][INFO] ${message}\n`);
                break;
            default:
                break;
        }
    },
    warn(message) {
        switch (logLevel) {
            case LogLevel.Verbose:
            case LogLevel.Info:
            case LogLevel.Warn:
                writeMsg(`[app-config][WARN] ${message}\n`);
                break;
            default:
                break;
        }
    },
    error(message) {
        switch (logLevel) {
            case LogLevel.Verbose:
            case LogLevel.Info:
            case LogLevel.Warn:
            case LogLevel.Error:
                writeMsg(`[app-config][ERROR] ${message}\n`);
                break;
            default:
                break;
        }
    },
};
exports.setLogLevel = exports.logger.setLevel;
exports.setLogWriter = exports.logger.setWriter;
//# sourceMappingURL=index.js.map