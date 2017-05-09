import React from 'react';
import CardComponent from './cardclass';

class MosaicComponent extends React.Component{
  render() {
    // Filter here for even distribution.
    // My uploads
    // My Pins
    // Target user uploads
    var datacopy = this.props.data.slice();
    datacopy = datacopy.filter(function(carddata) {
        if (this.props.mypins && (!carddata.likeData.includes(this.props.username))) {
          return false;
        } else if (this.props.myuploads && (carddata.postedby !== this.props.username)) {
          return false;
        } else if (this.props.useruploads && (carddata.postedby !== this.props.uploadedname)) {
          return false
        } else {
          return true;
        }
    }.bind(this))
    var numcolumns;
    if (document.body.clientWidth < 800) {
      console.log("mobile resolution detected");
      console.log("viewport width: " + document.body.clientWidth);
      numcolumns = 2;
    } else {
      console.log("mobile resolution not detected");
      console.log("viewport width: " + document.body.clientWidth);
      numcolumns = 5;
    }
    // var masonrytemp = {'0': [0, []], '1':[0, []], '2':[0, []], '3':[0, []], '4': [0, []]};
    var masonrytemp = {};
    for (var i = 0; i < numcolumns; i++) {
      masonrytemp[i.toString()] = [0, []];
    }
    // Push into the column with the smallest height.
    for (var i = 0; i < datacopy.length; i++) {
      var heights = Object.keys(masonrytemp).map(function(key) {
        return masonrytemp[key][0];
      });
      var minheightindex = 0;
      var value = heights[0];
      for (var j = 1; j < heights.length; j++) {
        if (heights[j] < value) {
          value = heights[j];
          minheightindex = j;
        }
      }
      // Insert into this column. Update the height value for this column.
      masonrytemp[minheightindex][1].push(
        <CardComponent carddata={datacopy[i]} key={i} username={this.props.username} uploadedname={this.props.uploadedname} pinfunc={this.props.pinfunc} unpinfunc={this.props.unpinfunc} deletefunc={this.props.deletefunc} showmypins={this.props.mypins} showmyuploads={this.props.myuploads} showuseruploads={this.props.useruploads}/>
      );
      if (datacopy[i].height) {
        masonrytemp[minheightindex][0] += datacopy[i].height;
      } else {
        // Dimensions of the placeholder image.
        masonrytemp[minheightindex][0] += (133.69/252.84);
      }
    }

    return (
      <div className="grid-by-columns">
        {Object.keys(masonrytemp).map(function(column, i) {
          return <div className="grid-by-rows" key={i}>{masonrytemp[column][1]}</div>
        })}
      </div>
      );
    }
}

export default MosaicComponent;
