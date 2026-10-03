import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppColors, ComponentSize, IconSize, Radius, Typography } from '@/constants/design-system';
import { AppIcon } from '@/components/ui/app-icon';

type Props = {
  sectionTitle: string;
  actionText: string;
  icon: 'laundry' | 'medicine' | 'cart';
  title: string;
  detail: string;
  highlighted?: boolean;
  onPress: () => void;
};

export function HomeTaskCard({
  sectionTitle,
  actionText,
  icon,
  title,
  detail,
  highlighted,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, highlighted && styles.highlighted]}
    >
      <View style={styles.heading}>
        <Text
          style={[styles.sectionTitle, highlighted && styles.highlightText]}
        >
          {sectionTitle}
        </Text>
        <View style={styles.action}>
          <Text style={styles.actionText}>{actionText}</Text>
          <AppIcon
            name="forward"
            color={AppColors.muted}
            size={IconSize.compact}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <AppIcon
            name={icon}
            color={AppColors.primaryDark}
            size={IconSize.row}
          />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.detail}>{detail}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  highlighted: { backgroundColor: '#F1F8EE', borderColor: '#D6E6D2' },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  highlightText: { color: AppColors.primaryDark },
  action: { alignItems: 'center', flexDirection: 'row', gap: 2 },
  actionText: { color: AppColors.muted, fontSize: Typography.caption },
  row: { alignItems: 'center', flexDirection: 'row', gap: 13 },
  iconBox: {
    alignItems: 'center',
    backgroundColor: AppColors.accentSurface,
    borderRadius: Radius.md,
    height: ComponentSize.menuIcon,
    justifyContent: 'center',
    width: ComponentSize.menuIcon,
  },
  copy: { flex: 1, gap: 4 },
  title: {
    color: '#111814',
    fontSize: Typography.body,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  detail: { color: AppColors.muted, fontSize: Typography.caption, letterSpacing: -0.3 },
});
