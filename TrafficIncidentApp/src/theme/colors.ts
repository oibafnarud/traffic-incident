export const colors = {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    info: '#5AC8FA',
    background: '#F2F2F7',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      100: '#F2F2F7',
      200: '#E5E5EA',
      300: '#D1D1D6',
      400: '#C7C7CC',
      500: '#AEAEB2',
      600: '#8E8E93',
      700: '#636366',
      800: '#48484A',
      900: '#3A3A3C'
    }
  };
  
  // TrafficIncidentApp/src/theme/spacing.ts
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40
  };
  
  // TrafficIncidentApp/src/theme/typography.ts
  export const typography = {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  };
  
  // TrafficIncidentApp/src/theme/index.ts
  export { colors } from './colors';
  export { spacing } from './spacing';
  export { typography } from './typography';
  
  // TrafficIncidentApp/src/theme/globalStyles.ts
  import { StyleSheet } from 'react-native';
  import { colors, spacing, typography } from './index';
  
  export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.white
    },
    content: {
      padding: spacing.md
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: spacing.md,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3
    },
    title: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.bold,
      color: colors.black,
      marginBottom: spacing.md
    },
    subtitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.semibold,
      color: colors.gray[800],
      marginBottom: spacing.sm
    },
    text: {
      fontSize: typography.sizes.md,
      color: colors.gray[900]
    },
    error: {
      color: colors.danger,
      fontSize: typography.sizes.sm,
      marginTop: spacing.xs
    }
  });