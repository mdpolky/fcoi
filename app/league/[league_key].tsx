import { useAppSelector } from "@/redux/hooks";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function League() {
  const { league_key } = useLocalSearchParams();
  const leagues = useAppSelector((state) => state.leagues);
  const currentLeague = leagues.find((l) => l.league_key === league_key);
  console.log(league_key);
  return (
    <View style={styles.container}>
      <Text>
        League Page for: {currentLeague?.name} (
        {currentLeague?.season.toString()})
      </Text>
      <Text>json: {JSON.stringify(currentLeague)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 3,
    width: 500,
    minHeight: 500,
    padding: 10,
  },
});
