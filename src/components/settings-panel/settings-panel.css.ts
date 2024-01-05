import { css } from 'lit';

export default css`
:host {
  display: block;
  padding: var(--studio-spacing-medium);
  color: var(--studio-color-text-neutral);
}

h2 {
  margin: 0 0 var(--studio-spacing-small) 0;
  font-size: 1rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.theme-setting {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--studio-spacing-2x-small);
}

.theme-setting button {
  color: var(--studio-color-text-neutral);
  cursor: pointer;
  border: 0;
  appearance: none;
  background: none;
  border-radius: 4px;
  padding: var(--studio-spacing-x-small);
  display: grid;
  place-items: center;
}

.theme-setting button.enabled,
.theme-setting button:not(.enabled):hover {
  background: var(--studio-color-interactive-hover);
}

.theme-setting button * {
  width: 24px;
  height: 24px;
}
`;
