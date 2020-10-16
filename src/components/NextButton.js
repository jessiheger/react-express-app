import React from 'react';
import PropTypes from 'prop-types';

const setNext = (currentStep) => {
    switch ( currentStep ) {
        case 'QUANTITY':
            return 'CONTACT';
        case 'CONTACT':
            return 'BILLING';
        case 'BILLING':
            return 'CONFIRMATION';
        default:
            return 'CONTACT';
    }
}



export const NextButton = props => {
    const { currentStep, setNextStep, isDisabled, submitNewOrder } = props;
    const nextStep = setNext(currentStep);

    const getNextButtonStyle = () => {
      return isDisabled ? { ...NextButton.styles.button, ...NextButton.styles.disabled } : NextButton.styles.button;
    }

    if (currentStep === 'QUANTITY' || currentStep === 'CONTACT') {
      return (
        <button 
          type="button" onClick={(e) => setNextStep(e, nextStep)} style={getNextButtonStyle()} disabled={isDisabled}>
        Next
        </button>        
      )
    } else if (currentStep === 'BILLING') {
      return (
          <button onClick= {(e) => submitNewOrder(e)} style={getNextButtonStyle()} disabled={isDisabled}>Submit Order</button>
      );
    }
    return null;
}

NextButton.propTypes = {
  currentStep: PropTypes.string.isRequired,
  setNextStep: PropTypes.func.isRequired,
  submitNewOrder: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

NextButton.styles = {
  button: {
    backgroundColor: 'rgb(51, 46, 84)',
    borderColor: 'rgb(51, 46, 84)',
    color: 'rgb(255, 255, 255)',
    borderRadius: '0.25rem',
    fontFamily: 'larssiet, "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, Verdana, sans-serif',
    padding: '1rem',
    cursor: 'pointer',
  },
  disabled: {
    backgroundColor: 'grey',
    borderColor: 'grey',
    cursor: 'not-allowed'
  }
}