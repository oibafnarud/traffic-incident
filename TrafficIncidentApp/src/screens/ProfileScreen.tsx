import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { VehicleList } from '../components/profile/VehicleList';
import { ProfileOptions } from '../components/profile/ProfileOptions';
import { logout } from '../store/slices/authSlice';
import { globalStyles } from '../theme';

export const ProfileScreen = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.content}>
        <ProfileHeader user={user} />
        <VehicleList vehicles={user.vehicles} />
        <ProfileOptions onLogout={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
  listContent: {
    padding: 16,
    gap: 12,
  }
});