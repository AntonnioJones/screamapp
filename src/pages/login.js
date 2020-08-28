import React, { Component } from "react";
import {Link} from "react-router-dom"
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress'
import Axios from "axios";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    magin: "20px auto 20px auto",
  },
  pagetitle: {
    magin: "10px auto 20px auto",
  },
  textField: {
    magin: "20px auto 20px auto",
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError:{
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '10px'
  },
  progress: {
    position: 'absolute'
  }
};

export class login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    Axios.post("/login", userData)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img alt="logo"></img>
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <TextField
              id="password"
              name="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            {errors.general && (
              <Typography
                variants="body2"
                className={classes.customError}
              >
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>dont have an account ?<Link to="/signup">sign up</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(login);
