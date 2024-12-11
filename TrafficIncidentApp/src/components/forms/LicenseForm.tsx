import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput } from '../common/FormInput';
import { Button } from '../common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

export const LicenseForm = ({ data, onUpdate, onNext, onBack }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onUpdate({ ...data, expiry: selectedDate.toISOString() });
    }
  };

  return (
    <View style={styles.container}>
      <FormInput
        label="Número de Licencia"
        value={data.number}
        onChangeText={(text) => onUpdate({ ...data, number: text })}
        error={errors.number}
      />

      <FormInput
        label="Fecha de Vencimiento"
        value={data.expiry ? new Date(data.expiry).toLocaleDateString() : ''}
        onFocus={() => setShowDatePicker(true)}
        error={errors.expiry}
      />

      {showDatePicker && (
        <DateTimePicker
          value={data.expiry ? new Date(data.expiry) : new Date()}
          mode="date"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Atrás"
          onPress={onBack}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Siguiente"
          onPress={onNext}
          variant="primary"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
