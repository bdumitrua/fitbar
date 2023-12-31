import Loader from "@/components/Loader/Loader";
import { fetchUser } from "@/redux/services/user.service";
import axiosInstance from "@/utils/axios/instance";
import { useCartContext } from "@/utils/providers/cart.provider";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Order.scss";
import OrderCard from "./OrderCard";

const Order = () => {
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

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/cart");
        }
        // Загрузка пользователя
        if (!user.email && !loading && !error) {
            dispatch(fetchUser());
        }
    }, [dispatch, user, loading, error]);

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            name: user ? user.name : "",
            tel: user ? user.phone : "",
            email: user ? user.email : "",
        },
    });

    useEffect(() => {
        setValue("name", user ? user.name : "");
        setValue("tel", user ? user.phone : "");
        setValue("email", user ? user.email : "");
    }, [user]);

    const onSubmit = async (data) => {
        const deliveryData = {
            ...data,
            total_price: parseInt(Math.floor(totalPrice)),
            total_quantity: totalQuantity,
        };

        const orderData = {
            delivery: deliveryData,
            items: cartItems,
        };

        try {
            await axiosInstance.post("/orders/create", orderData);
            localStorage.removeItem("cart");
            cartItems.length = 0;
            navigate("/home");
            alert("Заказ успешно оформлен");
        } catch (error) {
            console.error("Ошибка при оформлении заказа", error);
            navigate("/cart");
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
            {user ? (
                <>
                    <div className="order__data">
                        <form
                            action=""
                            className="order__form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="order__container">
                                <h3 className="order__title">
                                    Данные для доставки
                                </h3>
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
                                <label
                                    htmlFor="region"
                                    className="order__label"
                                >
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
                                <label
                                    htmlFor="adress"
                                    className="order__label"
                                >
                                    Адрес
                                </label>
                                <Controller
                                    name="address"
                                    control={control}
                                    rules={{ required: "Обязательное поле" }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            id="address"
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
                                <label htmlFor="email" className="order__label">
                                    Ваша почта
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Обязательное поле",
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="email"
                                            id="email"
                                            className="order__form-element"
                                            placeholder=""
                                        />
                                    )}
                                />
                                <label
                                    htmlFor="comment"
                                    className="order__label"
                                >
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
                            <p className="order__cart-price-sum">{`${Math.floor(
                                totalPrice
                            )} руб.`}</p>
                        </div>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Order;
