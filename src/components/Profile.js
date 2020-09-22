import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI stuff
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

//Icons

const stypes = {};

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imagteUrl, bio, website, location },
        loading,
      },
    } = this.props;

    let profileMarkup = !loading ? (authenticated ? (
        <Paper className = {classes.paper}>
            <div className={classes.profile} >
                <div className="profile-image">
                    <img src={imageUrl} alt="profile" />
                </div>
                <hr/>
                <div className="profile-details">

                </div>
            </div>
        </Paper>
    ) : (<p>no logged in</p>)) : (<p>loading...</p>)

    return profileMarkup;
  }
}

const mapStateToProps = (state) => {
  user: state.user;
};

Profile.PropTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default RTCPeerConnectionIceEvent(mapStateToProps)(
  withStyles(styles)(Profile)
);
