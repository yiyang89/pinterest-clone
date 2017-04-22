var AppComponent = React.createClass({
  getInitialState: function() {
    var login = accessTokenFromServer? true : false;
    if (login) {
      localStorage._twitter_accesstoken = accessTokenFromServer;
    }
    return {
      username: username,
      accesstokenserver: accessTokenFromServer,
      accesstokenlocal: localStorage._twitter_accesstoken,
      loggedin: login,
      imagearray: []
    }
  },
  componentWillMount: function() {
    if (localStorage._twitter_accesstoken) {
      // User is currently logged in
        $.getJSON('/tokendetails/'+localStorage._twitter_accesstoken, function(result) {
          this.setState({
            username: result.profile.username,
            accesstokenserver: result.accessToken,
            accesstokenlocal: localStorage._twitter_accesstoken,
            loggedin: true
          })
        }.bind(this))
    }
    $.getJSON('/api/getimages', function(result) {
      this.setState({imagearray: result});
    }.bind(this))
  },
  logout: function() {
    // Empty localstorage
    $.getJSON('/logout/'+accessTokenFromServer, function(result) {
      localStorage._twitter_accesstoken = null;
      this.setState({
        username: null,
        accesstokenserver: null,
        accesstokenlocal: null,
        loggedin: false
      });
      console.log("logged out.");
    }.bind(this));
  },
  uploadimage: function(address, description) {
    // Do some image uploading here.
    var params = "?&address=" + encodeURIComponent(address) + "&description=" + encodeURIComponent(description) + "&username=" + this.state.username;
    $.getJSON('/api/uploadimage/'+params, function(result) {
      console.log("received reply!");
      console.log(JSON.stringify(result));
      this.setState({imagearray: result});
    }.bind(this));
    // Refresh the display area.
  },
  render: function() {
    // <StatusComponent username={this.state.username} accesstoken={this.state.accesstokenserver}/>
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-dark teal">
            <div className="container">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">
                    <strong>Pinterest Clone</strong>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav1">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <BrowseUserComponent/>
                    <SubmitImageComponent submitfunc={this.uploadimage} username={this.state.username}/>
                    <DropdownComponent loggedin={this.state.loggedin} username={this.state.username} logoutfunc={this.logout}/>
                </div>
            </div>
        </nav>
        <div className="Aligner">
        <MosaicComponent username={this.state.username} data={this.state.imagearray}/>
        </div>
      </div>
    );
  }
});
