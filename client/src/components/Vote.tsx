import React from "react";

export default class Vote extends React.PureComponent<any> {
  getEntries() {
    return this.props.entries || [];
  }
  hasVotedFor(entry: any) {
    return this.props.hasVoted === entry;
  }
  render() {
    return (
      <div className="voting">
      {this.getEntries().map((entry:string) =>
        <button key={entry}
                onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
          {this.hasVotedFor(entry) ?
            <div className="label">Voted</div> : null}
        </button>
      )}
    </div>
    );
  }
}
