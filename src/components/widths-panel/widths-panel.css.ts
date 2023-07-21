import { css } from 'lit';

export default css`
:host {
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

li {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--studio-spacing-medium);
  align-items: center;
}

[type="checkbox"] {
  accent-color: var(--studio-color-blue-500);
  width: 24px;
  aspect-ratio: 1/1;
  border-radius: 8px;
}
`;
