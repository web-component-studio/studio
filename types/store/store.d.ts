import Observable from './observable';
import { EditorView } from 'codemirror';
declare class StudioStore extends Observable {
    #private;
    constructor();
    get editor(): EditorView | undefined;
    set editor(editorRef: EditorView | undefined);
    get code(): string;
    set code(newCode: string);
    get allWidths(): number[];
    get visibleWidths(): number[];
    set visibleWidths(widthsArray: number[]);
    toggleAvailableWidth(incWidth: number): void;
    get paramType(): string;
    get cursorPos(): number;
    set cursorPos(newPos: number);
}
export declare const Store: StudioStore;
export {};
