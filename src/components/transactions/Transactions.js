import React from 'react';
import Mock from './mocktransactions.json';
import PLACEHOLDERIMAGE from './icons/texaco.png';
import './Transactions.css';

//hide the 'search by typing label from view but not screen readers'
//add downward carat to DATE
export default class Transactions extends React.Component{
    state = {
        filter: '',
        search: '',
        transactionHistory: Mock.data
    };

    updateSearch = (ev) => {
        this.setState({
            search: ev.target.value
        });
        this.handleSearchTransactions();
    };

    //
    //RESUME WORK HERE
    //
    handleSearchTransactions = () => {
        if(this.state.search === '') {
            this.setState({
                transactionHistory: Mock.data
            });
        } else{
            let searchedTransactions = [];
            searchedTransactions.push(this.state.transactionHistory.filter(transaction =>
                transaction.merchant.name.toLowerCase().includes(this.state.search)
            ));
            this.setState({
                transactionHistory: searchedTransactions
            });
        };
    };

    handleFilterTransactions = () => {

    };

    //
    //This is not clearing
    //
    renderTransactionHistory = (history) => {
        let transactionList = history.map(transaction =>
            <li className='transaction-item' key={transaction.categoryCode + transaction.transaction.amountCurrency.amount}>
                <div className={transaction.merchant.name} id='vertical-bar'></div>
                <div className='transaction-date'>
                    {transaction.dates.valueDate}
                </div>
                <img className='transaction-logo' src={PLACEHOLDERIMAGE} alt='a company logo'></img>
                <div className='transaction-info'>
                    <p className='transaction-company'>
                        {transaction.merchant.name}
                    </p>
                    <p className='transaction-type'>
                        {transaction.transaction.type}
                    </p>
                </div>
                <p className='transaction-amount'>
                    -{transaction.transaction.amountCurrency.amount}
                </p>
            </li>
        );

        return(
            <ol className='transaction-list'>
                {transactionList}
            </ol>
        );
    };

    render(){
        return(
            <section className='Transactions'>
                <div className='transactions-title'>
                    <h2>Recent Transactions</h2>
                </div>
                <form className='transactions-form' id='transactions-form'>
                    <fieldset form='transactions-form'>
                        <label htmlFor='transactions-search'>Search by typing...</label>
                        <input type='text' className='transactions-search' id='transactions-search' placeholder='Search by typing...' onChange={this.updateSearch}></input>
                        <span>Sort by</span>
                        <button className='transactions-date-drop'>DATE</button>
                        <button className='transactions-beneficiary'>BENEFICIARY</button>
                        <button className='transactions-amount'>AMOUNT</button>
                    </fieldset>
                </form>
                {this.renderTransactionHistory(this.state.transactionHistory)}
            </section>
        );
    };
};