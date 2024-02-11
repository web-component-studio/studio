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
  background: var(--light, #fff) var(--dark, var(--studio-color-background));
  min-height: 100%;
}

.cm-focused {
  outline: none !important;
}

.cm-focused .cm-matchingBracket,
.cm-focused .cm-nonmatchingBracket {
  background: transparent !important;
}

.cm-tooltip {
  border: 0 !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

.studio-completion-option {
  padding: var(--studio-spacing-x-small) !important;
  background: var(--light, #fff) var(--dark, var(--studio-color-background));
  color: var(--studio-color-text-neutral) !important;
}

.studio-completion-option[aria-selected] {
  background: var(--studio-color-interactive-hover) !important;
  color: var(--studio-color-text-interactive) !important;
}

.cm-completionMatchedText {
  text-decoration: none !important;
}
`;
