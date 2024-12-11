import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INSURANCE_COMPANIES = [
  { id: '1', name: 'Seguros Patria' },
  { id: '2', name: 'Seguros Pepín' },
  { id: '3', name: 'La Colonial' },
  { id: '4', name: 'Mapfre BHD' },
  { id: '5', name: 'Seguros Sura' },
  { id: '6', name: 'Seguros Universal' },
  { id: '7', name: 'Seguros Banreservas' },
  { id: '8', name: 'Humano Seguros' }
];

interface InsuranceCompanyPickerProps {
  selectedCompany: string;
  onSelect: (company: string) => void;
  error?: string;
}

export const InsuranceCompanyPicker = ({ 
  selectedCompany, 
  onSelect,
  error 
}: InsuranceCompanyPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (company: string) => {
    onSelect(company);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Aseguradora</Text>
      <TouchableOpacity 
        style={[styles.picker, error && styles.pickerError]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {selectedCompany || 'Seleccionar aseguradora'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <FlatList
              data={INSURANCE_COMPANIES}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.companyItem}
                  onPress={() => handleSelect(item.name)}
                >
                  <Text style={styles.companyText}>{item.name}</Text>
                  {selectedCompany === item.name && (
                    <Ionicons name="checkmark" size={24} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerError: {
    borderColor: '#ff3b30',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '70%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  companyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  companyText: {
    fontSize: 16,
    color: '#333',
  },
});