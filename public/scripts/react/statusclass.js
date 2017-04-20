var StatusComponent = React.createClass({
  render: function() {
    return (<div>
      <div className="card-text">Username: {this.props.name}</div>
      <div className="card-text">Access token: {this.props.token}</div>
      </div>)
  }
})
