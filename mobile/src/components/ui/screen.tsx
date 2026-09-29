import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors, Spacing } from '@/constants/design-system';

export function Screen({ title, subtitle, children }: PropsWithChildren<{ title: string; subtitle?: string }>) {
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView contentContainerStyle={styles.content}>
    <View style={styles.header}><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>
    {children}
  </ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: AppColors.background }, content: { gap: Spacing.md, padding: Spacing.lg },
  header: { gap: Spacing.xs }, title: { color: AppColors.text, fontSize: 28, fontWeight: '800', letterSpacing: -0.8 },
  subtitle: { color: AppColors.muted, fontSize: 15, lineHeight: 22 },
});
