import React from "react";
import Winner from "./Winner";
import Vote from "./Vote";

export class Voting extends React.PureComponent<any> {
  render() {
    return (<div>
          {this.props.winner ? <Winner ref="winner" winner={this.props.winner} /> : <Vote {...this.props} />}
        </div>);
  }
}
