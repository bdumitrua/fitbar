import React from 'react'
import './Home.scss'

import leftArrow from '../../../images/leftArrow.svg'
import main from '../../../images/main.png'
import rightArrow from '../../../images/rightArrow.svg'

const Home = () => {
  return (
    <div className="home container">
      <div className="home__info">
        <img src={main} alt="" className='home__info-image'/>
        <button className='home__info-arrows'>
          <img src={leftArrow} alt="" className="home__info-arrows-image" />
        </button>
        <button className='home__info-arrows'>
          <img src={rightArrow} alt="" className="home__info-arrows-image" />
        </button>
      </div>

      <section className="products-section">
        <a href="" className="products-section__title">Бестселлеры</a>
        
      </section>
      <section className="products-section">
        <a href="" className="products-section__title">Батончики</a>

      </section>
      <section className="products-section">
        <a href="" className="products-section__title">Протеин</a>

      </section>
    </div>
  )
}

export default Home