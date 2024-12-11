import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../theme';

export const ProfileHeader = ({ user }) => (
  <View style={styles.header}>
    <View style={styles.avatarContainer}>
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0)}
          </Text>
        </View>
      )}
    </View>
    <Text style={styles.name}>{user.name}</Text>
    <Text style={styles.cedula}>{user.cedula}</Text>
    <Text style={styles.email}>{user.email}</Text>
  </View>
);