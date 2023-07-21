import { css } from 'lit';

export default css`
:host {
  display: block;
  padding: var(--studio-spacing-medium);
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

.preview-link {
  cursor: pointer;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: var(--studio-spacing-small);
  padding: var(--studio-spacing-x-small) var(--studio-spacing-small);
  border: 1px solid var(--studio-color-text-neutral);
  color: var(--studio-color-text-neutral);
  border-radius: 4px;
  line-height: 1;
  text-decoration: none;
}

.preview-link:hover {
  border: 1px solid var(--studio-color-text-interactive);
  color: var(--studio-color-text-interactive);
}

.preview-link preview-icon {
  width: 24px;
  aspect-ratio: 1 / 1;
}

.copy-preview-button {
  cursor: pointer;
  font-size: 1rem;
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  color: var(--studio-color-text-interactive);
}

.copy-preview-button:hover {
  text-decoration: underline;
}
`;
