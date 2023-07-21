import { css } from 'lit';

export default css`
:host {
  font-family: var(--studio-font-family);
  display: flex;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
}

#code-mirror-parent {
  width: 100%;
  min-height: 100%;
}

.cm-editor {
  background: #fff;
  min-height: 100%;
}
`;