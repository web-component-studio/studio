import { css } from 'lit';

export default css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--studio-space-gap, var(--studio-spacing-medium));
    justify-content: var(--studio-space-align-x, flex-start);
    align-content: var(--studio-space-align-y, flex-start);
  }
`;
