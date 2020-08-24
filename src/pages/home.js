import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "../App.css";
import axios from "axios";
import Scream from '../components/Scream'

export class home extends Component {
  state = {
    screams: null,
  };
  componentDidMount() {
    axios
      .get(
        "/screams"
      )
      .then((res) => {
        this.setState({
          screams: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map((scream,index) => {
        return <Scream key={index} scream={scream} />
      })
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          content...
        </Grid>
      </Grid>
    );
  }
}

export default home;
