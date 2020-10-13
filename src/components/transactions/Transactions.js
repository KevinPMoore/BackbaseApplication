import React from 'react';
import Mock from './mocktransactions.json';
import PLACEHOLDERIMAGE from './icons/texaco.png';
import './Transactions.css';

export default class Transactions extends React.Component{
    state = {
        date: 'collapse',
        search: '',
        sort: '',
        transactionHistory: Mock.data
    };

    updateDate = () => {
        if(this.state.date === 'collapse') {
            this.setState({
                date: 'show'
            });
        } else {
            this.setState({
                date: 'collapse'
            });
        };
    };

    updateSort = (ev) => {
        if(ev.target.value === this.state.sort) {
            this.setState({
                sort: ''
            });
            this.handleSortTransactions();
        } else {
            this.setState({
                sort: ev.target.value
            });
            this.handleSortTransactions();
        };
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
            console.log('searchedTransactions are ', searchedTransactions);
            
            /*this is the part that breaks it for some reason*/
            /*
            this.setState({
                transactionHistory: searchedTransactions
            });
            */
        };
    };

    //
    //Is there a more DRY way to do this???
    //This needs to sort Mock by criteria
    //
    handleSortTransactions = () => {
        function mergeSortTransactions(transactionsArray) {
            if(transactionsArray.length <= 1) {
                return transactionsArray;
            };
            
            const middle = Math.floor(transactionsArray.length/2);
            const left = transactionsArray.slice(0, middle);
            const right = transactionsArray.slice(middle);

            return merge(mergeSortTransactions(left), mergeSortTransactions(right));
        };

        function merge(left, right) {
            let resultArray = [], leftIndex = 0, rightIndex = 0;

            while(leftIndex < left.length && rightIndex < right.length) {
                if(left[leftIndex] < right[rightIndex]) {
                    resultArray.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    resultArray.push(right[rightIndex]);
                    rightIndex++;
                };
            };

            return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        };

        switch(this.state.sort) {
            case 'ascending':
                console.log('this will sort from the earliest to latest transaction');
                break;
            case 'descending':
                console.log('this will sort from the most recent to the oldest transaction');
                break;
            case 'beneficiary':
                console.log('this will sort by merchant.name alphabetically');
                break;
            case 'amount':
                console.log('this will sory by amountCurrency.amount in descending order');
                break;
            default:
                console.log('this should be the original order');
        }
    };

    standardizeDate = (date) => {
        const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
        const fixedDate = new Date(date);
        let [month, day] = fixedDate.toLocaleDateString().split('/');
        return monthNames[month] + day;
    };

    renderDateSorts = () => {
        if(this.state.date === 'show') {
            return(
                <div className='transfers-date-buttons'>
                    <button className='transfers-date-ascending' type='button' value='ascending' onClick={this.updateSort}>ASC.</button>
                    <button className='transfers-date-descending' type='button' value='descending' onClick={this.updateSort}>DESC.</button>
                </div>
            );
        };
    };

    renderTransactionHistory = (history) => {
        let transactionList = history.map(transaction =>
            <li className='transaction-item' key={transaction.categoryCode + transaction.transaction.amountCurrency.amount}>
                <div className={transaction.merchant.name} id='vertical-bar'></div>
                <div className='transaction-date'>
                    {this.standardizeDate(transaction.dates.valueDate)}
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
                    <fieldset className='transactions-fieldset' form='transactions-form'>
                        <div className='transactions-search-container'>
                            <label className='transactions-search-label' htmlFor='transactions-search'>Search by typing...</label>
                            <input type='text' className='transactions-search' id='transactions-search' placeholder='Search by typing...' onChange={this.updateSearch}></input>
                        </div>
                        <div className='transactions-button-container'>
                            <span className='transactions-span'>Sort by</span>
                            <div className='transfers-date-options'>
                                <button className='transactions-date-drop transactions-button' type='button' onClick={this.updateDate}>DATE</button>
                                {this.renderDateSorts()}
                            </div>
                            <button className='transactions-beneficiary transactions-button' type='button' value='beneficiary' onClick={this.updateSort}>BENEFICIARY</button>
                            <button className='transactions-amount transactions-button' type='button' value='amount' onClick={this.updateSort}>AMOUNT</button>
                        </div>
                    </fieldset>
                </form>
                {this.renderTransactionHistory(this.state.transactionHistory)}
            </section>
        );
    };
};