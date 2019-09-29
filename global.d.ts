declare module '*.less' {
  const content: {[className: string]: string};
  export default content;
}

declare module 'react-topbar-progress-indicator'{
  class Progress extends React.Component{
   static config(param:any):any;
  }
  export default Progress;
}