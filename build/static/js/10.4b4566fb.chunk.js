(window["webpackJsonptracker-web"]=window["webpackJsonptracker-web"]||[]).push([[10],{1048:function(e,t,a){"use strict";var n=a(81),r=a(0),c=a(199),i=a(72),l=a(1040),o=a(1041),u=a(1191),s=a(23),d=a(1052),p=a.n(d),m=a(1190),f=a(10),v=c.a.Option;c.a.OptGroup;t.a=function(e){var t=e.fieldList,a=void 0===t?{list:f.s}:t,d=e.filterInfo,E=e.onChange,y=r.useState([]),O=Object(n.a)(y,2),g=O[0],h=O[1],N=function(e,t){var n=JSON.parse(JSON.stringify(d));n.filterValues[t].key=e,n.filterValues[t].type="equal",n.filterValues[t].value=[];var r=a.list.find((function(t){return t.value===e}));r&&h(r.recommend),E(n)},_=function(e,t){var a=JSON.parse(JSON.stringify(d));a.filterValues[t].type=e,a.filterValues[t].value="equal"===e||"notEqual"===e?[]:"between"===e?[null,null]:null,E(a)},b=function(e,t){var a=JSON.parse(JSON.stringify(d));a.filterValues[t].value=e,E(a)};return r.createElement("div",null,d.filterValues.length>0&&r.createElement("div",{className:p.a.wrapper},d.filterValues.length>1&&r.createElement("div",{className:p.a.type},r.createElement(i.a,{size:"small",onClick:function(){var e=JSON.parse(JSON.stringify(d));e.filterType="AND"===e.filterType?"OR":"AND",E(e)}},"AND"===d.filterType?"\u4e14":"\u6216"),r.createElement("div",{className:p.a.line})),r.createElement("div",{className:p.a.form},d.filterValues.map((function(e,t){return r.createElement(l.a,{gutter:16,key:e.id},r.createElement(o.a,{span:5},r.createElement(c.a,{value:e.key,onChange:function(e){return N(e,t)}},a.list.map((function(e){return r.createElement(v,{value:e.value,key:e.value},e.name)})))),r.createElement(o.a,{span:3},r.createElement(c.a,{value:e.type,onChange:function(e){return _(e,t)}},r.createElement(v,{value:"equal"},"\u7b49\u4e8e"),r.createElement(v,{value:"notEqual"},"\u4e0d\u7b49\u4e8e"),r.createElement(v,{value:"isSet"},"\u6709\u503c"),r.createElement(v,{value:"notSet"},"\u6ca1\u503c"),r.createElement(v,{value:"greater"},"\u5927\u4e8e"),r.createElement(v,{value:"less"},"\u5c0f\u4e8e"),r.createElement(v,{value:"between"},"\u533a\u95f4"),r.createElement(v,{value:"contain"},"\u5305\u542b"),r.createElement(v,{value:"notContain"},"\u4e0d\u5305\u542b"),r.createElement(v,{value:"isEmpty"},"\u4e3a\u7a7a"),r.createElement(v,{value:"isNotEmpty"},"\u4e0d\u4e3a\u7a7a"),r.createElement(v,{value:"rlike"},"\u6b63\u5219\u5339\u914d"),r.createElement(v,{value:"notrlike"},"\u6b63\u5219\u4e0d\u5339\u914d"))),"isEmpty"!==e.type&&"isNotEmpty"!==e.type&&"isSet"!==e.type&&"notSet"!==e.type&&"rlike"!==e.type&&"notrlike"!==e.type&&r.createElement(o.a,{span:8},"equal"===e.type||"notEqual"===e.type?r.createElement(c.a,{value:e.value,onChange:function(e){return b(e,t)},mode:"tags",style:{width:"100%"},tokenSeparators:[","]},g.map((function(e){return r.createElement(v,{key:e.value,value:e.value},e.text)}))):r.createElement(u.a,{value:e.value,dataSource:g,style:{width:"100%"},onChange:function(e){return b(e,t)}})),r.createElement(o.a,{span:1},r.createElement("div",{onClick:function(){return function(e){var t=JSON.parse(JSON.stringify(d));t.filterValues.splice(e,1),E(t)}(t)},className:"app-link "+p.a.close},r.createElement(s.a,{type:"minus-circle"}))))})))),r.createElement("a",{onClick:function(){var e=JSON.parse(JSON.stringify(d));e.filterValues.push({type:null,key:null,value:null,id:Object(m.a)()}),E(e)},className:p.a.add},r.createElement(s.a,{type:"plus-square"}),"\u6dfb\u52a0\u7b5b\u9009"))}},1050:function(e,t,a){e.exports={wrapper:"Indicator_wrapper__3B5qd",select:"Indicator_select__1kP-z",content:"Indicator_content__3-BaR",center:"Indicator_center__3Oax_",metadataBox:"Indicator_metadataBox__3wnAQ",active:"Indicator_active__1aD9o",filter:"Indicator_filter__lBazH"}},1051:function(e,t,a){"use strict";var n=a(48),r=a(81),c=a(0),i=a(199),l=a(1043),o=a(1040),u=a(1041),s=a(507),d=a(249),p=a(23),m=a(1050),f=a.n(m),v=a(68),E=a(65),y=a(1048),O=a(1190),g=a(5),h=a(10);function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function _(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b=i.a.Option,j=(i.a.OptGroup,l.a.Search);t.a=Object(v.c)((function(e){var t=e.metadata;return{activeMetadataList:t.activeMetadataList,activeMetadataListParams:t.activeMetadataListParams,tagList:t.tagList,fieldListMap:t.fieldListMap,projectInfo:e.project.projectInfo}}),(function(e){return Object(E.b)({onGetActiveMetadataList:function(e){return g.B.request(e)},onGetFieldList:function(e){return g.G.request(e)}},e)}))((function(e){var t=e.indicators,a=e.activeMetadataList,n=e.activeMetadataListParams,m=e.onChange,v=e.fieldListMap,E=e.hasType,g=e.addText,N=void 0===g?"+\u6dfb\u52a0\u6307\u6807":g,P=e.hasCustomName,S=void 0!==P&&P,k=e.type,C=void 0===k?null:k,w=e.tagList,D=e.onGetActiveMetadataList,I=e.onGetFieldList,J=e.projectInfo,A=c.useState(_({},n)),L=Object(r.a)(A,2),V=L[0],T=L[1];function q(e,a){var n=JSON.parse(JSON.stringify(t));n[a].metadataCode=e.code,n[a].metadataName=e.name,n[a].projectId=e.projectId,m(n,t[a]),I({projectId:e.projectId,metadataCode:e.code})}function x(e,a){var n=JSON.parse(JSON.stringify(t));n[a].filter=e,m(n)}function B(e,a){var n=JSON.parse(JSON.stringify(t));n[a].type=e,m(n)}function M(e){T(e),setTimeout((function(){D(e)}),300)}c.useEffect((function(){T(n)}),[n]);var G={name:"\u6240\u6709\u4e8b\u4ef6",code:"_ALL_METADATA"};return c.createElement("div",{className:f.a.wrapper},c.createElement("div",null,t.map((function(e,n){return c.createElement("div",{key:e.id},c.createElement(o.a,{className:f.a.item,gutter:10},c.createElement(u.a,{span:1},c.createElement("div",{className:f.a.center},c.createElement(s.a,{color:"gold"},n+1))),c.createElement(u.a,{span:3},c.createElement(d.a,{trigger:["click"],overlay:c.createElement("div",{className:f.a.content},c.createElement("div",{onClick:function(e){return e.stopPropagation()}},c.createElement(j,{placeholder:"\u641c\u7d22\u4e8b\u4ef6",value:V.name,onChange:function(e){return T(_({},V,{name:e.target.value}))},onSearch:function(e){return M(_({},V,{name:e}))},style:{width:120}}),"\xa0",c.createElement(i.a,{placeholder:"\u6839\u636e\u6807\u7b7e\u7b5b\u9009",style:{width:120},mode:"multiple",value:V.tags?V.tags.split(",").map((function(e){return Number(e)})):[],onChange:function(e){return M(_({},V,{tags:e.join(",")}))}},w.list.map((function(e){return c.createElement(b,{key:e.id,value:e.id},e.name)}))),"\xa0",c.createElement(i.a,{placeholder:"\u5173\u8054\u9879\u76ee",style:{width:160},mode:"multiple",value:V.projectIds?V.projectIds.split(",").map((function(e){return Number(e)})):[],onChange:function(e){return M(_({},V,{projectIds:e.join(",")}))}},J.associationProjects.map((function(e){return c.createElement(b,{key:e.id,value:e.id},e.name)})))),c.createElement("div",{className:f.a.metadataBox},J.associationProjects?c.createElement(c.Fragment,null,c.createElement("span",{onClick:function(){return q(_({},G),n)},className:G.code!==e.metadataCode||e.projectId?"":f.a.active,key:G.code},"\u6240\u6709\u4e8b\u4ef6"),!!J.associationProjects.length&&c.createElement("span",{onClick:function(){return q(_({},G,{name:J.name+"\u6240\u6709\u4e8b\u4ef6",projectId:J.id}),n)},className:G.code===e.metadataCode&&e.projectId===J.id?f.a.active:"",key:G.code+J.id},J.name,"\u6240\u6709\u4e8b\u4ef6"),J.associationProjects.map((function(t){return c.createElement("span",{onClick:function(){return q(_({},G,{name:t.name+"\u6240\u6709\u4e8b\u4ef6",projectId:t.id}),n)},className:G.code===e.metadataCode&&e.projectId===t.id?f.a.active:"",key:G.code+t.id},t.name,"\u6240\u6709\u4e8b\u4ef6")}))):c.createElement("span",{onClick:function(){return q(_({},G,{projectId:J.id}),n)},className:G.code===e.metadataCode?f.a.active:"",key:G.code+J.id},"\u6240\u6709\u4e8b\u4ef6"),a.list.filter((function(e){return!C||e.type===C})).map((function(t){return c.createElement("span",{onClick:function(){return q(t,n)},className:t.code===e.metadataCode?f.a.active:"",key:t.code},t.name)}))))},c.createElement(l.a,{value:e.metadataName,readOnly:!0,className:f.a.select}))),S&&c.createElement(u.a,{span:3},c.createElement(l.a,{defaultValue:e.customName,placeholder:"\u81ea\u5b9a\u4e49\u540d\u79f0",onBlur:function(e){return function(e,a){var n=JSON.parse(JSON.stringify(t));n[a].customName=e,m(n)}(e.target.value,n)}})),E&&c.createElement(c.Fragment,null,c.createElement(u.a,{span:1},c.createElement("div",{className:f.a.center},"\u7684")),c.createElement(u.a,{span:3},c.createElement(i.a,{onChange:function(e){return B(e,n)},value:e.type},c.createElement(b,{value:"PV"},"\u603b\u6b21\u6570"),c.createElement(b,{value:"UV"},"\u7528\u6237\u6570"),c.createElement(b,{value:"APV"},"\u4eba\u5747\u6b21\u6570"),c.createElement(b,{value:"DPV"},"\u65e5\u5747\u6b21\u6570"),c.createElement(b,{value:"DUV"},"\u65e5\u5747\u7528\u6237\u6570")))),t.length>1&&c.createElement(u.a,{span:1},c.createElement("div",{onClick:function(){return function(e){var a=JSON.parse(JSON.stringify(t));a.splice(e,1),m(a,t[e])}(n)},className:"app-link "+f.a.center},c.createElement(p.a,{type:"close"})))),c.createElement("div",{className:f.a.filter},c.createElement(y.a,{fieldList:v[e.metadataCode]||{list:h.s},filterInfo:e.filter,onChange:function(e){return x(e,n)}})))}))),c.createElement("a",{onClick:function(){var e=JSON.parse(JSON.stringify(t));e.push({metadataCode:"_ALL_METADATA",metadataName:"\u6240\u6709\u4e8b\u4ef6",projectId:null,type:"PV",id:Object(O.a)(),filter:{filterType:"AND",filterValues:[]}}),m(e)}},N))}))},1052:function(e,t,a){e.exports={wrapper:"Filter_wrapper__9rptJ",line:"Filter_line__eOPS4",type:"Filter_type__2GtXQ",form:"Filter_form__1lfK0",close:"Filter_close__1AZpi",add:"Filter_add__2YNj8"}},1053:function(e,t,a){e.exports={wrapper:"AnalyseHeader_wrapper__1r0g1",btns:"AnalyseHeader_btns__G6iwS",title:"AnalyseHeader_title__1X3LF",description:"AnalyseHeader_description__1fJOY"}},1055:function(e,t,a){"use strict";var n=a(336),r=a(48),c=a(81),i=a(0),l=a.n(i),o=a(1043),u=a(72),s=a(68),d=a(65),p=a(5),m=a(1053),f=a.n(m),v=a(510),E=a(1061),y=a(199),O=Object(s.c)((function(e){return{boardList:e.board.boardList}}),(function(e){return Object(d.b)({onAppendReportToBoard:function(e){return p.i.request(e)}},e)}))((function(e){var t=e.onAppendReportToBoard,a=e.boardList,n=e.reportInfo,r=e.children,l=i.useState([]),o=Object(c.a)(l,2),s=o[0],d=o[1];return i.createElement(E.a,{placement:"bottom",trigger:"click",onVisibleChange:function(e){return e&&d([])},content:i.createElement("div",null,i.createElement(y.a,{size:"small",onChange:function(e){return d(e)},value:s,style:{width:240},mode:"multiple"},a.list.map((function(e){var t=!!n.boards.find((function(t){return t.id===e.id}));return i.createElement(y.a.Option,{key:e.id,value:e.id,disabled:t},e.name)}))),"\xa0",i.createElement(u.a,{size:"small",onClick:function(){return e=n,void(s.length?t({reportId:e.id,boardIds:s,projectId:n.projectId}):v.a.info("\u8bf7\u9009\u62e9\u770b\u677f"));var e}},"\u786e\u5b9a")),title:"\u9009\u62e9\u770b\u677f"},r)}));function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}t.a=Object(s.c)((function(e){return{reportInfo:e.report.reportInfo}}),(function(e){return Object(d.b)({onAddReport:function(e){return p.f.request(e)},onUpdateReport:function(e){return p.lb.request(e)}},e)}))((function(e){var t=e.reportInfo,a=e.onUpdateReport,r=e.onAddReport,i=e.data,s=l.a.useState(t),d=Object(c.a)(s,2),p=d[0],m=d[1],v=l.a.useState([]),E=Object(c.a)(v,2);E[0],E[1];l.a.useEffect((function(){m(t)}),[t]);return l.a.createElement("div",{className:f.a.wrapper},l.a.createElement("h2",{className:f.a.title},l.a.createElement(o.a,{type:"text",onChange:function(e){return m(h({},p,{name:e.target.value}))},value:p.name})),l.a.createElement("div",{className:f.a.btns},l.a.createElement(u.a,{type:"link",icon:"save",onClick:function(){"undefined"!==typeof t.id?a(h({id:null},p,{data:i})):r(h({},p,{data:i}))}},"\u4fdd\u5b58"),p.id&&l.a.createElement(u.a,{type:"link",icon:"save",onClick:function(){p.id;var e=Object(n.a)(p,["id"]);r(h({},e,{data:i}))}},"\u53e6\u5b58\u4e3a"),p.id&&l.a.createElement(O,{reportInfo:p},l.a.createElement(u.a,{type:"link",icon:"plus-circle"},"\u6dfb\u52a0\u5230"))),l.a.createElement("div",{className:f.a.description},l.a.createElement(o.a,{onChange:function(e){return m(h({},p,{description:e.target.value}))},value:p.description})))}))},1135:function(e,t,a){e.exports={ruleTitle:"Analyse_ruleTitle__3EBvq",preview:"Analyse_preview__3BAIC",wrapper:"Analyse_wrapper__14KR4",ruleSection:"Analyse_ruleSection__3E7iy"}},1136:function(e,t,a){e.exports={wrapper:"PathData_wrapper__p7PRs",select:"PathData_select__CdiON",content:"PathData_content__1usJl",center:"PathData_center__bf1Ka",metadataBox:"PathData_metadataBox__SFkXm",active:"PathData_active__1ZvVM",pathString:"PathData_pathString__33FXG",filter:"PathData_filter__dCV3V",pageList:"PathData_pageList__3IJ0R",pageItem:"PathData_pageItem__2mtad",addPageBtn:"PathData_addPageBtn__3gfgq",pageClose:"PathData_pageClose__10U7Q",fatherPage:"PathData_fatherPage__NfKXP"}},1180:function(e,t,a){"use strict";a.r(t);var n=a(48),r=a(199),c=a(1178),i=a(1043),l=a(1040),o=a(1041),u=a(72),s=a(344),d=a(0),p=a.n(d),m=a(335),f=a(1135),v=a.n(f),E=a(1051);var y=a(81),O=a(1181),g=a(1136),h=a.n(g),N=a(507),_=a(1050),b=a.n(_),j=a(1048),P=a(1190),S=r.a.Option,k=(r.a.OptGroup,i.a.Search,function(e){var t=e.indicators,a=e.onChange,n=e.fieldList,c=e.addText,i=void 0===c?"+\u6dfb\u52a0\u5b50\u9875\u9762":c,s=e.pageData,p=e.parentInfo;function m(e,t){var n=JSON.parse(JSON.stringify(s));n.children[t].id=e,a(n)}function f(e,t){var n=JSON.parse(JSON.stringify(s));n.children[t].filter=e,a(n)}return d.createElement("div",{className:b.a.wrapper},d.createElement("div",null,s.children.map((function(e,c){return d.createElement("div",{key:e.key},d.createElement(l.a,{className:b.a.item,gutter:10},d.createElement(o.a,{span:1},d.createElement("div",{className:b.a.center},d.createElement(N.a,{color:"gold"},c+1))),d.createElement(o.a,{span:8},d.createElement(r.a,{value:e.id,placeholder:"\u9009\u62e9\u5b50\u9875\u9762",style:{width:"100%"},onChange:function(e){return m(e,c)}},t.filter((function(e){return e.id!==p.id})).map((function(e){return d.createElement(S,{key:e.id,value:e.id,disabled:!!s.children.find((function(t){return t.id===e.id}))},e.customName||e.metadataName)})))),d.createElement(o.a,{span:8},!e.filter.filterValues.find((function(e){return"referrerId"===e.key}))&&d.createElement(u.a,{onClick:function(){return function(e){var t=JSON.parse(JSON.stringify(s));t.children[e].filter.filterValues.push({key:"referrerId",type:"equal",value:[p.metadataCode],id:Object(P.a)()}),a(t)}(c)}},"\u5173\u8054referrer"),"\xa0",s.children.length>1&&d.createElement(u.a,{onClick:function(){return function(e){var t=JSON.parse(JSON.stringify(s));t.children.splice(e,1),a(t)}(c)}},"\u5220\u9664"))),d.createElement("div",{className:b.a.filter},d.createElement(j.a,{fieldList:n,filterInfo:e.filter,onChange:function(e){return f(e,c)}})))}))),d.createElement("a",{onClick:function(){var e=JSON.parse(JSON.stringify(s));e.children.push({id:null,key:Object(P.a)(),filter:{filterType:"AND",filterValues:"_ALL_METADATA"!==p.metadataCode?[{key:"referrerId",type:"equal",value:[p.metadataCode],id:Object(P.a)()}]:[]}}),a(e)}},i))}),C=a(10);function w(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function D(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?w(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):w(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var I=r.a.Option,J=function(e){var t=e.childPageData,a=e.indicators,n=e.onChange,c=e.fieldList,i=void 0===c?{list:C.s}:c,s=d.useState(!1),p=Object(y.a)(s,2),m=p[0],f=p[1],v=d.useState([]),E=Object(y.a)(v,2),g=(E[0],E[1],d.useState(null)),N=Object(y.a)(g,2),_=N[0],b=N[1],j=d.useState(null),S=Object(y.a)(j,2),w=S[0],J=S[1];function A(e,a){var r=JSON.parse(JSON.stringify(t));r[a]=e,n(r)}var L=a.reduce((function(e,t){return e[t.id]=t,e}),{});return d.createElement("div",{className:h.a.wrapper},d.createElement(O.a,{width:840,title:"\u7f16\u8f91\u4e0b\u6e38\u9875\u9762",placement:"right",closable:!1,onClose:function(){f(!1),A(D({},w,{children:w.children.filter((function(e){return e.id}))}),_)},visible:m},w&&d.createElement(k,{parentInfo:L[w.parentId],pageData:w,fieldList:i,addText:"+\u6dfb\u52a0\u5b50\u9875\u9762",indicators:a,onChange:J})),d.createElement("div",null,t.map((function(e,c){return d.createElement("div",{key:e.key},d.createElement(l.a,{className:h.a.item,gutter:10},d.createElement(o.a,{span:2},d.createElement("div",{className:h.a.center},"\u7236\u7ea7\u9875 ",c+1)),d.createElement(o.a,{span:6},d.createElement("div",{className:h.a.fatherPage},d.createElement(r.a,{value:e.parentId,onChange:function(t){return A(D({},e,{parentId:t,children:[]}),c)}},a.map((function(e){return d.createElement(I,{disabled:!!t.find((function(t){return t.parentId===e.id})),key:e.id,value:e.id},e.customName||e.metadataName)}))),d.createElement("strong",null,"\u4e0b\u6e38\u9875\u9762:"),d.createElement("span",{className:h.a.pathString},e.children.filter((function(e){return!!L[e.id]})).map((function(e){return L[e.id].customName||L[e.id].metadataName})).join(",")))),d.createElement(o.a,{span:4},e.parentId&&d.createElement(u.a,{size:"default",onClick:function(){return function(e){f(!0),J(t[e]),b(e)}(c)}},"\u7f16\u8f91\u4e0b\u6e38\u9875\u9762"),"\xa0",t.length>1&&d.createElement(u.a,{size:"small",onClick:function(){return function(e){var a=JSON.parse(JSON.stringify(t));a.splice(e,1),n(a)}(c)}},"\u5220\u9664"))))}))),d.createElement("a",{onClick:function(){var e=JSON.parse(JSON.stringify(t));e.push({parentId:null,key:Object(P.a)(),children:[]}),n(e)}},"\u6dfb\u52a0\u7236\u7ea7\u9875"))},A=a(1055),L=a(18),V=a(68),T=a(65),q=a(5),x=a(485);function B(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function M(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):B(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var G=r.a.Option,F=(c.a.Panel,i.a.Group);t.default=Object(V.c)((function(e){var t=e.project.projectInfo.id,a=e.analyse;return{projectId:t,pathAnalyseData:a.pathAnalyseData,pathAnalyseParam:a.pathAnalyseParam,analyseLoading:a.analyseLoading}}),(function(e){return Object(T.b)({onGetPathAnalyseData:function(e){return q.K.request(e)}},e)}))((function(e){var t=e.analyseLoading,a=e.onGetPathAnalyseData,n=e.projectId,c=e.pathAnalyseData,i=e.pathAnalyseParam,d=function(e,t){if(e.projectId=n,t)for(var r in e.childPageData=e.childPageData.filter((function(e){return e.parentId!==t.id})),e.childPageData)e.childPageData[r].children=e.childPageData[r].children.filter((function(e){return e.id!==t.id}));a(e)};return p.a.createElement("div",{className:v.a.wrapper},p.a.createElement(A.a,{data:M({},i,{projectId:n})}),p.a.createElement("div",{className:v.a.rule},p.a.createElement("div",{className:v.a.ruleSection},p.a.createElement("span",{className:v.a.ruleTitle},"\u6307\u6807:"),p.a.createElement(r.a,{style:{width:100},value:i.indicatorType,onChange:function(e){return d(M({},i,{indicatorType:e}))}},p.a.createElement(G,{value:"PV"},"\u603b\u6570"),p.a.createElement(G,{value:"UV"}," \u7528\u6237\u6570"),p.a.createElement(G,{value:"APV"},"\u4eba\u5747\u6b21\u6570"),p.a.createElement(G,{value:"DPV"},"\u65e5\u5747\u6b21\u6570"),p.a.createElement(G,{value:"DUV"},"\u65e5\u5747\u7528\u6237\u6570"))),p.a.createElement("div",{className:v.a.ruleSection},p.a.createElement("span",{className:v.a.ruleTitle},"\u7b5b\u9009:"),p.a.createElement(j.a,{filterInfo:i.filter,onChange:function(e){return d(M({},i,{filter:e}))}})),p.a.createElement("div",{className:v.a.ruleSection},p.a.createElement("span",{className:v.a.ruleTitle},"\u9875\u9762\u6c60:"),p.a.createElement(E.a,{addText:"+\u6dfb\u52a0\u9875\u9762",hasCustomName:!0,type:L.EMetadataType.page,indicators:i.indicators,onChange:function(e,t){return d(M({},i,{indicators:e}),t)}})),p.a.createElement("div",{className:v.a.ruleSection},p.a.createElement("span",{className:v.a.ruleTitle},"\u7236\u7ea7\u9875:"),p.a.createElement(J,{indicators:i.indicators,childPageData:i.childPageData,onChange:function(e){return d(M({},i,{childPageData:e}))}}))),p.a.createElement("div",{className:v.a.preview},p.a.createElement(l.a,null,p.a.createElement(o.a,{span:14},p.a.createElement(m.a,{onChange:function(e){return d(M({},i,{},e))},value:{dateType:i.dateType,dateEnd:i.dateEnd,dateStart:i.dateStart}})),p.a.createElement(o.a,{span:6,offset:4},p.a.createElement(F,{compact:!0},p.a.createElement(u.a,{icon:"download"},"\u5bfc\u51fa")))),p.a.createElement(s.a,{spinning:t},p.a.createElement("div",{style:{height:800}},p.a.createElement(x.a,{data:c}))),p.a.createElement("div",null)))}))}}]);
//# sourceMappingURL=10.4b4566fb.chunk.js.map