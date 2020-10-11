import React from 'react';
import Logo from './logo.jpg';
import './Header.css';

export default class Header extends React.Component {
    render(){
        return(
            <header className='Header'>
                <img className='bank-logo' src={Logo} alt='The Peachtree Bank logo'></img>
            </header>
        );
    };
};