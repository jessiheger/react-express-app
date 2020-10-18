import React from 'react';
import PropTypes from 'prop-types';

export const OrderDetails = props => {
    const { userInfo } = props;

    return (
        <div>
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
            <div style={{margin: '1rem'}}>Exp: {userInfo.exp}</div>
        </div> 
    )
}

OrderDetails.propTypes = {
    userInfo: PropTypes.object.isRequired,
};

export default OrderDetails;
