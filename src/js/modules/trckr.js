import template from '../../templates/layout.html';
import $ from 'jquery';

export default class Trckr {
  constructor (options) {
    this.settings = {};

    Object.assign(this.settings, options);

    this.init();
  }

  init() {
    $(document).ready(function() {
      console.log(2);
    });
  }
}
