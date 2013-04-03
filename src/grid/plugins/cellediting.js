/**
 * @fileOverview 表格单元格编辑
 * @ignore
 */

define('bui/grid/plugins/cellediting',function (require) {
  var Editing = require('bui/grid/plugins/editing'),
    CLS_BODY = BUI.prefix + 'grid-body';

  /**
   * @class BUI.Grid.Plugins.CellEditing
   * @extends BUI.Grid.Plugins.Editing
   * 单元格编辑插件
   */
  var CellEditing = function(config){
    CellEditing.superclass.constructor.call(this, config);
  };

  CellEditing.ATTRS = {
    
  };

  BUI.extend(CellEditing,Editing);

  BUI.augment(CellEditing,{
    /**
     * @protected
     * 获取编辑器的配置项
     * @param  {Array} fields 字段配置
     */ 
    getEditorCfgs : function(fields){
      var _self = this,
        grid = _self.get('grid'),
        bodyNode = grid.get('el').find('.' + CLS_BODY),
        rst = [];
      BUI.each(fields,function(field){
         rst.push({field : field,changeSourceEvent : null,hideExceptNode : bodyNode,autoUpdate : false,preventHide : false});
      });

      return rst;
    },
    /**
     * 获取编辑器
     * @protected
     * @param  {String} field 字段值
     * @return {BUI.Editor.Editor}  编辑器
     */
    getEditor : function(field){
      var  _self = this,
        editors = _self.get('editors'),
        editor = null;

      BUI.each(editors,function(item){
        if(item.get('field').get('name') === field){
          editor = item;
          return false;
        }
      });
      return editor;
    },
    /**
     * 显示编辑器前
     * @protected
     * @param  {BUI.Editor.Editor} editor 
     * @param  {Object} options
     */
    beforeShowEditor : function(editor,options){
      var _self = this,
        cell = $(options.cell);
      _self.resetWidth(editor,cell.outerWidth());
    },
    resetWidth : function(editor,width){
      editor.set('width',width);
    },
    /**
     * 更新数据
     * @protected
     * @param  {Object} record 编辑的数据
     * @param  {*} value  编辑值
     */
    updateRecord : function(store,record,editor){
      var _self = this,
          value = editor.getValue(),
          fieldName = editor.get('field').get('name'),
          preValue = record[fieldName];
        value = BUI.isDate(value) ? value.getTime() : value;
        if(preValue !== value){
          store.setValue(record,fieldName,value);
        }
    },
    /**
     * @protected
     * 获取对齐的节点
     * @override
     * @param  {Object} options 点击单元格的事件对象
     * @return {jQuery} 
     */
    getAlignNode : function(options){
      return $(options.cell);
    },
    /**
     * 获取编辑的字段
     * @protected
     * @return {Array}  字段集合
     */
    getFields : function(){
      var rst = [],
        _self = this,
        editors = _self.get('editors');
      BUI.each(editors,function(editor){
        rst.push(editor.get('field'));
      });
      return rst;
    },
    /**
     * @protected
     * 获取要编辑的值
     * @param  {Object} options 点击单元格的事件对象
     * @return {*}   编辑的值
     */
    getEditValue : function(options){
      if(options.record && options.field){
        var value = options.record[options.field];
        return value == null ? '' : value;
      }
      return '';
    }
  });

  return CellEditing;
});