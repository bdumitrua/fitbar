import { React, useState } from 'react'
import './Home.scss'

import leftArrow from '../../../images/leftArrow.svg'
import { default as main, default as main2, default as main3 } from '../../../images/main.png'
import rightArrow from '../../../images/rightArrow.svg'

const Home = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const onNextImage = () => {
    setCurrentSlide((onPrevImage) => (onPrevImage + 1) % 3);
  };

  const onPrevImage = () => {
    setCurrentSlide((onPrevImage) => (onPrevImage - 1 + 3) % 3);
  };

  return (
    <div className="home container">
      <div className="home__info">
        <div className="home__info-images" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <img src={main} alt="1" className='home__info-image'/>
          <img src={main2} alt="2" className='home__info-image'/>
          <img src={main3} alt="3" className='home__info-image'/>
        </div>
        <button onClick={() => onPrevImage()} className='home__info-arrows left-arrow'>
          <img src={leftArrow} alt="" className="home__info-arrows-image" />
        </button>
        <button onClick={() => onNextImage()} className='home__info-arrows right-arrow'>
          <img src={rightArrow} alt="" className="home__info-arrows-image" />
        </button>
      </div>

      <section className="products-section">
        <a href="" className="products-section__title">бестселлеры</a>
        
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