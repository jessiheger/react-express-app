import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { breadcrumbIcons } from '../utils/icons';

export const Breadcrumbs = props => {
    const { currentStep } = props;

    const getSize = ( step ) => {
        return step === currentStep ? "2x" : "sm";
    }

    return (
        <div style={Breadcrumbs.styles.container}>
            <div style={Breadcrumbs.styles.innerContainer}>
                {breadcrumbIcons.map( (icon) => {
                    return (
                        <div style={Breadcrumbs.styles.iconAndChevron}>
                            <FontAwesomeIcon icon={icon.iconName} size={getSize(icon.stepName)} />
                            {icon.hasNextStep ? <div style={{paddingLeft: '2rem'}}><FontAwesomeIcon icon={faChevronRight} size="xs"/></div> : <div></div>}
                        </div>
                    )
                })
                }
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
    },
    iconAndChevron: {
        display: 'flex',
        alignItems: 'center',
    }
}