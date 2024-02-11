import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Store } from '../../store/store';
import sharedStyles from '../../assets/styles/shared.css';
import panelSharedStyles from '../../assets/styles/panel-shared.css';
import widthsPanelStyles from './widths-panel.css';

declare global {
  interface HTMLElementTagNameMap {
    'studio-widths-panel': StudioWidthsPanel
  }
}

@customElement('studio-widths-panel')
export class StudioWidthsPanel extends LitElement {
  static styles = [
    sharedStyles,
    panelSharedStyles,
    widthsPanelStyles
  ];

  handleWidthSelect(event: Event){
    event.stopImmediatePropagation();
    Store.toggleAvailableWidth(parseInt((event.currentTarget as HTMLInputElement).value));
  }


  render() {
    return html`
      <aside>
        <h2>Widths</h2>
        <ul>
          ${Store.allWidths.map((width) => {
            return html`<li>
              <input @change=${this.handleWidthSelect} id="${`width-${width}-select`}" type="checkbox" value=${width} ?checked=${Store.visibleWidths.includes(width)} />
              <label for="${`width-${width}-select`}">${width}</label>
            </li>`
          })}
        </ul>
      </aside>
    `;
  }
}
