import React, { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

const CustomLabel = styled.label`
  color: #4E79D4;
  font-size: 1.5em;
  font-family: 'Press Start 2P', cursive;
`;

function LoginForm({ onLogin }) {

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      fetch("/login", {
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
        console.log(`Error: ${error}`)
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
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit">
          {formik.isSubmitting ? "Loading..." : "Login"}
        </Button>
      </FormField>
      <FormField>
        {formik.errors &&
        Object.values(formik.errors).map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default LoginForm;
