import React from "react";
import {connect} from 'react-redux';
import Winner from "./Winner";
import * as actionCreators from "../action_creators";
class Results extends React.PureComponent<any> {
  getPair() {
    return this.props.pair || [];
  }
  getVotes(entry: string) {
    console.log(this.props);
    if (this.props.tally && this.props.tally.hasOwnProperty(entry)) {
      return this.props.tally[entry];
    }
    return 0;
  }
  render() {
    return (this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <div className="tally">
          {this.getPair().map((entry: string) => (
            <div key={entry} className="entry">
              <h1>{entry}</h1>
              <div className="voteCount">{this.getVotes(entry)}</div>
            </div>
          ))}
        </div>
        <div className="management">
        <button ref="next"
                className="next"
                onClick={this.props.next}>
          Next
        </button>
      </div>
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);