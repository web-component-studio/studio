import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
// import framesPanelStyles from './frames-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-frames-panel': FramesPanel
  }
}

@customElement('studio-error')
export class FramesPanel extends LitElement {
  // static styles = [css`${unsafeCSS(framesPanelStyles)}`];

  @property() error: any;

  render() {
    console.log('error: ', this.error);
    return html`
      <div style="color: red;" class="frames-container">
        ${this.error.message}
      </div>
    `;
  }
}
