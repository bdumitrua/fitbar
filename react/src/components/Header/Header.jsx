import React from 'react'
import './Header.scss'

import account from '../../images/account.svg'
import cart from '../../images/cart.svg'
import logo from '../../images/logo.svg'
import search from '../../images/search.svg'

const Header = () => {
  return (
    <header className="header">
        <div className="header__container container">
            <a href='/' className="header__left-side">
                <img src={logo} alt="" className="header__logo" />
                <span className="header__site-name">fitbar</span>
            </a>
            <div className="header__search-container">
                <input type="search" className="header__search" placeholder='Поиск...'/>
                <button className='header__search-button'>
                    <img src={search} alt="" className='header__search-image'/>
                </button>
            </div>
            <div className="header__right-side">
                <a href="" className="header__button">
                    <img src={account} alt="" className="header__button-image" />
                    <a href="" className="header__account-button-text">Аккаунт</a>
                </a>
                <a href="" className="header__button">
                    <img src={cart} alt="" className="header__button-image" />
                    <a href="" className="header__cart-button-text">Корзина</a>
                </a>    
            </div>
        </div>
        <nav className="header__navbar">
            <div className="header__navbar-container container">
                <a href="" className="header__navbar-element">Soon fetching elements</a>
            </div>
        </nav>
    </header>
  )
}

export default Header
