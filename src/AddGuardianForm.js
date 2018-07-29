import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm,formValueSelector } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Please Enter the First Name'
  } else if ((!/^[a-zA-Z][A-Za-z0-9_!@#$%^&*()'."]+$/i.test(values.firstName))) {
    errors.firstName = 'Please Enter Vaild First Name'
  }
  if (!values.lastName) {
    errors.lastName = 'Please Enter the Last Name'
  } else if ((!/^[a-zA-Z][A-Za-z0-9_!@#$%^&*()'."]+$/i.test(values.lastName))) {
    errors.lastName = 'Please Enter Vaild Last Name'
  }
  if (!values.emailID) {
    errors.emailID = 'Please Enter the Email address'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailID)) {
    errors.emailID = 'Please Enter Vaild email address'
  }
  if(!values.phone){
    errors.phone = 'Please Enter the Phone number'
  }
  // else if (!/^[0-9]{11}/.test(values.contactNumber)) {
  //   errors.contactNumber = 'Please Enter the valid Contact Number'
  // }
  if (!values.relationship) {
    errors.relationship = 'Please Select the relationship'
  } 
  return errors
}

const normalizePhone = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};

const warn = values => {
  const warnings = {}
  if (values.password < 19) {
    warnings.password = 'Strength..'
  }
  return warnings
}

const renderField = ({ input, label,data, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label className="m-0" htmlFor={label}>{label}</label>
    <input className="form-control" {...input} placeholder={label} type={type}  value={data}/>
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

const renderPhoneNumber = ({ input, label,name, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label className="m-0" htmlFor={label}>{label}</label>
    <Field
            name="phone"
            className="form-control"
            component="input"
            type="text"
            placeholder="+1  (xxx) xxx-xxxx"
            normalize={normalizePhone}
          />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

const renderSelectField = ({ input, name, placeholder, label, options, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label className="mb-3">{label}</label>
    <Field name="relationship" component="select" className="form-control">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)


let AddGuardianForm = (props) => {
  const { handleSubmit, pristine, invalid, submitting, relationshipOptions } = props
  return (
    <form className="form my-2 my-lg-0" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-5 my-3">
          <Field name="firstName" type="text" component={renderField} label="First Name" />
        </div>
        <div className="col-md-5 my-3">
          <Field name="lastName" type="text" component={renderField} label="Last Name" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 my-3">
          <Field name="emailID" type="text" component={renderField} label="Email ID" />
        </div>
        <div className="col-md-5 my-3">
        <Field
            component={renderPhoneNumber}
            type="text"
            label="Contact Number"
            placeholder="Phone Number (999-999-9999)"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 my-3"> 
          <Field name="relationship" options={relationshipOptions} placeholder='Select Relationship'
            component={renderSelectField} label="Relation with the Guardian" />
        </div>
      </div>
      <div className="form-check row my-4">
      <button type="button" className="btn btn-primary" >Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={invalid || pristine || submitting}>Send Invitation</button>
      </div>
    </form>
  )
}

// export default reduxForm({
//   form: 'addGuardianForm',
//   validate,
//   warn
// })(AddGuardianForm);


AddGuardianForm = reduxForm({ form: 'addGuardianForm', validate, warn })(AddGuardianForm)

const selector = formValueSelector('addGuardianForm') // <-- same as form name
AddGuardianForm = connect(
  state => {
    // or together as a group
    const { firstName, lastName } = selector(state, 'firstName', 'lastName')
    return {
      fullName: `${firstName || ''} ${lastName || ''}`
    }
  }
)(AddGuardianForm)

export default AddGuardianForm

// AddGuardianForm = connect(
//   state => formValueSelector('addGuardianForm')(state, 'email', 'password')
// )(AddGuardianForm)