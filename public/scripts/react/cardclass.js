var CardComponent = React.createClass({
  // getInitialState: function() {
  //   return {
  //     id: this.props.carddata._id,
  //     userhaspinned: this.props.carddata.likeData.includes(this.props.username),
  //     useruploaded: (this.props.carddata.postedby === this.props.username),
  //     data: this.props.carddata
  //   };
  // },
  // handlePin: function() {
  //   // This function should have different properties depending on whether the user has pinned this post before.
  //   if (this.state.userhaspinned) {
  //     this.props.unpinfunc(this.state.id, this.props.username, this.setState({userhaspinned: false}));
  //   } else {
  //     this.props.pinfunc(this.state.id, this.props.username, this.setState({userhaspinned: true}));
  //   }
  // },
  // render: function() {
  //   var pincolor = this.state.userhaspinned? "btn btn-default-dark" : "btn btn-default";
  //   var deletebutton = this.state.useruploaded && this.props.showmyuploads? <button className="btn btn-danger" onClick={this.handleDelete}><i className="fa fa-trash-o" aria-hidden="true"/></button> : '';
  //   return (
  //       <div className="grid-item card">
  //         <ImageComponent imageurl={this.props.carddata.link}/>
  //         <div className="description-row">
  //           <div className="description-text">{this.props.carddata.description}<br/><div className="subtext">- {this.props.carddata.postedby}</div></div>
  //           {deletebutton}
  //           <button className={pincolor} onClick={this.handlePin}><i className="fa fa-thumb-tack" aria-hidden="true"/> {this.props.carddata.likes}</button>
  //         </div>
  //       </div>
  //     );
  // }

  getInitialState: function() {
    return {
      id: this.props.carddata._id,
      userhaspinned: this.props.carddata.likeData.includes(this.props.username),
      useruploaded: (this.props.carddata.postedby === this.props.username),
      data: this.props.carddata
    };
  },
  handlePin: function() {
    // This function should have different properties depending on whether the user has pinned this post before.
    if (this.state.userhaspinned) {
      this.props.unpinfunc(this.state.id, this.props.username, this.setState({userhaspinned: false}));
    } else {
      this.props.pinfunc(this.state.id, this.props.username, this.setState({userhaspinned: true}));
    }
  },
  handleDelete: function() {
    this.props.deletefunc(this.state.id);
  },
  render: function() {
    // console.log("username from card component: " + this.props.username);
    // console.log("postedby from card component: " + this.props.carddata.postedby);
    // console.log("useruploadedmatch from card component: " + this.state.useruploaded);
    // console.log("showuseruploads from card component: " + this.props.showuseruploads);
    var pincolor = this.state.userhaspinned? "btn btn-default-dark" : "btn btn-default";
    var deletebutton = this.state.useruploaded && this.props.showmyuploads? <button className="btn btn-danger" onClick={this.handleDelete}><i className="fa fa-trash-o" aria-hidden="true"/></button> : '';
    var cardjsx =
        <div className="grid-item card">
          <ImageComponent imageurl={this.props.carddata.link}/>
          <div className="description-row">
            <div className="description-text">{this.props.carddata.description}<br/><div className="subtext">- {this.props.carddata.postedby}</div></div>
            {deletebutton}
            <button className={pincolor} onClick={this.handlePin}><i className="fa fa-thumb-tack" aria-hidden="true"/> {this.props.carddata.likes}</button>
          </div>
        </div>
    ;
    var renderjsx;
    if (!this.props.showmypins && !this.props.showmyuploads && !this.props.showuseruploads) {
      console.log("Show all filter");
      renderjsx = cardjsx;
    } else if (this.props.showmypins && this.state.userhaspinned) {
      console.log("Show my pins filter");
      renderjsx = cardjsx;
    } else if (this.props.showmyuploads && this.state.useruploaded) {
      console.log("Show my uploads filter");
      renderjsx = cardjsx;
    } else if (this.props.showuseruploads && (this.props.carddata.postedby === this.props.uploadedname)) {
      // console.log("Rendering card for user: "+this.props.username);
      console.log("Show user uploads filter");
      renderjsx = cardjsx;
    } else {
      renderjsx = null;
    }
    // var renderjsx = ({!this.props.mypins && !this.props.myuploads? cardjsx : null}
    // {this.props.mypins && this.state.userhaspinned? cardjsx : null}
    // {this.props.myuploads && this.state.useruploaded? cardjsx : null})
    // console.log(JSON.stringify(this.props.carddata));
    return renderjsx;
  }
})
