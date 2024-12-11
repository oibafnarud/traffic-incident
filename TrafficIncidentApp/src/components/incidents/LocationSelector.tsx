import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../../hooks/useLocation';
import { Button } from '../common/Button';

export const LocationSelector = ({ onLocationSelect }) => {
  const { location, loading, error } = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (location) {
      setSelectedLocation(location);
    }
  }, [location]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Reintentar" onPress={getLocation} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedLocation && (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onPress={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
          >
            <Marker coordinate={selectedLocation} />
          </MapView>
          <Text style={styles.address}>
            {selectedLocation.address?.formattedAddress}
          </Text>
          <Button 
            title="Confirmar Ubicación"
            onPress={() => onLocationSelect(selectedLocation)}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginBottom: 16,
  },
  imageContainer: {
    marginRight: 8,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    marginBottom: 8,
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: colors.danger,
    marginBottom: 16,
    textAlign: 'center',
  },
  address: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  }
});