const CartTotalPrice = ({ totalPrice }) => {
    return (
        <p className="cart__sum">{`Итого: ${totalPrice.toFixed(2)} руб.`}</p>
    );
};

export default CartTotalPrice;
