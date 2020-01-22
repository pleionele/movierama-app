import * as React from "react";
 import "./App.scss";

interface AppProps {
  name: string;
}

export default class App extends React.Component<AppProps,any> {
  public render() {
    return (
      <div className="app" data-testid="appComponent">
        <span className="app__text">
          Hello {this.props.name}!
        </span>
      </div>
    );
  }
}