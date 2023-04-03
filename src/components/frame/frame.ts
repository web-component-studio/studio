import { html, render } from 'lit-html';
import studioConfig from '../../config/config';
import lzString from 'lz-string';

const urlParams = new URLSearchParams(location[studioConfig.paramType]);
const frameCode = urlParams.get('code');

console.log('Updating')

let parsedCode: string = '';
if(frameCode) {
  ({ code: parsedCode } = JSON.parse(lzString.decompressFromEncodedURIComponent(String(frameCode)) ?? ''));
}

const makeTemplate = (t: string) => {
  const f = new Function('data', 'html', `return ${t}`);
  return (data?: any) => f(data, html);
}

// Define a template
const frameCodeTemplate = makeTemplate('html`' + parsedCode + '`');

// Render the template to the document
render(frameCodeTemplate(), document.querySelector('studio-frame') as HTMLElement);
