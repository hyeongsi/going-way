import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  AppColors,
  ComponentSize,
  IconSize,
  Radius,
  Typography,
} from '@/constants/design-system';
import { AppIcon } from '@/components/ui/app-icon';

export type TaskVisual = {
  title: string;
  subtitle: string;
  icon: 'laundry' | 'cart' | 'medicine';
  nearby?: boolean;
  shared?: boolean;
  tomorrow?: boolean;
};

export function TaskCard({
  task,
  checked,
  onToggle,
}: {
  task: TaskVisual;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={[styles.card, checked && styles.completed]}>
      <Pressable
        onPress={onToggle}
        style={[styles.checkbox, checked && styles.checked]}
      >
        <AppIcon
          name="check"
          color={AppColors.onPrimary}
          size={IconSize.label}
        />
      </Pressable>
      <View style={styles.content}>
        <Text style={[styles.title, checked && styles.titleCompleted]}>
          {task.title}
        </Text>
        <View style={styles.metaRow}>
          <AppIcon
            name={task.tomorrow ? 'clock' : 'pin'}
            color={AppColors.softMuted}
            size={IconSize.metadata}
          />
          <Text style={styles.subtitle}>{task.subtitle}</Text>
        </View>
        {task.nearby ? (
          <View style={styles.badge}>
            <AppIcon
              name="bell"
              color={AppColors.primary}
              size={IconSize.badge}
            />
            <Text style={styles.badgeText}>근처 알림</Text>
          </View>
        ) : null}
        {task.shared ? (
          <View style={styles.badge}>
            <AppIcon
              name="people"
              color={AppColors.primary}
              size={IconSize.badge}
            />
            <Text style={styles.badgeText}>공동</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.right}>
        <AppIcon
          name="more"
          color={AppColors.muted}
          size={IconSize.action}
        />
        <View style={styles.illustration}>
          <AppIcon
            name={task.icon}
            color={task.icon === 'medicine' ? '#A97943' : AppColors.primaryDark}
            size={IconSize.row}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    elevation: 3,
    flexDirection: 'row',
    minHeight: ComponentSize.taskCardMinHeight,
    padding: 14,
    shadowColor: AppColors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  completed: { opacity: 0.6 },
  checkbox: {
    alignItems: 'center',
    borderColor: '#B7BDB8',
    borderRadius: 12,
    borderWidth: 2,
    height: ComponentSize.checkbox,
    justifyContent: 'center',
    marginRight: 16,
    width: ComponentSize.checkbox,
  },
  checked: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  content: { alignSelf: 'stretch', flex: 1, gap: 6, justifyContent: 'center' },
  title: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  titleCompleted: { textDecorationLine: 'line-through' },
  metaRow: { alignItems: 'center', flexDirection: 'row', gap: 5 },
  subtitle: { color: AppColors.muted, flex: 1, fontSize: Typography.caption },
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: AppColors.accentSurface,
    borderRadius: Radius.pill,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeText: {
    color: AppColors.primaryDark,
    fontSize: Typography.caption,
    fontWeight: '700',
  },
  right: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    width: 50,
  },
  illustration: {
    alignItems: 'center',
    backgroundColor: AppColors.accentSurface,
    borderRadius: Radius.sm,
    height: ComponentSize.menuIcon,
    justifyContent: 'center',
    width: ComponentSize.menuIcon,
  },
});
