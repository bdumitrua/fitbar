import { useEffect, useState } from "react";
import "./Home.scss";

import mainMobile from "../../assets/images/main-mobile.png";
import main from "../../assets/images/main.png";

import leftArrow from "../../assets/images/leftArrow.svg";
import rightArrow from "../../assets/images/rightArrow.svg";
import Loader from "../../components/Loader/Loader";
import axiosInstance from "../../utils/axios/instance";
import Bestsellers from "./ProductsSection/Bestsellers";
import ProductsSection from "./ProductsSection/ProductsSection";

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/home/categories");
                setData(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    const [currentSlide, setCurrentSlide] = useState(0);

    const onNextImage = () => {
        setCurrentSlide((onPrevImage) => (onPrevImage + 1) % 6);
    };

    const onPrevImage = () => {
        setCurrentSlide((onPrevImage) => (onPrevImage - 1 + 6) % 6);
    };

    return (
        <>
            {data ? (
                <div className="home">
                    <div className="home__info">
                        <div
                            className="home__info-images"
                            style={{
                                transform: `translateX(-${
                                    currentSlide * 100
                                }%)`,
                            }}
                        >
                            <img
                                src={main}
                                alt="1"
                                className="home__info-image"
                            />
                            <img
                                src={main}
                                alt="2"
                                className="home__info-image"
                            />
                            <img
                                src={main}
                                alt="3"
                                className="home__info-image"
                            />
                            <img
                                src={main}
                                alt="4"
                                className="home__info-image"
                            />
                            <img
                                src={main}
                                alt="5"
                                className="home__info-image"
                            />
                            <img
                                src={main}
                                alt="6"
                                className="home__info-image"
                            />
                        </div>
                        <div
                            className="home-mobile__info-images"
                            style={{
                                transform: `translateX(-${
                                    currentSlide * 100
                                }%)`,
                            }}
                        >
                            <img
                                src={mainMobile}
                                alt="1"
                                className="home-mobile__info-image"
                            />
                            <img
                                src={mainMobile}
                                alt="2"
                                className="home-mobile__info-image"
                            />
                            <img
                                src={mainMobile}
                                alt="3"
                                className="home-mobile__info-image"
                            />
                            <img
                                src={mainMobile}
                                alt="4"
                                className="home-mobile__info-image"
                            />
                            <img
                                src={mainMobile}
                                alt="5"
                                className="home-mobile__info-image"
                            />
                            <img
                                src={mainMobile}
                                alt="6"
                                className="home-mobile__info-image"
                            />
                        </div>
                        <button
                            onClick={() => onPrevImage()}
                            className="home__info-arrows left-arrow"
                        >
                            <img
                                src={leftArrow}
                                alt=""
                                className="home__info-arrows-image"
                            />
                        </button>
                        <button
                            onClick={() => onNextImage()}
                            className="home__info-arrows right-arrow"
                        >
                            <img
                                src={rightArrow}
                                alt=""
                                className="home__info-arrows-image"
                            />
                        </button>
                    </div>

                    <Bestsellers />
                    {data.slice(0, 2).map((category, index) => (
                        <ProductsSection key={index} category={category} />
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Home;
