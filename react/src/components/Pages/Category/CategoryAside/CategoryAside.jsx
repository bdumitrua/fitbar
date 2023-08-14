import "./CategoryAside.scss";
const CategoryAside = () => {
    return (
        <div className="category-aside">
            <p className="category-aside__title">Фильтры</p>
            <div className="category-aside__filter">
                <div className="category-aside__filter-title">Категория</div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="vitaminy"
                        id="vitaminy"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="vitaminy"
                    >
                        Витамины
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="smesi"
                        id="smesi"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="smesi"
                    >
                        Смеси
                    </label>
                </div>
            </div>
            <div className="category-aside__filter">
                <div className="category-aside__filter-title">Вкус</div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="klubnika"
                        id="klubnika"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="klubnika"
                    >
                        Клубника
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="chocolate"
                        id="chocolate"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="chocolate"
                    >
                        Шоколад
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="malina"
                        id="malina"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="malina"
                    >
                        Малина
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="chernika"
                        id="chernika"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="chernika"
                    >
                        Черника
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="vishnya"
                        id="vishnya"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="vishnya"
                    >
                        Вишня
                    </label>
                </div>
            </div>
            <div className="category-aside__filter">
                <div className="category-aside__filter-title">
                    Диетические потребности
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="no-gluten"
                        id="no-gluten"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="no-gluten"
                    >
                        Без глютена
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="vegan"
                        id="vegan"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="vegan"
                    >
                        Вегетарианские
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="low-sugar"
                        id="low-sugar"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="low-sugar"
                    >
                        Низкий уровень сахара
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="organic"
                        id="organic"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="organic"
                    >
                        Органические
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="low-ziry"
                        id="low-ziry"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="low-ziry"
                    >
                        Низкий уровень жира
                    </label>
                </div>
            </div>
            <div className="category-aside__filter">
                <div className="category-aside__filter-title">Объем</div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="low-weight"
                        id="low-weight"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="low-weight"
                    >
                        0 - 10 г.
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="low-medium-weight"
                        id="low-medium-weight"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="low-medium-weight"
                    >
                        10 - 50 г.
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="medium-weight"
                        id="medium-weight"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="medium-weight"
                    >
                        50 - 200 г.
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="medium-large-weight"
                        id="medium-large-weight"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="medium-large-weight"
                    >
                        200 - 1000 г.
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="large-weight"
                        id="large-weight"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="large-weight"
                    >
                        1000 - 5000 г.
                    </label>
                </div>
            </div>
            <div className="category-aside__filter">
                <div className="category-aside__filter-title">Цена</div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="low-price"
                        id="low-price"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="low-price"
                    >
                        0 - 1000 руб.
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="medium-price"
                        id="medium-price"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="medium-price"
                    >
                        1000 - 5000 руб.
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="large-price"
                        id="large-price"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="large-price"
                    >
                        5000 - 20000 руб.
                    </label>
                </div>
                <div className="category-aside__filter-element">
                    <input
                        type="checkbox"
                        name="xl-price"
                        id="xl-price"
                        className="category-aside__filter-checkbox"
                    />
                    <label
                        className="category-aside__filter-label"
                        htmlFor="xl-price"
                    >
                        20000 - 100000 руб.
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CategoryAside;
