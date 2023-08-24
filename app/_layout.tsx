import { persistor, store } from "@/redux/store";

import { router, Slot, useRootNavigationState } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout() {
  //for back button check, can't call router fns until navState is set up
  //TODO: fix back button on hard refresh
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
            <Text style={styles.appName}>Fight Club On Ice</Text>
          </View>
          <View style={styles.right}>
            <Text></Text>
          </View>
        </View>
        <View style={styles.slotContainer}>
          <Slot />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#f3f3f4",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
  },
  left: { flexGrow: 1, flexBasis: 0, alignItems: "flex-start" },
  center: { flexGrow: 1, flexBasis: 0, alignItems: "center" },
  right: { flexGrow: 1, flexBasis: 0, alignItems: "flex-end" },
  appName: { fontWeight: "700", fontSize: 24 },
  slotContainer: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
  },
});
