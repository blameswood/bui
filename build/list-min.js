/**
 * @fileOverview \u5217\u8868\u6a21\u5757\u5165\u53e3\u6587\u4ef6
 * @ignore
 */define("bui/list",function(require){var e=require("bui/common"),t=e.namespace("List");return e.mix(t,{List:require("bui/list/list"),ListItem:require("bui/list/listitem"),SimpleList:require("bui/list/simplelist"),Listbox:require("bui/list/listbox"),Picker:require("bui/list/listpicker")}),e.mix(t,{ListItemView:t.ListItem.View,SimpleListView:t.SimpleList.View}),t}),define("bui/list/simplelist",function(require){var e=BUI.Component.UIBase,t=require("bui/data"),n=BUI.prefix+"list-item",r=BUI.Component.View.extend([e.DomListView],{setElementHover:function(e,t){var n=this;n.setItemStatusCls("hover",e,t)}},{ATTRS:{itemContainer:{valueFn:function(){return this.get("el").children(this.get("listSelector"))}}}},{xclass:"simple-list-view"}),i=BUI.Component.Controller.extend([e.DomList,t.Bindable],{bindUI:function(){var e=this,t=e.get("itemCls"),n=t+"-hover",r=e.get("view").getItemContainer();r.delegate("."+t,"mouseover",function(t){var n=$(t.currentTarget);e.get("view").setElementHover(n,!0)}).delegate("."+t,"mouseout",function(t){var n=$(t.currentTarget);e.get("view").setElementHover(n,!1)})},onAdd:function(e){var t=this,n=e.record;t.addItemToView(n,e.index)},onRemove:function(e){var t=this,n=e.record;t.removeItem(n)},onUpdate:function(e){this.updateItem(e.record)},onLocalSort:function(e){this.onLoad(e)},onLoad:function(){var e=this,t=e.get("store"),n=t.getResult();e.set("items",n)}},{ATTRS:{items:{view:!0,value:[]},itemCls:{view:!0,value:n},idField:{value:"value"},listSelector:{view:!0,value:"ul"},itemTpl:{view:!0,value:'<li role="option" class="'+n+'">{text}</li>'},tpl:{value:"<ul></ul>"},xview:{value:r}}},{xclass:"simple-list",prority:0});return i.View=r,i}),define("bui/list/listbox",function(require){var e=require("bui/list/simplelist"),t=e.extend({bindUI:function(){var e=this;e.on("selectedchange",function(e){var t=e.item,n=$(e.domTarget),r=n.find("input");t&&r.attr("checked",e.selected)})}},{ATTRS:{itemTpl:{value:'<li><span class="checkbox"><input type="checkbox" />{text}</span></li>'},multipleSelect:{value:!0}}},{xclass:"listbox"});return t}),define("bui/list/listitem",function(e){var t=BUI.Component,n=t.UIBase,r=t.View.extend([n.ListItemView],{}),i=t.Controller.extend([n.ListItem],{},{ATTRS:{elTagName:{view:!0,value:"li"},xview:{value:r},tpl:{view:!0,value:"<span>{text}</span>"}}},{xclass:"list-item"});return i.View=r,i}),define("bui/list/list",function(require){var e=BUI.Component,t=e.UIBase,n=e.Controller.extend([t.ChildList],{},{ATTRS:{elTagName:{view:!0,value:"ul"},idField:{value:"id"},defaultChildClass:{value:"list-item"}}},{xclass:"list"});return n}),define("bui/list/listpicker",function(require){var e=require("bui/overlay").Picker,t=e.extend({initializer:function(){var e=this,t=e.get("children"),n=e.get("list");n||t.push({})},setSelectedValue:function(e){e=e?e.toString():"";var t=this,n=t.get("list"),r=t.getSelectedValue();e!==r&&(n.get("multipleSelect")&&n.clearSelection(),n.setSelectionByField(e.split(",")))},getSelectedValue:function(){return this.get("list").getSelectionValues().join(",")},getSelectedText:function(){return this.get("list").getSelectionText().join(",")}},{ATTRS:{defaultChildClass:{value:"simple-list"},list:{getter:function(){return this.get("children")[0]}}}},{xclass:"list-picker"});return t});
