import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <>
        <div className="footer-bar">
            fitbar
        </div>

        <footer className="footer container">
            <div className="footer__category">
                <span className="footer__category-title">
                    Помощь и информация
                </span>
                <a href="" className="footer__category-element">Связь с нами</a>
                <a href="" className="footer__category-element">Центр поддержки</a>
                <a href="" className="footer__category-element">Доставка</a>
                <a href="" className="footer__category-element">Политика возврата</a>
                <a href="" className="footer__category-element">Отслеживание заказа</a>
            </div>
            
            <div className="footer__category">
                <span className="footer__category-title">
                    Продукты
                </span>
                <a href="" className="footer__category-element">Питание</a>
                <a href="" className="footer__category-element">Спортивная одежда</a>
                <a href="" className="footer__category-element">Еда</a>
                <a href="" className="footer__category-element">Линейки продуктов</a>
            </div>
            
            <div className="footer__category">
                <span className="footer__category-title">
                    Информация о компании
                </span>
                <a href="" className="footer__category-element">О нас</a>
                <a href="" className="footer__category-element">Ваше мнение о нас</a>
                <a href="" className="footer__category-element">Партнеры</a>
                <a href="" className="footer__category-element">Политика компании</a>
            </div>
            
            <div className="footer__category">
                <span className="footer__category-title">
                    Акции
                </span>
                <a href="" className="footer__category-element">Реферальная система</a>
                <a href="" className="footer__category-element">Скидки</a>
            </div>
        </footer>
    </>
  )
}

export default Footer