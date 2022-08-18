import type { PromptObject } from 'prompts';
export declare function promptUser<T>(options: Omit<PromptObject, 'name'>): Promise<T>;
export declare function promptUserWithRetry<T>(options: Omit<PromptObject, 'name'>, tryAnswer: (answer: T) => Promise<boolean | Error>, retries?: number): Promise<void>;
export declare function consumeStdin(): Promise<string>;
