import { css } from 'lit';

export default css`
* {
  box-sizing: border-box;
}

:host {
  display: block;
  font-family: var(--studio-font-body);
  font-size: 1rem;
}

.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
`;
