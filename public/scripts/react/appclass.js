var AppComponent = React.createClass({
  getInitialState: function() {

        var login = accessTokenFromServer? true : false;
        if (login) {
          localStorage._decky_accesstoken = accessTokenFromServer;
        }
        return {
          username: username,
          accesstokenserver: accessTokenFromServer,
          accesstokenlocal: localStorage._decky_accesstoken,
          loggedin: login
        }

  },
  componentWillMount: function() {
    if (localStorage._decky_accesstoken) {
      // User is currently logged in
        $.getJSON('/tokendetails/'+localStorage._decky_accesstoken, function(result) {
          this.setState({
            username: result.profile.name.givenName,
            accesstokenserver: result.accessToken,
            accesstokenlocal: localStorage._decky_accesstoken,
            loggedin: true
          })
        }.bind(this))
    }
  },
  logout: function() {
    // Empty localstorage
    $.getJSON('/logout/'+accessTokenFromServer, function(result) {
      localStorage._decky_accesstoken = null;
      this.setState({
        username: null,
        accesstokenserver: null,
        accesstokenlocal: null,
        loggedin: false
      });
      console.log("logged out.");
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-dark bg-primary">
            <div className="container">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">
                    <strong>Navbar</strong>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav1">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <DropdownComponent loggedin={this.state.loggedin} username={this.state.username} logoutfunc={this.logout}/>
                </div>
            </div>
        </nav>
        <div className="Aligner">
          <StatusComponent username={this.state.username} accesstoken={this.state.accesstokenserver}/>
          <div className="card">
            <p className="card-text">
              Select login from the dropdown menu. This prompts the following behaviour:
            </p>
            <ul className="list-group">
              <li className="list-group-item">OAuth to google via passport</li>
              <li className="list-group-item">Google auth and redirect</li>
              <li className="list-group-item">Access token saved to back end db (access token + username)</li>
              <li className="list-group-item">Access token passed to front end and saved in local storage</li>
            </ul>
          </div>
          <div className="card">
            <p className="card-text">
              On page load, the following is executed:
            </p>
            <ul className="list-group">
              <li className="list-group-item">Check local storage for access token</li>
              <li className="list-group-item">Ajax call to server for auth status</li>
              <li className="list-group-item">Server response (auth or no auth)</li>
              <li className="list-group-item">Components rendered according to auth status</li>
            </ul>
          </div>
          <div className="card">
            <p className="card-text">
              For this template, access tokens have no timeout value.
            </p>
          </div>
        </div>
      </div>
    );
  }
});
