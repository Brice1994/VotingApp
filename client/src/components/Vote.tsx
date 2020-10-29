import React from "react";

export default class Vote extends React.PureComponent<any> {
  getEntries(): string[] {
    return this.props.entries || [];
  }
  render() {
    return (
      <div className="voting">
      {this.getEntries().map((entry:string) =>
        <button key={entry}
                onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
        </button>
      )}
    </div>
    );
  }
}
