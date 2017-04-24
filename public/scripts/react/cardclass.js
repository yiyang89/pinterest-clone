var CardComponent = React.createClass({
  handlePin: function(userhaspinned, id) {
    // This function should have different properties depending on whether the user has pinned this post before.
    if (userhaspinned) {
      this.props.unpinfunc(id, this.props.username);
    } else {
      this.props.pinfunc(id, this.props.username);
    }
  },
  handleDelete: function(imageid) {
    // console.log("handle delete: " + imageid);
    this.props.deletefunc(imageid);
  },
  render: function() {
    var tempObj = {
      id: this.props.carddata._id,
      userhaspinned: this.props.carddata.likeData.includes(this.props.username),
      useruploaded: (this.props.carddata.postedby === this.props.username),
      data: this.props.carddata
    }
    var pincolor = tempObj.userhaspinned? "btn btn-default-dark" : "btn btn-default";
    var deletebutton = tempObj.useruploaded && this.props.showmyuploads? <button className="btn btn-danger" onClick={this.handleDelete.bind(null, tempObj.id)}><i className="fa fa-trash-o" aria-hidden="true"/></button> : '';
    return (
        <div className="grid-item card">
          <ImageComponent imageurl={this.props.carddata.link} postedby={this.props.carddata.postedby} caption={this.props.carddata.description}/>
          <div className="description-row">
            <div className="description-text">{this.props.carddata.description}<br/><div className="subtext">- {this.props.carddata.postedby}</div></div>
            {deletebutton}
            <button className={pincolor} onClick={this.handlePin.bind(null, tempObj.userhaspinned, tempObj.id)} disabled={this.props.username? false : true}><i className="fa fa-thumb-tack" aria-hidden="true"/> {this.props.carddata.likes}</button>
          </div>
        </div>
      );
  }
})
