import React, { useState } from "react";
import styled from "styled-components";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
        bio,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
      <FormFields>
        <FormField>
          <WhiteLabel htmlFor="username">Username</WhiteLabel>
          <WhiteInput
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
        <FormField>
          <WhiteLabel htmlFor="password">Password</WhiteLabel>
          <WhiteInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </FormField>
        <FormField>
          <WhiteLabel htmlFor="password">Password Confirmation</WhiteLabel>
          <WhiteInput
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
          />
        </FormField>
        <FormField>
          <WhiteLabel htmlFor="imageUrl">Profile Image</WhiteLabel>
          <WhiteInput
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </FormField>
        <FormField>
          <WhiteLabel htmlFor="bio">Bio</WhiteLabel>
          <WhiteTextarea
            rows="3"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </FormField>
        <FormField>
          <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
        </FormField>
        <FormField>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </FormField>
      </FormFields>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormFields = styled.div`
  width: 400px;
`;

const WhiteLabel = styled(Label)`
  color: #4E79D4;
  font-size: 1.5em; 
  font-family: 'Press Start 2P', cursive;
`;

const WhiteInput = styled(Input)`
  color: black;
`;

const WhiteTextarea = styled(Textarea)`
  color: black;
`;

export default SignUpForm;
