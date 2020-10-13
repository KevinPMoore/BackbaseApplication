import React from 'react';
import './Transfer.css';

//confirm form resets on submission
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
        modal: 'none',
        toAccount: ''
    };

    updateAccounts = (ev) => {
        ev.preventDefault();
        
        let accountIndex = this.state.accounts.findIndex(account => account.name === this.state.toAccount);
        console.log('accountIndex is ', accountIndex);

        let accountToUpdate = this.state.accounts[accountIndex];
        console.log('accountToUpdate is ', accountToUpdate);

        let newAccounts = this.state.accounts;
        newAccounts[accountIndex].balance = (newAccounts[accountIndex].balance + this.state.amount)

        this.setState({
            accounts: newAccounts,
            checkingBalance: (this.state.checkingBalance - this.state.amount),
            modal: 'none'
        });
    };

    updateAmount = (ev) => {
        if(typeof ev.target.value !== Number) {
            let transferAmount = parseFloat(ev.target.value);
            this.setState({
                amount: transferAmount,
                error: null
            });
        };
    };

    updateToAccount = (ev) => {
        this.setState({
            toAccount: ev.target.value,
            error: null
        });
    };

    updateModal = () => {
        if(this.state.toAccount === '') {
            this.setState({
                error: 'You must select an account to recieve transfered funds.'
            })
        } else if(this.state.amount === 0) {
            this.setState({
                error: `You must select a transfer amount greater than ${this.state.amount}.`
            });
        } else if(this.state.amount > (this.state.checkingBalance + 500)) {
            this.setState({
                error: 'This transfer would cause you to exceed your overdraft limit of $500.  Please select a smaller amount.'
            });
        } else {
            if(this.state.modal === 'none') {
                this.setState({
                    modal: 'modal',
                    error: null
                });
            } else {
                this.setState({
                    modal: 'none',
                    error: null
                });
            };
        };
    };

    renderToOptions = () => {
        let transferAccounts = this.state.accounts.map(account =>
            <option key={account.name} value={account.name}>{account.name} {account.balance}</option>
        );
        return transferAccounts;
    };

    renderConfirmationModal = () => {
        return(
            <div className={this.state.modal}>
                <div className='modal-content'>
                    <p className='transfer-modal-warning'>You are about to transfer ${this.state.amount} from Free Checking(4692) to {this.state.toAccount}.  Are you sure?</p>
                    <button className='transfer-confirm' onClick={this.updateAccounts}>Confirm</button>
                    <button className='transfer-cancel' onClick={this.updateModal}>Cancel</button>
                </div>
            </div>
        );
    };

    render(){
        const error = this.state.error;
        return(
            <section className='Transfer'>
                {this.renderConfirmationModal()}
                <div className='transfer-title'>
                    <h2>Make a Transfer</h2>
                </div>
                <form className='transfer-form' id='transfer-form'>
                    <fieldset className='transfer-fieldset' form='tf'>
                        <label className='transfer-label' htmlFor='tfa'>From Account</label>
                        <select className='transfer-field' name='transfer-from-account' id='tfa' disabled onChange={this.updateFromAccount}>
                            <option value={this.state.checkingBalance} defaultValue>Free Checking(4692) {this.state.checkingBalance}</option>
                        </select>
                        <label className='transfer-label' htmlFor='tta'>To Account</label>
                        <select className='transfer-field' name='transfer-to-account' id='tta' value={this.state.toAccount} onChange={this.updateToAccount}>
                            <option value=''>--Select an Account--</option>
                            {this.renderToOptions()}
                        </select>
                        <label className='transfer-label' htmlFor='amount'>Amount</label>
                        <input type='number' className='transfer-field' name='transfer-amount' id='ta' min='0' step='.01' value={this.state.amount} onChange={this.updateAmount}></input>
                        {error && <p className='error'>{this.state.error}</p>}
                        <button className='transfer-button' type='button' onClick={this.updateModal}>SUBMIT</button>
                    </fieldset>
                </form>
            </section>
        );
    };
};