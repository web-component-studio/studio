"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentSource = void 0;
const core_1 = require("@app-config/core");
const logging_1 = require("@app-config/logging");
/** Read configuration from an environment variable */
class EnvironmentSource extends core_1.ConfigSource {
    constructor(variableName) {
        super();
        this.variableName = variableName;
    }
    async readContents() {
        const value = process.env[this.variableName];
        if (!value) {
            throw new core_1.EnvironmentVariableNotFoundError(`Could not read the environment variable '${this.variableName}'`, this.variableName);
        }
        const inferredFileType = await (0, core_1.guessFileType)(value);
        logging_1.logger.verbose(`EnvironmentSource guessed that ${this.variableName} is ${inferredFileType} FileType`);
        return [value, inferredFileType];
    }
}
exports.EnvironmentSource = EnvironmentSource;
//# sourceMappingURL=environment-source.js.map