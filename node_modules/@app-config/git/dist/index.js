"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_git_1 = __importDefault(require("simple-git"));
const core_1 = require("@app-config/core");
const extension_utils_1 = require("@app-config/extension-utils");
const logging_1 = require("@app-config/logging");
class GitError extends core_1.Fallbackable {
}
/** Access to the git branch and commit ref */
function gitRefDirectives(getStatus = gitStatus, shouldShowDeprecationNotice) {
    return (0, extension_utils_1.named)('$git', (0, extension_utils_1.forKey)('$git', (0, extension_utils_1.validateOptions)((SchemaBuilder) => SchemaBuilder.stringSchema(), (value) => async (parse) => {
        if (shouldShowDeprecationNotice) {
            logging_1.logger.warn('Detected deprecated use of @app-config/git parsing extension. Please install @app-config/git and add it to your meta file "parsingExtensions".');
        }
        switch (value) {
            case 'commit':
                return getStatus().then(({ commitRef }) => parse(commitRef, { shouldFlatten: true }));
            case 'commitShort':
                return getStatus().then(({ commitRef }) => parse(commitRef.slice(0, 7), { shouldFlatten: true }));
            case 'branch':
            case 'branchName':
                return getStatus().then(({ branchName }) => {
                    if (!branchName) {
                        throw new core_1.AppConfigError('The $git directive tried to retrieve branchname, but it appears no branch is checked out');
                    }
                    return parse(branchName, { shouldFlatten: true });
                });
            case 'tag':
                return getStatus().then(({ tag }) => {
                    return parse(tag !== null && tag !== void 0 ? tag : null, { shouldFlatten: true });
                });
            default:
                throw new core_1.AppConfigError('$git directive was not passed a valid option');
        }
    })));
}
exports.default = gitRefDirectives;
async function gitStatus() {
    var _a;
    const git = (0, simple_git_1.default)({});
    try {
        const rev = await git.revparse(['HEAD']);
        const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
        const tag = await git.tag(['--points-at', 'HEAD']);
        return {
            commitRef: rev,
            branchName: branch,
            tag: (_a = (tag.trim() || undefined)) === null || _a === void 0 ? void 0 : _a.split(' ')[0],
        };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new GitError(error.message);
        }
        throw new GitError('Unknown error');
    }
}
//# sourceMappingURL=index.js.map