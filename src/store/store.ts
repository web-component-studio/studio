import { compressParams } from '../utils';
import Observable from './observable';
import studioConfig from '../config/config';
import { bag } from './bag';

type StudioState = {
  code: string;
  width: string[];
  cursorPos?: number;
}

class StudioStore extends Observable {

  #state: StudioState = {};

  constructor() {
    super();
    compressParams({code: this.#state.code, widths: studioConfig.widths})
    this.#state.widths = studioConfig.widths || [320, 768, 1024];
    this.#state.paramType = studioConfig.paramType || 'search';
    this.#state.code = compressParams({code: studioConfig.exampleCode || '<button>Im a button</button>', widths: studioConfig.widths});
  }

  get code() {
    return this.#state.code;
  }
  set code(newCode: string) {
    const compressed = compressParams({code: newCode, widths: this.#state.widths});
    this.#state.code = compressed;
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
  }

  get paramType(){
    return this.#state.paramType;
  }

}

export const Store = new StudioStore();
