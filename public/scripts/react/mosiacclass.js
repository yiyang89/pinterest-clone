var MosaicComponent = React.createClass({
  render: function() {
    // Divide items between 5 columns.
    // <img src={this.props.data[i].link}/>
    var masonrytemp = {'0': [], '1':[], '2':[], '3':[], '4': []};
    for (var i = 0; i < this.props.data.length; i++) {
      masonrytemp[i % 5].push(
        <CardComponent carddata={this.props.data[i]} key={i}/>
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
