import { LitElement, html} from 'lit';
import { customElement, property } from 'lit/decorators.js';

declare global {
  interface HTMLElementTagNameMap {
    'studio-error': StudioError
  }
}

@customElement('studio-error')
export class StudioError extends LitElement {

  @property() error: any;

  render() {
    return html`
      <div style="color: red;" class="frames-container">
        ${this.error.message}
      </div>
    `;
  }
}
