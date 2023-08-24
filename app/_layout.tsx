import { persistor, store } from "@/redux/store";
import { router, Slot, useRootNavigationState } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout() {
  //for back button check, can't call router fns until navState is set up
  const navState = useRootNavigationState();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.header}>
          <View style={styles.left}>
            {navState?.key && router.canGoBack() && (
              <Pressable
                onPress={() => {
                  router.back();
                }}
              >
                <Text>Back</Text>
              </Pressable>
            )}
          </View>
          <View style={styles.center}>
            <Text>Fight Club On Ice</Text>
          </View>
          <View style={styles.right}>
            <Text></Text>
          </View>
        </View>
        <View style={styles.container}>
          <Slot />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  left: { flexGrow: 1, flexBasis: 0, alignItems: "flex-start" },
  center: { flexGrow: 1, flexBasis: 0, alignItems: "center" },
  right: { flexGrow: 1, flexBasis: 0, alignItems: "flex-end" },
  container: {
    flex: 1,
    backgroundColor: "darkgray",
    alignItems: "center",
    justifyContent: "center",
  },
});
