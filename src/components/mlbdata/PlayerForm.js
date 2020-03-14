import React from "react";
import { Field, reduxForm } from "redux-form";
import "./PlayerShow.css";

class PlayerForm extends React.Component {
  renderInput = ({ input, label }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field
            name="firstName"
            component={this.renderInput}
            label={<CustomFirstNameLabel />}
          />
          <Field
            name="lastName"
            component={this.renderInput}
            label={<CustomLastNameLabel />}
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const CustomFirstNameLabel = () => {
  const labelStyle = {
    color: "white"
  };
  return <label style={labelStyle}>Enter First Name</label>;
};

const CustomLastNameLabel = () => {
  const labelStyle = {
    color: "white"
  };
  return <label style={labelStyle}>Enter Last Name</label>;
};

const validate = formValues => {
  const errors = {};

  if (!formValues.firstName) {
    errors.firstName = "You must enter a first name of a player";
  }

  if (!formValues.lastName) {
    errors.lastName = "You must enter a last name of a player";
  }

  return errors;
};

export default reduxForm({
  form: "playerForm",
  validate
})(PlayerForm);
