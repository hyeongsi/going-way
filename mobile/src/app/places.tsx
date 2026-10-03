import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
import {
  CircleIcon,
  FloatingAddButton,
  IconButton,
} from '@/components/ui/app-ui';

const places = [
  {
    title: '집',
    sub: '서울 마포구 · 기본 목적지',
    note: '가는김에, 집으로 더 빠르게',
    icon: 'home' as const,
    primary: true,
  },
  {
    title: '회사',
    sub: '서울 강남구 · 평일 출퇴근',
    note: '오늘도 좋은 하루예요!',
    icon: 'work' as const,
  },
  {
    title: '단골 마트',
    sub: '집 근처 · 250m',
    note: '필요한 게 있을 때, 가는김에!',
    icon: 'cart' as const,
  },
];

export default function PlacesScreen() {
  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconButton
            name="back"
            onPress={() => router.back()}
          />
          <View style={styles.headCopy}>
            <Text style={styles.title}>내 장소</Text>
            <Text style={styles.subtitle}>가는김에, 더 가까운 하루가 돼요</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>
        <MapPreview />
        <View style={styles.sectionTitle}>
          <Text style={styles.heading}>자주 가는 장소</Text>
          <Text style={styles.helper}>일상이 더 편리해져요 ♥</Text>
        </View>
        <View style={styles.list}>
          {places.map((place) => (
            <View
              key={place.title}
              style={styles.card}
            >
              <CircleIcon
                icon={place.icon}
                tone={place.icon === 'work' ? 'warm' : 'green'}
              />
              <View style={styles.cardCopy}>
                <View style={styles.cardTop}>
                  <View>
                    <Text style={styles.placeTitle}>{place.title}</Text>
                    <Text style={styles.placeSub}>{place.sub}</Text>
                  </View>
                  <Text
                    style={[styles.tag, place.primary && styles.primaryTag]}
                  >
                    {place.primary ? '기본' : '수정'}
                  </Text>
                </View>
                <View style={styles.note}>
                  <AppIcon
                    name={place.icon}
                    color={AppColors.muted}
                    size={IconSize.label}
                  />
                  <Text style={styles.noteText}>{place.note}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <FloatingAddButton onPress={() => router.push('/add-place')} />
    </SafeAreaView>
  );
}

function MapPreview() {
  return (
    <View style={styles.map}>
      <View style={styles.river} />
      <View style={[styles.road, styles.roadOne]} />
      <View style={[styles.road, styles.roadTwo]} />
      <View style={[styles.road, styles.roadThree]} />
      <View style={styles.mapBubble}>
        <AppIcon
          name="pin"
          color={AppColors.text}
          size={IconSize.action}
        />
        <Text style={styles.mapBubbleText}>저장한 장소 4곳</Text>
      </View>
      <Pin
        label="집"
        icon="home"
        style={styles.homePin}
      />
      <Pin
        label="회사"
        icon="work"
        style={styles.workPin}
        warm
      />
      <Pin
        label="단골 마트"
        icon="cart"
        style={styles.martPin}
      />
    </View>
  );
}
function Pin({
  label,
  icon,
  style,
  warm,
}: {
  label: string;
  icon: 'home' | 'work' | 'cart';
  style: object;
  warm?: boolean;
}) {
  return (
    <View style={[styles.pinWrap, style]}>
      <View style={[styles.pin, warm && styles.warmPin]}>
        <AppIcon
          name={icon}
          color={AppColors.onPrimary}
          size={IconSize.large}
        />
      </View>
      <Text style={styles.pinText}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  safe: { backgroundColor: AppColors.background, flex: 1 },
  content: {
    gap: 25,
    // 플로팅 추가 버튼이 마지막 장소 카드를 가리지 않도록 여유를 둡니다.
    paddingBottom: 118,
    paddingHorizontal: Spacing.md,
    paddingTop: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerSpacer: { width: ComponentSize.touchTarget },
  headCopy: { alignItems: 'center' },
  title: {
    color: AppColors.text,
    fontSize: Typography.pageTitle,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitle: {
    color: AppColors.muted,
    fontSize: Typography.subtitle,
    marginTop: 6,
  },
  map: {
    backgroundColor: AppColors.map,
    borderRadius: Radius.lg,
    height: 335,
    overflow: 'hidden',
    position: 'relative',
  },
  river: {
    backgroundColor: AppColors.mapBlue,
    height: 90,
    left: -30,
    position: 'absolute',
    top: 148,
    transform: [{ rotate: '8deg' }],
    width: 480,
  },
  road: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    height: 13,
    position: 'absolute',
    width: '130%',
  },
  roadOne: { left: -80, top: 75, transform: [{ rotate: '30deg' }] },
  roadTwo: { left: -70, top: 232, transform: [{ rotate: '-38deg' }] },
  roadThree: { left: 138, top: -40, transform: [{ rotate: '84deg' }] },
  mapBubble: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: Radius.pill,
    elevation: 2,
    flexDirection: 'row',
    gap: 8,
    left: 18,
    paddingHorizontal: 15,
    paddingVertical: 13,
    position: 'absolute',
    top: 20,
  },
  mapBubbleText: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  pinWrap: { alignItems: 'center', position: 'absolute' },
  homePin: { left: '28%', top: 115 },
  workPin: { right: '14%', top: 170 },
  martPin: { left: '32%', top: 216 },
  pin: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderColor: AppColors.surface,
    borderRadius: 29,
    borderWidth: 4,
    height: ComponentSize.compactButtonHeight,
    justifyContent: 'center',
    width: ComponentSize.compactButtonHeight,
  },
  warmPin: { backgroundColor: '#C97942' },
  pinText: {
    color: AppColors.text,
    fontSize: Typography.label,
    fontWeight: '800',
    marginTop: 3,
  },
  sectionTitle: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  heading: {
    color: AppColors.text,
    fontSize: Typography.pageTitle,
    fontWeight: '900',
    letterSpacing: -1,
  },
  helper: { color: AppColors.softMuted, fontSize: Typography.caption },
  list: { gap: 16 },
  card: {
    alignItems: 'flex-start',
    backgroundColor: AppColors.surface,
    borderRadius: Radius.lg,
    elevation: 2,
    flexDirection: 'row',
    gap: 16,
    padding: Spacing.md,
    shadowColor: AppColors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  cardCopy: { flex: 1, gap: 8 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  placeTitle: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  placeSub: {
    color: AppColors.muted,
    fontSize: Typography.caption,
    marginTop: 5,
  },
  tag: {
    borderColor: AppColors.border,
    borderRadius: Radius.pill,
    borderWidth: 1,
    color: AppColors.primaryDark,
    fontSize: Typography.label,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  primaryTag: {
    backgroundColor: AppColors.accentSurface,
    borderColor: AppColors.accentSurface,
  },
  note: {
    alignItems: 'center',
    backgroundColor: AppColors.warmSurface,
    borderRadius: Radius.md,
    flexDirection: 'row',
    gap: 8,
    padding: 12,
  },
  noteText: { color: AppColors.muted, flex: 1, fontSize: Typography.caption },
});
