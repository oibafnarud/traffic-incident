import axios from 'axios';
import { Location } from '../types/location';

export class LocationService {
  private readonly GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  async getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.GOOGLE_API_KEY}`;
    const { data } = await axios.get(url);
    return data.results[0]?.formatted_address || '';
  }

  async validateLocation(location: Location): Promise<boolean> {
    // Validar que la ubicación está dentro de República Dominicana
    const DOMINICAN_BOUNDS = {
      north: 19.9319,
      south: 17.4700,
      west: -72.0035,
      east: -68.3200
    };

    return (
      location.latitude >= DOMINICAN_BOUNDS.south &&
      location.latitude <= DOMINICAN_BOUNDS.north &&
      location.longitude >= DOMINICAN_BOUNDS.west &&
      location.longitude <= DOMINICAN_BOUNDS.east
    );
  }
}