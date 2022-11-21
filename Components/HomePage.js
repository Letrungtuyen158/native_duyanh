import {
  SafeAreaView,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Connection_db } from "./configDb";
import React, { useState, useEffect } from "react";
import { StylesHome } from "../Styles/HomeStyle";
const db_Trip = Connection_db.getDb_Trip();
const HomePage = ({ navigation }) => {
  const [nameTrip, setNameTrip] = useState("");
  const [destinationTrip, setDestinationTrip] = useState("");
  const [datetimeTrip, setDatetimeTrip] = useState("");
  const [assessmentTrip, setAssessmentTrip] = useState("");
  const [descriptionTrip, setDescriptionTrip] = useState("");

  useEffect(() => {
    db_Trip.transaction(function (trip) {
      trip.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_trip'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            trip.executeSql("DROP TABLE IF EXISTS table_trip", []);
            trip.executeSql(
              "CREATE TABLE IF NOT EXISTS table_trip(Id INTEGER PRIMARY KEY AUTOINCREMENT, nameTrip TEXT , destinationTrip TEXT, datetimeTrip TEXT, assessmentTrip TEXT, descriptionTrip TEXT)",
              []
            );
          }
        }
      );
    });
  }, []);

  const handlerAddToDatabase = () => {
    if (
      !nameTrip ||
      !destinationTrip ||
      !datetimeTrip ||
      !assessmentTrip ||
      !descriptionTrip
    ) {
      Alert.alert(" please, Enter in the input box !");
      return;
    } else {
      db_Trip.transaction(function (res) {
        res.executeSql(
          "INSERT INTO table_trip(nameTrip, destinationTrip, datetimeTrip, assessmentTrip, descriptionTrip) VALUES (?,?,?,?,?)",
          [
            nameTrip,
            destinationTrip,
            datetimeTrip,
            assessmentTrip,
            descriptionTrip,
          ],
          (res, trip) => {}
        );
      });
      navigation.navigate("AllTripPage");
    }
  };

  const handlerToPage = () => {
    navigation.navigate("AllTripPage");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={StylesHome.homeContainer}>
        <Text style={{ color: "#000" }}>Home</Text>
        <TextInput
          style={StylesHome.inputStrip}
          onChangeText={(textTrip) => setNameTrip(textTrip)}
          placeholder="trip"
          value={nameTrip}
        />
        <TextInput
          style={StylesHome.inputStrip}
          onChangeText={(textTrip) => setDestinationTrip(textTrip)}
          placeholder="trip destination "
          value={destinationTrip}
        />
        <TextInput
          style={StylesHome.inputStrip}
          onChangeText={(textTrip) => setDatetimeTrip(textTrip)}
          placeholder="date of the trip"
          value={datetimeTrip}
        />
        <TextInput
          style={StylesHome.inputStrip}
          onChangeText={(textTrip) => setAssessmentTrip(textTrip)}
          placeholder="assessmentTrip"
          value={assessmentTrip}
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
        <TouchableOpacity
          style={StylesHome.buttonTouch}
          onPress={handlerAddToDatabase}
        >
          <Text style={StylesHome.buttonTouchText}> add to database </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[StylesHome.buttonTouch, { marginTop: 20 }]}
          onPress={handlerToPage}
        >
          <Text style={StylesHome.buttonTouchText}>click here view all </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

