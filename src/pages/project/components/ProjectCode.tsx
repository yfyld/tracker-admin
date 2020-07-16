import * as React from 'react';
import { IProjectInfo } from '@/api';
import { connect } from 'react-redux';
import { IStoreState } from '@/types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import style from './ProjectCode.module.less';
interface Props {
  projectInfo: IProjectInfo;
}

const ProjectCode = ({ projectInfo }: Props) => {
  const scriptCode = `<script
  src='//static.91jkys.com/f2e/telescope-sdk/telescope.min.js'
  trackKey='${projectInfo.trackKey}'
  crossorigin='anonymous'
></script>`;

  return (
    <div className={style.wrapper}>
      <h2>H5 引入SDK</h2>
      <div>
        <h3>Script 标签引入</h3>
        <SyntaxHighlighter language='html'>{scriptCode}</SyntaxHighlighter>
      </div>

      <div>
        <h3>npm 包</h3>
        <SyntaxHighlighter language='javascript'>{`npm i @zyf2e/telescope -S`}</SyntaxHighlighter>
        <SyntaxHighlighter language='javascript'>{`import * as Telescope from '@zyf2e/telescope';
Telescope.setConfig({ trackKey: '${projectInfo.trackKey}', version: '1.0.0' });`}</SyntaxHighlighter>
      </div>

      <br />
      <br />
      <br />

      <h2>Flutter 引入SDK</h2>
      <div>待补充</div>

      <br />
      <br />
      <br />

      <h2>H5埋点技巧</h2>
      <div>
        <h3>页面跳转,埋点发送失败?</h3>
        <div>
          <p>
            1.针对a标签使用html属性data-track或者指令v-track-event时,sdk默认延迟a标签跳转300ms(可以通过配置项delayLinkTime调整或取消)
          </p>
          <p>2.在存在跳转的方法里埋点,可以通过指令@tracker(before())埋点</p>
          <SyntaxHighlighter language='javascript'>{`jumpToBaidu(){
  Telescope.trackEvent({trackId:"zyyh-click-baidu"}); //0分 页面跳走,容易导致埋点发送失败
  location.href='http://www.baidu.com'
}`}</SyntaxHighlighter>
          <SyntaxHighlighter language='javascript'>{`jumpToBaidu(){
  Telescope.trackEvent({trackId:"zyyh-click-baidu"}); //60分 修改业务代码 延迟发送
  setTimeout(() => {
    location.href='http://www.baidu.com'
  }, 300);
}`}</SyntaxHighlighter>
          <SyntaxHighlighter language='javascript'>{`@tracker(before('zyyh-click-baidu')) //100分 通过装饰器处理
jumpToBaidu(){
  location.href='http://www.baidu.com'
}`}</SyntaxHighlighter>
        </div>

        <h3>埋点日志需要上传自定义参数?</h3>
        <div>
          <p>自定义字段挂custom字段下,如果时JSON会序列化成字符串,统计分析当字符串处理</p>
          <SyntaxHighlighter language='javascript'>{`Telescope.trackEvent({trackId:"zyyh-click-submit",custom:{role:"admin"}})
}`}</SyntaxHighlighter>
        </div>

        <h3>处理日志</h3>
        <div>
          <p>如:给所有日志加上自定义字段 custom:'admin'</p>
          <SyntaxHighlighter language='javascript'>
            {`Telescope.setConfig({beforeGenerateLog:(log)=>({...log,custom:'admin'})})})`}
          </SyntaxHighlighter>
        </div>
      </div>

      <br />
      <br />
      <br />

      <h2>H5 SDK 使用文档</h2>
      <div>
        <h3>设置</h3>
        <SyntaxHighlighter language='javascript'>{`Telescope.setConfig({ autoTrackClick: false, trackKey: "${projectInfo.trackKey}", version: '1.0.0' });`}</SyntaxHighlighter>
        <h4>配置项</h4>

        <SyntaxHighlighter language='javascript'>{`{
  trackKey: '', //应用key
  serverUrl: //日志收集接口,
  pageTime: true, //是否记录页面停留时间
  watchHistoryAndHash: true, //单页面应用监听url变化
  version: null, //应用版本
  sendType: SEND_TYPE.ASYNC, //发送日志方式 (同步发,异步延迟发,关闭浏览器前发送)
  delayTime: 1000, //延迟发送的时间
  autoTrackPage: false, //自动埋点页面
  autoTrackClick: false, //自动埋点a,button,input
  autoInstall: true, //自动开始埋点监控
  delayLink: true, //a标签跳转延迟
  delayLinkTime: 200,
  useServerTime: true, //使用服务器时间
  corssSubdomain: false, //false 域名不同认作为两个用户
  utokenKey: "TRYCATCH_TOKEN",
  beforeGenerateLog:(log)=>(log) //生成日志前hook function
};`}</SyntaxHighlighter>
      </div>

      <div>
        <h3>记录登录信息</h3>
        <SyntaxHighlighter language='javascript'>{`Telescope.login({ uid: 123 });//记录登录状态 uid可选
Telescope.logout();//移出登录状态`}</SyntaxHighlighter>
      </div>

      <div>
        <h3>收集埋点信息方法</h3>

        <div>
          <h4>无痕埋点</h4>
          <SyntaxHighlighter language='javascript'>{`Telescope.setConfig({ autoTrackPage:true,//路由发生变化时,自动埋点
autoTrackClick:true//button,a,img,input标签发送点击事件,自动埋点
})`}</SyntaxHighlighter>
        </div>
        <div>
          <h4>调用方法发送埋点</h4>
          <SyntaxHighlighter language='javascript'>{`Telescope.trackPage({trackId: "zyyh-page-pay"});
Telescope.trackEvent({trackId:"zyyh-click-submit"})`}</SyntaxHighlighter>
        </div>
        <div>
          <h4>注册DOM属性,发生点击后触发埋点</h4>
          <SyntaxHighlighter language='html'>{`<button data-track="zyyh-click-submit">提交</button>`}</SyntaxHighlighter>
        </div>

        <div>
          <h4>VUE应用,使用指令埋点</h4>

          <SyntaxHighlighter language='javascript'>{`//注册指令
Vue.directive('track-event', Telescope.vTrackEvent);
// Vue.directive('track-view', Telescope.vTrackView);
Vue.directive('track-page', Telescope.vTrackPage);`}</SyntaxHighlighter>

          <SyntaxHighlighter language='html'>{`<div class="content">
  <div v-if="status" v-track-page="'zyyh-page-one'">
    页面一
    <input v-track-event.blur="'zyyh-event-member-detail-conversion'"/>
    <button v-track-event.click="'zyyh-event-member-detail-conversion'">
      使用兑换码
    </button>
    <button v-track-event="'zyyh-event-member-detail-conversion'">
      使用兑换码
    </button>
   <button v-track-event="{trackId:'zyyh-event-member-detail-conversion'}">
      使用兑换码
    </button>
  </div>
  <div v-else  v-track-page="'zyyh-page-two'">
   页面二
  </div>
</div`}</SyntaxHighlighter>
        </div>
      </div>

      <div>
        <h4>装饰器埋点</h4>
        <SyntaxHighlighter language='javascript'>{`import {tracker,before,after} from '@zyf2e/telescope';
//trackId
@tracker("zyyh-event-submit")
handleSubmit(){

}

//after
@tracker(after(){
  return 'zyyh-event-submit-success'
})
handleSubmit(){
  return new Promise()
}

//after
@tracker(after('zyyh-event-submit-success'))
handleSubmit(){
  return new Promise()
}

//before
@tracker(before(){
   return 'zyyh-event-submit-success'
 })
handleSubmit(){
  
}

//before
@tracker(before("zyyh-event-submit-success"))
handleSubmit(){
  
}

//obj
@tracker({
  actionType:'PAGE'
  trackId:'zyyh-page-pay-success'
})
handleSubmit(){

}

//function
@tracker(function(){
  return 'zyyh-event-submit-success'
})
handleSubmit(){

}`}</SyntaxHighlighter>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IStoreState) => {
  const { projectInfo } = state.project;
  return {
    projectInfo
  };
};

export default connect(mapStateToProps, null)(ProjectCode);
