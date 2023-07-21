import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import resizableStyles from './resizable.css';


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

  handleTopMouseDown(e) {
    const startY = e.clientY;
    const startHeight = this.offsetHeight;
    const startTop = this.offsetTop;

    const handleMouseMove = (e) => {
      const newHeight = startHeight + startY - e.clientY;
      const newTop = startTop - startY + e.clientY;

      this.style.height = `${newHeight}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }


}




