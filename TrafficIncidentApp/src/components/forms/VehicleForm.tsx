import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput } from '../common/FormInput';
import { Button } from '../common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InsuranceCompanyPicker } from '../common/InsuranceCompanyPicker';

export const VehicleForm = ({ data, onUpdate, onSubmit, onBack }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!data.plate.match(/^[A-Z0-9]{5,8}$/)) {
      newErrors.plate = 'Placa inválida';
    }
    if (!data.brand) newErrors.brand = 'Marca requerida';
    if (!data.model) newErrors.model = 'Modelo requerido';
    if (!data.year || data.year < 1900 || data.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Año inválido';
    }
    if (!data.insurance.policyNumber) {
      newErrors.policyNumber = 'Número de póliza requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit();
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onUpdate({
        ...data,
        insurance: {
          ...data.insurance,
          expirationDate: selectedDate.toISOString()
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <FormInput
        label="Placa"
        value={data.plate}
        onChangeText={(text) => onUpdate({ ...data, plate: text.toUpperCase() })}
        error={errors.plate}
        autoCapitalize="characters"
        placeholder="A000000"
      />

      <FormInput
        label="Marca"
        value={data.brand}
        onChangeText={(text) => onUpdate({ ...data, brand: text })}
        error={errors.brand}
        placeholder="Ej: Toyota"
      />

      <FormInput
        label="Modelo"
        value={data.model}
        onChangeText={(text) => onUpdate({ ...data, model: text })}
        error={errors.model}
        placeholder="Ej: Corolla"
      />

      <FormInput
        label="Año"
        value={data.year.toString()}
        onChangeText={(text) => onUpdate({ ...data, year: text })}
        error={errors.year}
        keyboardType="numeric"
        placeholder="Ej: 2022"
      />

      <InsuranceCompanyPicker
        selectedCompany={data.insurance.company}
        onSelect={(company) => onUpdate({
          ...data,
          insurance: { ...data.insurance, company }
        })}
      />

      <FormInput
        label="Número de Póliza"
        value={data.insurance.policyNumber}
        onChangeText={(text) => onUpdate({
          ...data,
          insurance: { ...data.insurance, policyNumber: text }
        })}
        error={errors.policyNumber}
        placeholder="Ej: POL-123456"
      />

      <FormInput
        label="Fecha de Vencimiento del Seguro"
        value={data.insurance.expirationDate ? 
          new Date(data.insurance.expirationDate).toLocaleDateString() : ''}
        onFocus={() => setShowDatePicker(true)}
        error={errors.expirationDate}
      />

      {showDatePicker && (
        <DateTimePicker
          value={data.insurance.expirationDate ? 
            new Date(data.insurance.expirationDate) : new Date()}
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
          title="Registrar"
          onPress={handleSubmit}
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
  }
});