import React from 'react';
import PropTypes from 'prop-types';

const setPrev = (currentStep) => {
    switch ( currentStep ) {
        case 'REVIEW_ORDER':
            return 'BILLING';
        case 'BILLING':
            return 'CONTACT';
        case 'CONTACT':
        case 'CONFIRMATION':
        case 'ERROR':
        case 'DUPLICATE_USER':
            return 'QUANTITY';
        default:
            return 'QUANTITY';
    }
  }

export const PreviousButton = props => {
    const { currentStep, setPreviousStep, clearUserInfo } = props;
    const previousStep = setPrev(currentStep);
    const buttonText = currentStep === 'CONFIRMATION' || currentStep === 'MAX_QUANTITY_REACHED' || currentStep === 'WILL_EXCEED_MAX_QUANTITY'? 'Submit New Order' : 'Previous';

    const handleOnClick = () => {
            clearUserInfo();
            setPreviousStep(previousStep);
    }

    if (currentStep !== 'QUANTITY') {
        return (
            <button 
            type="button" onClick={handleOnClick} style={PreviousButton.styles.button}>
            {buttonText}
            </button>
        )
    }
    return null;
}

PreviousButton.propTypes = {
    currentStep: PropTypes.string.isRequired,
    setPreviousStep: PropTypes.func.isRequired,
};

PreviousButton.styles = {
    button: {
        backgroundColor: 'rgb(51, 46, 84)',
        borderColor: 'rgb(51, 46, 84)',
        color: 'rgb(255, 255, 255)',
        borderRadius: '0.25rem',
        fontFamily: 'larssiet, "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, Verdana, sans-serif',
        padding: '1rem',
        cursor: 'pointer',
    }
}