import React, { useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { AuthContext } from "../../store/AuthContext";
import Input from "../UI/Input/Input";
// const emailReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.val, isValid: action.val.includes("@") };
//   }
//   if (action.type === "USER_BLUR") {
//     return { value: state.value, isValid: state.value.includes("@") };
//   }
//   return { value: "", isValid: false };
// };

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      // console.log("ACTION", action);
      // console.log("STATE", state);
      return {
        value: action.valueOnChange,
        isValid: action.valueOnChange.includes("@"),
      };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    // return { ...state, isValid: action.val.includes("@") };
    default:
      // return { value: "", isValid: false };
      return state;
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        value: action.valueOnChange,
        isValid: action.valueOnChange.trim().length > 6,
      };
    case "INPUT_BLUR":
      console.log(state);
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    default:
      return state;
  }
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const ctxAuth = useContext(AuthContext);
  useEffect(() => {
    const emailForValidation = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    // The function in return will be executed after the first time useEffect() called and before all of the useEffect() calls from the second time and it will run when the component is removed from the DOM (when redirect to another page)
    return () => {
      console.log("Cleane  dUp");
      clearTimeout(emailForValidation);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    // console.log(event); onChange event
    dispatchEmail({ type: "USER_INPUT", valueOnChange: event.target.value });
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
    // console.log("Passwordvalid", passwordState.isValid);
    // console.log("Form valid", formIsValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", valueOnChange: event.target.value });
    // setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
    // console.log(passwordState);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctxAuth.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          label="E-Mail"
          isValid={emailState.isValid}
          id="email"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          label="Password"
          isValid={emailState.isValid}
          id="password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
