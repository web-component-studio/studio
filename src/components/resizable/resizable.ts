import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import resizableStyles from './resizable.css';
import { vh } from '../../utils/index.js';

@customElement('resizable-element')
class ResizableElement extends LitElement {
  static styles = [ resizableStyles ];

  render() {
    return html`
      <div class="resize-area" @mousedown=${this.handleTopMouseDown}>
        <div class="handle"></div>
      </div>
      <slot></slot>
    `;
  }

  handleTopMouseDown(e: MouseEvent) {
    // only left clicks should resize
    if(e.button != 0) {
      return;
    }

    const startY = e.clientY;
    const startHeight = this.offsetHeight;

    const handleMouseMove = (e) => {
      const newHeight = startHeight + startY - e.clientY;

      this.style.height = `${newHeight < vh(33) ? vh(33) : newHeight}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

}




