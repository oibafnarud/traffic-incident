import React from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { imageHandler } from '../../utils/imageHandler';
import { colors } from '../../theme';

export const ImageCapture = ({ images, onImagesChange, maxImages = 5 }) => {
  const handleTakePhoto = async () => {
    try {
      const photo = await imageHandler.takePhoto();
      if (photo) {
        onImagesChange([...images, photo]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const renderImage = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          const newImages = images.filter((_, i) => i !== index);
          onImagesChange(newImages);
        }}
      >
        <Ionicons name="close-circle" size={24} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          images.length < maxImages ? (
            <TouchableOpacity style={styles.addButton} onPress={handleTakePhoto}>
              <Ionicons name="camera" size={32} color={colors.primary} />
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};