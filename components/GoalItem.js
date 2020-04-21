import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// Create functional component "GoalItem", which get props and has to returns some JSX
// and I will have to export it as a default
const GoalItem = (props) => {
  return (
    // bind onDelete to set a default item "props.id", when this gets called.
    // The id is passed to onDelete and it is getting called upon a press
    <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItem}>
        {/* "item" will be one element from input data (courseGoals) and will have key and value properties */}
        {/* <Text>{itemData.item.value}</Text> */}
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
  },
});

export default GoalItem;
