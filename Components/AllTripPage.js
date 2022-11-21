import "react-native-gesture-handler";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { Connection_db } from "../database/Db-connection";
import React, { useState, useEffect } from "react";
import { StyleAllTrip } from "../Styles/AllTripPage";
const db_Trip = Connection_db.getDb_Trip();
const AllTripPage = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    db_Trip.transaction((trip) => {
      trip?.executeSql("SELECT * FROM table_trip", [], (trip, tripList) => {
        const list = [];
        for (let i = 0; i < tripList?.rows?.length; ++i)
          list.push(tripList.rows.item(i));
        setListData(list);
      });
    });
  }, []);

  const hadnleToEditPage = (
    id,
    nameTrip,
    destinationTrip,
    datetimeTrip,
    assessmentTrip,
    descriptionTrip
  ) => {
    navigation.navigate("EditTripPage", {
      Id: id,
      nameTrip,
      destinationTrip,
      datetimeTrip,
      assessmentTrip,
      descriptionTrip,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ list }) => (
          <View key={list?.Id} style={{ padding: 19 }}>
            <TouchableOpacity
              onPress={() =>
                hadnleToEditPage(
                  list?.Id,
                  list?.nameTrip,
                  list?.destinationTrip,
                  list?.datetimeTrip,
                  list?.assessmentTrip,
                  list?.descriptionTrip
                )
              }
            >
              <Text style={StyleAllTrip.ALlTripStyle}> Id: {listData.Id} </Text>
              <Text style={StyleAllTrip.ALlTripStyle}>
                Name: {listData.nameTrip}
              </Text>
              <Text style={StyleAllTrip.ALlTripStyle}>
                Destination: {list.destinationTrip}
              </Text>
              <Text style={StyleAllTrip.ALlTripStyle}>
                Datetime: {listData.datetimeTrip}
              </Text>
              <Text style={StyleAllTrip.ALlTripStyle}>
                Assessment: {listData.assessmentTrip}
              </Text>
              <Text style={StyleAllTrip.ALlTripStyle}>
                Description: {listData.descriptionTrip}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default AllTripPage;

