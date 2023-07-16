import { LitElement, html} from 'lit';
import { customElement, property } from 'lit/decorators.js';

declare global {
  interface HTMLElementTagNameMap {
    // @ts-ignore
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
