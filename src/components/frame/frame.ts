import { html, render } from 'lit-html';
import studioConfig from '../../config/config';
import { Store } from '../../store/store';
import { decompressFromEncodedURIComponent } from '../../utils/lz-string';
import './frame.css';
import '../error/error';

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
    console.log('FRAME.TS: ', mode);
    studioConfig.darkModeCallback(mode);
  }
  // only try to render if parsedCode actually has content
  if(parsedCode) {
    // define the template
    // Render the template to the document
    const frameCodeTemplate = makeTemplate('html`' + parsedCode + '`');
    render(frameCodeTemplate(), document.querySelector('studio-frame') as HTMLElement);
  }

} catch(e) {
  render(html`<studio-error .error="${e}"></studio-error>`, document.querySelector('studio-frame') as HTMLElement);
}
