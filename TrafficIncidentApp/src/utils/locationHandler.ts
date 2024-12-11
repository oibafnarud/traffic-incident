import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const locationHandler = {
  async requestPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso requerido',
        'Necesitamos acceder a tu ubicación para reportar el incidente'
      );
      return false;
    }
    return true;
  },

  async getCurrentLocation() {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return null;

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      const address = await this.getAddressFromCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  },

  async getAddressFromCoordinates(latitude: number, longitude: number) {
    try {
      const [location] = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (location) {
        return {
          street: location.street,
          city: location.city,
          region: location.region,
          country: location.country,
          formattedAddress: [
            location.street,
            location.city,
            location.region,
            location.country
          ].filter(Boolean).join(', ')
        };
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
    return null;
  }
};