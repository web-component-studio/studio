"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameInFlattenedTree = exports.flattenObjectTree = exports.camelToScreamingCase = void 0;
const utils_1 = require("@app-config/utils");
const logging_1 = require("@app-config/logging");
/** Strategy used in 'app-config vars' for variable names */
function camelToScreamingCase(key, separator = '_') {
    return key
        .replace(/([^A-Z]+)([A-Z][a-z])/g, `$1${separator}$2`)
        .replace(/([^0-9]+)([0-9]+)/g, `$1${separator}$2`)
        .replace(/-/g, separator)
        .toUpperCase();
}
exports.camelToScreamingCase = camelToScreamingCase;
/** Strategy used in 'app-config vars' to extract variable names from hierachy */
function flattenObjectTree(obj, prefix = '', separator = '_', formatter = camelToScreamingCase) {
    return Object.entries(obj).reduce((merged, [key, value]) => {
        const flatKey = `${prefix}${prefix ? separator : ''}${formatter(key, separator)}`;
        let flattenedObject;
        if ((0, utils_1.isObject)(value)) {
            flattenedObject = flattenObjectTree(value, flatKey, separator, formatter);
        }
        else if (Array.isArray(value)) {
            const flattenedArray = value.reduce((acc, val, ind) => {
                return Object.assign(acc, { [ind]: val });
            }, {});
            flattenedObject = flattenObjectTree(flattenedArray, flatKey, separator, formatter);
        }
        else {
            flattenedObject = {
                [flatKey]: value,
            };
        }
        return Object.assign(merged, flattenedObject);
    }, {});
}
exports.flattenObjectTree = flattenObjectTree;
/** Strategy for renaming keys, used for 'app-config vars' */
function renameInFlattenedTree(flattened, renames = [], keepOriginalKeys = false) {
    for (const rename of renames) {
        const matched = /^(.*)=(.*)$/.exec(rename);
        if (matched) {
            const [, renameFrom, renameTo] = matched;
            if (flattened[renameFrom]) {
                flattened[renameTo] = flattened[renameFrom]; // eslint-disable-line no-param-reassign
                if (!keepOriginalKeys) {
                    delete flattened[renameFrom]; // eslint-disable-line no-param-reassign
                }
            }
            else {
                logging_1.logger.warn(`A rename was used ('${rename}'), but no value was found.`);
            }
        }
        else {
            logging_1.logger.warn(`A rename was used ('${rename}'), but not in correct format.`);
        }
    }
    return flattened;
}
exports.renameInFlattenedTree = renameInFlattenedTree;
//# sourceMappingURL=common.js.map