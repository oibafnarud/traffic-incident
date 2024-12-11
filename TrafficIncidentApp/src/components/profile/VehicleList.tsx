export const VehicleList = ({ vehicles }) => (
    <View style={styles.vehicleList}>
      <Text style={styles.sectionTitle}>Mis Vehículos</Text>
      {vehicles.map((vehicle) => (
        <View key={vehicle.id} style={styles.vehicleCard}>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehiclePlate}>{vehicle.plate}</Text>
            <Text style={styles.vehicleModel}>
              {vehicle.brand} {vehicle.model} {vehicle.year}
            </Text>
          </View>
          <View style={styles.insurance}>
            <Text style={styles.insuranceCompany}>
              {vehicle.insurance.company}
            </Text>
            <Text style={styles.insuranceExpiry}>
              Vence: {new Date(vehicle.insurance.expirationDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );