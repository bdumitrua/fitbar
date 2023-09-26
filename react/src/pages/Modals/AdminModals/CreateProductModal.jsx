import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import plus from "../../../assets/images/+.svg";
import AutoExpandingTextarea from "../../../components/AutoExpandingTextarea/AutoExpandingTextarea";
import { createProduct } from "../../../redux/services/products.service";
import "./AdminModals.scss";

const CreateProductModal = ({ handleCloseModal }) => {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains("modal-admin")) {
            handleCloseModal();
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(data);
        const res = dispatch(createProduct(data));
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

    return (
        <div className="modal-admin" onClick={handleBackgroundClick}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="modal-admin__content"
            >
                <div className="modal-admin__left-side">
                    <div className="modal-admin__image-container">
                        <Controller
                            name="photo"
                            control={control}
                            render={({ field, onChange }) => (
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
                        required
                        render={({ field }) => (
                            <AutoExpandingTextarea
                                {...field}
                                name="modal-admin__description"
                                placeholder="Полное описание товара"
                                id="name"
                            />
                        )}
                    />
                </div>
                <div className="modal-admin__right-side">
                    <Controller
                        name="name"
                        control={control}
                        required
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
                        required
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

                    <label htmlFor="category" className="modal-admin__label">
                        Выберите категорию товара:
                    </label>

                    {/* <CustomSelect
                        options={categories}
                        onChange={toggleSelect}
                        useIndex={true}
                        id="category"
                        {...register("category_id", { required: true })}
                    /> */}

                    <Controller
                        name="price"
                        control={control}
                        required
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
                    {/* <CustomSelect
                        options={tastes}
                        onChange={toggleSelect}
                        useIndex={false}
                        id="taste"
                        {...register("taste", { required: true })}
                    /> */}

                    <Controller
                        name="weight"
                        control={control}
                        required
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
        </div>
    );
};

export default CreateProductModal;
