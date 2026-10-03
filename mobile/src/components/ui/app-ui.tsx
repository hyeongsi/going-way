import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  AppColors,
  ComponentSize,
  IconSize,
  Radius,
  Typography,
} from '@/constants/design-system';
import { AppIcon } from './app-icon';

type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: 'forward' | 'plus' | 'navigate';
};

export function PrimaryButton({
  label,
  onPress,
  style,
  labelStyle,
  icon,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.primaryButton, style]}
    >
      <Text style={[styles.primaryLabel, labelStyle]}>{label}</Text>
      {icon ? (
        <AppIcon
          name={icon}
          color={AppColors.onPrimary}
          size={IconSize.action}
        />
      ) : null}
    </Pressable>
  );
}

export function IconButton({
  name,
  onPress,
  filled = false,
}: {
  name: 'back' | 'close' | 'plus';
  onPress: () => void;
  filled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.iconButton, filled && styles.iconButtonFilled]}
      hitSlop={8}
    >
      <AppIcon
        name={name}
        color={filled ? AppColors.onPrimary : AppColors.text}
        size={IconSize.row}
      />
    </Pressable>
  );
}

// 목록 화면에서 새 항목을 추가할 때 쓰는 공통 플로팅 버튼입니다.
// 위치와 크기를 이곳에서 함께 관리해 어느 화면에서나 같은 모습으로 보입니다.
export function FloatingAddButton({
  onPress,
  accessibilityLabel = '새 할 일 추가',
}: {
  onPress: () => void;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.floatingAdd}
      accessibilityLabel={accessibilityLabel}
    >
      <AppIcon
        name="plus"
        color={AppColors.onPrimary}
        size={IconSize.large}
      />
    </Pressable>
  );
}

export function CircleIcon({
  icon,
  children,
  tone = 'green',
}: {
  icon: Parameters<typeof AppIcon>[0]['name'];
  children?: ReactNode;
  tone?: 'green' | 'warm';
}) {
  return (
    <View style={[styles.circleIcon, tone === 'warm' && styles.circleIconWarm]}>
      <AppIcon
        name={icon}
        color={tone === 'warm' ? '#A97943' : AppColors.primaryDark}
        size={IconSize.large}
      />
      {children}
    </View>
  );
}

export function Radio({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected ? <View style={styles.radioDot} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    minHeight: ComponentSize.primaryButtonHeight,
    paddingHorizontal: 22,
  },
  primaryLabel: {
    color: AppColors.onPrimary,
    fontSize: Typography.button,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: Radius.pill,
    height: ComponentSize.touchTarget,
    justifyContent: 'center',
    width: ComponentSize.touchTarget,
  },
  iconButtonFilled: {
    backgroundColor: AppColors.primary,
    height: ComponentSize.compactButtonHeight,
    width: ComponentSize.compactButtonHeight,
  },
  floatingAdd: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: Radius.pill,
    bottom: 26,
    elevation: 5,
    height: ComponentSize.floatingAction,
    justifyContent: 'center',
    position: 'absolute',
    right: 26,
    shadowColor: '#1A3926',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: ComponentSize.floatingAction,
  },
  circleIcon: {
    alignItems: 'center',
    backgroundColor: AppColors.accentSurface,
    borderRadius: Radius.md,
    height: ComponentSize.cardIcon,
    justifyContent: 'center',
    width: ComponentSize.cardIcon,
  },
  circleIconWarm: { backgroundColor: '#F8F0DC' },
  radio: {
    alignItems: 'center',
    borderColor: '#A8ADA8',
    borderRadius: Radius.pill,
    borderWidth: 2,
    height: ComponentSize.checkbox,
    justifyContent: 'center',
    width: ComponentSize.checkbox,
  },
  radioSelected: { borderColor: AppColors.primary },
  radioDot: {
    backgroundColor: AppColors.primary,
    borderRadius: Radius.pill,
    height: 20,
    width: 20,
  },
});
