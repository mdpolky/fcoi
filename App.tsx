import { StatusBar } from "expo-status-bar";
import { addUser } from "./app/firebase/firestore";
import { authWithYahoo } from "./app/firebase/authentication";
import { persistor, store } from "./app/redux/store";
import { useAppDispatch, useAppSelector } from "./app/redux/hooks";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { setYahooUser } from "./app/redux/userSlice";
import { setYahooLeagues } from "./app/redux/leaguesSlice";
import { getLeagues } from "./app/yahooApi";

async function handleFirestoreOnPress() {
  const payload = {
    firstName: "Jimmy",
    lastName: "John",
  };
  try {
    const docRef = await addUser(payload);
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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const handleYahooLeaguesOnPress = async (accessToken: String) => {
    try {
      const result = await getLeagues(accessToken);
      dispatch(setYahooLeagues(result.leagues));
    } catch (err) {
      console.error(err);
      //handle error case
    }
  };
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

function UserLeagues() {
  const leagues = useAppSelector((state) => state.leagues);
  return (
    <View>
      {leagues.map((league, i) => {
        return (
          <View key={league.league_key as React.Key}>
            <Text>
              {league.name} {String(league.season)}
            </Text>
          </View>
        );
      })}
    </View>
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
      <UserLeagues />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoot />
      </PersistGate>
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
