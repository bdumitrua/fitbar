import { useState } from "react";
import LoginModal from "./LoginModal";
import "./Modals.scss";
import RegistrationModal from "./RegistrationModal";

const Modals = ({ handleCloseModal, handleOpenModal }) => {
    const [modal, setModal] = useState(false);

    const handleToggleModal = () => {
        setModal(!modal);
    };

    const handleBackgroundClick = (e) => {
        // Проверяем, что клик был по заднему фону (класс "modal")
        if (e.target.classList.contains("modal")) {
            handleCloseModal();
        }
    };

    return (
        <div className="modal" onClick={handleBackgroundClick}>
            {!modal ? (
                <LoginModal
                    showModal={handleOpenModal}
                    closeModal={handleCloseModal}
                    toggleModal={handleToggleModal}
                />
            ) : (
                <RegistrationModal
                    showModal={handleOpenModal}
                    closeModal={handleCloseModal}
                    toggleModal={handleToggleModal}
                />
            )}
        </div>
    );
};

export default Modals;
