import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { sendGuardianDetails, getRelationship, onNextClick } from '../../../redux/onboarding/AddGuardian/actions';
import {
    sendVerificationLink,
} from '../../../redux/onboarding/SetUserId/actions';
import {  ScreenCover, CoreoWizScreen, CoreoWizFlow} from '../../../components';
import { CoreoWizNavigationData } from '../../../data/CoreoWizNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import { MENUS, BUTTONS } from '../../../constants/config';
import { UserProfileType } from '../../../constants/constants';
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

    onClickSendInvitation = (data) => {
        console.log(data);
        let datavalue = {
            firstName: data.firstName,
            lastName: data.lastName,
            emailId: data.emailId,
            contactNumber: data.phone,
            relationshipId: data.relationshipId
        }
        this.props.onClickSendInvitation(data);
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
                                <AddGuardianForm onSubmit={this.onClickSendInvitation}/>
                                
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
