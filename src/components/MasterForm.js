import axios from "axios";
import React, { useEffect, useState } from "react";

import { BillingFields, ContactFields } from '../utils/formFields';
import { Breadcrumbs } from './Breadcrumbs';
import { Confirmation } from './formPages/Confirmation';
import { DynamicForm } from "./formPages/DynamicForm";
import { NextButton } from './NextButton'
import { PreviousButton } from './PreviousButton'
import { Quantity } from './formPages/Quantity';

export const MasterForm = () => {
    const [ userInfo, setUserInfo ] = useState({"quantity": 1, "total": "49.99"});
    const [ currentStep, setCurrentStep ] = useState("QUANTITY");
    const [ formFields, setFormFields ] = useState([]);
    const [ errors, setErrors ] = useState([]);
    const [ quantityAlreadyOrdered, setQuantityAlreadyOrdered ] = useState(0);
    const addressFields = ["street1", "street2", "city", "state", "zip"]
    const paymentFields = ["ccNum", "exp"];

    const MAX_ALLOWED = 3;

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

    const clearUserInfo = () => setUserInfo({"quantity": 1, "total": "49.99"})
 
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
                if (res.data.length === 0) {
                    setCurrentStep(nextStep)
                } else {
                    const userOrders = res.data;
                    const numAlreadyOrdered = userOrders.reduce( function(cnt , order){ return cnt + order.quantity; }, 0)
                    setQuantityAlreadyOrdered(numAlreadyOrdered);
                    if (numAlreadyOrdered === MAX_ALLOWED) {
                        setCurrentStep('MAX_QUANTITY_REACHED')
                    }
                    else if (numAlreadyOrdered + userInfo.quantity > MAX_ALLOWED) {
                        setCurrentStep('WILL_EXCEED_MAX_QUANTITY')
                    }
                    else {
                        setCurrentStep(nextStep);
                    }
                }
            }).catch(error => {
                console.log(error);
                setCurrentStep('ERROR');
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
        <div style={MasterForm.styles.title}>Magic Potion Order</div>
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
                userInfo={userInfo}
                quantityAlreadyOrdered={quantityAlreadyOrdered}/>
            <div style={MasterForm.styles.buttonContainer}>
                <PreviousButton
                    currentStep={currentStep}
                    clearUserInfo={clearUserInfo}
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
          width: '450px',
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
      },
      title: {
        fontFamily: '"Trebuchet MS", "sans-serif"',
        fontSize: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1.5rem',
      }
  }