import { html, render } from 'lit-html';
import studioConfig from '../../config/config';
import { decompressFromEncodedURIComponent } from 'lz-string';
import './frame.css?inline';
import '../error/error';

const makeTemplate = (t: string) => {
  const f = new Function('data', 'html', `return ${t}`);
  return (data?: any) => f(data, html);
}

try {

  const frameCode = new URLSearchParams(location[studioConfig.paramType]).get('env');
  let parsedCode: string = '';
  if(frameCode) {
    ({ code: parsedCode } = JSON.parse(decompressFromEncodedURIComponent(String(frameCode)) ?? ''));
  }
  // define the template
  // Render the template to the document
  const frameCodeTemplate = makeTemplate('html`' + parsedCode + '`');
  render(frameCodeTemplate(), document.querySelector('studio-frame') as HTMLElement);

} catch(e) {
  render(html`<studio-error .error="${e}"></studio-error>`, document.querySelector('studio-frame') as HTMLElement);
}
