import React from 'react'
import './Header.scss'

const Header = () => {
  return (
    <header className="header">
        <div className="header__container">
            <div className="header__left-side">
                <img src="../../images/logo.png" alt="" className="header__logo" />
                <span className="header__site-name">fitbar</span>
            </div>
            <input type="search" className="header__search" placeholder='Поиск...'/>
            <div className="header__right-side">
                <a href="" className="header__account-button">
                    <img src="../../images/account.png" alt="" className="header__account-button-image" />
                    <a href="" className="header__account-button-text">Аккаунт</a>
                </a>
                <a href="" className="header__cart-button">
                    <img src="../../images/cart.svg" alt="" className="header__cart-button-image" />
                    <a href="" className="header__cart-button-text">Корзина</a>
                </a>    
            </div>    
        </div>
        <nav className="header__navbar">
            <a href="" className="header__navbar-element">Soon fetching elements</a>
        </nav>
    </header>
  )
}

export default Header
