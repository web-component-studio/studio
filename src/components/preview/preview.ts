import { html, render } from 'lit-html';
import studioConfig from '../../config/config';
import lzString from 'lz-string';
import './preview.css?inline';
import '../error/error';

const makeTemplate = (t: string) => {
  const f = new Function('data', 'html', `return ${t}`);
  return (data?: any) => f(data, html);
}
console.log('PREVIEW');


try {
  const frameCode = new URLSearchParams(location[studioConfig.paramType]).get('env');
  let parsedCode: string = '';
  if(frameCode) {
    ({ code: parsedCode } = JSON.parse(lzString.decompressFromEncodedURIComponent(String(frameCode)) ?? ''));
  }
  // define the template
  // Render the template to the document
  const frameCodeTemplate = makeTemplate('html`' + parsedCode + '`');
  render(frameCodeTemplate(), document.body);

} catch(e) {
  render(html`<studio-error .error="${e}"></studio-error>`, document.querySelector('studio-frame') as HTMLElement);
}
