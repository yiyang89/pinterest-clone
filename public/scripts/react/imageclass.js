import React from 'react';
const PLACEHOLDER_IMAGE="/images/placeholder.gif"

var ImageComponent = React.createClass({
  render: function() {
    // Display lightbox on click.
    // return <img src={this.props.imageurl} onError={(e)=>{e.target.src=PLACEHOLDER_IMAGE}}/>;
    // Lightbox source downloaded from http://lokeshdhakar.com/projects/lightbox2/
    // Placeholder image courtesy of http://www.jennybeaumont.com/post-placeholders/
    var caption = this.props.caption + " - " + this.props.postedby;
    return <a href={this.props.imageurl} data-lightbox={this.props.imageurl} data-title={caption}><img src={this.props.imageurl} onError={(e)=>{e.target.src=PLACEHOLDER_IMAGE}}/></a>;
  }
})

export default ImageComponent;
