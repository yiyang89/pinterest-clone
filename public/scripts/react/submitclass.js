var SubmitImageComponent = React.createClass({
  getInitialState: function() {
    return {
      address: '',
      description: ''
    }
  },
  handleSubmit: function() {
    this.props.submitfunc(this.state.address.slice(), this.state.description.slice());
    this.setState({
      address: '',
      description: ''
    })
  },
  handlechangeaddress: function(event) {
    this.setState({address: event.target.value});
  },
  handlechangedescription: function(event) {
    this.setState({description: event.target.value});
  },
  render: function() {
    var dropdown;
    if (this.props.username) {
      // <a className="dropdown-item" onClick={this.logout}>Logout</a>
      // <a className="dropdown-item" href="/auth/google">Google+ Login</a>
      // <a className="dropdown-item">Dropdown form will go here.</a>
      dropdown = (
        <li className="nav-item dropdown btn-group">
            <a className="nav-link dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Post Image</a>
            <div className="dropdown-menu dropdown" aria-labelledby="dropdownMenu1">
              <input type="text" placeholder="Link it!" value={this.state.address} onChange={this.handlechangeaddress} />
              <input type="text" placeholder="Describe it!" value={this.state.description} onChange={this.handlechangedescription} />
              <button className="btn btn-default" onClick={this.handleSubmit}>Post it!</button>
            </div>
        </li>
      );
    } else {
      dropdown = null
    }
    return dropdown;
  }
})
