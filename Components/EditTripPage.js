import "react-native-gesture-handler";
import { Text, View, Alert, TouchableOpacity, TextInput } from "react-native";
import { Connection_db } from "./configDb";
import React, { useState, useEffect } from "react";
import { StyleEdit } from "../Styles/EditStyle";
const db_Trip = Connection_db.getDb_Trip();

const EditPage = ({ route, navigation }) => {
  const [tripId, setTripId] = useState("");
  const [nameTrip, setNameTrip] = useState("");
  const [destinationTrip, setDestinationTrip] = useState("");
  const [datetimeTrip, setDatetimeTrip] = useState("");
  const [assessmentTrip, setAssessmentTrip] = useState("");
  const [descriptionTrip, setDescriptionTrip] = useState("");
  const Param = route.params;
  useEffect(() => {
    setTripId(Param.tripId);
    setNameTrip(Param.nameTrip);
    setDestinationTrip(Param.destinationTrip);
    setDatetimeTrip(Param.datetimeTrip);
    setAssessmentTrip(Param.assessmentTrip);
    setDescriptionTrip(Param.descriptionTrip);
  }, []);
  const editData = () => {
    db_Trip.transaction((res) => {
      res.executeSql(
        "UPDATE table_trip set   destinationTrip=? , datetimeTrip=? , assessmentTrip=? , descriptionTrip=? where nameTrip=?",
        [
          descriptionTrip,
          datetimeTrip,
          assessmentTrip,
          destinationTrip,
          nameTrip,
        ],
        (res, trip) => {
          if (trip.rowsAffected > 0) {
            Alert.alert("trip Updated Successfully");
            navigation.navigate("Page");
          } else Alert.alert("Wanning!!,Cannot be Edited");
        }
      );
    });
  };
  const handlerOndeleteTrip = () => {
    try {
      db.transaction((res) => {
        res.executeSql(
          "DELETE FROM table_trip WHERE Id = ?",
          [tripId],
          (res, result) => {
            alert("Deleted trip !!!");
          }
        );
      });
    } catch (error) {}
    navigation.navigate("Page");
  };
  return (
    <View style={StyleEdit.tripLayout}>
      <Text style={{ color: "#000" }}>Edit</Text>
      <TextInput
        style={StyleEdit.inputStrip}
        onChangeText={(textTrip) => setName(textTrip)}
        placeholder="trip"
        value={name}
      />
      <TextInput
        style={StyleEdit.inputStrip}
        onChangeText={(textTrip) => setDestination(textTrip)}
        placeholder="trip destination "
        value={destination}
      />
      <TextInput
        style={StyleEdit.inputStrip}
        onChangeText={(textTrip) => setDatetime(textTrip)}
        placeholder="date of the trip"
        value={datetime}
      />
      <View style={StylesHome.tripLayout}>
        {["YES", "NO"].map((trip) => (
          <View key={trip} style={styles.Tripnon}>
            <Text style={StylesHome.textTrip}>{trip}</Text>
            <TouchableOpacity
              style={StylesHome.inputOutter}
              onPress={() => setDescriptionTrip(trip)}
            >
              {assessmentTrip === trip && (
                <View style={StylesHome.inPutInner} />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TextInput
        style={StyleEdit.inputStrip}
        onChangeText={(text) => setDescription(text)}
        placeholder="description"
        value={descriptionTrip}
      />
      <TouchableOpacity style={StyleEdit.buttonTouch} onPress={editData}>
        <Text style={StyleEdit.buttonTouchText}> Edit Trip </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[StyleEdit.buttonTouch, { backgroundColor: "black" }]}
        onPress={handlerOndeleteTrip}
      >
        <Text style={StyleEdit.buttonTouchText}> Delete Trip </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPage;

