import * as React from 'react';
import './App.less';
import Routes from '@/router';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
