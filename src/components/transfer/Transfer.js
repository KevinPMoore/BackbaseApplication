import React from 'react';
import './Transfer.css';

export default class Transfer extends React.Component{
    state = {
        amount: 0,
        fromAccount: '',
        toAccount: ''
    };

    render(){
        return(
            <section className='Transfer'>
                <div className='transfer-title'>
                    <h2>Make a Transfer</h2>
                </div>
                <form className='transfer-form' id='transfer-form'>
                    <fieldset form='tf'>
                        <label for='tfa'>From Account</label>
                        <input type='select' name='transfer-from-account' id='tfa'></input>
                        <label for='tta'>To Account</label>
                        <input type='select' name='transfer-to-account' id='tta'></input>
                        <label for='amount'>Amount</label>
                        <input type='number' name='transfer-amount' id='ta' min='0' step='0.01'></input>
                    </fieldset>
                    <button type='submit'>SUBMIT</button>
                </form>
            </section>
        );
    };
};