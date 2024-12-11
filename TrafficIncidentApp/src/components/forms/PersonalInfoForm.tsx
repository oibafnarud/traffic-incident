import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput } from '../common/FormInput';
import { Button } from '../common/Button';
import { validateEmail, validateCedula, validatePhone } from '../../utils/validation';

export const PersonalInfoForm = ({ data, onUpdate, onNext }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(data.email)) newErrors.email = 'Email inválido';
    if (!validateCedula(data.cedula)) newErrors.cedula = 'Cédula inválida';
    if (!validatePhone(data.phone)) newErrors.phone = 'Teléfono inválido';
    if (data.password.length < 6) newErrors.password = 'Contraseña muy corta';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <View style={styles.container}>
      <FormInput
        label="Nombre Completo"
        value={data.name}
        onChangeText={(text) => onUpdate({ ...data, name: text })}
        error={errors.name}
        placeholder="Ej: Juan Pérez"
      />

      <FormInput
        label="Cédula"
        value={data.cedula}
        onChangeText={(text) => onUpdate({ ...data, cedula: text })}
        error={errors.cedula}
        placeholder="000-0000000-0"
        keyboardType="numeric"
      />

      <FormInput
        label="Email"
        value={data.email}
        onChangeText={(text) => onUpdate({ ...data, email: text })}
        error={errors.email}
        placeholder="ejemplo@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInput
        label="Teléfono"
        value={data.phone}
        onChangeText={(text) => onUpdate({ ...data, phone: text })}
        error={errors.phone}
        placeholder="(849) 000-0000"
        keyboardType="phone-pad"
      />

      <FormInput
        label="Contraseña"
        value={data.password}
        onChangeText={(text) => onUpdate({ ...data, password: text })}
        error={errors.password}
        secureTextEntry
      />

      <Button 
        title="Siguiente"
        onPress={handleNext}
        variant="primary"
      />
    </View>
  );
};
