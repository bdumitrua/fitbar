import { useState } from "react";
import { useForm } from "react-hook-form";
import plus from "../../../assets/images/+.svg";
import AutoExpandingTextarea from "../../../components/AutoExpandingTextarea/AutoExpandingTextarea";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import axiosInstance from "../../../utils/axios/instance";
import "./AdminModals.scss";

const CreateProductModal = ({ handleCloseModal }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains("modal-admin")) {
            handleCloseModal();
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axiosInstance.post("/products/create", data);
            if (response.status === 200) {
                handleCloseModal();
                console.log("Запрос успешно отправлен!");
            } else {
                console.error("Произошла ошибка при отправке запроса.");
            }
        } catch (error) {
            console.error("Произошла ошибка:", error);
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
                        <input
                            type="file"
                            className="modal-admin__image-input"
                            id="image"
                            {...register("image")}
                        />
                        <img src="" alt="" className="modal-admin__image" />
                        <img src={plus} alt="" />
                    </div>

                    <p className="modal-admin__textarea-label">Описание</p>

                    <AutoExpandingTextarea
                        name="modal-admin__description"
                        placeholder="Полное описание товара"
                        {...register("long_description")}
                    />
                </div>
                <div className="modal-admin__right-side">
                    <input
                        type="text"
                        className="modal-admin__product-name"
                        placeholder="Название товара"
                        {...register("name", { required: true })}
                    />
                    {errors["name"] && (
                        <span className="error">Это поле обязательно</span>
                    )}

                    <input
                        type="text"
                        className="modal-admin__input"
                        placeholder="Краткое описание"
                        {...register("short_description", { required: true })}
                    />
                    {errors["short_description"] && (
                        <span className="error">Это поле обязательно</span>
                    )}

                    <label htmlFor="category" className="modal-admin__label">
                        Выберите категорию товара:
                    </label>

                    <CustomSelect
                        options={categories}
                        onChange={toggleSelect}
                        useIndex={true}
                        id="category"
                        {...register("category_id", { required: true })}
                    />

                    <input
                        type="text"
                        className="modal-admin__input"
                        placeholder="Цена товара (в рублях)"
                        {...register("price", { required: true })}
                    />
                    {errors["price"] && (
                        <span className="error">Это поле обязательно</span>
                    )}

                    <label htmlFor="taste" className="modal-admin__label">
                        Выберите вкус:
                    </label>
                    <CustomSelect
                        options={tastes}
                        onChange={toggleSelect}
                        useIndex={false}
                        id="taste"
                        {...register("taste", { required: true })}
                    />

                    <input
                        type="text"
                        className="modal-admin__input"
                        placeholder="Объем (в граммах)"
                        {...register("weight", { required: true })}
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
