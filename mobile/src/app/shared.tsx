import { useState } from 'react';
import { router } from 'expo-router';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppColors,
  IconSize,
  Radius,
  Spacing,
  Typography,
} from '@/constants/design-system';
import { AppIcon } from '@/components/ui/app-icon';
import { IconButton } from '@/components/ui/app-ui';
import { TaskCard, type TaskVisual } from '@/components/tasks/task-card';

const tasks: TaskVisual[] = [
  {
    title: '종량제 봉투 사기',
    subtitle: '민지님이 추가 · 집 근처 마트',
    icon: 'cart',
    shared: true,
  },
  {
    title: '화장지 구매',
    subtitle: '나가 추가 · 내일 전까지',
    icon: 'cart',
    tomorrow: true,
  },
];

export default function SharedScreen() {
  const [done, setDone] = useState<number[]>([]);
  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top']}
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
          <Text style={styles.navTitle}>공동 목록</Text>
          <IconButton
            name="plus"
            filled
            onPress={() =>
              Alert.alert(
                '우리 집에 초대하기',
                '초대 링크를 보낼 가족이나 룸메이트를 선택하는 기능을 다음 서버 연결 단계에서 추가합니다.',
              )
            }
          />
        </View>
        <View style={styles.hero}>
          <View>
            <Text style={styles.heroTitle}>우리 집</Text>
            <Text style={styles.heroSubtitle}>
              같이 하는 작은 일이{'\n'}더 좋은 하루를 만들어요 ♥
            </Text>
          </View>
          <View style={styles.house}>
            <View style={styles.roof} />
            <View style={styles.homeBody}>
              <View style={styles.window} />
              <View style={styles.door} />
            </View>
            <Text style={styles.houseNote}>
              가는김에,{'\n'}좋은 하루가 될 거예요
            </Text>
          </View>
        </View>
        <View style={styles.membersCard}>
          <View style={styles.membersCopy}>
            <Text style={styles.membersTitle}>우리 집 구성원 2명</Text>
            <Text style={styles.membersDescription}>형시 · 민지</Text>
          </View>
          <Pressable
            onPress={() =>
              Alert.alert(
                '우리 집에 초대하기',
                '초대 링크를 보낼 가족이나 룸메이트를 선택하는 기능을 다음 서버 연결 단계에서 추가합니다.',
              )
            }
            style={styles.inviteButton}
          >
            <AppIcon
              name="people"
              color={AppColors.primary}
              size={IconSize.metadata}
            />
            <Text style={styles.inviteText}>초대하기</Text>
          </Pressable>
        </View>
        <View style={styles.remaining}>
          <Text style={styles.remainingText}>
            남은 할 일 <Text style={styles.count}>2개</Text>
          </Text>
        </View>
        <View style={styles.list}>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.title}
              task={task}
              checked={done.includes(index)}
              onToggle={() =>
                setDone((old) =>
                  old.includes(index)
                    ? old.filter((value) => value !== index)
                    : [...old, index],
                )
              }
            />
          ))}
        </View>
        <Pressable style={styles.complete}>
          <View style={styles.completeLeft}>
            <View style={styles.check}>
              <AppIcon
                name="check"
                color={AppColors.onPrimary}
                size={IconSize.label}
              />
            </View>
            <Text style={styles.completeText}>
              완료한 공동 할 일 <Text style={styles.count}>3개</Text>
            </Text>
          </View>
          <AppIcon
            name="forward"
            color={AppColors.muted}
            size={IconSize.row}
          />
        </Pressable>
        <Text style={styles.footer}>
          가는김에,{'\n'}오늘도 조금 더 좋은 우리 집 🌱
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: AppColors.background, flex: 1 },
  content: {
    gap: 20,
    minHeight: '100%',
    paddingBottom: 36,
    paddingHorizontal: Spacing.md,
    paddingTop: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navTitle: {
    color: AppColors.text,
    fontSize: Typography.pageTitle,
    fontWeight: '900',
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 176,
    paddingTop: 28,
  },
  heroTitle: {
    color: AppColors.text,
    fontSize: Typography.brand,
    fontWeight: '900',
    letterSpacing: -2,
  },
  heroSubtitle: {
    color: AppColors.muted,
    fontSize: Typography.body,
    lineHeight: 29,
    marginTop: 18,
  },
  house: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 8,
    width: 150,
  },
  roof: {
    borderBottomColor: '#718D6C',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 53,
    height: 0,
    width: 0,
  },
  homeBody: {
    alignItems: 'center',
    backgroundColor: '#F0E8D9',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-around',
    marginTop: -5,
    width: 104,
  },
  window: { backgroundColor: '#B8D7DD', height: 27, width: 26 },
  door: {
    backgroundColor: '#A48669',
    alignSelf: 'flex-end',
    height: 38,
    width: 23,
  },
  houseNote: {
    color: AppColors.muted,
    fontSize: Typography.caption,
    marginTop: 14,
    textAlign: 'center',
    transform: [{ rotate: '-10deg' }],
  },
  membersCard: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  membersCopy: { gap: 4 },
  membersTitle: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  membersDescription: { color: AppColors.muted, fontSize: Typography.caption },
  inviteButton: {
    alignItems: 'center',
    backgroundColor: AppColors.accentSurface,
    borderRadius: Radius.pill,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  inviteText: {
    color: AppColors.primary,
    fontSize: Typography.caption,
    fontWeight: '800',
  },
  remaining: {
    backgroundColor: '#F0F4EE',
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  remainingText: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  count: { color: AppColors.primary },
  list: { gap: 16 },
  complete: {
    alignItems: 'center',
    backgroundColor: AppColors.warmSurface,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    padding: Spacing.md,
  },
  completeLeft: { alignItems: 'center', flexDirection: 'row', gap: 13 },
  check: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: Radius.pill,
    height: 31,
    justifyContent: 'center',
    width: 31,
  },
  completeText: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  footer: {
    color: '#98A39A',
    fontSize: Typography.label,
    lineHeight: 25,
    marginTop: 'auto',
    paddingTop: 80,
    textAlign: 'center',
  },
});
