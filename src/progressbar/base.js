/**
 * @fileOverview 进度条命名空间入口
 * @ignore
 */

define('bui/progressbar',function (require) {
  var BUI = require('bui/common'),
    ProgressBar = BUI.namespace('ProgressBar');
  BUI.mix(ProgressBar,{
    Base : require('bui/progressbar/base'),
    Load : require('bui/progressbar/load')
  });

  return ProgressBar;
});