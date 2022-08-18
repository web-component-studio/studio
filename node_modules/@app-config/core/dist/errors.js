"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservedKeyError = exports.FailedToSelectSubObject = exports.EncryptionEncoding = exports.InvalidEncryptionKey = exports.EmptyStdinOrPromptResponse = exports.SecretsRequireTTYError = exports.ValidationError = exports.WasNotObject = exports.BadFileType = exports.ParsingError = exports.FallbackExhaustedError = exports.EnvironmentVariableNotFoundError = exports.NotFoundError = exports.Fallbackable = exports.AppConfigError = void 0;
/** Any generic error that comes directly from this package */
class AppConfigError extends Error {
}
exports.AppConfigError = AppConfigError;
/** An error that can be recovered using $try */
class Fallbackable extends AppConfigError {
}
exports.Fallbackable = Fallbackable;
/** When a ConfigSource cannot be found */
class NotFoundError extends Fallbackable {
    constructor(message, filepath) {
        super(message);
        this.filepath = filepath;
    }
    static isNotFoundError(err, filepath) {
        if (err instanceof NotFoundError) {
            if (filepath) {
                return err.filepath === filepath;
            }
            return true;
        }
        return false;
    }
}
exports.NotFoundError = NotFoundError;
class EnvironmentVariableNotFoundError extends NotFoundError {
    constructor(message, environmentVariable) {
        super(message);
        this.environmentVariable = environmentVariable;
    }
}
exports.EnvironmentVariableNotFoundError = EnvironmentVariableNotFoundError;
class FallbackExhaustedError extends NotFoundError {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
    }
}
exports.FallbackExhaustedError = FallbackExhaustedError;
/** Could not parse a string from a config source */
class ParsingError extends AppConfigError {
}
exports.ParsingError = ParsingError;
/** Unsupported file type or extension */
class BadFileType extends AppConfigError {
}
exports.BadFileType = BadFileType;
/** Configuration was not an object, when it was expected to be */
class WasNotObject extends AppConfigError {
}
exports.WasNotObject = WasNotObject;
/** Error during schema validation */
class ValidationError extends AppConfigError {
}
exports.ValidationError = ValidationError;
/** For encrypting and decrypting secrets, stdin is required for prompts sometimes */
class SecretsRequireTTYError extends AppConfigError {
}
exports.SecretsRequireTTYError = SecretsRequireTTYError;
/** No input was received for a prompt or reading from stdin */
class EmptyStdinOrPromptResponse extends AppConfigError {
}
exports.EmptyStdinOrPromptResponse = EmptyStdinOrPromptResponse;
/** Encryption key was invalid in some way */
class InvalidEncryptionKey extends AppConfigError {
}
exports.InvalidEncryptionKey = InvalidEncryptionKey;
/** An error in encoding or decoding (encryption logic) */
class EncryptionEncoding extends AppConfigError {
}
exports.EncryptionEncoding = EncryptionEncoding;
/** Could not select a sub-object using a JSON pointer */
class FailedToSelectSubObject extends AppConfigError {
}
exports.FailedToSelectSubObject = FailedToSelectSubObject;
/** Found a key starting with $ in config object */
class ReservedKeyError extends AppConfigError {
}
exports.ReservedKeyError = ReservedKeyError;
//# sourceMappingURL=errors.js.map