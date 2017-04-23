const PLACEHOLDER_IMAGE="/images/placeholder.gif"

var ImageComponent = React.createClass({
  render: function() {
    return <img src={this.props.imageurl} onError={(e)=>{e.target.src=PLACEHOLDER_IMAGE}}/>;
  }
})
