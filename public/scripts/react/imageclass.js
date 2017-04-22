var ImageComponent = React.createClass({
  getInitialState: function() {
    return {
      imagesource: this.props.imageurl
    };
  },
  handleError: function() {
    this.setState({
      imagesource: "/images/placeholder.gif"
    });
  },
  render: function() {
    return <img src={this.state.imagesource} onError={this.handleError}/>;
  }
})
