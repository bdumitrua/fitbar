import "./AdminModals.scss";

const CreateProductModal = ({ handleOpenModal, handleCloseModal }) => {
    const handleBackgroundClick = (e) => {
        // Проверяем, что клик был по заднему фону (класс "modal")
        if (e.target.classList.contains("modal")) {
            handleCloseModal();
        }
    };

    return (
        <div className="modal-admin" onClick={handleBackgroundClick}>
            <div className="modal-admin__content"></div>
        </div>
    );
};

export default CreateProductModal;
