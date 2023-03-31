import React from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";


function SignUpForm({ onLogin }) {
 
  
  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
    image_url: yup.string().required(),
    bio: yup.string().required(),
  });



  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      image_url: "",
      bio: "",
    },
    validationSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          setSubmitting(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors(err.errors));

          }
        })
        .catch((error) => {
          setSubmitting(false);
          console.error(error);
        });
    },
  });

  return (
    <Wrapper>
    <form onSubmit={formik.handleSubmit}>
    <FormFields>
      <FormField>
      <WhiteLabel htmlFor="username">Username</WhiteLabel>
        <WhiteInput
          type="text"
          id="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <WhiteLabel htmlFor="password">Password</WhiteLabel>
        <WhiteInput
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <WhiteLabel htmlFor="passwordcConfirmation">Password Confirmation</WhiteLabel>
        <WhiteInput
          type="password"
          id="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <WhiteLabel htmlFor="image_url">Profile Image</WhiteLabel>
        <WhiteInput
          type="text"
          id="image_url"
          value={formik.values.image_url}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <WhiteLabel htmlFor="bio">Bio</WhiteLabel>
        <WhiteTextarea
          rows="3"
          id="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
      <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Sign Up"}
        </Button>
      </FormField>
      <FormField>
        {formik.errors &&
          Object.values(formik.errors).map((err) => (
            <Error key={err}>{err}</Error>
          ))
        }
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

