const OrderCard = ({ product }) => {
    const itemsCount = localStorage.getItem(`product_count_${product.id}`);

    return (
        <div className="order-card">
            <img src={product.image} alt="" className="order-card__image" />
            <div className="order-card__info">
                <p className="order-card__name">{product.name}</p>
                <p className="order-card__price">{`${(
                    product.price * itemsCount
                ).toFixed(2)} руб.`}</p>
            </div>
        </div>
    );
};

export default OrderCard;
