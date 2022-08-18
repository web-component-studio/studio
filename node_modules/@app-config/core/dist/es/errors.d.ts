/** Any generic error that comes directly from this package */
export declare class AppConfigError extends Error {
}
/** An error that can be recovered using $try */
export declare class Fallbackable extends AppConfigError {
}
/** When a ConfigSource cannot be found */
export declare class NotFoundError extends Fallbackable {
    readonly filepath?: string | undefined;
    constructor(message?: string, filepath?: string | undefined);
    static isNotFoundError(err: Error | unknown, filepath?: string): err is NotFoundError;
}
export declare class EnvironmentVariableNotFoundError extends NotFoundError {
    readonly environmentVariable?: string | undefined;
    constructor(message?: string, environmentVariable?: string | undefined);
}
export declare class FallbackExhaustedError extends NotFoundError {
    readonly errors: NotFoundError[];
    constructor(message: string, errors: NotFoundError[]);
}
/** Could not parse a string from a config source */
export declare class ParsingError extends AppConfigError {
}
/** Unsupported file type or extension */
export declare class BadFileType extends AppConfigError {
}
/** Configuration was not an object, when it was expected to be */
export declare class WasNotObject extends AppConfigError {
}
/** Error during schema validation */
export declare class ValidationError extends AppConfigError {
}
/** For encrypting and decrypting secrets, stdin is required for prompts sometimes */
export declare class SecretsRequireTTYError extends AppConfigError {
}
/** No input was received for a prompt or reading from stdin */
export declare class EmptyStdinOrPromptResponse extends AppConfigError {
}
/** Encryption key was invalid in some way */
export declare class InvalidEncryptionKey extends AppConfigError {
}
/** An error in encoding or decoding (encryption logic) */
export declare class EncryptionEncoding extends AppConfigError {
}
/** Could not select a sub-object using a JSON pointer */
export declare class FailedToSelectSubObject extends AppConfigError {
}
/** Found a key starting with $ in config object */
export declare class ReservedKeyError extends AppConfigError {
}
