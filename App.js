import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  // "setIsAddMode" is the function to change the state of isAddMode and we call it when the button is pressed
  // we pass "isAddMode" to GoalInput to change the visibility of the "modal" in there
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    // Our courseGoals array is an array of objects where each object has a "key" and "value" properties
    setCourseGoals((currentGoals) => {
      // returns updated array
      return [
        ...currentGoals,
        //spread operator takes an existing array and pulls out all the elements from that array and adds them here to the new array, if you add []
        { id: Math.random().toString(), value: goalTitle }, // random key number
        //array of objects where each has id property and any value entered
      ];
    });
    setIsAddMode(false);
  };

  // Deleting the item using its id
  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      // return a new array based on old array filtered by a set criteria
      // we pass a function that gets a "goal" and can return true to keep or false to drop it
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoadAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true)} />
      {/* To find out when a button is pressed in "GoalInput" component by passing the function
      which the child component should execute as a prop to the child component
      - prop name = onAddGoal; That is received instead of GoalInput in the props
      */}
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoadAdditionHandler}
      />
      {/* Using FlatList to handle inifinite list and render just inside the screen in terms of space,
        the list doesn't go over better than <ScrollViev>.
        We feed "courseGoals" array into <FlatList> which expect data source where we have an array of objects
        where every object has a key and value properties 'item.id' */}
      <FlatList
        // "KeyExtractor" property takes a function which takes two items ('item and index') that tells flat list how to extract the key.
        // By default the logic is "I'll have a look at the 'item' and look for a key property"
        // But now with "KeyExtractor" property it takes a function which takes two arguments ('item' is looking at and the 'index' of that item)
        // and it returns a key 'item.id'
        keyExtractor={(item, index) => item.id} //to get an unique key prop for every item in the list
        data={courseGoals} // array of goals - Data I want to output
        //this is a property that takes a function which is called for every item in the data will take itemData to render a list item
        //this is a function that will take some data {itemData} and it has to return a component <View> in this case
        renderItem={(
          itemData // to output our list of goals
        ) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
        // ) => <GoalItem title={itemData.item.value} />}
      />
      {/* map takes a function which executes in every item of the array and return a new component */}
    </View>
  );
}
