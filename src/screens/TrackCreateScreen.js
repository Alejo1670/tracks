import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { withNavigationFocus } from "react-navigation";
import Spacer from "../components/Spacer";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    addLocation,
    state: { recording }
  } = useContext(LocationContext);

  const callback = useCallback(
    location => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView style={styles.container}>
      <Spacer>
        <Text h3>Create a Track </Text>
        <Map />
        {err ? <Text>Please enable location services </Text> : null}
        <TrackForm />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  }
});

export default withNavigationFocus(TrackCreateScreen);

//To reset the permissions on android emulator: run on the prompt
//adb shell pm reset-permissions
