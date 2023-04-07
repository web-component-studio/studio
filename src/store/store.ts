import { compressParams } from '../utils';
import Observable from './observable';
import studioConfig from '../config/config';
import { bag } from './bag';
import lzString from 'lz-string';

type StudioState = {
  localStorageKey: string;
  code: string; // regular HTML string
  widths: string[];
  cursorPos?: number;
}

class StudioStore extends Observable {

  #state: StudioState = {
    localStorageKey: 'wc-studio::app-data',
    cursorPos: 0
  };

  constructor() {
    super();
    const fromStorage = localStorage.getItem(this.#state.localStorageKey);

    if(fromStorage) {
      const decompressed = JSON.parse(lzString.decompressFromEncodedURIComponent(String(fromStorage)) ?? '');

      this.#state.widths = decompressed.widths;
      this.#state.code = decompressed.code;
    } else {
      this.#state.widths = studioConfig.widths || [320, 768, 1024];
      this.#state.code = studioConfig.exampleCode || '<button>Im a button</button>';
    }

    this.#state.paramType = studioConfig.paramType || 'search';
  }

  get code() {
    return this.#state.code;
  }
  set code(newCode: string) {
    this.#state.code = newCode;

    const compressed = compressParams({code: newCode, widths: this.#state.widths});

    // save to localStorage
    bag.store(compressed);

    // replace history
    history.pushState(null,'', `/?code=${compressed}`);

    // re-render all comps
    this.notify();
  }

  get widths(){
    return this.#state.widths;
  }
  set widths(widthsArray){
    this.#state.widths = widthsArray;

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

}

export const Store = new StudioStore();
