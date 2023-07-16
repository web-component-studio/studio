interface CompressParamsOptions {
    code?: string;
    widths?: number[];
}
export declare function debounce(fn: (...args: any[]) => unknown, delay?: number): (...args: any[]) => unknown;
export declare const compressParams: ({ code, widths }: CompressParamsOptions) => string;
export declare const sortWidths: (a: number, b: number) => number;
export {};
