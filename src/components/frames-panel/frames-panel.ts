import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import { Store } from '../../store/store';
import lzString from 'lz-string';
import framesPanelStyles from './frames-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-frames-panel': FramesPanel
  }
}

@customElement('studio-frames-panel')
export class FramesPanel extends LitElement {
  static styles = [css`${unsafeCSS(framesPanelStyles)}`];

  connectedCallback(){
    super.connectedCallback();
    Store.attach(this);
  }

  render() {
    const urlParams = new URLSearchParams(location[Store.paramType]);
    const frameCode = urlParams.get('code');

    return html`
      <div class="frames-container">
        ${Store.widths?.map((width) => {
          return html`
          <div class="frame">
            <iframe width="${width}" src="/frame.html?code=${frameCode}"></iframe>
            <small class="frame-width">${width}px</small>
          </div>`
        })}
      </div>
    `;
  }
}
