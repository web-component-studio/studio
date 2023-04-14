import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import { Store } from '../../store/store';
import sharedStyles from '../../assets/styles/shared.css?inline';
import widthsPanelStyles from './widths-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-widths-panel': StudioWidthsPanel
  }
}

@customElement('studio-widths-panel')
export class StudioWidthsPanel extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`,
    css`${unsafeCSS(widthsPanelStyles)}`
  ];

  handleWidthSelect(event: Event){
    event.stopImmediatePropagation();
    Store.toggleAvailableWidth(parseInt((event.currentTarget as HTMLInputElement).value));
  }


  render() {
    return html`
      <div>
        <h3>widths</h3>
        <ul>
          ${Store.allWidths.map((width) => {
            return html`<li>
              <input @change=${this.handleWidthSelect} id="${`width-${width}-select`}" type="checkbox" value=${width} checked/>
              <label for="${`width-${width}-select`}">${width}px</label>
            </li>`
          })}
        </ul>
      </div>
    `;
  }
}
