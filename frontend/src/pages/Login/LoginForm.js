import React, { useState, useEffect } from "react";
import { Button, TextField, Container, Typography, InputAdornment, IconButton, Box, FormControlLabel, Checkbox } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

import "./loginForm.css";

// Better form handling with Formik
import { Formik } from "formik";
// Validation schema for Yup
import * as yup from "yup";

/* Validation of input in the login form */
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
  rememberMe: false,
};

const LoginForm = ({ onNavigateToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* Handler for response from GOOGLE API */
  async function handleCallbackResponse(res) {
    // console.log("Encoded JWT ID token: " + res.credential);

    try {
      // decode the jwt encoded user object
      var userObject = jwt_decode(res?.credential);

      // Send a POST request to your server with the user data
      const loggedInResponse = await fetch(
        "http://localhost:8080/auth/loginGoogle", 
        {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              email: userObject.email,
              firstName: userObject.given_name,
              lastName: userObject.family_name,
              image: userObject.picture,
              // googleId: userObject.sub,
          }),
        }
      );
      
      const loggedIn = await loggedInResponse.json();
      
      
      
      if (!loggedInResponse.ok) {
        // throw new Error("Network response was not ok: ${loggedInResponse.statusText}");
        setErrorMessage(loggedIn.error);
        return;
      }

      // console.log(loggedIn);
      if (loggedIn) {
        // Use state modifier to store token and user
        if (loggedIn.set2FA) {
          navigate('/sendcode', { state: { loggedIn } });
        } else {
          // Use state modifier to store token and user
          dispatch(
            setLogin({
              token: loggedIn.token,
              user: loggedIn.user,
            })
          );
          localStorage.setItem("token", loggedIn.token);
          localStorage.setItem("email", loggedIn.user.email);
          
        }  
        
      } else {
        setErrorMessage(loggedIn.error);
      }
    } catch (error) {
        console.error("Error during login:", error);
        // Handle error accordingly
    }
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "290841881270-560ekdio0feevgbulfvhnscked96d591.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large", shape: "pill"}
    );

    google.accounts.id.prompt();
  }, []);

  /* Handler for click on register button */
  const handleRegisterClick = () => {
    navigate("/Register");
  };

  /* Handler for login */
  const login = async (values, onSubmitProps) => {
    // Send the data from the form to mongoDB
    const loggedInResponse = await fetch(
      "http://localhost:8080/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const loggedIn = await loggedInResponse.json();
      
    if (loggedIn && loggedInResponse.ok) {  
      if (loggedIn.set2FA) {
        navigate('/sendcode', { state: { loggedIn } });
      } else {
        onSubmitProps.resetForm();
        // Use state modifier to store token and user
        dispatch(
          setLogin({
            token: loggedIn.token,
            user: loggedIn.user,
          })
        );
        localStorage.setItem("token", loggedIn.token);
        localStorage.setItem("email", loggedIn.user.email);
        
      }  
      
    } else {
      setErrorMessage(loggedIn.error);
    }
  };

  const handleSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Login
      </Typography>
      <Formik 
        onSubmit={handleSubmit} 
        initialValues={initialValuesLogin} 
        validationSchema={loginSchema}
      >
        {({ values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
            submitCount,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              size="medium"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email) && submitCount > 0}
              helperText={(touched.email && errors.email && submitCount > 0) ? errors.email : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              sx={{ 
                bgcolor: "#fbf2cf",
                "& label.Mui-focused": {
                  color: "#6b9466",  // Color of the label when input is focused
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#a1c298",
                  },
                  "&:hover fieldset": {
                    borderColor: "#88b083",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6b9466",
                  },
                },
             }}
            />
            <TextField
              label="Password"
              size="medium"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              variant="outlined"
              margin="normal"
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password) && submitCount > 0}
              helperText={(touched.password && errors.password && submitCount > 0) ? errors.password : ""}
              required
              fullWidth
              // autoFocus
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              sx={{ 
                bgcolor: "#fbf2cf",
                "& label.Mui-focused": {
                  color: "#6b9466",  // Color of the label when input is focused
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#a1c298",
                  },
                  "&:hover fieldset": {
                    borderColor: "#88b083",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6b9466",
                  },              
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

<Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center" 
              width="100%" 
              mt={0} 
              mb={1}>
              {/* Forgot Password Button */}
              <Box textAlign="left" width="100%">
                <Button
                  type="button"
                  variant="text"
                  sx={{ 
                    color: "#000",
                    fontSize: "0.75rem",
                    "&:hover": {
                      color: "#455A64",
                      backgroundColor: "transparent", // Ensure that the background color doesn"t change
                    }
                  }}
                  onClick={handleForgotPasswordClick}
                >
                  Forgot Password?
                </Button>
              </Box>
              <Box textAlign="right" width="100%">
                <FormControlLabel
                  control={
                    <Checkbox 
                        name="rememberMe"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.rememberMe} 
                        sx={{
                            color: "#a1c298",  // Default (unchecked) color
                            '&.Mui-checked': {
                                color: "#fa7070",  // Checked color
                            },
                        }}
                    />
                  }
                  label="Remember Me"
                  sx={{ 
                    "&& span": {
                        fontSize: "0.8rem", 
                        color: "#000",
                    },
                    "&:hover": {
                        color: "#455A64",
                    },
                    ".MuiCheckbox-root": {
                        padding: "0 9px 0 0",  // Reducing padding to get label closer
                    }
                  }}
                />
              </Box>
            </Box>
            
            {/* Error Message on invalid credentials or unsuccessfull login attempt */}
            {errorMessage && (
              <Typography variant="body2" sx={{ color: "red", fontWeight: "bold", mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                  mt: 1, 
                  backgroundColor: "#fa7070",
                  color: "#fff",
                  "&:hover": {
                      backgroundColor: "#e64a4a",  // Darker red on hover
                  }
              }}
            >
              Login
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ 
                  mt: 2, 
                  backgroundColor: "#455A64",
                  color: "#FFFFFF",
                  "&:hover": {
                      backgroundColor: "#607D8B",
                  }
              }}
              onClick={handleRegisterClick}
            >
              Don't have an account? Register
            </Button>
            
            {/* Google Sign in Button */}
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              width="100%" 
              mt={2} 
              mb={1}
            >
              <div id="signInDiv"></div>
            </Box>

          </form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
