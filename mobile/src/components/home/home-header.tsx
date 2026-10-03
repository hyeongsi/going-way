import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppColors, ComponentSize, Typography } from '@/constants/design-system';

export default function HomeHeader({
  onProfilePress,
}: {
  onProfilePress: () => void;
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>가는김에</Text>
        <Text style={styles.subtitle}>오늘도, 가는 길이 더 알차게</Text>
      </View>

      <View style={styles.greeting}>
        <View style={styles.greetingCopy}>
          <Text style={styles.greetingTitle}>좋은 하루예요!</Text>
          <Text style={styles.greetingText}>오늘도 가는김에 🌱</Text>
        </View>
        <Pressable
          onPress={onProfilePress}
          style={styles.profileButton}
          accessibilityLabel="설정 열기"
        >
          <Text style={styles.profileInitial}>형</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    color: AppColors.primary,
    fontSize: Typography.brand,
    fontWeight: '900',
    letterSpacing: -2,
  },
  subtitle: {
    color: AppColors.muted,
    fontSize: Typography.subtitle,
    marginTop: 4,
  },
  greeting: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
    paddingTop: 3,
  },
  greetingCopy: {
    alignItems: 'flex-end',
    gap: 5,
  },
  greetingTitle: {
    color: AppColors.text,
    fontSize: Typography.label,
    fontWeight: '800',
  },
  greetingText: {
    color: AppColors.muted,
    fontSize: Typography.caption,
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: 20,
    height: ComponentSize.profileAvatar,
    justifyContent: 'center',
    width: ComponentSize.profileAvatar,
  },
  profileInitial: {
    color: AppColors.onPrimary,
    fontSize: Typography.subtitle,
    fontWeight: '800',
  },
});
