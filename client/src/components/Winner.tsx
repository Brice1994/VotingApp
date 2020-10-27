import React from "react";

export default class Voting extends React.PureComponent<any> {
  render() {
    return (<div className="winner">
      Winner is {this.props.winner}!
    </div>);
  }
}
