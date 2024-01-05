import { css } from 'lit';

export default css`
:host {
  font-family: var(--studio-font-family);
  display: flex;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
}

.frames-container {
  padding: var(--studio-spacing-3x-large);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: var(--studio-spacing-3x-large);
  min-width: calc(100vw - 96px);
}

.centered {
  justify-content: center;
}

.frame {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--studio-color-text-subdued);
}

/* only apply padding to the last item if not in a centered layout */
:not(.centered) .frame:last-child {
  padding-inline-end: var(--studio-spacing-3x-large);
}

.frame .frame-width {
  color: var(--studio-color-text-subdued);
  transition: color .200s ease-in-out, text-shadow .200s ease-in-out;
}

.frame:hover .frame-width {
  font-weight: 500;
  color: var(--studio-color-text-neutral);
  text-shadow: 0 1px 0 currentColor;
}

iframe {
  box-shadow: 0px 1px 4px 0px #1E1D2614, 0px 4px 32px 0px #1E1D261A;
  border: 0;
  border-radius: var(--studio-frame-border-radius);
  height: 100%;
  animation: fadeIn ease-in 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  background: var(--studio-color-background-subdued);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;
