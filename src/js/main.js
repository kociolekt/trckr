/**
 * Created by tomekkociolek on 2015-12-18.
 */

import config from './modules/config';
import gui from './modules/nwgui';
import Trckr from './modules/trckr';

let trckr = new Trckr(config);

if(config.debug) {
  gui.Window.get().showDevTools(); // Run devtools
  window.trckr = trckr; // Globalize main app variable
}
