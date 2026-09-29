import { Pressable, StyleSheet, Text } from 'react-native';
import { AppColors, Radius, Spacing } from '@/constants/design-system';

export function AppButton({ label, onPress, variant = 'primary' }: { label: string; onPress: () => void; variant?: 'primary' | 'secondary' }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, variant === 'primary' ? styles.primary : styles.secondary, pressed && styles.pressed]}>
    <Text style={[styles.label, variant === 'primary' ? styles.primaryLabel : styles.secondaryLabel]}>{label}</Text>
  </Pressable>;
}
const styles = StyleSheet.create({
  button: { minHeight: 48, paddingHorizontal: Spacing.md, justifyContent: 'center', alignItems: 'center', borderRadius: Radius.md },
  primary: { backgroundColor: AppColors.primary }, secondary: { backgroundColor: AppColors.surface, borderWidth: 1, borderColor: AppColors.border },
  label: { fontSize: 15, fontWeight: '700' }, primaryLabel: { color: AppColors.onPrimary }, secondaryLabel: { color: AppColors.text }, pressed: { opacity: 0.75 },
});
