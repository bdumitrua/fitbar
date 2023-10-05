import plus from "@/assets/images/+.svg";
import Loader from "@/components/Loader/Loader";
import { updateProduct } from "@/redux/services/products.service";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./AdminModals.scss";

const CreateProductModal = ({ handleCloseModal, product }) => {
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains("modal-admin")) {
            handleCloseModal();
        }
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(data);
        const res = dispatch(updateProduct(data, product.id));
        if (res.status === 200) {
            handleCloseModal();
        }
    };

    const categories = [
        "Жиры",
        "Витамины",
        "Аминокислоты",
        "Батончики и снэки",
        "Протеин",
        "Креатин",
        "Напитки",
        "Предтрен",
    ];

    const tastes = ["Банан", "Шоколад", "Клубника", "Ваниль", "Малина"];

    const value = watch(name);

    useEffect(() => {
        const textarea = document.querySelector("textarea");
        textarea.style.height = "auto";
        let scHeight = textarea.scrollHeight;
        textarea.style.height = `${scHeight}px`;
    }, [value]);

    return (
        <div className="modal-admin" onClick={handleBackgroundClick}>
            {product ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="modal-admin__content"
                >
                    <div className="modal-admin__left-side">
                        <div className="modal-admin__image-container">
                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="file"
                                        className="account-info__image-input"
                                        placeholder="Аватар"
                                        id="photo"
                                    />
                                )}
                            />
                            <img src="" alt="" className="modal-admin__image" />
                            <img src={plus} alt="" />
                        </div>
                        <p className="modal-admin__textarea-label">Описание</p>
                        <Controller
                            name="long_description"
                            control={control}
                            defaultValue={product.long_description}
                            rules={{ required: "Это поле обязательное" }}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    className="modal-admin__description"
                                    rows={1}
                                    placeholder="Описание"
                                />
                            )}
                        />
                    </div>
                    <div className="modal-admin__right-side">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={product.name}
                            rules={{ required: "Это поле обязательное" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="modal-admin__product-name"
                                    placeholder="Название товара"
                                    id="name"
                                />
                            )}
                        />
                        {errors["name"] && (
                            <span className="error">Это поле обязательно</span>
                        )}

                        <Controller
                            name="short_description"
                            control={control}
                            defaultValue={product.short_description}
                            rules={{ required: "Это поле обязательное" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="modal-admin__input"
                                    placeholder="Краткое описание"
                                    id="short_description"
                                />
                            )}
                        />
                        {errors["short_description"] && (
                            <span className="error">Это поле обязательно</span>
                        )}

                        <label
                            htmlFor="category"
                            className="modal-admin__label"
                        >
                            Выберите категорию товара:
                        </label>

                        <Controller
                            name="category_id"
                            control={control}
                            defaultValue={product.category_id}
                            rules={{ required: "Это поле обязательное" }}
                            render={({ field }) => (
                                <div className="select-container">
                                    <select
                                        {...field}
                                        className="custom-select"
                                    >
                                        {categories.map((option, index) => (
                                            <option
                                                key={index}
                                                value={index + 1}
                                            >
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        />
                        {errors.category_id && (
                            <p>{errors.category_id.message}</p>
                        )}

                        <Controller
                            name="price"
                            control={control}
                            defaultValue={Math.floor(+product.price, 0)}
                            rules={{ required: "Это поле обязательное" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="modal-admin__input"
                                    placeholder="Цена товара (в рублях)"
                                    id="price"
                                />
                            )}
                        />
                        {errors["price"] && (
                            <span className="error">Это поле обязательно</span>
                        )}

                        <label htmlFor="taste" className="modal-admin__label">
                            Выберите вкус:
                        </label>
                        <Controller
                            name="taste"
                            control={control}
                            defaultValue={product.taste}
                            rules={{ required: "Это поле обязательное" }}
                            render={({ field }) => (
                                <div className="select-container">
                                    <select
                                        {...field}
                                        className="custom-select"
                                    >
                                        {tastes.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        />
                        {errors.category_id && (
                            <p>{errors.category_id.message}</p>
                        )}

                        <Controller
                            name="weight"
                            control={control}
                            defaultValue={product.weight}
                            rules={{ required: "Это поле обязательное" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="modal-admin__input"
                                    placeholder="Объем (в граммах)"
                                    id="weight"
                                />
                            )}
                        />
                        {errors["weight"] && (
                            <span className="error">Это поле обязательно</span>
                        )}

                        <button
                            className="modal-admin__button button__green"
                            type="submit"
                        >
                            Опубликовать
                        </button>

                        <button
                            className="modal-admin__button button__black"
                            type="reset"
                        >
                            Очистить поля
                        </button>
                    </div>
                </form>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default CreateProductModal;
