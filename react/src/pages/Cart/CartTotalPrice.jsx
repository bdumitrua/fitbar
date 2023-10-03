const CartTotalPrice = ({ totalPrice }) => {
    return (
        <p className="cart__sum">{`Итого: ${Math.floor(totalPrice)} руб.`}</p>
    );
};

export default CartTotalPrice;
