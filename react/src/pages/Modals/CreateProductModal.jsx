import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import plus from "../../assets/images/+.svg";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import "./AdminModals.scss";

const CreateProductModal = ({
    handleOpenModal,
    handleCloseModal,
    onChange,
}) => {
    const { handleSubmit, control } = useForm();

    const handleBackgroundClick = (e) => {
        // Проверяем, что клик был по заднему фону (класс "modal")
        if (e.target.classList.contains("modal-admin")) {
            handleCloseModal();
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit = () => {
        console.log("On");
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
                                    className="modal-admin__image-input"
                                    placeholder="Аватар"
                                    id="photo"
                                    onChange={(event) => {
                                        onChange(event.target.files[0]);
                                    }}
                                />
                            )}
                        />
                        <img src="" alt="" className="modal-admin__image" />
                        <img src={plus} alt="" />
                    </div>

                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="1"
                        className="modal-admin__description"
                    ></textarea>
                </div>
                <div className="modal-admin__right-side">
                    <input
                        type="text"
                        className="modal-admin__product-name"
                        placeholder="Название товара"
                    />
                    <input
                        type="text"
                        className="modal-admin__input"
                        placeholder="Краткое описание"
                    />

                    <CustomSelect
                        options={categories}
                        onChange={toggleSelect}
                    />

                    <input
                        type="text"
                        className="modal-admin__input"
                        placeholder="Цена товара"
                    />

                    <CustomSelect options={tastes} onChange={toggleSelect} />

                    <input type="text" className="modal-admin__input" />
                </div>
            </form>
        </div>
    );
};

export default CreateProductModal;
