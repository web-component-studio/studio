import { ParsingExtension } from '@app-config/core';
/** Access to the git branch and commit ref */
export default function gitRefDirectives(getStatus?: typeof gitStatus, shouldShowDeprecationNotice?: true): ParsingExtension;
interface GitStatus {
    commitRef: string;
    branchName?: string;
    tag?: string;
}
declare function gitStatus(): Promise<GitStatus>;
export {};
