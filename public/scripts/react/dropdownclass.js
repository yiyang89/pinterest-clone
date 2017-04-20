var DropdownComponent = React.createClass({
  logout: function() {
    // Empty localstorage
    $.getJSON('/logout/'+this.props.token, function(result) {
      loginstatus = false;
      username = null;
      localStorage._decky_accesstoken = null;
      console.log("logged out.");
    });
  },
  render: function() {
    var dropdown;
    if (loginstatus) {
      dropdown = <a className="dropdown-item" onClick={this.logout}>Logout</a>;
    } else {
      dropdown = <a className="dropdown-item" href="/auth/google">Google+ Login</a>;
    }
    return dropdown;
  }
})
