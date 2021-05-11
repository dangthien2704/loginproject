import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  const ctxAuth = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <button onClick={ctxAuth.onLogout}>Log out</button>
      {/* <button onClick={props.onLogout}>Log out</button> */}
    </Card>
  );
};

export default Home;
