const UpdateProductModal = ({ handleOpenModal, handleCloseModal }) => {
    const handleBackgroundClick = (e) => {
        // Проверяем, что клик был по заднему фону (класс "modal")
        if (e.target.classList.contains("modal-admin")) {
            handleCloseModal();
        }
    };

    return (
        <div className="modal-admin" onClick={handleBackgroundClick}>
            <div className="modal-admin__content"></div>
        </div>
    );
};

export default UpdateProductModal;
