(window["webpackJsonptracker-web"]=window["webpackJsonptracker-web"]||[]).push([[12],{1e3:function(e,t,a){e.exports={wrapper:"Dimension_wrapper__Ew76P",center:"Dimension_center__1BCis"}},1001:function(e,t,a){e.exports={wrapper:"AnalyseHeader_wrapper__1r0g1",btns:"AnalyseHeader_btns__G6iwS",title:"AnalyseHeader_title__1X3LF",description:"AnalyseHeader_description__1fJOY"}},1026:function(e,t,a){"use strict";a.r(t);var n=a(65),r=a(165),l=a(907),i=a(1024),c=a(894),o=a(904),u=a(905),s=a(60),m=a(0),p=a.n(m),d=a(901),f=a(997),v=a.n(f),E=a(950),y=a(893),h=a(29),O=a(998),g=a.n(O),N=a(57),_=a(54),b=a(1034),w=a(999),S=a.n(w),k=l.a.Option,j=(l.a.OptGroup,function(e){var t=e.fieldList,a=e.filterInfo,n=e.onChange,i=m.useState([]),c=Object(r.a)(i,2),s=c[0],p=c[1],d=function(e,r){var l=JSON.parse(JSON.stringify(a));l.filterValues[r].key=e,l.filterValues[r].type="equal",l.filterValues[r].value=[];var i=t.list.find((function(t){return t.value===e}));i&&p(i.recommend),n(l)},f=function(e,t){var r=JSON.parse(JSON.stringify(a));r.filterValues[t].type=e,r.filterValues[t].value="equal"===e||"notEqual"===e?[]:"between"===e?[null,null]:null,n(r)},v=function(e,t){var r=JSON.parse(JSON.stringify(a));r.filterValues[t].value=e,n(r)};return m.createElement("div",null,a.filterValues.length>0&&m.createElement("div",{className:S.a.wrapper},a.filterValues.length>1&&m.createElement("div",{className:S.a.type},m.createElement("button",{onClick:function(){var e=JSON.parse(JSON.stringify(a));e.filterType="AND"===e.filterType?"OR":"AND",n(e)}},"AND"===a.filterType?"\u4e14":"\u6216"),m.createElement("div",{className:S.a.line})),m.createElement("div",{className:S.a.form},a.filterValues.map((function(e,r){return m.createElement(o.a,{gutter:16,key:e.id},m.createElement(u.a,{span:3},m.createElement(l.a,{value:e.key,onChange:function(e){return d(e,r)}},t.list.map((function(e){return m.createElement(k,{value:e.value,key:e.value},e.name)})))),m.createElement(u.a,{span:3},m.createElement(l.a,{value:e.type,onChange:function(e){return f(e,r)}},m.createElement(k,{value:"equal"},"\u7b49\u4e8e"),m.createElement(k,{value:"notEqual"},"\u4e0d\u7b49\u4e8e"),m.createElement(k,{value:"isSet"},"\u6709\u503c"),m.createElement(k,{value:"notSet"},"\u6ca1\u503c"),m.createElement(k,{value:"greater"},"\u5927\u4e8e"),m.createElement(k,{value:"less"},"\u5c0f\u4e8e"),m.createElement(k,{value:"between"},"\u533a\u95f4"),m.createElement(k,{value:"contain"},"\u5305\u542b"),m.createElement(k,{value:"notContain"},"\u4e0d\u5305\u542b"),m.createElement(k,{value:"isEmpty"},"\u4e3a\u7a7a"),m.createElement(k,{value:"isNotEmpty"},"\u4e0d\u4e3a\u7a7a"),m.createElement(k,{value:"rlike"},"\u6b63\u5219\u5339\u914d"),m.createElement(k,{value:"notrlike"},"\u6b63\u5219\u4e0d\u5339\u914d"))),"isEmpty"!==e.type&&"isNotEmpty"!==e.type&&"isSet"!==e.type&&"notSet"!==e.type&&"rlike"!==e.type&&"notrlike"!==e.type&&m.createElement(u.a,{span:8},"equal"===e.type||"notEqual"===e.type?m.createElement(l.a,{value:e.value,onChange:function(e){return v(e,r)},mode:"tags",style:{width:"100%"},tokenSeparators:[","]},s.map((function(e){return m.createElement(k,{key:e,value:e},e)}))):m.createElement(b.a,{value:e.value,dataSource:s,style:{width:"100%"},onChange:function(e){return v(e,r)}})),m.createElement(u.a,{span:1},m.createElement("div",{onClick:function(){return function(e){var t=JSON.parse(JSON.stringify(a));t.filterValues.splice(e,1),n(t)}(r)},className:"app-link "+S.a.close},m.createElement(h.a,{type:"close"}))))})))),m.createElement("a",{onClick:function(){var e=JSON.parse(JSON.stringify(a));e.filterValues.push({type:null,key:null,value:null,id:Date.now()}),n(e)}},"+\u6dfb\u52a0\u7b5b\u9009"))}),C=l.a.Option,D=(l.a.OptGroup,c.a.Search),I=Object(N.c)((function(e){var t=e.metadata;return{activeMetadataList:t.activeMetadataList,activeMetadataListParams:t.activeMetadataListParams}}),(function(e){return Object(_.b)({},e)}))((function(e){var t=e.indicators,a=e.activeMetadataList,n=(e.activeMetadataListParams,e.onChange),r=e.fieldList;function i(e,a){var r=JSON.parse(JSON.stringify(t));r[a].filter=e,n(r)}function s(e,a){var r=JSON.parse(JSON.stringify(t));r[a].type=e,n(r)}return m.createElement("div",{className:g.a.wrapper},m.createElement("div",null,t.map((function(e,p){return m.createElement("div",{key:e.id},m.createElement(o.a,{className:g.a.item},m.createElement(u.a,{span:1},m.createElement("div",{className:g.a.center},m.createElement(E.a,{color:"gold"},p+1))),m.createElement(u.a,{span:3},m.createElement(y.a,{overlay:m.createElement("div",{className:g.a.content},m.createElement("div",{onClick:function(e){return e.stopPropagation()}},m.createElement(D,{placeholder:"\u641c\u7d22\u4e8b\u4ef6",onSearch:function(e){return console.log(e)},style:{width:200}}),m.createElement(l.a,{style:{width:200}},m.createElement(C,{value:"1"},"\u6807\u7b7e1"),m.createElement(C,{value:"2"},"\u6807\u7b7e2"),m.createElement(C,{value:"3"},"\u6807\u7b7e3"))),m.createElement("div",{className:g.a.metadataBox},a.list.map((function(e){return m.createElement("span",{onClick:function(){return function(e,a){var r=JSON.parse(JSON.stringify(t));r[a].trackId=e.code,r[a].metadataCode=e.code,r[a].metadataName=e.name,n(r)}(e,p)},className:"app-pointer",key:e.code},e.name)}))))},m.createElement(c.a,{value:e.metadataName,readOnly:!0,className:g.a.select}))),m.createElement(u.a,{span:1},m.createElement("div",{className:g.a.center},"\u7684")),m.createElement(u.a,{span:3},m.createElement(l.a,{onChange:function(e){return s(e,p)},value:e.type},m.createElement(C,{value:"SUM"},"\u603b\u6b21\u6570"),m.createElement(C,{value:"USER_SUM"},"\u7528\u6237\u6570"),m.createElement(C,{value:"3"},"\u4eba\u5747\u6b21\u6570"))),t.length>1&&m.createElement(u.a,{span:1},m.createElement("div",{onClick:function(){return function(e){var a=JSON.parse(JSON.stringify(t));a.splice(e,1),n(a)}(p)},className:"app-link "+g.a.center},m.createElement(h.a,{type:"close"})))),m.createElement("div",{className:g.a.filter},m.createElement(j,{fieldList:r,filterInfo:e.filter,onChange:function(e){return i(e,p)}})))}))),m.createElement("a",{onClick:function(){var e=JSON.parse(JSON.stringify(t));e.push({trackId:null,metadataCode:null,metadataName:"\u6240\u6709\u4e8b\u4ef6",type:"SUM",id:Date.now(),filter:{filterType:"AND",filterValues:[]}}),n(e)}},"+\u6dfb\u52a0\u6307\u6807"))})),A=a(1e3),P=a.n(A),J=l.a.Option,x=(l.a.OptGroup,function(e){var t=e.fieldList,a=e.dimension,n=e.onChange;return m.createElement("div",{className:P.a.wrapper},m.createElement(o.a,{className:P.a.item},m.createElement(u.a,{span:1},m.createElement("div",{className:P.a.center},"\u6309")),m.createElement(u.a,{span:3},m.createElement(l.a,{value:a,onChange:n},m.createElement(J,{value:""},"\u603b\u4f53"),t.list.map((function(e){return m.createElement(J,{value:e.value,key:e.value},e.name)})))),m.createElement(u.a,{span:1},m.createElement("div",{className:P.a.center},"\u67e5\u770b"))))}),L=a(3),V=a(1001),M=a.n(V);function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var q=Object(N.c)(null,(function(e){return Object(_.b)({handleAddReport:function(e){return L.d.request(e)},handleUpdateReport:function(e){return L.M.request(e)}},e)}))((function(e){var t=e.reportInfo,a=e.handleUpdateReport,r=e.handleAddReport;return p.a.createElement("div",{className:M.a.wrapper},p.a.createElement("h2",{className:M.a.title},p.a.createElement(c.a,{type:"text",defaultValue:t.name})),p.a.createElement("div",{className:M.a.btns},p.a.createElement(s.a,{type:"link",icon:"save",onClick:function(){"undefined"!==typeof t.id?a(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({id:null},t)):r(t)}},"\u4fdd\u5b58"),t.id&&p.a.createElement(s.a,{type:"link",icon:"save",onClick:function(){r(t)}},"\u53e6\u5b58\u4e3a"),p.a.createElement(s.a,{type:"link",icon:"plus-circle",onClick:function(){}},"\u6dfb\u52a0\u5230")),p.a.createElement("div",{className:M.a.description},p.a.createElement(c.a,{defaultValue:t.description})))})),R=a(910),U=a.n(R),B=a(1023),G=function(e){var t={dataZoom:[{show:!0,realtime:!0,start:0,end:100}],minInterval:24192e5,maxInterval:26784e5,grid:{bottom:80},xAxis:{type:"time",axisLine:{lineStyle:{color:"#999"}}},yAxis:{type:"value",minInterval:1,splitLine:{lineStyle:{type:"dashed",color:"#DDD"}},axisLine:{show:!1,lineStyle:{color:"#333"}},nameTextStyle:{color:"#999"},splitArea:{show:!1}},series:[]};return e.list.forEach((function(e){t.series.push({type:"line",data:e.data.map((function(e){return{name:e.time,value:[e.time,Number(e.pv)]}}))})})),t},F=function(e,t){var a=[{title:"\u65e5\u671f",key:"time",dataIndex:"time",defaultSortOrder:"descend",sorter:function(e,t){return e.time-t.time}}];return e.dimension?e.list.length>1?a.push({key:"pv",title:"\u603b\u6b21\u6570",dataIndex:"pv"}):a=a.concat(e.dimensionValues.map((function(e){return{key:e,title:e,dataIndex:e}}))):e.list.length>1?a=a.concat(e.list.map((function(e){return{key:e.key,title:e.metadataName,dataIndex:e.key}}))):a.push({key:"pv",title:"\u603b\u6b21\u6570",dataIndex:"pv"}),a},H=function(e){var t={};return e.list.forEach((function(a){a.data.forEach((function(n){t[n.time]||(t[n.time]={time:n.time,key:n.time,pv:n.pv}),e.dimension&&e.list.length>1?t[n.time][a.key+e.dimension]=n.pv:e.dimension&&e.dimensionValues.length>0?t[n.time][n[e.dimension]]=n.pv:e.list.length>1&&(t[n.time][a.key]=n.pv)}))})),Object.values(t)},Y=function(e){var t=e.data,a=(e.param,!!t.list.find((function(e){return e.data.length>0})));return m.createElement("div",null,a?m.createElement(U.a,{option:G(t),theme:"ts",notMerge:!0,lazyUpdate:!0}):"\u6682\u65e0\u6570\u636e",m.createElement(B.a,{columns:F(t),dataSource:H(t)}))};function z(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function K(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?z(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):z(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var Q=l.a.Option,X=i.a.Panel,Z=c.a.Group;t.default=Object(N.c)((function(e){var t=e.report.reportInfo,a=e.metadata.fieldList,n=e.project.projectInfo.id,r=e.analyse;return{reportInfo:t,fieldList:a,projectId:n,eventAnalyseData:r.eventAnalyseData,eventAnalyseParam:r.eventAnalyseParam}}),(function(e){return Object(_.b)({onGetEventAnalyseData:function(e){return L.u.request(e)}},e)}))((function(e){var t=e.reportInfo,a=e.fieldList,n=e.onGetEventAnalyseData,c=e.projectId,m=e.eventAnalyseData,f=e.eventAnalyseParam,E=p.a.useState(t),y=Object(r.a)(E,2),h=y[0],O=(y[1],function(e){e.projectId=c,n(e)});return p.a.createElement("div",null,p.a.createElement(q,{reportInfo:h}),p.a.createElement(i.a,{defaultActiveKey:["1"]},p.a.createElement(X,{header:"\u6dfb\u52a0\u5206\u6790\u89c4\u5219",key:"1"},p.a.createElement("div",null,p.a.createElement("div",{className:v.a.ruleTitle},p.a.createElement("span",null,"\u6307\u6807:")),p.a.createElement("div",null,p.a.createElement(I,{fieldList:a,indicators:f.indicators,onChange:function(e){return O(K({},f,{indicators:e}))}}))),p.a.createElement("div",null,p.a.createElement("div",{className:v.a.ruleTitle},p.a.createElement("span",null,"\u7ef4\u5ea6:")),p.a.createElement(x,{dimension:f.dimension,fieldList:a,onChange:function(e){return O(K({},f,{dimension:e}))}})),p.a.createElement("div",null,p.a.createElement("div",{className:v.a.ruleTitle},p.a.createElement("span",null,"\u7b5b\u9009:")),p.a.createElement(j,{fieldList:a,filterInfo:f.filter,onChange:function(e){return O(K({},f,{filter:e}))}})))),p.a.createElement("div",{className:v.a.preview},p.a.createElement(o.a,null,p.a.createElement(u.a,{span:14},p.a.createElement(d.a,{onChange:function(e){return O(K({},f,{time:e}))},value:f.time})),p.a.createElement(u.a,{span:6,offset:4},p.a.createElement(Z,{compact:!0},p.a.createElement(l.a,{style:{width:"33%"},value:f.type,onChange:function(e){return O(K({},f,{type:e}))}},p.a.createElement(Q,{value:"LINE"},"\u6298\u7ebf\u56fe"),p.a.createElement(Q,{value:"PIE"},"\u997c\u56fe"),p.a.createElement(Q,{value:"TABLE"},"\u8868\u683c"),p.a.createElement(Q,{value:"NUMBER"},"\u6570\u503c")),p.a.createElement(l.a,{style:{width:"33%"},value:f.timeUlit,onChange:function(e){return O(K({},f,{timeUlit:e}))}},p.a.createElement(Q,{value:"HOUR"},"\u6309\u5c0f\u65f6"),p.a.createElement(Q,{value:"DAY"},"\u6309\u5929"),p.a.createElement(Q,{value:"WEEK"},"\u6309\u5468"),p.a.createElement(Q,{value:"MONTH"},"\u6309\u6708"),p.a.createElement(Q,{value:"YEAR"},"\u6309\u5e74")),p.a.createElement(s.a,{icon:"download"},"\u5bfc\u51fa")))),p.a.createElement("div",null,p.a.createElement("pre",null,p.a.createElement("code",null))),p.a.createElement("div",null,p.a.createElement(Y,{data:m,param:f}))))}))},901:function(e,t,a){"use strict";var n=a(120),r=a(121),l=a(123),i=a(122),c=a(124),o=a(0),u=a(1022),s=a(60),m=a(119),p=a.n(m),d=a(14),f=u.a.RangePicker,v=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,c=new Array(r),o=0;o<r;o++)c[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(c)))).handleSelectDynamicTime=function(e){a.props.onChange({date:[p()(e.startDate()),p()(e.endDate())],type:e.value}),a.setState({open:!1})},a.state={open:!1},a.handleOpenChange=function(e){e&&a.setState({open:e})},a.getShowDate=function(){return a.props.value.type?"| "+d.h.find((function(e){return e.value===a.props.value.type})).name:""},a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return o.createElement("div",null,o.createElement(f,{renderExtraFooter:function(){return o.createElement("div",null,o.createElement("h3",null,"\u52a8\u6001\u65f6\u95f4:"),d.h.map((function(t){return o.createElement(s.a,{size:"small",key:t.value,type:e.props.value.type===t.value?"primary":"default",onClick:function(){return e.handleSelectDynamicTime(t)}},t.name)})))},open:this.state.open,format:"YYYY-MM-DD",onOpenChange:this.handleOpenChange,value:this.props.value.date,onChange:function(t){e.setState({open:!1}),e.props.onChange({date:t,type:""})}}),o.createElement("span",null,this.getShowDate()))}}]),t}(o.Component);t.a=v},997:function(e,t,a){e.exports={ruleTitle:"AnalyseEvent_ruleTitle__3uJQg",preview:"AnalyseEvent_preview__k46p_"}},998:function(e,t,a){e.exports={wrapper:"Indicator_wrapper__3B5qd",select:"Indicator_select__1kP-z",content:"Indicator_content__3-BaR",center:"Indicator_center__3Oax_",metadataBox:"Indicator_metadataBox__3wnAQ",active:"Indicator_active__1aD9o",filter:"Indicator_filter__lBazH"}},999:function(e,t,a){e.exports={wrapper:"Filter_wrapper__9rptJ",line:"Filter_line__eOPS4",type:"Filter_type__2GtXQ",form:"Filter_form__1lfK0",close:"Filter_close__1AZpi"}}}]);
//# sourceMappingURL=12.5ac63ea9.chunk.js.map