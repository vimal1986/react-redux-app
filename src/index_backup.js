import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { sendGuardianDetails, getRelationship, onNextClick } from '../../../redux/onboarding/AddGuardian/actions';
import {
    sendVerificationLink,
} from '../../../redux/onboarding/SetUserId/actions';
import { Input, ScreenCover, CoreoWizScreen, CoreoWizFlow, Button, SelectBox } from '../../../components';
import { checkEmail, checkEmpty, checkTextNotStartWithNumber,checkLength } from '../../../utils/validations';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import { MENUS, BUTTONS } from '../../../constants/config';
import { UserProfileType } from '../../../constants/constants';
import { getMatch } from '../../../utils/array_function';
import NumberFormat from 'react-number-format';
import AddGuardianForm from './AddGuardianForm';

export class AddGuardian extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            emailId: '',
            contactNumber: '',
            relationshipId: null,
            isInvitationSent: false,
            isEmptyForm: true,
            isFormValid: true,
            errorMessageForEmptyFields: '',
            errorMessageForValidFields: '',
            isError:false
        };
        this.handleSelect = this.handleSelect.bind(this)
        this.arr = [];
        this.errorMessage = 0;
    };

    componentDidMount() {
        this.props.getRelationship();
    }

    onClickButtonNext = () => {
        this.props.onClickNext();
    }

    onClickButtonSkip = () => {
        this.props.onClickNext();
    }

    onClickSendInvitation = (e) => {
        e.preventDefault()
        if (!this.handleValidation()) {
            this.setState({ isInvitationSent: false });
            this.setState({ isError: true });
            console.log(this.handleValidation());
        }
        else {
            let data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailId: this.state.emailId,
                contactNumber: this.state.contactNumber,
                relationshipId: this.state.relationshipId
            }
            this.props.onClickSendInvitation(data);
            this.setState({
                isFormValid: true, isInvitationSent: true, isEmptyForm: true,
                firstName: '', lastName: '', emailId: '', contactNumber: '',
                relationshipId: null
            });
        }
    }
    setErrorMessage = (field_id, emptyFields) => {
        if (!this.arr.includes(field_id)) this.arr.push(field_id)
        return getMatch(this.arr, emptyFields);
    }

    onChange = phoneNumber => {
      console.log(phoneNumber);

        this.setState({ contactNumber: phoneNumber })
    };

    validate = () => {
        
    };

    handleValidation = (e) => {
        let isError = false;
        const errors = {
          firstNameError: "",
          lastNameError: "",
          emailError: "",
          passwordError: ""
        };
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let emailId = this.state.emailId;
        let contactNumber = this.state.contactNumber;
        let emptyFields = [];
        let inValidFields = [];
        let isEmptyForm = true;
        let isValidForm = true;
        let element = e ? e.target.id : '';
        console.log(element);
        // if(element == "firstName"){
            if (checkEmpty(firstName)) {
                isError = true;
                errors.firstNameError ="Please Enter the First Name";
            }
            else if (!checkTextNotStartWithNumber(firstName)) {
                isError = true;
                errors.firstNameError ="Please Enter the valid First Name";
            }else {
                this.arr.splice(this.arr.indexOf("firstName"),1)
                console.log(this.arr);
            }
        // }
        
        
            if (checkEmpty(lastName)) {
                isError = true;
                errors.lastNameError ="Please Enter the valid Last Name";
            }
            else if (!checkTextNotStartWithNumber(lastName)) {
                isError = true;
                errors.lastNameError ="Please Enter the valid Last Name";
            }else {
                this.arr.splice(this.arr.indexOf("lastName"),1)
                console.log(this.arr);
            }
        

        
            if (checkEmpty(emailId)) {
                isError = true;
                errors.emailError ="Please Enter the valid Email";
            }
            else if (!checkEmail(emailId)) {
                isError = true;
                errors.emailError ="Please Enter the valid Email";
            }else {
                this.arr.splice(this.arr.indexOf("emailId"),1)
                console.log(this.arr);
            }

        

        if (checkEmpty(contactNumber)) {
            emptyFields.push(' Contact Number,');
            isEmptyForm = false;
        }
        else if (!checkLength(contactNumber)) {
            inValidFields.push(' Contact Number');
            isValidForm = false;
        }

        if (this.state.relationshipId === null) {
            emptyFields.push(' Relation');
            isEmptyForm = false;
        }

        let removeEmptyFieldsComma = emptyFields[emptyFields.length - 1];
        emptyFields.pop();
        if (removeEmptyFieldsComma) {
            emptyFields.push(removeEmptyFieldsComma.replace(/,\s*$/, ""));
        }

        let removeinValidFieldsComma = inValidFields[inValidFields.length - 1];
        inValidFields.pop();
        if (removeinValidFieldsComma) {
            inValidFields.push(removeinValidFieldsComma.replace(/,\s*$/, ""));
        }
        // this.setErrorMessage(e.target.id,emptyFields);
        this.setState({
            errorMessageForEmptyFields: this.setErrorMessage(element, emptyFields),
            errorMessageForInValidFields: inValidFields,
            isFormValid: isValidForm,
            isEmptyForm: isEmptyForm,
            arr:this.arr
        });
        console.log(this.arr);
        console.log()
        const membersToRender = this.state.errorMessageForEmptyFields
        this.errorMessage = membersToRender.length
        this.setState({
            isError,
            ...errors
      });
      console.log(this.state.isError);
        return isEmptyForm && isValidForm;
    }

    handleKeyPress = (event) => {
        // console.log("HI");
    }

    handleSelect = (e) => {
        
        this.setState({ relationshipId: e });
    }   
    
    showResults(data){
        console.log(data);
    }

    render() {
        const menus = [MENUS.CONTACT];
        const footerButtons = [BUTTONS.SKIP, BUTTONS.NEXT];
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const emailId = this.state.emailId;
        const contactNumber = this.state.contactNumber;

        const NavigationData = this.props.profileType === 'Individual' ? CoreoWizNavigationData : GuardianNavigationData;
        const relationshipOptions = this.props.relationship.map((relation, i) => {
            relation.label = relation.name;
            relation.value = relation.id;
            return relation;
        });
        

        return (
            <ScreenCover isLoading={this.props.isLoading}>
                <CoreoWizScreen menus={menus} footerButtons={footerButtons} activeFlowId={5} isNextDisabled={!this.state.isInvitationSent}
                    isSkipDisabled={firstName !== '' || lastName !== '' || emailId !== '' || contactNumber !== ''}
                    onNextClick={this.onClickButtonNext} onSkipClick={this.onClickButtonSkip}>
                    <div className="container-fluid mainContent px-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 py-5 px-0">
                                <h4 className="font-weight-normal mb-4">Add Guardian <small className="font-weight-normal font-italic">(optional)</small></h4>
                                {
                                    this.props.isInvitationSent &&
                                    <div>
                                        <span className="text-success SentSuccess">An invitation has been sent to <strong>{this.props.firstName} {this.props.lastName}</strong>.</span>
                                        <p className="font-weight-bold">Send another invitation</p>
                                    </div>
                                }
                                <AddGuardianForm onSubmit={this.showResults}/>
                                <form className="form my-2 my-lg-0">
                            
                                    <div className="row">
                                        <div className="col-md-5 my-3">
                                            <Input
                                                name="firstName"
                                                label="First Name"
                                                data-txt="df"
                                                autoComplete="off"
                                                type="text"
                                                placeholder="e.g. Stephen"
                                                maxlength="100"
                                                className={"form-control " + (!this.state.isFormValid && !firstName && 'inputFailure')}
                                                value={firstName}
                                                textChange={(e) => this.setState({ firstName: e.target.value, isFormValid: true, isEmptyForm: true })}
                                                onBlur={this.handleValidation}
                                            />
                                            {this.state.isError && (this.state.firstNameError!="" && this.state.arr.indexOf("firstName") > -1 ) && 
                                            <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">
                                                {this.state.firstNameError}
                                            </span>}
                                        </div>
                                        <div className="col-md-5 my-3">
                                            <Input
                                                name="lastName"
                                                label="Last Name"
                                                autoComplete="off"
                                                type="text"
                                                placeholder="e.g. Smith"
                                                maxlength="100"
                                                className={"form-control " + (!this.state.isFormValid && !lastName && 'inputFailure')}
                                                value={lastName}
                                                textChange={(e) => this.setState({ lastName: e.target.value, isFormValid: true, isEmptyForm: true })}
                                                onBlur={this.handleValidation}
                                            />                                            
                                            {this.state.isError && (this.state.lastNameError!="" && this.state.arr.indexOf("lastName") > -1  ) && 
                                            <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">
                                                {this.state.lastNameError}
                                            </span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 my-3">
                                            <Input
                                                name="emailID"
                                                label="Email ID"
                                                autoComplete="off"
                                                type="email"
                                                placeholder="e.g. abc@healthcare.com"
                                                maxlength="100"
                                                className={"form-control " + (!this.state.isFormValid && !emailId && 'inputFailure')}
                                                value={emailId}
                                                textChange={(e) => this.setState({ emailId: e.target.value, isFormValid: true, isEmptyForm: true })}
                                                onBlur={this.handleValidation}
                                            />
                                            {this.state.isError && (this.state.emailError!="" && this.state.arr.indexOf("emailID") > -1 ) && 
                                            <span className="text-danger d-block mb-2 MsgWithIcon MsgWrongIcon">
                                                {this.state.emailError}
                                            </span>}
                                        </div>
                                        <div className="col-md-5 my-3">
                                            <div className="form-group">
                                                <label className="m-0" htmlFor="Contact Number">Contact Number<i>*</i></label>
                                               
                                                <NumberFormat 
                                                className={"form-control " + (!this.state.isFormValid && !contactNumber && 'inputFailure')}
                                                format="+1 (###) ###-####" placeholder="+1  (xxx) xxx-xxxx" mask="_"  
                                                onValueChange={(values) => this.setState({contactNumber: values.formattedValue})}/>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-5 my-3">
                                            <Input
                                                name="contactNumber"
                                                label="Contact Number"
                                                autoComplete="off"
                                                type="text"
                                                placeholder="+1  xxx  xxx  xxxx"
                                                maxlength="25"
                                                className={"form-control " + (!this.state.isFormValid && !contactNumber && 'inputFailure')}
                                                value={contactNumber}
                                                onKeyPress={this.handleKeyPress}
                                                textChange={(e) => {
                                                    const re = /^[0-9 \b]+$/;
                                                    if (e.target.value == '' || re.test(e.target.value || e.target.length < 18)) {
                                                        this.setState({ contactNumber: e.target.value.replace(/(\d{3})/g, "$1 ").replace("        ", '-'), isFormValid: true, isEmptyForm: true })
                                                    }
                                                }}
                                                onBlur={this.handleValidation}
                                            />
                                        </div> */}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 my-3">
                                            <label className="mb-3">Relation with the Guardian</label>
                                            <SelectBox
                                                options={relationshipOptions}
                                                simpleValue
                                                placeholder='Select Relationship'
                                                onChange={this.handleSelect}
                                                // onChange={(value) => { this.setState({ relationshipId: value, isFormValid: true, isEmptyForm: true }); }}
                                                selectedValue={this.state.relationshipId}
                                                className={"" + (!this.state.isFormValid && !this.state.relationshipId && 'inputFailure')}
                                                onBlur={this.handleValidation}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-check row my-4">
                                    <Button
                                            type="button"
                                            classname="btn btn-primary"
                                            label="Cancel"
                                            // onClick={this.onClickSendInvitation}
                                        />
                                        <Button
                                            type="submit"
                                            classname="btn btn-primary"
                                            label="Send Invitation"
                                            onClick={this.onClickSendInvitation}
                                        />
                                        
                                    </div>
                                    {(!this.state.isEmptyForm && this.errorMessage > 0) &&
                                        <div className="MsgWithIcon MsgWrongIcon">
                                            <span className="text-danger d-block mt-4 mb-2">
                                                Please Enter {this.state.errorMessageForEmptyFields}
                                            </span>
                                        </div>
                                    }
                                    {!this.state.isFormValid &&
                                        <div className="MsgWithIcon MsgWrongIcon">
                                            <span className="text-danger d-block mt-4 mb-2">
                                                Please Enter Valid {this.state.errorMessageForInValidFields}
                                            </span>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </CoreoWizScreen>
                <CoreoWizFlow coreoWizNavigationData={NavigationData} activeFlowId={this.props.profileType === UserProfileType.Individual ? 5 : 6} />
            </ScreenCover>
        )
    }
}

AddGuardian.propTypes = {
    relationship: PropTypes.array,
    isInvitationSent: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isLoading: PropTypes.bool,
    onClickSendInvitation: PropTypes.func,
    getRelationship: PropTypes.func
}

function mapDispatchToProps(dispatch) {
    return {
        onClickSendInvitation: (data) => dispatch(sendGuardianDetails(data)),
        getRelationship: () => dispatch(getRelationship()),
        sendVerificationLink: (data) => dispatch(sendVerificationLink(data)),
        onClickNext: () => dispatch(onNextClick()),
    }
}

function mapStateToProps(state) {
    return {
        relationship: state.onboardingState.addGuardianState.relationship,
        isInvitationSent: state.onboardingState.addGuardianState.isInvitationSent,
        firstName: state.onboardingState.addGuardianState.firstName,
        lastName: state.onboardingState.addGuardianState.lastName,
        isLoading: state.loadingState.isLoading,
        profileType: state.onboardingState.profileTypeState.profileType
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddGuardian));
