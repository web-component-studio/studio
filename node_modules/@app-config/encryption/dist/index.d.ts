import type { ParsingExtension } from '@app-config/core';
import { DecryptedSymmetricKey } from './encryption';
export * from './encryption';
export * from './secret-agent';
export * from './secret-agent-tls';
/** Decrypts inline encrypted values */
export default function encryptedDirective(symmetricKey?: DecryptedSymmetricKey, shouldShowDeprecationNotice?: true): ParsingExtension;
