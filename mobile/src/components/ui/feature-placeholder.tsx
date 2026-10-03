import { StyleSheet, Text, View } from 'react-native';
import { AppColors, Radius, Spacing } from '@/constants/design-system';

export function FeaturePlaceholder({
  title,
  description,
  note = false,
}: {
  title: string;
  description: string;
  note?: boolean;
}) {
  return (
    <View style={[styles.box, note && styles.note]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    gap: Spacing.xs,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: AppColors.border,
    backgroundColor: AppColors.surface,
  },
  note: {
    borderColor: AppColors.accentSurface,
    backgroundColor: AppColors.accentSurface,
  },
  title: { color: AppColors.text, fontSize: 16, fontWeight: '700' },
  description: { color: AppColors.muted, fontSize: 14, lineHeight: 21 },
});
