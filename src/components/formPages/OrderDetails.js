import React from 'react';
import PropTypes from 'prop-types';

export const OrderDetails = props => {
    const { userInfo } = props;

    return (
        <div>
            <div style={OrderDetails.styles.singleIndent} >Quantity: {userInfo.quantity}</div>
            <div style={OrderDetails.styles.singleIndent}>Total: ${userInfo.total}</div>

            <h3>Contact Details:</h3>
            <div style={OrderDetails.styles.singleIndent}>Name: {userInfo.firstName} {userInfo.lastName}</div>
            <div style={OrderDetails.styles.singleIndent}>Email: {userInfo.email}</div>
            <div style={OrderDetails.styles.singleIndent}>Adress:</div>
            <div style={OrderDetails.styles.doubleIndent}>{userInfo.street1}</div>
            <div style={OrderDetails.styles.doubleIndent}>{userInfo.street2 ? userInfo.street2 : null}</div>
            <div style={OrderDetails.styles.doubleIndent}>{userInfo.city}, {userInfo.state} {userInfo.zip}</div>

            <h3>Payment Details:</h3>
            <div style={OrderDetails.styles.singleIndent}>Credit Card: -{userInfo.ccNum.substr(userInfo.ccNum.length - 4)}</div>
            <div style={OrderDetails.styles.singleIndent}>Exp: {userInfo.expiration}</div>
        </div> 
    )
}

OrderDetails.propTypes = {
    userInfo: PropTypes.object.isRequired,
};

OrderDetails.styles = {
    singleIndent : {
        margin: '0 0 1rem 1rem',
    },
    doubleIndent: {
        margin: '0 0 1rem 2rem'
    }
}

