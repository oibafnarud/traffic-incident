export const ProfileOptions = ({ onLogout }) => {
    const options = [
      {
        icon: 'person-outline',
        title: 'Editar Perfil',
        onPress: () => {}
      },
      {
        icon: 'car-outline',
        title: 'Agregar Vehículo',
        onPress: () => {}
      },
      {
        icon: 'shield-outline',
        title: 'Seguridad',
        onPress: () => {}
      },
      {
        icon: 'log-out-outline',
        title: 'Cerrar Sesión',
        onPress: onLogout,
        danger: true
      }
    ];
  
    return (
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={option.onPress}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={option.danger ? colors.danger : colors.gray[800]}
            />
            <Text style={[
              styles.optionText,
              option.danger && styles.dangerText
            ]}>
              {option.title}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.gray[400]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    avatarContainer: {
      marginBottom: 16,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    avatarPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      color: colors.white,
      fontSize: 40,
      fontWeight: 'bold',
    },
    name: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      marginBottom: 4,
    },
    cedula: {
      fontSize: typography.sizes.md,
      color: colors.gray[600],
      marginBottom: 4,
    },
    email: {
      fontSize: typography.sizes.md,
      color: colors.gray[600],
    },
    vehicleList: {
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.semibold,
      marginBottom: 12,
    },
    vehicleCard: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
    },
    vehicleInfo: {
      marginBottom: 8,
    },
    vehiclePlate: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.semibold,
    },
    vehicleModel: {
      fontSize: typography.sizes.md,
      color: colors.gray[600],
    },
    insurance: {
      borderTopWidth: 1,
      borderTopColor: colors.gray[200],
      paddingTop: 8,
    },
    insuranceCompany: {
      fontSize: typography.sizes.md,
      color: colors.gray[800],
    },
    insuranceExpiry: {
      fontSize: typography.sizes.sm,
      color: colors.gray[600],
    },
    optionsContainer: {
      marginTop: 20,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.white,
      borderRadius: 12,
      marginBottom: 8,
    },
    optionText: {
      flex: 1,
      marginLeft: 12,
      fontSize: typography.sizes.md,
      color: colors.gray[800],
    },
    dangerText: {
      color: colors.danger,
    }
  });