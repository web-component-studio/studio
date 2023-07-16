import { compressToEncodedURIComponent } from "./lz-string";

interface CompressParamsOptions {
  code?: string;
  // themes?: string[];
  widths?: number[];
  // theme?: string;
}

export function debounce(fn: (...args: any[]) => unknown, delay = 500): (...args: any[]) => unknown {
  let timeoutID: number;
  return function(...args: []){
    if(timeoutID) clearTimeout(timeoutID);
    timeoutID = window.setTimeout(()=>{
      fn(...args)
    }, delay);
  }
}

export const compressParams = ({ code, widths }:CompressParamsOptions) => {
  const data = JSON.stringify({
    ...(code ? { code } : {}),
    ...(widths ? { widths } : {}),
  });

  return compressToEncodedURIComponent(data);
};

export const sortWidths = (a:number, b:number):number => {
  return a-b;
}
