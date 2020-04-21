import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal } from "react-native";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState(""); // state management logic
  // we can bind useState to the TextInput, that means when the user types the character
  // we want to update our state "setEnteredGoal" and set the entered text in the state
  // which we can access through "enteredGoal" which we will pass it back into the TextInput
  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };
  // addGoalHandler will be trigger by the ADD button, will forward enteredGoal and clear it by setting "setEnteredGoal" to empty string
  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal("");
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.onCancel} />
          </View>
          {/* onPress calls the "props.onAddGoal" from App.js function when we press the button.
      On function we call "bind" to pre configure some arguments which should eventually be passed along
      when this function gets executed, the first argument is always to what this keyword should refer, 
      but the second arguemnt will be the one recieved by the function onAddGoal when it is colled  */}
          <View style={styles.button}>
            <Button title="ADD" onPress={addGoalHandler} />
          </View>
          {/* The ADD button calls onAddGoal and that forwards the goal to app.js <GoalInput> where we use it to control
        the visibility of the modal, so in order to make sure that the modal disappears we have to change isAddMode again
        inside the App.js, because the new value will then be automatically forwarded to GoalInput
        So, all we have to do is in "addGoalHandler", where we set the "CourseGoal", we also have to set "setIsAddMode" to false because
        we are done adding.
        */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});

export default GoalInput;
