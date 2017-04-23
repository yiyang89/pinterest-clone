var MosaicComponent = React.createClass({
  render: function() {
    // Filter here for even distribution.
    // My uploads
    // My Pins
    // Target user uploads
    // var datacopy = this.props.data.slice();
    // var indextoremove = [];
    // for (var i = 0; i < datacopy.length; i++) {
    //   if (this.props.mypins && (!datacopy[i].likeData.includes(this.props.username))) {
    //     indextoremove.push(i);
    //   } else if (this.props.myuploads && (datacopy[i].postedby !== this.props.username)) {
    //     indextoremove.push(i);
    //   } else if (this.props.useruploads && (datacopy[i].postedby !== this.props.uploadedname)) {
    //     indextoremove.push(i)
    //   }
    // }
    // for (var i = indextoremove.length - 1; i >= 0; i--) {
    //   datacopy.splice(indextoremove[i], 1);
    // }

    // Divide items between 5 columns.
    console.log("rerendering mosaic");
    var masonrytemp = {'0': [], '1':[], '2':[], '3':[], '4': []};
    for (var i = 0; i < this.props.data.length; i++) {
      masonrytemp[i % 5].push(
        <CardComponent carddata={this.props.data[i]} key={i} username={this.props.username} uploadedname={this.props.uploadedname} pinfunc={this.props.pinfunc} unpinfunc={this.props.unpinfunc} deletefunc={this.props.deletefunc} showmypins={this.props.mypins} showmyuploads={this.props.myuploads} showuseruploads={this.props.useruploads}/>
        );
    }
    return (
      <div className="grid-by-columns">
        <div className="grid-by-rows">{masonrytemp[0]}</div>
        <div className="grid-by-rows">{masonrytemp[1]}</div>
        <div className="grid-by-rows">{masonrytemp[2]}</div>
        <div className="grid-by-rows">{masonrytemp[3]}</div>
        <div className="grid-by-rows">{masonrytemp[4]}</div>
      </div>
      );
  }
})

// Placeholder image courtesy of http://www.jennybeaumont.com/post-placeholders/
