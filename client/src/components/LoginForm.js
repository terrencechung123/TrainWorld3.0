import React from "react";
import { Button, Error, Input, FormField, Textarea } from "../styles";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

const CustomLabel = styled.label`
  color: #4E79D4;
  font-size: 1.5em;
  font-family: 'Press Start 2P', cursive;
`;


function SignUpForm({ onLogin }) {
 
  
  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
    imageUrl: yup.string().required(),
    bio: yup.string().required(),
  });



  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      imageUrl: "",
      bio: "",
    },
    validationSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/signup", {
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
    <form onSubmit={formik.handleSubmit}>
      <FormField>
        <CustomLabel htmlFor="username">Username</CustomLabel>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="password">Password</CustomLabel>
        <Input
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="passwordcConfirmation">Password Confirmation</CustomLabel>
        <Input
          type="password"
          id="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="imageUrl">Profile Image</CustomLabel>
        <Input
          type="text"
          id="imageUrl"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <CustomLabel htmlFor="bio">Bio</CustomLabel>
        <Textarea
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
    </form>
  );
}

export default SignUpForm;