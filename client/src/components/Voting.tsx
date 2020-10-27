import React from "react";
import Winner from "./Winner";
import Vote from "./Vote";
import { connect } from "react-redux";
import * as actionCreators from "../action_creators";

export class Voting extends React.PureComponent<any> {
  render() {
    return (
      <div>
        {this.props.winner ? (
          <Winner ref="winner" winner={this.props.winner} />
        ) : (
          <Vote {...this.props} />
        )}
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    pair: state.getIn(["vote", "pair"]),
    winner: state.get("winner"),
    hasVoted: state.get("hasVoted"),
  };
}
export const VotingContainer = connect(
  mapStateToProps, 
  actionCreators
)(Voting);
