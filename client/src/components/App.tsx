import React from 'react';
export default class App extends React.Component<any>{
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
   }
};
