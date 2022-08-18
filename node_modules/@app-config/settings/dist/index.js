"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSettingsLazy = exports.saveSettings = exports.loadSettings = exports.settingsDirectory = void 0;
const path_1 = require("path");
const os_1 = require("os");
const fs = __importStar(require("fs-extra"));
const env_paths_1 = __importDefault(require("env-paths"));
const core_1 = require("@app-config/core");
const logging_1 = require("@app-config/logging");
const node_1 = require("@app-config/node");
function settingsDirectory() {
    if (process.env.APP_CONFIG_SETTINGS_FOLDER) {
        return (0, path_1.resolve)(process.env.APP_CONFIG_SETTINGS_FOLDER);
    }
    const oldConfigDir = (0, path_1.join)((0, os_1.homedir)(), '.app-config');
    const { config: configDir } = (0, env_paths_1.default)('app-config', { suffix: '' });
    if (fs.pathExistsSync(oldConfigDir)) {
        logging_1.logger.warn(`Moving ${oldConfigDir} to ${configDir}`);
        fs.moveSync(oldConfigDir, configDir);
    }
    return configDir;
}
exports.settingsDirectory = settingsDirectory;
async function loadSettings() {
    const path = (0, path_1.join)(settingsDirectory(), 'settings.yml');
    const source = new node_1.FileSource(path);
    logging_1.logger.verbose(`Loading settings from ${path}`);
    try {
        const parsed = await source.read();
        const value = parsed.toJSON();
        return value;
    }
    catch (error) {
        if (core_1.NotFoundError.isNotFoundError(error, path)) {
            return {};
        }
        throw error;
    }
}
exports.loadSettings = loadSettings;
async function saveSettings(newSettings) {
    settings = Promise.resolve(newSettings);
    const path = (0, path_1.join)(settingsDirectory(), 'settings.yml');
    const stringified = (0, core_1.stringify)(newSettings, core_1.FileType.YAML);
    logging_1.logger.verbose(`Saving settings to ${path}`);
    await fs.outputFile(path, stringified);
}
exports.saveSettings = saveSettings;
let settings;
async function loadSettingsLazy() {
    if (!settings) {
        settings = loadSettings();
    }
    return settings;
}
exports.loadSettingsLazy = loadSettingsLazy;
//# sourceMappingURL=index.js.map