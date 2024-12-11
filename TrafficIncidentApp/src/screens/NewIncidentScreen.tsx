import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '../components/common/Button';
import { LocationPicker } from '../components/incident/LocationPicker';
import { PhotoUploader } from '../components/incident/PhotoUploader';
import { VehicleSelector } from '../components/incident/VehicleSelector';
import { createIncident } from '../store/slices/incidentSlice';
import { globalStyles } from '../theme';

export const NewIncidentScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      await dispatch(createIncident({
        location,
        photos,
        vehicleId: selectedVehicle?.id
      })).unwrap();
      navigation.navigate('Home');
    } catch (error) {
      // Manejar error
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.content}>
        <LocationPicker
          onLocationSelect={setLocation}
        />
        <PhotoUploader
          photos={photos}
          onPhotosChange={setPhotos}
        />
        <VehicleSelector
          selectedVehicle={selectedVehicle}
          onVehicleSelect={setSelectedVehicle}
        />
        <Button
          title="Reportar Incidente"
          onPress={handleSubmit}
          disabled={!location || !selectedVehicle || photos.length === 0}
        />
      </View>
    </ScrollView>
  );
};