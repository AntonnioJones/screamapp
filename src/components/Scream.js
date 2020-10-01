import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NavButtons from "../util/NavButtons";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from 'react-redux';

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

export class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    )
      return true;
    else return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId)
  }

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId)
  }

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated
      }
    } = this.props;

    const likeButton = !authenticated ? (
      <NavButtons tip="like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </NavButtons>
    ) : (
      this.likedScream() ? (
        <NavButtons tip="undo like" onclick={this.unlikeScream}>
          <FavoriteIcon color="primary" />
        </NavButtons>
      ) : (
        <NavButtons tip="undo like" onclick={this.likeScream}>
          <FavoriteBorder color="primary" />
        </NavButtons>
      )
    );
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color={"primary"}
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount}</span>
          <NavButtons tip="comments">
            <ChatIcon color="primary" />
          </NavButtons>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
