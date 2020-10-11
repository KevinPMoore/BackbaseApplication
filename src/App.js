import React from 'react';
import Header from './components/header/Header';
import Transfer from './components/transfer/Transfer';
import Transactions from './components/transactions/Transactions';
import './App.css';

export default class App extends React.Component {

  render(){
    return(
      <div className='App'>
        <Header/>
        <main>
          <Transfer/>
          <Transactions/>
        </main>
      </div>
    );
  };
};