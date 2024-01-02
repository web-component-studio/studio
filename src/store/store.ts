import { compressParams, sortWidths } from '../utils';
import Observable from './observable';
import studioConfig from '../config/config';
import { bag } from './bag';
import { decompressFromEncodedURIComponent } from '../utils/lz-string';

import { EditorView } from 'codemirror';

type StudioState = {
  localStorageKey: string;
  code: string; // regular HTML string
  darkMode: string;
  allWidths: number[];
  visibleWidths: number[];
  cursorPos: number;
  paramType: string;
  editor?: EditorView;
}

class StudioStore extends Observable {

  #state: StudioState = {
    localStorageKey: 'wc-studio::app-data',
    cursorPos: 0,
    darkMode: studioConfig.initialMode || 'light',
    code: studioConfig.exampleCode || '<button>Im a button</button>',
    allWidths: studioConfig.widths || [320, 768, 1024],
    visibleWidths: studioConfig.widths || [320, 768, 1024],
    paramType: studioConfig.paramType || 'search'
  };

  constructor() {
    super();

    const urlEnv = new URLSearchParams(location[studioConfig.paramType]).get('env');

    const fromStorage = localStorage.getItem(this.#state.localStorageKey);

    // check code param first
    // check local storage
    if(urlEnv) {
      const {code, widths} = JSON.parse(decompressFromEncodedURIComponent(String(urlEnv)) ?? (studioConfig.exampleCode || '<button>Im a button</button>'));
      if(code) {
        // set code from param if present
        this.#state.code = code;
      } else {
        this.#state.code = studioConfig.exampleCode || '<button>Im a button</button>';
      }

      if(widths) {
        this.#state.visibleWidths = widths;
      }
    } else  if(fromStorage) {
      const {code, widths} = JSON.parse(decompressFromEncodedURIComponent(String(fromStorage)) ?? '');

      if(code) {
        // set code from param if present
        this.#state.code = code;
      } else {
        this.#state.code = studioConfig.exampleCode || '<button>Im a button</button>';
      }

    }
  }

  get editor(): EditorView | undefined {
    return this.#state.editor;
  }
  set editor(editorRef: EditorView | undefined){
    this.#state.editor = editorRef;
  }

  get code() {
    return this.#state.code;
  }
  set code(newCode: string) {
    this.#state.code = newCode;

    const compressed = compressParams({ code: newCode });

    // save to localStorage
    bag.store(compressed);

    // replace history
    history.pushState(null,'', `/?env=${compressed}`);

    // re-render all comps
    this.notify();
  }

  get allWidths() {
    return this.#state.allWidths;
  }

  get visibleWidths() {
    return this.#state.visibleWidths;
  }
  set visibleWidths(widthsArray){
    this.#state.visibleWidths = widthsArray;
    this.notify();
  }

  toggleAvailableWidth(incWidth: number) {
    if(this.#state.visibleWidths.includes(incWidth)) {
      // splice out width
      this.#state.visibleWidths = this.#state.visibleWidths.filter(width => width !== incWidth).sort(sortWidths);
    } else {
      this.#state.visibleWidths = [...this.#state.visibleWidths, incWidth].sort(sortWidths);
    }
    this.notify();
  }

  get paramType(){
    return this.#state.paramType;
  }

  get cursorPos() {
    return this.#state.cursorPos
  }
  set cursorPos(newPos) {
    this.#state.cursorPos = newPos;
  }

  get darkMode() {
    return this.#state.darkMode;
  }
  set darkMode(newMode: string) {
    this.#state.darkMode = newMode;
    console.log('STORE: ', this.#state.darkMode);
    this.notify();
  }

}

export const Store = new StudioStore();
