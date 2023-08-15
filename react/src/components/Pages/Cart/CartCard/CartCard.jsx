import "./CartCard.scss";

const CartCard = ({ product }) => {
    return (
        <div className="cart-card">
            <img src={product.image} alt="" className="cart-card__image" />
            <div className="cart-card__main-info">
                <p className="cart-card__title"></p>
                <div className="cart-card__about-cart">
                    <p className="cart-card__info">Вкус:</p>
                    <p className="cart-card__info">{product.taste}</p>
                    <p className="cart-card__info">Объём:</p>
                    <p className="cart-card__info">{product.weight}</p>
                </div>
            </div>
            <div className="cart-card__more">
                <div className="cart-card__more-info">
                    <p className="cart-card__price">{`${product.price} руб.`}</p>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
