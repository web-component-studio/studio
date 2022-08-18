"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendsSelfDirective = exports.extendsDirective = exports.overrideDirective = void 0;
const extension_utils_1 = require("@app-config/extension-utils");
const core_1 = require("@app-config/core");
const node_1 = require("@app-config/node");
const logging_1 = require("@app-config/logging");
// common logic for $extends and $override
function fileReferenceDirective(keyName, meta) {
    return (0, extension_utils_1.forKey)(keyName, (0, extension_utils_1.validateOptions)((SchemaBuilder) => {
        const reference = SchemaBuilder.oneOf(SchemaBuilder.stringSchema(), SchemaBuilder.emptySchema()
            .addString('path')
            .addBoolean('optional', {}, false)
            .addString('select', {}, false)
            .addString('env', {}, false));
        return SchemaBuilder.oneOf(reference, SchemaBuilder.arraySchema(reference));
    }, (value, _, __, context) => async (_, ___, source, extensions) => {
        const retrieveFile = async (filepath, subselector, isOptional = false, env) => {
            const resolvedPath = (0, node_1.resolveFilepath)(source, filepath);
            logging_1.logger.verbose(`Loading file for ${keyName}: ${resolvedPath}`);
            const resolvedSource = new node_1.FileSource(resolvedPath);
            const environmentOptions = Object.assign({}, (0, node_1.environmentOptionsFromContext)(context));
            if (env) {
                environmentOptions.override = env;
            }
            const parsed = await resolvedSource
                .read(extensions, Object.assign(Object.assign({}, context), { environmentOptions }))
                .catch((error) => {
                if (isOptional && core_1.NotFoundError.isNotFoundError(error, resolvedPath)) {
                    return core_1.ParsedValue.literal({});
                }
                throw error;
            });
            if (subselector) {
                const found = parsed.property(subselector.split('.'));
                if (!found) {
                    throw new core_1.FailedToSelectSubObject(`Failed to select ${subselector} in ${resolvedPath}`);
                }
                return found;
            }
            return parsed;
        };
        let parsed;
        if (typeof value === 'string') {
            parsed = await retrieveFile(value);
        }
        else if (Array.isArray(value)) {
            parsed = core_1.ParsedValue.literal({});
            for (const ext of value) {
                if (typeof ext === 'string') {
                    parsed = core_1.ParsedValue.merge(parsed, await retrieveFile(ext));
                }
                else {
                    const { path, optional, select, env } = ext;
                    parsed = core_1.ParsedValue.merge(parsed, await retrieveFile(path, select, optional, env));
                }
            }
        }
        else {
            const { path, optional, select, env } = value;
            parsed = await retrieveFile(path, select, optional, env);
        }
        return parsed.assignMeta(meta);
    }));
}
/** Uses another file as overriding values, layering them on top of current file */
function overrideDirective() {
    return (0, extension_utils_1.named)('$override', fileReferenceDirective('$override', { shouldOverride: true }));
}
exports.overrideDirective = overrideDirective;
/** Uses another file as a "base", and extends on top of it */
function extendsDirective() {
    return (0, extension_utils_1.named)('$extends', fileReferenceDirective('$extends', { shouldMerge: true }));
}
exports.extendsDirective = extendsDirective;
/** Lookup a property in the same file, and "copy" it */
function extendsSelfDirective() {
    const validate = (0, extension_utils_1.validationFunction)(({ oneOf, stringSchema, emptySchema }) => oneOf(stringSchema(), emptySchema().addString('select').addString('env', {}, false)));
    return (0, extension_utils_1.named)('$extendsSelf', (0, extension_utils_1.forKey)('$extendsSelf', (input, key, parentKeys, ctx) => async (parse, _, __, ___, root) => {
        let select;
        let env;
        const value = (await parse(input)).toJSON();
        validate(value, [...parentKeys, key]);
        if (typeof value === 'string') {
            select = value;
        }
        else {
            ({ select, env } = value);
        }
        const environmentOptions = Object.assign(Object.assign({}, (0, node_1.environmentOptionsFromContext)(ctx)), { override: env });
        // we temporarily use a ParsedValue literal so that we get the same property lookup semantics
        const selected = core_1.ParsedValue.literal(root).property(select.split('.'));
        if (selected === undefined) {
            throw new core_1.AppConfigError(`$extendsSelf selector was not found (${select})`);
        }
        if (selected.asObject() !== undefined) {
            return parse(selected.toJSON(), { shouldMerge: true }, undefined, undefined, {
                environmentOptions,
            });
        }
        return parse(selected.toJSON(), { shouldFlatten: true }, undefined, undefined, {
            environmentOptions,
        });
    }));
}
exports.extendsSelfDirective = extendsSelfDirective;
//# sourceMappingURL=extends-directive.js.map