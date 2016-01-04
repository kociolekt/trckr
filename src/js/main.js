/**
 * Created by tomekkociolek on 2015-12-18.
 */

import config from './modules/config';
import gui from './modules/nwgui';
import Trckr from './modules/trckr';

let main = new Trckr(config);

if(config.debug) {
  gui.Window.get().showDevTools(); // Run devtools
  window.main = main; // Globalize main app variable
}




