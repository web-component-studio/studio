import studioConfig from './config/config';
import create from 'zustand/vanilla';

const { getState, setState, subscribe, destroy } = create(() => ({
  code: {}
}));

export { getState, setState, subscribe, destroy };
