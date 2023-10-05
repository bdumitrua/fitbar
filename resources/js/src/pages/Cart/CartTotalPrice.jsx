const CartTotalPrice = ({ totalPrice }) => {
    return (
        <p className="cart__sum">{`Итого: ${Math.round(totalPrice)} руб.`}</p>
    );
};

export default CartTotalPrice;
