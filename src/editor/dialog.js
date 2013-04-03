/**
 * @fileOverview 使用弹出框作为编辑器
 * @ignore
 */

define('bui/editor/dialog',function (require) {
  var Dialog = require('bui/overlay').Dialog,
    Mixin = require('bui/editor/mixin');

   /**
   * @class BUI.Editor.DialogEditor
   * @extends BUI.Overlay.Dialog
   * @mixins BUI.Editor.Mixin
   * 编辑器
   */
  var editor = Dialog.extend([Mixin],{
    /**
     * @protected
     * @override
     * 获取编辑的源数据
     * @return {String} 返回需要编辑的文本
     */
    getSourceValue : function(){
      return this.get('record');
    },
    /**
     * @protected
     * 更新文本
     * @param  {Object} value 编辑器的值
     */
    updateSource : function(value){
      var _self = this,
        record = _self.get('record');
      BUI.mix(record,value);
    },
    _uiSetRecord : function(v){
      this.setValue(v);
    }
  },{
    ATTRS : {
      /**
       * 内部控件的代表Value的字段
       * @protected
       * @override
       * @type {String}
       */
      innerValueField : {
        value : 'record'
      },
      /**
       * 接受更改的事件
       * @type {String}
       */
      acceptEvent : {
        value : ''
      },
      /**
       * 编辑的记录
       * @type {Object}
       */
      record : {
        value : {}
      },
      /**
       * 空值的数据，清空编辑器时使用
       * @protected
       * @type {*}
       */
      emptyValue : {
        value : {}
      },
      /**
       * 内部控件配置项的字段
       * @protected
       * @type {String}
       */
      controlCfgField : {
        value : 'form'
      },
      /**
       * dialog 编辑器一般由按钮触发，在触发时设置数据源
       * @override
       * @type {String}
       */
      changeSourceEvent : {
        value : ''
      },
      /**
       * 默认的字段域配置项
       * @type {Object}
       */
      defaultChildCfg : {
        value : {
          xclass : 'form-horizontal'
        }
      },
      success : {
        value : function () {
          this.accept();
        }
      },
      /**
       * 编辑器内表单的配置项
       * @type {Object}
       */
      form : {
        value : {}
      }
    }
  },{
    xclass : 'dialog-editor'
  });

  return editor;
});