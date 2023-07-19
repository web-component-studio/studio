import { css } from 'lit';

export default css`
.snippet-panel-inner {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: 60px 1fr;
  background: #fff;
}

.snippet-list-container {
  overflow-y: scroll;
  height: 100%;
}

.snippet-list {
  margin: 0;
  padding: 0;
  list-style: none;
  padding: var(--studio-spacing-2x-small);
}

.snippet-filter {
  height: 100%;
  padding: var(--studio-spacing-2x-small);
  border-bottom: 1px solid var(--studio-color-gray-100);
}

input {
  appearance: none;
  height: 100%;
  width: 100%;
  border: 0;
  padding: 0 1rem;
  outline: none;
  font-size: 1.25rem;
}

.snippet-list button {
  cursor: pointer;
  background: none;
  width: 100%;
  appearance: none;
  border: 0;
  border-radius: 4px;
  text-align: left;
  padding: var(--studio-spacing-small);
}

.snippet-list button:hover {
  background: var(--studio-color-blue-100);
}

.snippet-name {
  color: var(--studio-color-text-neutral);
  font-size: 1.25rem;
  margin: 0 0 var(--studio-spacing-3x-small) 0;
  padding: 0;
  font-weight: var(--studio-font-weight-semibold);
}

.snippet-desc {
  color: var(--studio-color-text-subdued);
}
`;
