(window["webpackJsonptracker-web"]=window["webpackJsonptracker-web"]||[]).push([[10],{1094:function(e,t,a){"use strict";var n=a(84),r=a(0),c=a(211),l=a(74),i=a(1086),o=a(1087),u=a(1437),s=a(23),p=a(1098),m=a.n(p),d=a(1436),f=a(9),v=c.a.Option;c.a.OptGroup;t.a=function(e){var t=e.fieldList,a=void 0===t?{list:f.s}:t,p=e.filterInfo,E=e.onChange,y=r.useState([]),O=Object(n.a)(y,2),g=O[0],N=O[1],b=function(e,t){var n=JSON.parse(JSON.stringify(p));n.filterValues[t].key=e,n.filterValues[t].type="equal",n.filterValues[t].value=[];var r=a.list.find((function(t){return t.value===e}));r&&N(r.recommend),E(n)},j=function(e,t){var a=JSON.parse(JSON.stringify(p));a.filterValues[t].type=e,a.filterValues[t].value="equal"===e||"notEqual"===e?[]:"between"===e?[null,null]:null,E(a)},_=function(e,t){var a=JSON.parse(JSON.stringify(p));a.filterValues[t].value=e,E(a)};return r.createElement("div",null,p.filterValues.length>0&&r.createElement("div",{className:m.a.wrapper},p.filterValues.length>1&&r.createElement("div",{className:m.a.type},r.createElement(l.a,{size:"small",onClick:function(){var e=JSON.parse(JSON.stringify(p));e.filterType="AND"===e.filterType?"OR":"AND",E(e)}},"AND"===p.filterType?"\u4e14":"\u6216"),r.createElement("div",{className:m.a.line})),r.createElement("div",{className:m.a.form},p.filterValues.map((function(e,t){return r.createElement(i.a,{gutter:16,key:e.id},r.createElement(o.a,{span:5},r.createElement(c.a,{value:e.key,onChange:function(e){return b(e,t)},showSearch:!0,filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},a.list.map((function(e){return r.createElement(v,{value:e.value,key:e.value},e.name)})))),r.createElement(o.a,{span:3},r.createElement(c.a,{value:e.type,onChange:function(e){return j(e,t)}},r.createElement(v,{value:"equal"},"\u7b49\u4e8e"),r.createElement(v,{value:"notEqual"},"\u4e0d\u7b49\u4e8e"),r.createElement(v,{value:"isSet"},"\u6709\u503c"),r.createElement(v,{value:"notSet"},"\u6ca1\u503c"),r.createElement(v,{value:"greater"},"\u5927\u4e8e"),r.createElement(v,{value:"less"},"\u5c0f\u4e8e"),r.createElement(v,{value:"between"},"\u533a\u95f4"),r.createElement(v,{value:"isEmpty"},"\u4e3a\u7a7a"),r.createElement(v,{value:"isNotEmpty"},"\u4e0d\u4e3a\u7a7a"))),"isEmpty"!==e.type&&"isNotEmpty"!==e.type&&"isSet"!==e.type&&"notSet"!==e.type&&"rlike"!==e.type&&"notrlike"!==e.type&&r.createElement(o.a,{span:8},"equal"===e.type||"notEqual"===e.type||"notContain"===e.type||"contain"===e.type?r.createElement(c.a,{value:e.value,onChange:function(e){return _(e,t)},mode:"tags",style:{width:"100%"},tokenSeparators:[";;"]},g.map((function(e){return r.createElement(v,{key:e.value,value:e.value},e.text)}))):r.createElement(u.a,{value:e.value,dataSource:g,style:{width:"100%"},onChange:function(e){return _(e,t)}})),r.createElement(o.a,{span:1},r.createElement("div",{onClick:function(){return function(e){var t=JSON.parse(JSON.stringify(p));t.filterValues.splice(e,1),E(t)}(t)},className:"app-link "+m.a.close},r.createElement(s.a,{type:"minus-circle"}))))})))),r.createElement("a",{onClick:function(){var e=JSON.parse(JSON.stringify(p));e.filterValues.push({type:null,key:null,value:null,id:Object(d.a)()}),E(e)},className:m.a.add},r.createElement(s.a,{type:"plus-square"}),"\u6dfb\u52a0\u7b5b\u9009"))}},1096:function(e,t,a){e.exports={wrapper:"Indicator_wrapper__3B5qd",select:"Indicator_select__1kP-z",content:"Indicator_content__3-BaR",center:"Indicator_center__3Oax_",metadataBox:"Indicator_metadataBox__3wnAQ",active:"Indicator_active__1aD9o",filter:"Indicator_filter__lBazH"}},1097:function(e,t,a){"use strict";var n=a(46),r=a(84),c=a(0),l=a(211),i=a(1089),o=a(1086),u=a(1087),s=a(532),p=a(264),m=a(23),d=a(1096),f=a.n(d),v=a(63),E=a(66),y=a(1094),O=a(1436),g=a(5),N=a(9);function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var _=l.a.Option,h=(l.a.OptGroup,i.a.Search);t.a=Object(v.c)((function(e){var t=e.metadata;return{activeMetadataList:t.activeMetadataList,activeMetadataListParams:t.activeMetadataListParams,tagList:t.tagList,fieldListMap:t.fieldListMap,projectInfo:e.project.projectInfo}}),(function(e){return Object(E.b)({onGetActiveMetadataList:function(e){return g.C.request(e)},onGetFieldList:function(e){return g.H.request(e)}},e)}))((function(e){var t=e.indicators,a=e.activeMetadataList,n=e.activeMetadataListParams,d=e.onChange,v=e.fieldListMap,E=e.hasType,g=e.addText,b=void 0===g?"+\u6dfb\u52a0\u6307\u6807":g,w=e.hasCustomName,S=void 0!==w&&w,C=e.type,k=void 0===C?null:C,P=e.tagList,I=e.onGetActiveMetadataList,A=e.onGetFieldList,L=e.projectInfo,D=c.useState(j({},n)),J=Object(r.a)(D,2),T=J[0],V=J[1];function F(e,a){var n=JSON.parse(JSON.stringify(t));n[a].metadataCode=e.code,n[a].metadataName=e.name,n[a].projectId=e.projectId,d(n,t[a]),A({projectId:e.projectId,metadataCode:e.code})}function q(e,a){var n=JSON.parse(JSON.stringify(t));n[a].filter=e,d(n)}function x(e,a){var n=JSON.parse(JSON.stringify(t));n[a].type=e,d(n)}function M(e){V(e),setTimeout((function(){I(e)}),300)}c.useEffect((function(){V(n)}),[n]);var G={name:"\u6240\u6709\u4e8b\u4ef6",code:"_ALL_METADATA"};return c.createElement("div",{className:f.a.wrapper},c.createElement("div",null,t.map((function(e,n){return c.createElement("div",{key:e.id},c.createElement(o.a,{className:f.a.item,gutter:10},c.createElement(u.a,{span:1},c.createElement("div",{className:f.a.center},c.createElement(s.a,{color:"gold"},n+1))),c.createElement(u.a,{span:3},c.createElement(p.a,{trigger:["click"],overlay:c.createElement("div",{className:f.a.content},c.createElement("div",{onClick:function(e){return e.stopPropagation()}},c.createElement(h,{placeholder:"\u641c\u7d22\u4e8b\u4ef6",value:T.name,onChange:function(e){return V(j({},T,{name:e.target.value}))},onSearch:function(e){return M(j({},T,{name:e}))},style:{width:120}}),"\xa0",c.createElement(l.a,{placeholder:"\u6839\u636e\u6807\u7b7e\u7b5b\u9009",style:{width:120},mode:"multiple",value:T.tags?T.tags.split(",").map((function(e){return Number(e)})):[],onChange:function(e){return M(j({},T,{tags:e.join(",")}))}},P.list.map((function(e){return c.createElement(_,{key:e.id,value:e.id},e.name)}))),"\xa0",c.createElement(l.a,{placeholder:"\u5173\u8054\u5e94\u7528",style:{width:160},mode:"multiple",value:T.projectIds?T.projectIds.split(",").map((function(e){return Number(e)})):[],onChange:function(e){return M(j({},T,{projectIds:e.join(",")}))}},L.associationProjects.map((function(e){return c.createElement(_,{key:e.id,value:e.id},e.name)})))),c.createElement("div",{className:f.a.metadataBox},L.associationProjects?c.createElement(c.Fragment,null,c.createElement("span",{onClick:function(){return F(j({},G),n)},className:G.code!==e.metadataCode||e.projectId?"":f.a.active,key:G.code},"\u6240\u6709\u4e8b\u4ef6"),!!L.associationProjects.length&&c.createElement("span",{onClick:function(){return F(j({},G,{name:L.name+"\u6240\u6709\u4e8b\u4ef6",projectId:L.id}),n)},className:G.code===e.metadataCode&&e.projectId===L.id?f.a.active:"",key:G.code+L.id},L.name,"\u6240\u6709\u4e8b\u4ef6"),L.associationProjects.map((function(t){return c.createElement("span",{onClick:function(){return F(j({},G,{name:t.name+"\u6240\u6709\u4e8b\u4ef6",projectId:t.id}),n)},className:G.code===e.metadataCode&&e.projectId===t.id?f.a.active:"",key:G.code+t.id},t.name,"\u6240\u6709\u4e8b\u4ef6")}))):c.createElement("span",{onClick:function(){return F(j({},G,{projectId:L.id}),n)},className:G.code===e.metadataCode?f.a.active:"",key:G.code+L.id},"\u6240\u6709\u4e8b\u4ef6"),a.list.filter((function(e){return!k||e.type===k})).map((function(t){return c.createElement("span",{onClick:function(){return F(t,n)},className:t.code===e.metadataCode?f.a.active:"",key:t.code},t.name)}))))},c.createElement(i.a,{value:e.metadataName,readOnly:!0,className:f.a.select}))),S&&c.createElement(u.a,{span:3},c.createElement(i.a,{defaultValue:e.customName,placeholder:"\u81ea\u5b9a\u4e49\u540d\u79f0",onBlur:function(e){return function(e,a){var n=JSON.parse(JSON.stringify(t));n[a].customName=e,d(n)}(e.target.value,n)}})),E&&c.createElement(c.Fragment,null,c.createElement(u.a,{span:1},c.createElement("div",{className:f.a.center},"\u7684")),c.createElement(u.a,{span:3},c.createElement(l.a,{onChange:function(e){return x(e,n)},value:e.type},c.createElement(_,{value:"PV"},"\u603b\u6b21\u6570"),c.createElement(_,{value:"UV"},"\u7528\u6237\u6570"),c.createElement(_,{value:"APV"},"\u4eba\u5747\u6b21\u6570"),c.createElement(_,{value:"DPV"},"\u65e5\u5747\u6b21\u6570"),c.createElement(_,{value:"DUV"},"\u65e5\u5747\u7528\u6237\u6570")))),t.length>1&&c.createElement(u.a,{span:1},c.createElement("div",{onClick:function(){return function(e){var a=JSON.parse(JSON.stringify(t));a.splice(e,1),d(a,t[e])}(n)},className:"app-link "+f.a.center},c.createElement(m.a,{type:"close"})))),c.createElement("div",{className:f.a.filter},c.createElement(y.a,{fieldList:v[e.metadataCode]||{list:N.s},filterInfo:e.filter,onChange:function(e){return q(e,n)}})))}))),c.createElement("a",{onClick:function(){var e=JSON.parse(JSON.stringify(t));e.push({metadataCode:"_ALL_METADATA",metadataName:"\u6240\u6709\u4e8b\u4ef6",projectId:null,type:"PV",id:Object(O.a)(),filter:{filterType:"AND",filterValues:[]}}),d(e)}},b))}))},1098:function(e,t,a){e.exports={wrapper:"Filter_wrapper__9rptJ",line:"Filter_line__eOPS4",type:"Filter_type__2GtXQ",form:"Filter_form__1lfK0",close:"Filter_close__1AZpi",add:"Filter_add__2YNj8"}},1099:function(e,t,a){e.exports={wrapper:"AnalyseHeader_wrapper__1r0g1",btns:"AnalyseHeader_btns__G6iwS",title:"AnalyseHeader_title__1X3LF",description:"AnalyseHeader_description__1fJOY"}},1101:function(e,t,a){"use strict";var n=a(218),r=a(46),c=a(84),l=a(0),i=a.n(l),o=a(1089),u=a(74),s=a(63),p=a(66),m=a(5),d=a(1099),f=a.n(d),v=a(535),E=a(1108),y=a(211),O=Object(s.c)((function(e){return{boardList:e.board.boardList}}),(function(e){return Object(p.b)({onAppendReportToBoard:function(e){return m.i.request(e)}},e)}))((function(e){var t=e.onAppendReportToBoard,a=e.boardList,n=e.reportInfo,r=e.children,i=l.useState([]),o=Object(c.a)(i,2),s=o[0],p=o[1];return l.createElement(E.a,{placement:"bottom",trigger:"click",onVisibleChange:function(e){return e&&p([])},content:l.createElement("div",null,l.createElement(y.a,{size:"small",onChange:function(e){return p(e)},value:s,style:{width:240},mode:"multiple"},a.list.map((function(e){var t=!!n.boards.find((function(t){return t.id===e.id}));return l.createElement(y.a.Option,{key:e.id,value:e.id,disabled:t},e.name)}))),"\xa0",l.createElement(u.a,{size:"small",onClick:function(){return e=n,void(s.length?t({reportId:e.id,boardIds:s,projectId:n.projectId}):v.a.info("\u8bf7\u9009\u62e9\u770b\u677f"));var e}},"\u786e\u5b9a")),title:"\u9009\u62e9\u770b\u677f"},r)}));function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}t.a=Object(s.c)((function(e){return{reportInfo:e.report.reportInfo}}),(function(e){return Object(p.b)({onAddReport:function(e){return m.f.request(e)},onUpdateReport:function(e){return m.nb.request(e)}},e)}))((function(e){var t=e.reportInfo,a=e.onUpdateReport,r=e.onAddReport,l=e.data,s=i.a.useState(t),p=Object(c.a)(s,2),m=p[0],d=p[1],v=i.a.useState([]),E=Object(c.a)(v,2);E[0],E[1];i.a.useEffect((function(){d(t)}),[t]);return i.a.createElement("div",{className:f.a.wrapper},i.a.createElement("h2",{className:f.a.title},i.a.createElement(o.a,{type:"text",onChange:function(e){return d(N({},m,{name:e.target.value}))},value:m.name})),i.a.createElement("div",{className:f.a.btns},i.a.createElement(u.a,{type:"link",icon:"save",onClick:function(){"undefined"!==typeof t.id?a(N({id:null},m,{data:l})):r(N({},m,{data:l}))}},"\u4fdd\u5b58"),m.id&&i.a.createElement(u.a,{type:"link",icon:"save",onClick:function(){m.id;var e=Object(n.a)(m,["id"]);r(N({},e,{data:l}))}},"\u53e6\u5b58\u4e3a"),m.id&&i.a.createElement(O,{reportInfo:m},i.a.createElement(u.a,{type:"link",icon:"plus-circle"},"\u6dfb\u52a0\u5230"))),i.a.createElement("div",{className:f.a.description},i.a.createElement(o.a,{onChange:function(e){return d(N({},m,{description:e.target.value}))},value:m.description})))}))},1106:function(e,t,a){"use strict";var n=a(0),r=a(211),c=a(1086),l=a(1087),i=a(1107),o=a.n(i),u=a(9),s=r.a.Option;r.a.OptGroup;t.a=function(e){var t=e.fieldList,a=void 0===t?{list:u.s}:t,i=e.dimension,p=e.onChange;return n.createElement("div",{className:o.a.wrapper},n.createElement(c.a,{className:o.a.item},n.createElement(l.a,{span:1},n.createElement("div",{className:o.a.center},"\u6309")),n.createElement(l.a,{span:3},n.createElement(r.a,{value:i,onChange:p,showSearch:!0,filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},n.createElement(s,{value:""},"\u603b\u4f53"),a.list.map((function(e){return n.createElement(s,{value:e.value,key:e.value},e.name)})))),n.createElement(l.a,{span:1},n.createElement("div",{className:o.a.center},"\u67e5\u770b"))))}},1107:function(e,t,a){e.exports={wrapper:"Dimension_wrapper__Ew76P",center:"Dimension_center__1BCis"}},1181:function(e,t,a){e.exports={ruleTitle:"AnalyseFunnel_ruleTitle__3gwQF",preview:"AnalyseFunnel_preview__18PLM",wrapper:"AnalyseFunnel_wrapper__29QoJ",ruleSection:"AnalyseFunnel_ruleSection__3K-yu"}},1415:function(e,t,a){"use strict";a.r(t);var n=a(46),r=a(211),c=a(1422),l=a(1089),i=a(1086),o=a(1087),u=a(74),s=a(358),p=a(0),m=a.n(p),d=a(350),f=a(1181),v=a.n(f),E=a(1097),y=a(1106),O=a(1094),g=a(1101),N=a(63),b=a(66),j=a(5),_=a(513);function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var S=r.a.Option,C=(c.a.Panel,l.a.Group);t.default=Object(N.c)((function(e){var t=e.project.projectInfo.id,a=e.analyse;return{projectId:t,funnelAnalyseData:a.funnelAnalyseData,funnelAnalyseParam:a.funnelAnalyseParam,analyseLoading:a.analyseLoading}}),(function(e){return Object(b.b)({onGetFunnelAnalyseData:function(e){return j.I.request(e)}},e)}))((function(e){var t=e.analyseLoading,a=e.onGetFunnelAnalyseData,n=e.projectId,c=e.funnelAnalyseData,l=e.funnelAnalyseParam,p=function(e){e.projectId=n,a(e)};return m.a.createElement("div",{className:v.a.wrapper},m.a.createElement(g.a,{data:w({},l,{projectId:n})}),m.a.createElement("div",{className:v.a.rule},m.a.createElement("div",{className:v.a.ruleSection},m.a.createElement("span",{className:v.a.ruleTitle},"\u6307\u6807:"),m.a.createElement(r.a,{value:l.indicatorType,onChange:function(e){return p(w({},l,{indicatorType:e}))}},m.a.createElement(S,{value:"PV"},"\u603b\u6570"),m.a.createElement(S,{value:"UV"}," \u7528\u6237\u6570"),m.a.createElement(S,{value:"APV"},"\u4eba\u5747\u6b21\u6570"),m.a.createElement(S,{value:"DPV"},"\u65e5\u5747\u6b21\u6570"),m.a.createElement(S,{value:"DUV"},"\u65e5\u5747\u7528\u6237\u6570"))),m.a.createElement("div",{className:v.a.ruleSection},m.a.createElement("span",{className:v.a.ruleTitle},"\u7eac\u5ea6:"),m.a.createElement(y.a,{dimension:l.dimension,onChange:function(e){return p(w({},l,{dimension:e}))}})),m.a.createElement("div",{className:v.a.ruleSection},m.a.createElement("span",{className:v.a.ruleTitle},"\u7b5b\u9009:"),m.a.createElement(O.a,{filterInfo:l.filter,onChange:function(e){return p(w({},l,{filter:e}))}})),m.a.createElement("div",{className:v.a.ruleSection},m.a.createElement("span",{className:v.a.ruleTitle},"\u6f0f\u6597\u6b65\u9aa4:"),m.a.createElement(E.a,{addText:"+\u6dfb\u52a0\u6b65\u9aa4",hasCustomName:!0,indicators:l.indicators,onChange:function(e){return p(w({},l,{indicators:e}))}}))),m.a.createElement("div",{className:v.a.preview},m.a.createElement(i.a,null,m.a.createElement(o.a,{span:14},m.a.createElement(d.a,{onChange:function(e){return p(w({},l,{},e))},value:{dateType:l.dateType,dateEnd:l.dateEnd,dateStart:l.dateStart}})),m.a.createElement(o.a,{span:6,offset:4},m.a.createElement(C,{compact:!0},m.a.createElement(r.a,{style:{width:"33%"},value:l.type,onChange:function(e){return p(w({},l,{type:e}))}},m.a.createElement(S,{value:"FUNNEL"},"\u6f0f\u6597\u56fe"),m.a.createElement(S,{value:"LIST"},"\u5217\u8868"),m.a.createElement(S,{value:"TABLE"},"\u8868\u683c")),m.a.createElement(u.a,{icon:"download"},"\u5bfc\u51fa")))),m.a.createElement(s.a,{spinning:t},m.a.createElement("div",{style:{height:"FUNNEL"===l.type?600:1e3}},m.a.createElement(_.a,{data:c})))))}))}}]);
//# sourceMappingURL=10.305227dc.chunk.js.map