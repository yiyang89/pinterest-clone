import React from 'react';

class DropdownComponent extends React.Component{

  handleMyUploads() {
    this.props.myuploadsfunc();
  }

  handleMyPins() {
    this.props.mypinsfunc();
  }

  render() {
    // Login is a single item
    // If logged in, display dropdown.
    var dropdown;
    if (this.props.username) {
      dropdown = (
        <li className="nav-item dropdown btn-group">
            <a className="nav-link dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.username}</a>
            <div className="dropdown-menu dropdown" aria-labelledby="dropdownMenu1">
              <a className="dropdown-item" onClick={this.props.mypinsfunc}>Pins</a>
              <a className="dropdown-item" onClick={this.props.myuploadsfunc}>Submissions</a>
              <a className="dropdown-item" onClick={this.props.logoutfunc}>Logout</a>
            </div>
        </li>
      );
    } else {
      dropdown = (
        <a className="nav-link" href="/auth/twitter">Login <i className="fa fa-twitter" aria-hidden="true"/></a>
      );
    }
    return dropdown;
  }

}

export default DropdownComponent;
