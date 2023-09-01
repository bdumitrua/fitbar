import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios/instance";
import { useCartContext } from "../../utils/providers/cart.provider";
import "./Order.scss";
import OrderCard from "./OrderCard";

const Order = () => {
    const { handleSubmit, control } = useForm();
    const { cartItems } = useCartContext();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((accumulator, currentItem) => {
        return (
            +accumulator +
            +currentItem.price *
                localStorage.getItem(`product_count_${currentItem.id}`)
        );
    }, 0);

    const totalQuantity = cartItems.reduce((accumulator, currentItem) => {
        return (
            +accumulator +
            +localStorage.getItem(`product_count_${currentItem.id}`)
        );
    }, 0);

    const onSubmit = async (data) => {
        const deliveryData = {
            ...data,
            total_price: parseFloat(totalPrice.toFixed(2)),
            total_quantity: totalQuantity,
        };

        const orderData = {
            delivery: deliveryData,
            items: cartItems,
        };

        try {
            const response = await axiosInstance.post(
                "/orders/create",
                orderData
            );
            console.log(response);
            localStorage.removeItem("cart");
            navigate("/home");
        } catch (error) {
            console.error("Ошибка при оформлении заказа", error);
        }
    };

    const getEnding = (number, wordForms) => {
        const cases = [2, 0, 1, 1, 1, 2];
        return wordForms[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[Math.min(number % 10, 5)]
        ];
    };
    const reviewsForms = ["позиция", "позиции", "позиций"];
    const reviewsEnding = getEnding(cartItems.length, reviewsForms);

    return (
        <div className="order">
            <div className="order__data">
                <form
                    action=""
                    className="order__form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="order__container">
                        <h3 className="order__title">Данные для доставки</h3>
                        <label htmlFor="name" className="order__label">
                            Ф.И.О
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Обязательное поле" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="name"
                                    className="order__form-element"
                                    placeholder=""
                                />
                            )}
                        />
                        <label htmlFor="region" className="order__label">
                            Область
                        </label>
                        <Controller
                            name="region"
                            control={control}
                            rules={{ required: "Обязательное поле" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="region"
                                    className="order__form-element"
                                    placeholder=""
                                />
                            )}
                        />
                        <label htmlFor="city" className="order__label">
                            Город
                        </label>
                        <Controller
                            name="city"
                            control={control}
                            rules={{ required: "Обязательное поле" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="city"
                                    className="order__form-element"
                                    placeholder=""
                                />
                            )}
                        />
                        <label htmlFor="adress" className="order__label">
                            Адрес
                        </label>
                        <Controller
                            name="adress"
                            control={control}
                            rules={{ required: "Обязательное поле" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="adress"
                                    className="order__form-element"
                                    placeholder=""
                                />
                            )}
                        />
                        <label htmlFor="tel" className="order__label">
                            Номер телефона
                        </label>
                        <Controller
                            name="tel"
                            control={control}
                            rules={{
                                required: "Обязательное поле",
                                maxLength: 11,
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="tel"
                                    id="tel"
                                    className="order__form-element"
                                    placeholder=""
                                />
                            )}
                        />
                        <label htmlFor="comment" className="order__label">
                            Комментарии
                        </label>
                        <Controller
                            name="comment"
                            control={control}
                            defaultValue=""
                            rules={{ maxLength: 1500 }}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="order__textarea"
                                    name="comment"
                                    id="comment"
                                    rows="10"
                                ></textarea>
                            )}
                        />
                    </div>
                    <button type="submit" className="order__send-order">
                        Оформить мой заказ
                    </button>
                </form>
            </div>
            <div className="order__cart-data">
                <div className="order__cart-header">
                    <p className="order__cart-pos-sum">Итого</p>
                    <p className="order__cart-pos-count">{`${cartItems.length} ${reviewsEnding}`}</p>
                </div>
                {cartItems.map((item) => (
                    <OrderCard key={item.id} product={item} />
                ))}
                <div className="order__cart-footer">
                    <p className="order__cart-price">Итого к оплате</p>
                    <p className="order__cart-price-sum">{`${totalPrice.toFixed(
                        2
                    )} руб.`}</p>
                </div>
            </div>
        </div>
    );
};

export default Order;
