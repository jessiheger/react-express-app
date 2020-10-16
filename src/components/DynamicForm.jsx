import React from 'react';
import PropTypes from 'prop-types';
import { CustomInput } from './CustomInput';

export const DynamicForm = props => {
    const { addToOrder, formFields, removeFromErrorList } = props;

    return (
        <div>
            {formFields.map(field => {
                return (
                    <CustomInput
                    label={field.label}
                    name={field.name}
                    key={field.name}
                    placeholder={field.placeholder ? field.placeholder : ''}
                    message={field.message}
                    required={field.required}
                    validation={field.validation ? field.validation : null}
                    addToOrder={addToOrder}
                    removeFromErrorList={removeFromErrorList}
                    ></CustomInput>
                )
            })}
        </div>
        );
  };

  DynamicForm.propTypes = {
    addToOrder: PropTypes.func.isRequired,
    formFields: PropTypes.array.isRequired,
    removeFromErrorList: PropTypes.func.isRequired,
};