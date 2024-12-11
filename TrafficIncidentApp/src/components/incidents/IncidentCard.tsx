import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { colors, typography } from '../../theme';

export const IncidentCard = ({ incident, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.header}>
      <Text style={styles.date}>
        {format(new Date(incident.date), "d 'de' MMMM, yyyy", { locale: es })}
      </Text>
      <View style={[styles.statusBadge, styles[incident.status]]}>
        <Text style={styles.statusText}>{incident.status}</Text>
      </View>
    </View>
    <Text style={styles.location}>{incident.location.address}</Text>
  </TouchableOpacity>
);