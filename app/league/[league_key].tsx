import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

function StandingsButton(leagueKey: String) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const handleStandingsOnPress = async (
    accessToken: String,
    leagueKey: String
  ) => {};
  return (
    <View>
      <Pressable
        onPress={() => {
          handleStandingsOnPress(user.accessToken, leagueKey);
        }}
      >
        <Text>Standings</Text>
      </Pressable>
    </View>
  );
}

export default function League() {
  const { league_key } = useLocalSearchParams();
  const leagues = useAppSelector((state) => state.leagues);
  const currentLeague = leagues.find((l) => l.league_key === league_key);
  return (
    <View style={styles.container}>
      <Text>
        League Page for: {currentLeague?.name} (
        {currentLeague?.season.toString()})
      </Text>
      <Text>json: {JSON.stringify(currentLeague)}</Text>
      <StandingsButton leagueKey={league_key as String} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    width: 500,
    minHeight: 500,
    padding: 10,
  },
});
