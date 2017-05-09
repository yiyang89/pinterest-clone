import React from 'react';
import BrowseUserComponent from './browsebyuserclass';
import SubmitImageComponent from './submitclass';
import DropdownComponent from './dropdownclass';
import MosaicComponent from './mosiacclass';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    // class extends does not auto bind this to custom methods.
    this.logout = this.logout.bind(this);
    this.uploadimage = this.uploadimage.bind(this);
    this.likeimage = this.likeimage.bind(this);
    this.unlikeimage = this.unlikeimage.bind(this);
    this.deleteimage = this.deleteimage.bind(this);
    this.showall = this.showall.bind(this);
    this.myuploads = this.myuploads.bind(this);
    this.mypins = this.mypins.bind(this);
    this.useruploads = this.useruploads.bind(this);

    var login = this.props.servertoken? true : false;
    if (login) {
      localStorage._twitter_accesstoken = this.props.servertoken;
    }
    this.state = {
      username: this.props.username,
      accesstokenserver: this.props.servertoken,
      accesstokenlocal: localStorage._twitter_accesstoken,
      loggedin: login,
      imagearray: [],
      showmyuploads: false,
      showmypins: false,
      showuseruploads: false,
      showmosaic: true,
      usertarget: null
    }
  }

  componentDidMount() {
    if (localStorage._twitter_accesstoken) {
      console.log("Localstorage twitter accesstoken is not null");
      // User is currently logged in
        $.getJSON('/tokendetails/'+localStorage._twitter_accesstoken, function(result) {
          this.setState({
            username: result.profile.username,
            accesstokenserver: result.accessToken,
            accesstokenlocal: localStorage._twitter_accesstoken,
            loggedin: true,
            imagearray: result.data,
            userlist: Array.from(new Set(result.data.map(function(entry) {
              return entry.postedby;
            })))
          })
        }.bind(this))
    } else {
      $.getJSON('/api/getimages', function(result) {
        console.log(JSON.stringify(result));
        this.setState({
          imagearray: result,
          userlist: Array.from(new Set(result.map(function(entry) {
            return entry.postedby;
          })))
        });
      }.bind(this))
    }
  }

  logout() {
    // Empty localstorage
    $.getJSON('/logout/'+this.props.servertoken, function(result) {
      localStorage.removeItem("_twitter_accesstoken");
      this.setState({
        username: null,
        accesstokenserver: null,
        accesstokenlocal: null,
        loggedin: false,
        showmyuploads: false,
        showmypins: false
      });
      console.log("logged out.");
    }.bind(this));
  }

  uploadimage(address, description) {
    // Do some image uploading here.
    var params = "?&address=" + encodeURIComponent(address) + "&description=" + encodeURIComponent(description) + "&username=" + this.state.username;
    $.getJSON('/api/uploadimage/'+params, function(result) {
      if (result.error) {
        alert("Error: " + result.error);
      } else {
        console.log("received upload reply!");
        this.setState({
          imagearray: result
        });
      }
    }.bind(this));
  }

  likeimage(imageid, username) {
    var params = "?&imageid=" + imageid + "&username=" + username;
    $.getJSON('/api/likeimage/'+params, function(result) {
      if (result.error) {
        console.log(result.error);
      } else {
        console.log("received like reply!");
        this.setState({imagearray: result});
      }
    }.bind(this));
  }

  unlikeimage(imageid, username) {
    var params = "?&imageid=" + imageid + "&username=" + username;
    $.getJSON('/api/unlikeimage/'+params, function(result) {
      if (result.error) {
        console.log(result.error);
      } else {
        console.log("received unlike reply!");
        this.setState({imagearray: result});
      }
    }.bind(this));
  }
  
  deleteimage(imageid) {
    var params = "?&imageid=" + imageid;
    $.getJSON('/api/deleteimage/'+params, function(result) {
      if (result.error) {
        console.log(result.error);
      } else {
        console.log("received delete reply!");
        this.setState({
          imagearray: result,
          showmosaic: false
        });
        this.setState({
          showmosaic: true
        });
      }
    }.bind(this));
  }

  showall() {
    this.setState({
      showmyuploads: false,
      showmypins: false,
      showuseruploads: false
    });
  }

  myuploads() {
    this.setState({
      showmyuploads: true,
      showuseruploads: false,
      showmypins: false
    });
  }

  mypins() {
    this.setState({
      showmyuploads: false,
      showuseruploads: false,
      showmypins: true
    });
  }

  useruploads(userid) {
    console.log("useruploads called for userid: " + userid);
    this.setState({
      showuseruploads: true,
      showmyuploads: false,
      showmypins: false,
      usertarget: userid
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md navbar-dark teal">
            <div className="container">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#" onClick={this.showall}>
                    <strong>Pinterest Clone</strong>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav1">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    {this.state.userlist? <BrowseUserComponent userlist={this.state.userlist} useruploadfunc={this.useruploads}/> : null }
                    <SubmitImageComponent submitfunc={this.uploadimage} username={this.state.username}/>
                    <DropdownComponent loggedin={this.state.loggedin} username={this.state.username} myuploadsfunc={this.myuploads} mypinsfunc={this.mypins} logoutfunc={this.logout}/>
                </div>
            </div>
        </nav>
        <div className="Aligner">
        {this.state.showmosaic && this.state.imagearray.length > 0? <MosaicComponent username={this.state.username} uploadedname={this.state.usertarget} data={this.state.imagearray} pinfunc={this.likeimage} unpinfunc={this.unlikeimage} deletefunc={this.deleteimage} myuploads={this.state.showmyuploads} mypins={this.state.showmypins} useruploads={this.state.showuseruploads}/> : null}
        </div>
      </div>
    );
  }

}

export default AppComponent;
