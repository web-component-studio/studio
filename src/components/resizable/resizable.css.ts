import { css } from 'lit';

export default css`
:host {
  display: block;
  position: relative;
  resize: both;
  min-height: 25vh;
  max-height: 75vh;
  isolation: isolate;
}

.resize-area {
  position: absolute;
  width: 100%;
  height: 7px;
  top: -4px;
  cursor: row-resize;
}

.handle {
  z-index: 2;
  position: absolute;
  background: var(--light, white) var(--dark, var(--studio-color-background));
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 5%;
  height: 8px;
  border-radius: 9999px;
  border: 2px solid var(--studio-color-background-subdued);
}
`;
