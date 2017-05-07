import React from 'react';

class StatusComponent extends React.Component{
  render() {
    var tokentrimmed = this.props.accesstoken? this.props.accesstoken.slice(0, 15) : null;
    return (<div className="card">
      <div className="card-text">Username: {this.props.username}</div>
      <div className="card-text">Access token: {tokentrimmed}</div>
      </div>)
  }
}

export default StatusComponent;
