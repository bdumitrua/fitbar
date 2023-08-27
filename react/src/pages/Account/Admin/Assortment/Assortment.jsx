import AccountLayoutAdmin from "../AccountLayoutAdmin";

const Assortment = () => {
    return (
        <div className="assortment container">
            <AccountLayoutAdmin />
            <div className="assortment__header">
                <div className="assortment__title">Ассортимент</div>
                <input type="text" className="assortment__search" />
                <div className="assortment__buttons">
                    <button className="assortment__button">
                        Добавление товара
                    </button>
                    <button className="assortment__button">Вывод данных</button>
                </div>
            </div>
        </div>
    );
};

export default Assortment;
