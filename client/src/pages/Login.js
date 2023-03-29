import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Button } from "../styles";
import loginGif from "../images/loginGif.gif";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Wrapper>
      <Logo>Train World</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </Wrapper>
  );
}

const Logo = styled.h1`
  font-family: 'Press Start 2P', cursive;
  font-size: 3rem;
  color: #4E79D4;
  margin: 0;
`;

const Wrapper = styled.section`
  height: 100vh;
  background-image: url(${loginGif});
  background-repeat: no-repeat;
  background-size: cover; /* cover entire background */
  background-position: center; /* center the image */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  overflow: hidden; /* hide any overflow content, including the white border */

  & > form {
    position: relative;
    width: 400px;
    margin-top: 30px;
  }

  & > p {
    color: #fff; /* change font color to white */
  }
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;