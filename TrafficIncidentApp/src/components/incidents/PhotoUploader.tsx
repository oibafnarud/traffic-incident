import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export const PhotoUploader = ({ photos, onPhotosChange }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      onPhotosChange([...photos, result.assets[0].uri]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                const newPhotos = photos.filter((_, i) => i !== index);
                onPhotosChange(newPhotos);
              }}
            >
              <Ionicons name="close-circle" size={24} color={colors.danger} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
          <Ionicons name="camera" size={32} color={colors.primary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos para IncidentCard
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: typography.sizes.md,
    color: colors.gray[700],
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  draft: { backgroundColor: colors.gray[200] },
  pending: { backgroundColor: colors.warning + '20' },
  processing: { backgroundColor: colors.info + '20' },
  completed: { backgroundColor: colors.success + '20' },
  statusText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  location: {
    fontSize: typography.sizes.md,
    color: colors.gray[900],
  },

  // Estilos para LocationPicker
  container: {
    height: 300,
    marginBottom: 16,
  },
  map: {
    flex: 1,
    marginBottom: 16,
  },

  // Estilos para PhotoUploader
  photoContainer: {
    marginRight: 8,
    position: 'relative',
  },
  photo: {
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
});