import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faAddressBook, faCreditCard, faClipboardCheck, faStar, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Breadcrumbs = props => {
    const { currentStep } = props;

    const getSize = ( step ) => {
        return step === currentStep ? "2x" : "sm";
    }

    return (
        <div style={Breadcrumbs.styles.container}>
            <div style={Breadcrumbs.styles.innerContainer}>
          <FontAwesomeIcon icon={faShoppingCart} size={getSize('QUANTITY')}/>
          <FontAwesomeIcon icon={faChevronRight} size="xs"/>
          <FontAwesomeIcon icon={faAddressBook} size={getSize('CONTACT')}/>
          <FontAwesomeIcon icon={faChevronRight} size="xs"/>
          <FontAwesomeIcon icon={faCreditCard} size={getSize('BILLING')}/>
          <FontAwesomeIcon icon={faChevronRight} size="xs"/>
          <FontAwesomeIcon icon={faClipboardCheck} size={getSize('REVIEW_ORDER')}/>
          <FontAwesomeIcon icon={faChevronRight} size="xs"/>
          <FontAwesomeIcon icon={faStar} size={getSize('CONFIRMATION')}/>
          </div>
          </div>
    )
}

Breadcrumbs.propTypes = {
    currentStep: PropTypes.string,
}

Breadcrumbs.styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem',
        color: '#332E54'
        
    },
    innerContainer: {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}