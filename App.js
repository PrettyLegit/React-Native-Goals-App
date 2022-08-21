import { useState } from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import GoalInput from "./components/Goal/GoalInput";
import GoalItem from "./components/Goal/GoalItem";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [goalId, setGoalId] = useState(0);
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: goalId.toString() },
    ]);
    setGoalId((previousGoalId) => previousGoalId + 1);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Button
          title="Add New Goal"
          color={"#a065ec"}
          onPress={startAddGoalHandler}
        />
        {modalIsVisible && (
          <GoalInput
            onAddGoal={addGoalHandler}
            isVisible={modalIsVisible}
            onCancel={endAddGoalHandler}
          />
        )}
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  id={itemData.item.id}
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item) => {
              // looks for the "id" courseGoals that comes from
              //the data prop in FlatList
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },

  goalsContainer: {
    flex: 4,
  },

  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e08cc",
  },

  goalText: {
    color: "white",
  },
});
