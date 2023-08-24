import { getLeagues } from "@/yahooApi";
import { addUser } from "@/firebase/firestore";
import { authWithYahoo } from "@/firebase/authentication";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setYahooLeagues } from "@/redux/leaguesSlice";
import { setYahooUser } from "@/redux/userSlice";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, Pressable, StyleSheet, Text, View } from "react-native";

//https://github.com/necolas/react-native-web/commit/1c5119b7e1638a22210291ef9ede5d9ab599ec55
LogBox.ignoreLogs([
  "BackHandler is not supported on web and should not be used.",
]);

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
    <View style={styles.container}>
      {leagues.map((league, i) => {
        return (
          <View key={league.league_key as React.Key}>
            <Text>
              <Link
                style={styles.link}
                href={{
                  pathname: "/league/[league_key]",
                  params: { league_key: league.league_key },
                }}
              >
                {league.name} ({String(league.season)})
              </Link>
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default function App() {
  const [assets, error] = useAssets([require("../assets/fcoi-logo.png")]);
  const logoUri = assets && assets[0].uri;
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: logoUri }} />
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

const styles = StyleSheet.create({
  container: {
    gap: 20,
    alignItems: "center",
  },
  button: {
    width: 150,
    backgroundColor: "#bada55",
    padding: 10,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: "center",
  },
  logo: { width: 150, height: 150 },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
