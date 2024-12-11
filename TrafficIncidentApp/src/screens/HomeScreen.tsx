import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { IncidentCard } from '../components/incidents/IncidentCard';
import { EmptyState } from '../components/common/EmptyState';
import { colors, globalStyles } from '../theme';

export const HomeScreen = ({ navigation }) => {
  const incidents = useSelector(state => state.incidents.list);

  const renderIncident = ({ item }) => (
    <IncidentCard 
      incident={item}
      onPress={() => navigation.navigate('IncidentDetails', { id: item.id })}
    />
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={incidents}
        renderItem={renderIncident}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="car-outline"
            title="Sin incidentes"
            message="No tienes incidentes reportados"
          />
        }
      />
    </View>
  );
};