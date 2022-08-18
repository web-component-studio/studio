"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeStdin = exports.promptUserWithRetry = exports.promptUser = void 0;
const core_1 = require("@app-config/core");
const logging_1 = require("@app-config/logging");
const prompts_1 = __importDefault(require("prompts"));
async function promptUser(options) {
    const { named } = await (0, prompts_1.default)(Object.assign(Object.assign({}, options), { name: 'named' }));
    return named;
}
exports.promptUser = promptUser;
async function promptUserWithRetry(options, tryAnswer, retries = 3) {
    for (let retry = 0; retry < retries; retry += 1) {
        const answer = await promptUser(options);
        const check = await tryAnswer(answer);
        if (check === true) {
            return;
        }
        logging_1.logger.error(check.toString());
    }
    return Promise.reject(new core_1.AppConfigError(`Prompt failed after ${retries} retries`));
}
exports.promptUserWithRetry = promptUserWithRetry;
async function consumeStdin() {
    return new Promise((resolve, reject) => {
        const buffers = [];
        process.stdin.on('data', (data) => buffers.push(data));
        process.stdin.on('error', reject);
        process.stdin.on('end', () => resolve(Buffer.concat(buffers).toString('utf8')));
    });
}
exports.consumeStdin = consumeStdin;
//# sourceMappingURL=prompts.js.map