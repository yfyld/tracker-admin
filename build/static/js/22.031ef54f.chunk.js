(window["webpackJsonptracker-web"]=window["webpackJsonptracker-web"]||[]).push([[22],{1062:function(e,t,n){e.exports={wrapper:"ProjectList_wrapper__2sl33",header:"ProjectList_header__r8sC_",listBox:"ProjectList_listBox__2fHLw",table:"ProjectList_table__3LrQJ"}},1088:function(e,t,n){"use strict";n.r(t);var r=n(87),a=n(0),o=n(1062),c=n.n(o),l=n(68),i=n(1045),u=n(72),s=n(1042),m=n(508),f=n(1038),p=n(1044),b=n(10),d=n(8),j=n(65),O=n(6),E=Object(l.c)(null,(function(e){return Object(j.b)({handleAddProject:function(e){return O.d.request(e)}},e)}))(p.a.create()((function(e){var t=e.form.getFieldDecorator;a.useEffect((function(){e.form.resetFields()}),[e.visible]);return a.createElement(i.a,{onOk:function(t){t.preventDefault(),e.form.validateFields((function(t,n){t?Object(d.u)(t):(e.handleAddProject(n),e.onClose(!1))}))},title:"\u65b0\u5efa\u9879\u76ee",visible:e.visible,onCancel:function(){return e.onClose(!1)}},a.createElement(p.a,Object.assign({layout:"horizontal"},b.ab),a.createElement(p.a.Item,{label:"\u9879\u76ee\u540d\u79f0"},t("name",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0"}]})(a.createElement(s.a,{placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0"}))),a.createElement(p.a.Item,{label:"\u9879\u76ee\u5c01\u9762"},t("image",{})(a.createElement(s.a,{placeholder:"\u8bf7\u8f93\u5165\u5c01\u9762\u94fe\u63a5"}))),a.createElement(p.a.Item,{label:"\u9879\u76ee\u63cf\u8ff0"},t("description",{})(a.createElement(s.a,{placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u63cf\u8ff0"})))))}))),g=n(53);function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var y=p.a.create()((function(e){var t=e.form.getFieldDecorator;return a.createElement(p.a,Object.assign({onSubmit:function(t){t.preventDefault(),e.form.validateFields((function(t,n){t?Object(d.u)(t):e.onSubmit(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(n,!0).forEach((function(t){Object(g.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{page:1,pageSize:20}))}))},layout:"inline"},b.ab),a.createElement(p.a.Item,{label:"\u9879\u76ee\u540d\u79f0"},t("projectName",{initialValue:e.defaultValue.projectName})(a.createElement(s.a,{placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0"}))))}));function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var w=p.a.create()((function(e){var t=e.form.getFieldDecorator;a.useEffect((function(){e.form.resetFields()}),[e.visible]);return a.createElement(i.a,{onOk:function(t){t.preventDefault(),e.form.validateFields((function(t,n){t?Object(d.u)(t):(e.onSubmit(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(n,!0).forEach((function(t){Object(g.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({id:e.orginInfo.id},n)),e.onClose(!1))}))},title:"\u7f16\u8f91\u9879\u76ee",visible:e.visible,onCancel:function(){return e.onClose(!1)}},a.createElement(p.a,Object.assign({layout:"horizontal"},b.ab),a.createElement(p.a.Item,{label:"\u9879\u76ee\u540d\u79f0"},t("name",{initialValue:e.orginInfo.name,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0"}]})(a.createElement(s.a,{placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0"}))),a.createElement(p.a.Item,{label:"\u9879\u76ee\u5c01\u9762"},t("image",{initialValue:e.orginInfo.image})(a.createElement(s.a,{placeholder:"\u8bf7\u8f93\u5165\u5c01\u9762\u94fe\u63a5"}))),a.createElement(p.a.Item,{label:"\u9879\u76ee\u63cf\u8ff0"},t("description",{initialValue:e.orginInfo.description})(a.createElement(s.a,{placeholder:"\u8bf7\u8f93\u5165\u9879\u76ee\u63cf\u8ff0"})))))})),h=n(52),k=i.a.confirm;t.default=Object(l.c)((function(e){var t=e.project;return{projectList:t.projectList,projectListParams:t.projectListParams}}),(function(e){return Object(j.b)({onGetProjectList:function(e){return O.K.request(e)},onDeleteProject:function(e){return O.p.request(e)},onUpdateProject:function(e){return O.fb.request(e)}},e)}))((function(e){var t=e.projectList,n=e.onGetProjectList,o=e.projectListParams,l=e.onDeleteProject,i=e.onUpdateProject,p=a.useState(!1),d=Object(r.a)(p,2),j=d[0],O=d[1],g=a.useState(!1),v=Object(r.a)(g,2),P=v[0],I=v[1],D=a.useState(null),C=Object(r.a)(D,2),S=C[0],L=C[1],_=a.useState(null),x=Object(r.a)(_,2),F=x[0],V=x[1];a.useEffect((function(){F&&N(F)}),[F]);var q=[{key:"name",title:"\u9879\u76ee\u540d\u79f0",dataIndex:"name",render:function(e,t){return a.createElement(h.b,{to:"".concat(b.W.analyseEvent,"?projectId=").concat(t.id)},e)}},{key:"log",title:"\u4ea7\u751f\u65e5\u5fd7",dataIndex:"log"},{key:"description",title:"\u5907\u6ce8",dataIndex:"description"},{title:"\u64cd\u4f5c",key:"action",width:180,render:function(e,t){return a.createElement("span",null,a.createElement(h.b,{to:"".concat(b.W.analyseEvent,"?projectId=").concat(t.id)},a.createElement(u.a,{type:"link",size:"small"},"\u67e5\u770b")),a.createElement(u.a,{type:"link",size:"small",onClick:function(){return z(t)}},"\u7f16\u8f91"),a.createElement(u.a,{type:"link",size:"small",onClick:function(){return V(t)}},"\u5220\u9664"))}}],z=function(e){L(e),I(!0)},N=function(e){var t="";k({title:"\u8b66\u544a",content:a.createElement("div",null,a.createElement("p",null,"\u60a8\u786e\u5b9a\u8981\u5220\u9664\u8be5\u9879\u76ee\u5417?"),a.createElement("p",null,"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0",a.createElement(s.a,{defaultValue:t,onChange:function(e){return t=e.target.value}}))),okText:"\u5220\u9664",cancelText:"\u53d6\u6d88",onOk:function(){if(t!==F.name)return m.a.error("\u9879\u76ee\u540d\u79f0\u4e0d\u6b63\u786e,\u8bf7\u786e\u8ba4"),Promise.reject();l(F.id)},onCancel:function(){console.log("Cancel")}})};return console.log("------"),console.log(t),a.createElement("div",{className:c.a.wrapper},S&&a.createElement(w,{orginInfo:S,visible:P,onClose:I,onSubmit:i}),a.createElement(E,{visible:j,onClose:O}),a.createElement("div",{className:c.a.header},a.createElement(y,{defaultValue:o,onSubmit:n}),a.createElement(u.a,{type:"primary",onClick:function(){return O(!0)}},"\u65b0\u5efa\u9879\u76ee")),a.createElement("div",{className:c.a.table},a.createElement(f.a,{rowKey:"id",columns:q,dataSource:t.list})))}))}}]);
//# sourceMappingURL=22.031ef54f.chunk.js.map