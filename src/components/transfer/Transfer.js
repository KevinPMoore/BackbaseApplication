import React from 'react';
import './Transfer.css';

//make sure from is disabled on the select
//make update amount
//add overdraft validation
//confirm form resets on submission
//add modal to confirm success
export default class Transfer extends React.Component{
    state = {
        accounts: [
            {
                name: 'Premium Savings(8837)',
                balance: 11593.21
            },
            {
                name: 'Credit Rewards',
                balance: 128.13
            },
            {
                name: 'Georgia Electric Power Company',
                balance: -129.43
            },
            {
                name: 'Comcast Xfinity',
                balance: -89.99
            },
            {
                name: 'Peachtree Bank Credit Card',
                balance: -218.97
            }
        ],
        amount: 0,
        checkingBalance: 5824.76,
        error: null,
        toAccount: ''
    };

    //
    //Resume work here, is currently deducting from correctly but not adding to correctly
    //
    updateAccounts = (ev) => {
        ev.preventDefault();
        //validation here
        
        let accountIndex = this.state.accounts.findIndex(account => account.name === this.state.toAccount);
        console.log('accountIndex is ', accountIndex);

        let accountToUpdate = this.state.accounts[accountIndex];
        console.log('accountToUpdate is ', accountToUpdate);

        let newAccounts = this.state.accounts;
        newAccounts[accountIndex].balance = (newAccounts[accountIndex].balance + this.state.amount)

        this.setState({
            accounts: newAccounts,
            checkingBalance: (this.state.checkingBalance - this.state.amount),
        });
    };

    updateAmount = (ev) => {
        let transferAmmount = ev.target.value;
        console.log(transferAmmount);
        if(transferAmmount > (this.state.checkingBalance + 500)) {
            this.setState({
                amount: 0,
                error: true
            });
        } else{
            this.setState({
                amount: transferAmmount
            });
        };
    };

    updateToAccount = (ev) => {
        this.setState({
            toAccount: ev.target.value
        });
    };

    createToOptions = () => {
        let transferAccounts = this.state.accounts.map(account =>
            <option key={account.name} value={account.name}>{account.name} {account.balance}</option>
        );
        return transferAccounts;
    };

    render(){
        const error = this.state.error;
        return(
            <section className='Transfer'>
                <div className='transfer-title'>
                    <h2>Make a Transfer</h2>
                </div>
                <form className='transfer-form' id='transfer-form' onSubmit={this.updateAccounts}>
                    <fieldset form='tf'>
                        <label htmlFor='tfa'>From Account</label>
                        <select name='transfer-from-account' id='tfa' onChange={this.updateFromAccount}>
                            <option value={this.state.checkingBalance} defaultValue>Free Checking(4692) {this.state.checkingBalance}</option>
                        </select>
                        <label htmlFor='tta'>To Account</label>
                        <select name='transfer-to-account' id='tta' onChange={this.updateToAccount}>
                            <option value=''>--Select an Account--</option>
                            {this.createToOptions()}
                        </select>
                        <label htmlFor='amount'>Amount</label>
                        <input type='number' name='transfer-amount' id='ta' min='0' step='0.01' onChange={this.updateAmount}></input>
                        {error && <p className='error'>This action would cause you to exceed your overdraft limit.  Please select a smaller amount.</p>}
                    </fieldset>
                    <button type='submit'>SUBMIT</button>
                </form>
            </section>
        );
    };
};