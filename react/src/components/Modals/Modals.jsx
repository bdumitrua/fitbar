import { useState } from "react";
import LoginModal from "./LoginModal";
import "./Modals.scss";
import RegistrationModal from "./RegistrationModal";

const Modals = ({
    handleCloseModal,
    handleSuccessfulLogin,
    handleOpenModal,
}) => {
    const [modal, setModal] = useState(false);

    const handleToggleModal = () => {
        setModal(!modal);
    };

    return (
        <div className="modal">
            {!modal ? (
                <LoginModal
                    showModal={handleOpenModal}
                    closeModal={handleCloseModal}
                    onSuccess={handleSuccessfulLogin}
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
