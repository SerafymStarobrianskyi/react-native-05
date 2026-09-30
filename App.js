import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TextInput,
  Pressable,
  useWindowDimensions,
  Image,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [enteredFeedback, setEnteredFeedback] = useState("");
  const [feedbackCollection, setFeedbackCollection] = useState([]);

  const { width: deviceWidth } = useWindowDimensions();

  const isLandscape = deviceWidth > 400;

  function feedbackInputHandler(enteredText) {
    setEnteredFeedback(enteredText);
  }

  function addFeedbackHandler() {
    if (enteredFeedback.trim() === "") return;

    setFeedbackCollection((currentFeedbackCollection) => [
      ...currentFeedbackCollection,
      enteredFeedback,
    ]);

    setEnteredFeedback("");
  }

  return (
    <View
      style={[
        styles.appContainer,
        {
          flexDirection: isLandscape ? "row" : "column",
          paddingTop: isLandscape ? 20 : 60,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            flexDirection: isLandscape ? "column" : "row",
            width: isLandscape ? "15%" : "100%",
            justifyContent: isLandscape ? "flex-start" : "space-around",
          },
        ]}
      >
        <Pressable onPress={() => Alert.alert("Go to Home!")}>
          <Text style={styles.headerItem}>Home</Text>
        </Pressable>

        <Pressable onPress={() => Alert.alert("Go to Catalog!")}>
          <Text style={styles.headerItem}>Catalog</Text>
        </Pressable>

        <Pressable onPress={() => Alert.alert("Go to Order!")}>
          <Text style={styles.headerItem}>Order</Text>
        </Pressable>

        {isLandscape && (
          <Pressable>
            <Image
              source={require("./assets/Feedback_Icon.png")}
              style={{ width: 100, height: 100, marginTop: 20 }}
            />
          </Pressable>
        )}
      </View>

      <View
        style={[
          styles.main,
          {
            width: isLandscape ? "85%" : "100%",
            paddingLeft: isLandscape ? 20 : 0,
          },
        ]}
      >
        <Text
          style={[
            styles.headerText,
            {
              marginTop: isLandscape ? 0 : 15,
            },
          ]}
        >
          Feedback form
        </Text>

        <View
          style={[
            styles.inputContainer,
            {
              flexDirection: isLandscape ? "row" : "column",
            },
          ]}
        >
          <TextInput
            editable
            multiline
            numberOfLines={6}
            maxLength={500}
            style={[styles.textInput, isLandscape && styles.textInputLandscape]}
            placeholder="Enter your comment"
            onChangeText={feedbackInputHandler}
            value={enteredFeedback}
          />

          <Pressable
            style={[styles.button, isLandscape && styles.buttonLandscape]}
            onPress={addFeedbackHandler}
          >
            <Text style={styles.buttonText}>Add feedback</Text>
          </Pressable>
        </View>

        <ScrollView>
          {feedbackCollection.map((feedback, index) => (
            <Pressable key={index}>
              <Text style={styles.feedbackItem}>{feedback}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  header: {
    backgroundColor: "#D8BFD8",
    padding: 8,
    borderWidth: 1,
    borderColor: "green",
    gap: 8,
  },

  main: {
    flex: 1,
  },

  headerItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00008B",
  },

  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#00008B",
    marginTop: 15,
    marginBottom: 10,
  },

  inputContainer: {
    alignItems: "center",
    paddingBottom: 28,
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#DDA0DD",
  },

  textInput: {
    borderWidth: 2,
    width: "90%",
    height: 150,
    fontSize: 18,
    padding: 8,
    textAlignVertical: "top",
  },

  textInputLandscape: {
    width: "55%",
    height: 95,
  },

  button: {
    width: "90%",
    height: 50,
    borderWidth: 2,
    marginTop: 20,
    backgroundColor: "#DDA0DD",
    justifyContent: "center",
    borderRadius: 12,
  },

  buttonLandscape: {
    width: 140,
    marginTop: 0,
    marginLeft: 15,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00008B",
  },

  feedbackItem: {
    margin: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#E6E6FA",
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    borderWidth: 2,
  },
});
