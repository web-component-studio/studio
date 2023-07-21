import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import stackStyles from './stack.css';

declare global {
  interface HTMLElementTagNameMap {
    'studio-stack': StudioStack
  }
}

@customElement('studio-stack')
export class StudioStack extends LitElement {
  static styles = [stackStyles];

  render() {
    return html`<slot></slot>`;
  }
}
