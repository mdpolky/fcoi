import { StatusBar } from "expo-status-bar";
import { addUser } from "./app/firebase/firestore";
import { authWithYahoo } from "./app/firebase/authentication";
import { store } from "./app/redux/store";
import { useAppDispatch, useAppSelector } from "./app/redux/hooks";
import { Provider } from "react-redux";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { setYahooUser } from "./app/redux/userSlice";
import { getLeagues } from "./app/yahooApi";

async function handleFirestoreOnPress() {
  const payload = {
    firstName: "Jimmy",
    lastName: "John",
  };
  try {
    const docRef = await addUser(payload);
    console.log("Document written with ID: ", docRef?.id);
  } catch (err) {
    console.error(err);
    //handle error case
  }
}

async function handleYahooLeaguesOnPress(accessToken: String) {
  try {
    const result = await getLeagues(accessToken);
  } catch (err) {
    console.error(err);
    //handle error case
  }
}

function YahooSignIn() {
  const dispatch = useAppDispatch();
  const handleYahooOnPress = async () => {
    try {
      const result = await authWithYahoo();
      if (result) {
        const yahooUser = {
          displayName: result.yahooUser.user.displayName!,
          email: result.yahooUser.user.email!,
          accessToken: result.accessToken!,
        };
        dispatch(setYahooUser(yahooUser));
      }
    } catch (err) {
      console.error(err);
      //handle error case
    }
  };
  return (
    <Pressable style={styles.button} onPress={handleYahooOnPress}>
      <Text>Sign In With Yahoo</Text>
    </Pressable>
  );
}

function YahooLeagues() {
  const user = useAppSelector((state) => state.user);
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        handleYahooLeaguesOnPress(user.accessToken);
      }}
    >
      <Text>Get Yahoo Leagues</Text>
    </Pressable>
  );
}

function AppRoot() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleFirestoreOnPress}>
        <Text>Add To Firestore</Text>
      </Pressable>
      <YahooSignIn />
      <YahooLeagues />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#bada55",
    padding: 10,
  },
});
