import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import studioConfig from '../../config/config';
import { subscribe } from '../../store';
import { compressParams } from '../../utils';

import framesPanelStyles from './frames-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-frames-panel': FramesPanel
  }
}

@customElement('studio-frames-panel')
export class FramesPanel extends LitElement {
  static styles = [css`${unsafeCSS(framesPanelStyles)}`];

  @state() params!: string;

  connectedCallback() {
    super.connectedCallback();
    // subscribe(({ code }) => {
    //   // @ts-ignore
    //   this.params = compressParams({ code });
    // });
  }

  render() {
    return html`
      <div class="frames-container">
        ${studioConfig.widths?.map((width) => {
          return html`
          <div class="frame">
            <iframe width="${width}" src="/frame.html?code=${compressParams({ code: '${[1,2,3].map((index) => { return html`<p>${index}</p>`;})}'})}"></iframe>
            <small>${width}px</small>
          </div>`
        })}
      </div>
    `;
  }
}
