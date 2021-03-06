import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Quantity = props => {
    const { currentStep, addToOrder, userInfo } = props;
    const [quantity, setQuantity ] = useState(1);
    const [total, setTotal ] = useState(userInfo.total);

    useEffect(() => {
        setTotal(userInfo.total);
        setQuantity(userInfo.quantity);
    }, [userInfo])

    useEffect(() => {
            setTotal((49.99 * quantity).toString());
    }, [quantity]);

    useEffect(() => {
        addToOrder("total", total)
    }, [total])

    const onChange = (val) => {
        setQuantity(parseInt(val, 10));
        addToOrder("quantity", parseInt(val, 10));
    }

    return (
        currentStep === 'QUANTITY' ? 
            <div>
                <div style={Quantity.styles.rowContainer}>
                    <label>Quantity</label>
                    <select name="quantity" onChange={(e) => onChange(e.target.value)} style={Quantity.styles.select}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>
                <div style={Quantity.styles.rowContainer}>Total: ${total} </div>
            </div>
        : <div></div>
    )
}

Quantity.propTypes = {
    addToOrder: PropTypes.func.isRequired,
    currentStep: PropTypes.string.isRequired,
};

Quantity.styles = {
    select: {
        padding: '.25rem',
        fontFamily: 'larssiet, "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, Verdana, sans-serif',
        marginLeft: '10px',
        borderRadius: '.25rem',
        width: '15%',
    },
    rowContainer: {
        marginBottom: '1rem'
    }
}
