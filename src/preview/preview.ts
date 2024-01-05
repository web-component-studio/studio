import { html, render } from 'lit-html';
import studioConfig from '../config/config';
import { decompressFromEncodedURIComponent } from '../utils/lz-string';
import './preview.css';
import '../components/error/error';

console.log('PREVIEW')

const makeTemplate = (t: string) => {
  const f = new Function('data', 'html', `return ${t}`);
  return (data?: any) => f(data, html);
}

try {
  const frameCode = new URLSearchParams(location[studioConfig.paramType]).get('env');
  let parsedCode: string = '';
  let mode: string = '';
  if(frameCode) {
    ({ code: parsedCode, mode } = JSON.parse(decompressFromEncodedURIComponent(String(frameCode)) ?? ''));
  }

  // call darkModeCallback if defined
  if(typeof studioConfig.darkModeCallback === 'function') {
    studioConfig.darkModeCallback(mode);
  }

  // define the template
  // Render the template to the document
  const frameCodeTemplate = makeTemplate('html`' + parsedCode + '`');
  render(frameCodeTemplate(), document.body);

} catch(e) {
  render(html`<studio-error .error="${e}"></studio-error>`, document.querySelector('studio-frame') as HTMLElement);
}
