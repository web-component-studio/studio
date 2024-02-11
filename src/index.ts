import studioConfig from './config/config';
import { Store } from './store/store';

import './components/code-editor/code-editor';
import './components/tools/tools';
import './components/frames-panel/frames-panel';
import './components/resizable/resizable';

// icons
import './components/icons/snippet-icon';
import './components/icons/widths-icon';
import './components/icons/preview-icon';
import './components/icons/share-icon';
import './components/icons/settings-icon';
import './components/icons/light-mode-icon';
import './components/icons/dark-mode-icon';
import './components/icons/system-mode-icon';

// panels
import './components/preview-panel/preview-panel';
import './components/settings-panel/settings-panel';
import './components/widths-panel/widths-panel';
import './components/snippets-panel/snippets-panel';

// layout
import './components/stack/stack';

// dynamic import for chunking
import('./components');

// only set an initial if its not set to 'system'
// system mode won't set any theme attribute for the studio app itself
if(Store.darkMode !== 'system') {
  document.documentElement.dataset.theme = Store.darkMode;
}

