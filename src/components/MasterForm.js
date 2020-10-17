import axios from "axios";
import React, { useEffect, useState } from "react";

import { BillingFields, ContactFields } from '../utils/formFields';
import { Breadcrumbs } from './Breadcrumbs';
import { Confirmation } from './Confirmation';
import { DynamicForm } from "./DynamicForm";
import { NextButton } from './NextButton'
import { PreviousButton } from './PreviousButton'
import { Quantity } from './Quantity';

export const MasterForm = () => {
    const [ userInfo, setUserInfo ] = useState({"quantity": 1, "total": "49.99"});
    const [ currentStep, setCurrentStep ] = useState("QUANTITY");
    const [ formFields, setFormFields ] = useState([]);
    const [ errors, setErrors ] = useState([]);
    const addressFields = ["street1", "street2", "city", "state", "zip"]
    const paymentFields = ["ccNum", "exp"];

    useEffect (() => {
        switch (currentStep) {
            case 'CONTACT':
                setFormFields(ContactFields);
                break;
            case 'BILLING':
                setFormFields(BillingFields);
                break;
            default:
                setFormFields([]);
        }
    }, [currentStep]);

    useEffect(() => {
        const errors = [];
        formFields.forEach( field => field.required ? errors.push(field.name) : null);
        setErrors(errors);
    }, [formFields])
 
    const setPreviousStep = prevStep => setCurrentStep(prevStep);
    
    const setNextStep = (e, nextStep) => {
        e.preventDefault();
        if (currentStep === 'CONTACT') {
            axios({
                method: 'post',
                url: '/api/magic/checkForUser',
                data: userInfo
            })
            .then( res => {
                if (res.data.data.length === 0) {
                    setCurrentStep(nextStep)
                } else {
                    setCurrentStep('DUPLICATE_USER');
                }
            }).catch(error => {
                console.log(error);
                setCurrentStep(nextStep);
            });
        }
        setCurrentStep(nextStep)
    }

    const addToOrder = (fieldName, val) => {
        let newState = Object.assign({}, userInfo);
        newState[fieldName] = val;
        setUserInfo(newState);
    };

    const transformPayload = () => {
        let payload = {};

        const address = addressFields.reduce((acc, field) => {
            acc[field] = userInfo[field]
            return acc;
        }, {});
        payload["address"] = address;

        const payment = paymentFields.reduce((acc, field) => {
            acc[field] = userInfo[field];
            return acc;
        }, {});
        payload["payment"] = payment;

        Object.keys(userInfo).map(key => {
            if ( !addressFields.includes(key) && !paymentFields.includes(key)) {
                payload[key] = userInfo[key]
            }
        });
          return payload;
    }

    const submitNewOrder = (e) => {
        e.preventDefault();
        const payload = transformPayload();

        axios({
            method: 'post',
            url: '/api/magic',
            data: payload
        })
        .then( res => {
            setCurrentStep('CONFIRMATION');
        }).catch(error => {
            console.log(error);
            setCurrentStep('ERROR');
        });
    };

    const removeFromErrorList = (validFieldName) => {
        let errorList = errors.filter(fieldNameWithError => fieldNameWithError !== validFieldName);
        setErrors(errorList);
    }

  
    return (
      <div style={MasterForm.styles.container}>
        <Breadcrumbs currentStep={currentStep} />
        <form style={MasterForm.styles.form}>
            <Quantity 
                addToOrder={addToOrder}
                currentStep={currentStep} />
            <DynamicForm 
                addToOrder={addToOrder} 
                removeFromErrorList={removeFromErrorList}
                formFields={formFields} />
            <Confirmation
                currentStep={currentStep}
                userInfo={userInfo}/>
            <div style={MasterForm.styles.buttonContainer}>
                <PreviousButton
                    currentStep={currentStep}
                    setPreviousStep={setPreviousStep} />
                <NextButton 
                    currentStep={currentStep}
                    setNextStep={setNextStep}
                    submitNewOrder={submitNewOrder}
                    isDisabled={errors.length > 0}/>
            </div>
        </form>
      </div>
    );
  };

  MasterForm.styles = {
      container: {
          width: '100%',
          minWidth: '400px',
          fontFamily: 'larssiet, "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, AppleGothic, Verdana, sans-serif',

      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '2rem',
        border: '1px solid rgb(237, 237, 240)',
        overflowY: 'auto',
      },
      buttonContainer: {
          display: 'flex',
          justifyContent: 'space-between',
      }
  }