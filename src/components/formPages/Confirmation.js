import React from 'react';
import PropTypes from 'prop-types';
import { OrderDetails } from './OrderDetails';

export const Confirmation = props => {
    const { userInfo, currentStep, quantityAlreadyOrdered } = props;

    return (
        currentStep === 'REVIEW_ORDER' || currentStep === 'CONFIRMATION' ? 
            <div>
                {
                currentStep === "REVIEW_ORDER" ?
                    <h2>Review your Order</h2> 
                
                : currentStep === 'CONFIRMATION' ? 
                    <div>
                        <h2>Thank you! Order confirmed.</h2>
                        <h3>An email confirmation has been sent to {userInfo.email}.</h3>
                    </div>

                : <div></div>
                }
                <OrderDetails userInfo={userInfo} />
            </div>

        : currentStep === 'MAX_QUANTITY_REACHED' ?
        <div>
            <h2>Oops! It looks like a user with the same name and contact information has already reached the monthly limit of 3 magic potions.</h2>
            <h3>Please wait until next month to submit another order. Thanks!</h3>
        </div>

        : currentStep === 'WILL_EXCEED_MAX_QUANTITY' ? 
            <div>
                <h2>Oops! You've already ordered {quantityAlreadyOrdered} potions this month, and your selected quantity of [{userInfo.quantity}] would exceed our current monthly limit.</h2>
                <h3>Please submit a new order with a quantity selection of <span style={{fontWeight: 'bold'}}> [{3 - quantityAlreadyOrdered}</span>]. Thanks!</h3>
            </div>

        : currentStep === 'ERROR' ? 
        <div>
            <h2>There was an error processing your order. Please try again.</h2>            
        </div>

        : <div></div>
    )
}

Confirmation.propTypes = {
    axiosResponse: PropTypes.object.isRequired,
    currentStep: PropTypes.string.isRequired,
    userInfo: PropTypes.object.isRequired,
};
