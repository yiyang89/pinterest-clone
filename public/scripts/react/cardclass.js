var CardComponent = React.createClass({
  getInitialState: function() {
    return null;
  },
  render: function() {
    return (
      <div className="grid-item card">
        <ImageComponent imageurl={this.props.carddata.link}/>
        <div className="description-row">
          <div className="description-text">{this.props.carddata.description}</div>
          <button className="btn btn-default"><i className="fa fa-thumb-tack" aria-hidden="true"/> {this.props.carddata.likes}</button>
        </div>
      </div>
    )
  }
})
