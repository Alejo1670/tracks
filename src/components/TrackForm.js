import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as LocationContext } from "../context/LocationContext";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName
  } = useContext(LocationContext);

  return (
    <>
      <Input placeholder="Enter name" value={name} onChangeText={changeName} />
      <Spacer />
      {recording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start recording" onPress={startRecording} />
      )}
    </>
  );
};

export default TrackForm;
