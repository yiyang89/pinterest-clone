import React from 'react';

class BrowseUserComponent extends React.Component{
  handleSelectName(username) {
    this.props.useruploadfunc(username);
  }

  render() {
    // Login is a single item
    // If logged in, display dropdown.
    var dropdown = (
        <li className="nav-item dropdown btn-group">
            <a className="nav-link dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Browse By User</a>
            <div className="dropdown-menu dropdown" aria-labelledby="dropdownMenu1">
            {this.props.userlist.map(function(username, i) {
              return <a className="dropdown-item" key={i} onClick={this.handleSelectName.bind(null, username)}>{username}</a>;
            }.bind(this))}
            </div>
        </li>
      );
    return dropdown;
  }

}

export default BrowseUserComponent;
