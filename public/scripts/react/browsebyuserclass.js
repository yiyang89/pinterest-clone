var BrowseUserComponent = React.createClass({
  render: function() {
    // Login is a single item
    // If logged in, display dropdown.
    var dropdown = (
        <li className="nav-item dropdown btn-group">
            <a className="nav-link dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Browse By User</a>
            <div className="dropdown-menu dropdown" aria-labelledby="dropdownMenu1">
                <a className="dropdown-item">There's nothing here yet</a>
            </div>
        </li>
      );
    return dropdown;
  }
})
