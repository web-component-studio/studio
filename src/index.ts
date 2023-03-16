import localforage from 'localforage';
import studioConfig from './config/config';
import './store';
import './components/code-editor/code-editor';
import './components/frames-panel/frames-panel';

// dynamic import for chunking
import('./components');

// create
const localStorage = localforage.createInstance({
  name: studioConfig.localStorageKey,
  version: 1,
});


