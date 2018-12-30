import React, { Component } from 'react';
import Header from "../Header";

class Main extends Component {
  render() {
    return <div className="main-layout">
      <Header/>
      <main> 
        {this.props.children}
      </main>
    </div>
  }
}

export default Main;
