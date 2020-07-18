import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21)
    TouchableComponent = TouchableNativeFeedback;
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>
          ${Math.abs(props.amount.toFixed(2))}{" "}
        </Text>
        {props.deleteble && (
          <TouchableComponent onPress={props.onRemove} style={styles.deleteBtn}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableComponent>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontSize: "open-sans-bold",
    fontSize: 16,
  },
  deleteBtn: {
    marginLeft: 20,
  },
});

export default CartItem;
