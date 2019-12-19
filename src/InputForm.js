import React, {
    useState,
    useEffect
  } from "react";
  import {
    withFormik,
    Form,
    Field
  } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  import "./App.css"
  
  const UserForm = ({
    values,
    errors,
    touched,
    status
  }) => {
    const [yousers, setYousers] = useState([]);
    useEffect(() => {
      console.log(
        "status has changed",
        status
      );
  status &&setYousers(yousers =>[...yousers, status])
    }, [status]);
  
    return (
      <div className="user-info">
        <Form className="form">
          <label htmlFor="name" >
            Full Name:
          </label>
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
          {touched.name &&
            errors.name && (
              <p className="errors">
                {errors.name}
              </p>
            )}
          <label htmlFor="email">Email address</label>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="@email address"
          />
          {touched.email && errors.email && (
            <p className="errors">
              {errors.email}
            </p>
          )}
  
  <label htmlFor="password">Password * </label>
  {touched.password && errors.password && <p>{errors.password}</p>}
              <Field type="text" name="password" placeholder="Password" />
          
          <label
            htmlFor="tos"
            className="checkbox-container"
          >
            Accept Terms of Service
            <Field
              id="tos"
              type="checkbox"
              name="tos"
              checked={values.tos}
            />
              {touched.tos && errors.tos && (
            <p className="errors">
              {errors.tos}
            </p>)}
            <span className="checkmark" />
          </label>
        
          <button type="submit">
            Submit!
          </button>
        </Form>
       
        {yousers.map(youser => (
          <div key={youser.id}>
             <div className="user-results">
            <p>Name: {youser.name}</p>
            <p>Email: {youser.email}</p>
            <p>Password: {youser.password}</p>
            <p>Accepted Terms of Service {youser.tos}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const FormikUserForm = withFormik({
    mapPropsToValues({
      name,
      email,
      password,
      tos
    }) {
      return {
        name: name || "",
        email: email || "",
        tos: tos || false,
        password: password || ""
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required()
        .min(6, "Name must be 6 characters or longer")
        .required("Name is required"),
      email: Yup.string().required()
      .email("Email not valid"),
      password: Yup.string().required()
      .min(6, "password must be 6 characters or longer")
      .required("Password is required"),
      tos: Yup.boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
    }),
    handleSubmit(values, { setStatus, resetForm }) {
      console.log("submitting", values);
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          console.log("success", res);
          setStatus(res.data);
          resetForm()
        })
        .catch(err =>
          console.log(err.response)
        );
    }
  })(UserForm);
  
  export default FormikUserForm;
  