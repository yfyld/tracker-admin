(window["webpackJsonptracker-web"]=window["webpackJsonptracker-web"]||[]).push([[20],{1049:function(e,t,n){"use strict";function r(e,t,n,r,a,o,i){try{var l=e[o](i),c=l.value}catch(s){return void n(s)}l.done?t(c):Promise.resolve(c).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var i=e.apply(t,n);function l(e){r(i,a,o,l,c,"next",e)}function c(e){r(i,a,o,l,c,"throw",e)}l(void 0)}))}}n.d(t,"a",(function(){return a}))},1085:function(e,t,n){"use strict";var r=n(0),a=n(18),o=n(336),i=n(23),l=n(72),c=n(65),s=n(124),u=n(113);function m(e){return(m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},O=function(e){function t(e){var n,a,i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,i=b(t).call(this,e),(n=!i||"object"!==m(i)&&"function"!==typeof i?d(a):i).onConfirm=function(e){n.setVisible(!1,e);var t=n.props.onConfirm;t&&t.call(d(n),e)},n.onCancel=function(e){n.setVisible(!1,e);var t=n.props.onCancel;t&&t.call(d(n),e)},n.onVisibleChange=function(e){n.props.disabled||n.setVisible(e)},n.saveTooltip=function(e){n.tooltip=e},n.renderOverlay=function(e,t){var a=n.props,o=a.okButtonProps,i=a.cancelButtonProps,c=a.title,s=a.cancelText,u=a.okText,m=a.okType,p=a.icon;return r.createElement("div",null,r.createElement("div",{className:"".concat(e,"-inner-content")},r.createElement("div",{className:"".concat(e,"-message")},p,r.createElement("div",{className:"".concat(e,"-message-title")},c)),r.createElement("div",{className:"".concat(e,"-buttons")},r.createElement(l.a,f({onClick:n.onCancel,size:"small"},i),s||t.cancelText),r.createElement(l.a,f({onClick:n.onConfirm,type:m,size:"small"},o),u||t.okText))))},n.renderConfirm=function(e){var t=e.getPrefixCls,a=n.props,i=a.prefixCls,l=a.placement,u=y(a,["prefixCls","placement"]),m=t("popover",i),p=r.createElement(c.a,{componentName:"Popconfirm",defaultLocale:s.a.Popconfirm},(function(e){return n.renderOverlay(m,e)}));return r.createElement(o.a,f({},u,{prefixCls:m,placement:l,onVisibleChange:n.onVisibleChange,visible:n.state.visible,overlay:p,ref:n.saveTooltip}))},n.state={visible:e.visible},n}var n,a,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),n=t,i=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:"defaultVisible"in e?{visible:e.defaultVisible}:null}}],(a=[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e,t){var n=this.props;"visible"in n||this.setState({visible:e});var r=n.onVisibleChange;r&&r(e,t)}},{key:"render",value:function(){return r.createElement(u.a,null,this.renderConfirm)}}])&&p(n.prototype,a),i&&p(n,i),t}(r.Component);O.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:r.createElement(i.a,{type:"exclamation-circle",theme:"filled"}),disabled:!1},Object(a.polyfill)(O),t.a=O},1391:function(e,t,n){"use strict";n.r(t);var r=n(49),a=n(81),o=n(0),i=n(63),l=n(66),c=n(1048),s=n(72),u=n(1085),m=n(1047),f=n(1045),p=n(1041),b=n(5),d=n(9),v=n(7),y=Object(i.c)(null,(function(e){return Object(l.b)({handleAddUser:function(e){return b.hb.request(e)}},e)}))(m.a.create()((function(e){var t=e.form.getFieldDecorator;o.useEffect((function(){e.form.resetFields()}),[e.visible]);return o.createElement(c.a,{onOk:function(t){t.preventDefault(),e.form.validateFields((function(t,n){t?Object(v.v)(t):(e.handleAddUser(n),e.onClose(!1))}))},title:"\u65b0\u5efa\u7528\u6237",visible:e.visible,onCancel:function(){return e.onClose(!1)}},o.createElement(m.a,Object.assign({layout:"horizontal"},d.gb),o.createElement(m.a.Item,{label:"\u7528\u6237\u540d"},t("username",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}]})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}))),o.createElement(m.a.Item,{label:"\u6635\u79f0"},t("nickname",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6635\u79f0"}]})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u6635\u79f0"}))),o.createElement(m.a.Item,{label:"email"},t("email",{})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165Email"}))),o.createElement(m.a.Item,{label:"\u624b\u673a\u53f7"},t("mobile",{})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"}))),o.createElement(m.a.Item,{label:"\u5bc6\u7801"},t("password",{})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801"})))))}))),O=n(8),E=n.n(O),g=n(1049),h=n(175);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=Object(i.c)((function(e){return{allRoleList:e.role.allRoleList}}),(function(e){return Object(l.b)({onPutUserByAdmin:function(e){return b.fb.request(e)}},e)}))(m.a.create()((function(e){var t=e.form.getFieldDecorator;o.useEffect((function(){e.form.resetFields()}),[e.visible]);var n=e.allRoleList.list.filter((function(e){return 2===e.type})).map((function(e){return{label:e.name,value:e.id,disabled:!e.status,type:e.type}}));return o.createElement(c.a,{onOk:function(t){t.preventDefault(),e.form.validateFields(function(){var t=Object(g.a)(E.a.mark((function t(n,r){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=3;break}return Object(v.v)(n),t.abrupt("return");case 3:r.username=Object(v.w)(r.username),r.nickname=Object(v.w)(r.nickname),e.onPutUserByAdmin(P({},e.userInfo,{},r)),e.onClose(!1);case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}())},title:"\u7f16\u8f91\u7528\u6237",visible:e.visible,onCancel:function(){return e.onClose(!1)}},o.createElement(m.a,Object.assign({layout:"horizontal"},d.gb),o.createElement(m.a.Item,{label:"\u7528\u6237\u540d"},t("username",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"}],initialValue:e.userInfo.username})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d",disabled:!0}))),o.createElement(m.a.Item,{label:"\u6635\u79f0"},t("nickname",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6635\u79f0"}],initialValue:e.userInfo.nickname})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u6635\u79f0"}))),o.createElement(m.a.Item,{label:"Email"},t("email",{rules:[{message:"\u8bf7\u8f93\u5165Email"}],initialValue:e.userInfo.email})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u7528\u6237Email"}))),o.createElement(m.a.Item,{label:"\u624b\u673a\u53f7"},t("mobile",{rules:[{message:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"}],initialValue:e.userInfo.mobile})(o.createElement(f.a,{placeholder:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7"}))),o.createElement(m.a.Item,{label:"\u89d2\u8272"},t("roleIds",{rules:[{required:!0,message:"\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u89d2\u8272"}],initialValue:e.userInfo.roles.map((function(e){return e.id}))})(o.createElement(h.a.Group,{options:n})))))})));function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}c.a.confirm,t.default=Object(i.c)((function(e){var t=e.app;return{userInfo:t.userInfo,userList:t.userList,userListParams:t.userListParams}}),(function(e){return Object(l.b)({onGetUserList:function(e){return b.W.request(e)},onEditUser:function(e){return Object(b.A)(e)},onGetUserRoles:function(e){return b.X.request(e)},onDeleteUser:function(e){return b.w.request(e)}},e)}))(m.a.create()((function(e){var t=e.form.getFieldDecorator,n=o.useState(!1),i=Object(a.a)(n,2),l=i[0],c=i[1],b=o.useState(!1),d=Object(a.a)(b,2),O=(d[0],d[1],o.useState(null)),E=Object(a.a)(O,2),g=E[0],h=E[1],j=o.useState(!1),P=Object(a.a)(j,2),C=P[0],I=P[1],S=[{key:"username",title:"\u7528\u6237\u540d",dataIndex:"username"},{key:"nickname",title:"\u6635\u79f0",dataIndex:"nickname"},{key:"email",title:"Email",dataIndex:"email"},{key:"mobile",title:"\u624b\u673a\u53f7",dataIndex:"mobile"},{key:"role",title:"\u89d2\u8272",dataIndex:"roles",render:function(e,t){return o.createElement("div",null,t.roles.map((function(e){return e.name})).join(","))}},{title:"\u64cd\u4f5c",key:"action",width:200,render:function(t,n){return o.createElement("span",null,o.createElement(s.a,{type:"link",size:"small",onClick:function(){h(n),I(!0)}},"\u7f16\u8f91"),o.createElement(u.a,{title:"\u662f\u5426\u8981\u5220\u9664\u6b64\u884c\uff1f",onConfirm:function(){return e.onDeleteUser(n.id)}},o.createElement(s.a,{type:"link",size:"small"},"\u5220\u9664")))}}];return o.createElement("div",{className:"app-tablePage-wrapper"},o.createElement(y,{visible:l,onClose:c}),g&&o.createElement(w,{visible:C,userInfo:g,onClose:I}),o.createElement("div",{className:"app-tablePage-title"},"\u7528\u6237\u7ba1\u7406"),o.createElement("div",{className:"app-tablePage-form"},o.createElement("div",null,o.createElement(s.a,{size:"large",onClick:function(){return c(!0)}},"\u65b0\u5efa\u7528\u6237")),o.createElement("div",null,o.createElement(m.a,{layout:"inline",onSubmit:function(){e.form.validateFields((function(t,n){t?Object(v.v)(t):(n.username=Object(v.w)(n.username),e.onGetUserList(n))}))}},o.createElement(m.a.Item,{label:""},t("username",{initialValue:""})(o.createElement(f.a.Search,{size:"large",placeholder:"\u8bf7\u8f93\u5165\u89d2\u8272\u540d/\u89d2\u8272\u7801"})))))),o.createElement("div",{className:"app-tablePage-table"},o.createElement(p.a,{rowKey:"id",columns:S,dataSource:e.userList.list,pagination:{pageSize:e.userListParams.pageSize,total:e.userList.totalCount,current:e.userListParams.page},onChange:function(t){e.onGetUserList(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(n,!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.form.getFieldsValue(),{page:t.current,pageSize:t.pageSize}))}})))})))}}]);
//# sourceMappingURL=20.3df4dee5.chunk.js.map