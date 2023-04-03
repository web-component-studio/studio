import localforage from 'localforage';
import studioConfig from './config/config';
import './components/code-editor/code-editor';
import './components/tools/tools';
import './components/frames-panel/frames-panel';

// dynamic import for chunking
import('./components');

// create
const localStorage = localforage.createInstance({
  name: studioConfig.localStorageKey,
  version: 1,
});


