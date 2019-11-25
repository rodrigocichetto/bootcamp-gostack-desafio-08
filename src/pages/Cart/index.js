import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import colors from '../../styles/colors';

import {
  Wrapper,
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

function Cart({ products, total, updateAmountRequest, removeFromCart }) {
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  return (
    <Wrapper>
      <Container>
        {products.length ? (
          <>
            <Products>
              {products.map(product => (
                <Product key={product.id}>
                  <ProductInfo>
                    <ProductImage source={{ uri: product.image }} />
                    <ProductDetails>
                      <ProductTitle>{product.title}</ProductTitle>
                      <ProductPrice>{product.priceFormatted}</ProductPrice>
                    </ProductDetails>
                    <ProductDelete onPress={() => removeFromCart(product.id)}>
                      <Icon
                        name="delete-forever"
                        size={24}
                        color={colors.primary}
                      />
                    </ProductDelete>
                  </ProductInfo>
                  <ProductControls>
                    <ProductControlButton onPress={() => decrement(product)}>
                      <Icon
                        name="remove-circle-outline"
                        size={20}
                        color={colors.primary}
                      />
                    </ProductControlButton>
                    <ProductAmount value={String(product.amount)} />
                    <ProductControlButton onPress={() => increment(product)}>
                      <Icon
                        name="add-circle-outline"
                        size={20}
                        color={colors.primary}
                      />
                    </ProductControlButton>
                    <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                  </ProductControls>
                </Product>
              ))}
            </Products>
            <TotalContainer>
              <TotalText>TOTAL</TotalText>
              <TotalAmount>{formatPrice(total)}</TotalAmount>
              <Order>
                <OrderText>FINALIZAR PEDIDO</OrderText>
              </Order>
            </TotalContainer>
          </>
        ) : (
          <EmptyContainer>
            <Icon name="remove-shopping-cart" size={64} color="#eee" />
            <EmptyText>Seu carrinho está vazio.</EmptyText>
          </EmptyContainer>
        )}
      </Container>
    </Wrapper>
  );
}

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: state.cart.reduce(
    (total, product) => total + product.price * product.amount,
    0
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
