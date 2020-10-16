import React from 'react';
import PropTypes from 'prop-types';

export const Confirmation = props => {
    const { axiosResponse, userInfo, currentStep } = props;

    return (
        currentStep === 'CONFIRMATION' ? 
        <div>
            <h2>Thank you! Order confirmed.</h2>

            <h3>An email confirmation has been sent to the email address provided.</h3>

            <div style={{margin: '0 0 1rem 1rem'}} >Quantity: {userInfo.quantity}</div>
            <div style={{margin: '0 0 1rem 1rem'}}>Total: ${userInfo.total}</div>

            <h3>Contact Details:</h3>
            <div style={{margin: '0 0 1rem 1rem'}}>Name: {userInfo.firstName} {userInfo.lastName}</div>
            <div style={{margin: '0 0 1rem 1rem'}}>Email: {userInfo.email}</div>
            <div style={{margin: '0 0 1rem 1rem'}}>Adress:</div>
            <div style={{margin: '0 0 1rem 2rem'}}>{userInfo.street1}</div>
            <div style={{margin: '0 0 1rem 2rem'}}>{userInfo.street2 ? userInfo.street2 : null}</div>
            <div style={{margin: '0 0 1rem 2rem'}}>{userInfo.city}, {userInfo.state} {userInfo.zip}</div>

            <h3>Payment Details:</h3>
            <div style={{margin: '1rem'}}>Credit Card: -{userInfo.ccNum.substr(userInfo.ccNum.length - 4)}</div>

        </div>
        : currentStep === 'ERROR' ? 
        <div>
            <h2>There was an error processing your order. Please try again.</h2>            
        </div>
        : currentStep === 'DUPLICATE_USER' ?
        <div>
            <h2>So sorry! It looks like a user with the same name and contact information has already submitted an order.</h2>
        </div>
        : <div></div>
    )
}

Confirmation.propTypes = {
    axiosResponse: PropTypes.object.isRequired,
    currentStep: PropTypes.string.isRequired,
    userInfo: PropTypes.object.isRequired,
};
