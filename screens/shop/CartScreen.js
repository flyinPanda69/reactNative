import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/cartItem";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Card from "../../components/ui/card";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  //const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartItem = useSelector((state) => {
    const transformedCartItem = [];
    for (const key in state.cart.items) {
      transformedCartItem.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItem.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total : <Text style={styles.amount}>${cartTotal.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItem.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItem, cartTotal.toFixed(2)));
          }}
        />
      </Card>
      <FlatList
        data={cartItem}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deleteble
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
