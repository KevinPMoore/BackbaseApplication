import React from 'react';
import Mock from './mocktransactions.json';
import './Transactions.css';

//hide the 'search by typing label from view but not screen readers'
//add downward carat to DATE
export default class Transactions extends React.Component{
    state = {
        search: '',
        filter: ''
    };

    render(){
        return(
            <section className='Transactions'>
                <div className='transactions-title'>
                    <h2>Recent Transactions</h2>
                </div>
                <form className='transactions-form' id='transactions-form'>
                    <fieldset form='transactions-form'>
                        <label for='transactions-search'>Search by typing...</label>
                        <input type='text' className='transactions-search' id='transactions-search' placeholder='Search by typing...'></input>
                        <span>Sort by</span>
                        <button className='transactions-date-drop'>DATE</button>
                        <button className='transactions-beneficiary'>BENEFICIARY</button>
                        <button className='transactions-amount'>AMOUNT</button>
                    </fieldset>
                </form>
                <div className='transactions-list'>

                </div>
            </section>
        );
    };
};