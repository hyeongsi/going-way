import { router } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppColors,
  ComponentSize,
  IconSize,
  Radius,
  Spacing,
  Typography,
} from '@/constants/design-system';
import { AppIcon } from '@/components/ui/app-icon';
import { IconButton, PrimaryButton } from '@/components/ui/app-ui';

export default function NearbyAlertScreen() {
  const { width } = useWindowDimensions();
  const mapSize = Math.min(width - 48, 320);

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom']}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>가는김에</Text>
          <IconButton
            name="close"
            onPress={() => router.back()}
          />
        </View>
        <View
          style={[
            styles.mapCircle,
            { borderRadius: mapSize / 2, height: mapSize, width: mapSize },
          ]}
        >
          <View style={[styles.road, styles.roadOne]} />
          <View style={[styles.road, styles.roadTwo]} />
          <View style={styles.river} />
          <View style={styles.storeTile}>
            <Text style={styles.storeText}>OO세탁소</Text>
          </View>
          <View style={styles.route}>
            <View style={[styles.routeDot, styles.routeDotOne]} />
            <View style={[styles.routeDot, styles.routeDotTwo]} />
            <View style={[styles.routeDot, styles.routeDotThree]} />
          </View>
          <View style={styles.bigPin}>
            <AppIcon
              name="laundry"
              color={AppColors.primaryDark}
              size={IconSize.illustration}
            />
          </View>
          <View style={styles.currentDot} />
        </View>
        <View style={styles.message}>
          <Text style={styles.title}>OO세탁소 근처예요</Text>
          <Text style={styles.detail}>
            맡긴 옷 찾기 · <Text style={styles.open}>● 영업 중</Text>
          </Text>
          <Text style={styles.time}>현재 위치에서 약 2분</Text>
        </View>
        <View style={styles.actions}>
          <PrimaryButton
            label="완료"
            onPress={() => router.replace('/tasks')}
            style={styles.completeButton}
            labelStyle={styles.actionLabel}
          />
          <Pressable
            onPress={() => router.back()}
            style={styles.secondary}
          >
            <Text style={styles.secondaryText}>나중에</Text>
          </Pressable>
          <Pressable
            onPress={() => {}}
            style={styles.secondary}
          >
            <AppIcon
              name="navigate"
              color={AppColors.primary}
              size={IconSize.large}
            />
            <Text style={styles.secondaryText}>길 안내</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: AppColors.background, flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.md,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    color: AppColors.primary,
    fontSize: Typography.pageTitle,
    fontWeight: '900',
    letterSpacing: -1.3,
  },
  mapCircle: {
    alignSelf: 'center',
    backgroundColor: '#EEF0EC',
    borderRadius: 160,
    height: 320,
    marginTop: 30,
    overflow: 'hidden',
    position: 'relative',
    width: 320,
  },
  road: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    height: 21,
    position: 'absolute',
    width: '140%',
  },
  roadOne: { left: -65, top: 108, transform: [{ rotate: '14deg' }] },
  roadTwo: { left: -40, top: 210, transform: [{ rotate: '-41deg' }] },
  river: {
    backgroundColor: AppColors.mapBlue,
    bottom: -30,
    height: 72,
    position: 'absolute',
    right: -25,
    transform: [{ rotate: '-29deg' }],
    width: 260,
  },
  storeTile: {
    backgroundColor: '#E8E8E5',
    borderRadius: 11,
    bottom: 73,
    padding: 12,
    position: 'absolute',
    right: 48,
    transform: [{ rotate: '-12deg' }],
  },
  storeText: {
    color: AppColors.muted,
    fontSize: Typography.label,
    fontWeight: '700',
  },
  route: {
    borderColor: '#77A070',
    borderStyle: 'dotted',
    borderWidth: 6,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 100,
    height: 152,
    left: 113,
    position: 'absolute',
    top: 130,
    transform: [{ rotate: '34deg' }],
    width: 128,
  },
  routeDot: {
    backgroundColor: '#75A270',
    borderRadius: 8,
    height: 15,
    position: 'absolute',
    width: 15,
  },
  routeDotOne: { left: -6, top: 20 },
  routeDotTwo: { left: 24, top: 59 },
  routeDotThree: { left: 49, top: 95 },
  bigPin: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderColor: AppColors.primary,
    borderRadius: 72,
    borderWidth: 24,
    height: 144,
    justifyContent: 'center',
    left: 98,
    position: 'absolute',
    top: 48,
    width: 144,
  },
  currentDot: {
    backgroundColor: '#3677EF',
    borderColor: '#E6F0FF',
    borderRadius: 20,
    borderWidth: 7,
    bottom: 72,
    height: 40,
    position: 'absolute',
    right: 76,
    width: 40,
  },
  message: { alignItems: 'center', gap: 14 },
  title: {
    color: AppColors.text,
    fontSize: Typography.brand,
    fontWeight: '900',
    letterSpacing: -1.7,
  },
  detail: { color: AppColors.muted, fontSize: Typography.body },
  open: { color: AppColors.primary },
  time: { color: AppColors.softMuted, fontSize: Typography.body },
  actions: { flexDirection: 'row', gap: 10 },
  completeButton: { flex: 1, minHeight: ComponentSize.primaryButtonHeight },
  secondary: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderColor: '#D4D4CE',
    borderRadius: Radius.lg,
    borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    minHeight: ComponentSize.primaryButtonHeight,
    paddingHorizontal: 4,
  },
  actionLabel: { fontSize: Typography.body },
  secondaryText: {
    color: AppColors.text,
    fontSize: Typography.label,
    fontWeight: '800',
  },
});
