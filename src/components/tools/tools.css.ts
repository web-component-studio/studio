import { css } from 'lit';

export default css`

:host {
  position: relative;
  isolation: isolate;
  z-index: 2;
  height: 100%;
  display: block;
}

.studio-tools-main {
  height: 100%;
}

.toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-inline-start: 2px solid var(--studio-color-gray-100);
  height: 100%;
  height: 100%;
  background: var(--light, #fff) var(--dark, var(--studio-color-background));
}

.toolbar button {
  display: grid;
  place-items: center;
  width: 100%;
  appearance: none;
  color: var(--studio-color-text-neutral);
  padding: var(--studio-spacing-medium);
  aspect-ratio: 1/1;
  appearance: none;
  border: 0;
  border-radius: 8px;
  background: none;
  cursor: pointer;
}

.toolbar button:hover {
  background: var(--studio-color-blue-200);
}

.tools-icon {
  width: clamp(24px, 60%, 32px);
  height: clamp(24px, 60%, 32px);
}

.tools-primary {
  color: var(--studio-color-text-neutral);
  flex:1;
  padding-top: .5rem;
}

.tools-secondary {
  padding-bottom: .5rem;
}

.tools-primary,
.tools-secondary {
  width: 80%;
}

.tools-panel {
  display: none;
  background: var(--light, #fff) var(--dark, var(--studio-color-background));
  position: absolute;
  border-left: 2px solid var(--studio-color-gray-100);
  z-index: 2;
  width: 300px;
  height: 100%;
  z-index: -1;
}

.tools-panel.open {
  display: block;
  animation: open .150s ease-in-out forwards;
}



@keyframes open {
  0% {
    left: 0;
  }
  100% {
    left: -301px;
  }
}
`;
