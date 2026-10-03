import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppColors,
  IconSize,
  Radius,
  Spacing,
  Typography,
} from '@/constants/design-system';
import { AppIcon } from '@/components/ui/app-icon';
import { FloatingAddButton } from '@/components/ui/app-ui';
import { TaskCard, type TaskVisual } from '@/components/tasks/task-card';

const personal: TaskVisual[] = [
  {
    title: '세탁소에서 옷 찾기',
    subtitle: '오늘 퇴근길 · OO세탁소',
    icon: 'laundry',
    nearby: true,
  },
  { title: '우유 사기', subtitle: '집 근처 · 오늘까지', icon: 'cart' },
  {
    title: '감기약 구매',
    subtitle: '장소 자동 추천 · 나중에 알림',
    icon: 'medicine',
  },
];
const shared: TaskVisual[] = [
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

export default function TasksScreen() {
  const [mode, setMode] = useState<'personal' | 'shared'>('personal');
  const [done, setDone] = useState<number[]>([]);
  const tasks = mode === 'personal' ? personal : shared;
  const toggle = (index: number) =>
    setDone((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View>
            <Text style={styles.heroTitle}>할 일</Text>
            <Text style={styles.heroSubtitle}>
              가는김에,{'\n'}오늘도 조금 더 가벼운 하루가 돼요.
            </Text>
          </View>
          <View style={styles.heroArt}>
            <Text style={styles.heroArtText}>오늘도{'\n'}잘 하고 있어요!</Text>
            <Text style={styles.dog}>◡̈</Text>
          </View>
        </View>
        <View style={styles.segment}>
          <Pressable
            onPress={() => {
              setMode('personal');
              setDone([]);
            }}
            style={[
              styles.segmentItem,
              mode === 'personal' && styles.segmentActive,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                mode === 'personal' && styles.segmentTextActive,
              ]}
            >
              개인
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setMode('shared');
              setDone([]);
            }}
            style={[
              styles.segmentItem,
              mode === 'shared' && styles.segmentActive,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                mode === 'shared' && styles.segmentTextActive,
              ]}
            >
              공동
            </Text>
          </Pressable>
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            오늘의 할 일 ·{' '}
            <Text style={styles.count}>
              {done.length}/{tasks.length}
            </Text>{' '}
            완료
          </Text>
          <Text style={styles.tip}>작은 할 일도{'\n'}큰 하루를 만들어요.</Text>
        </View>
        <View style={styles.list}>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.title}
              task={task}
              checked={done.includes(index)}
              onToggle={() => toggle(index)}
            />
          ))}
        </View>
        <Pressable style={styles.completedRow}>
          <View style={styles.completedLeft}>
            <View style={styles.completedCheck}>
              <AppIcon
                name="check"
                color={AppColors.onPrimary}
                size={IconSize.metadata}
              />
            </View>
            <Text style={styles.completedText}>
              완료한 할 일 ({done.length + 2})
            </Text>
          </View>
          <AppIcon
            name="forward"
            color={AppColors.muted}
            size={IconSize.row}
          />
        </Pressable>
      </ScrollView>
      <FloatingAddButton onPress={() => router.push('/add-task')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: AppColors.background, flex: 1 },
  content: {
    gap: 20,
    paddingBottom: 118,
    paddingHorizontal: Spacing.md,
    paddingTop: 18,
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 132,
  },
  heroTitle: {
    color: AppColors.text,
    fontSize: Typography.brand,
    fontWeight: '900',
    letterSpacing: -2,
  },
  heroSubtitle: {
    color: '#444B45',
    fontSize: Typography.body,
    lineHeight: 28,
    marginTop: 12,
  },
  heroArt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    width: 140,
  },
  heroArtText: {
    color: AppColors.primary,
    fontSize: Typography.caption,
    fontWeight: '700',
    lineHeight: 18,
    transform: [{ rotate: '-10deg' }],
  },
  dog: { color: '#91A687', fontSize: Typography.illustration, fontWeight: '900', marginTop: 8 },
  segment: {
    backgroundColor: '#F1F0EC',
    borderColor: AppColors.border,
    borderRadius: Radius.pill,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 3,
  },
  segmentItem: {
    alignItems: 'center',
    borderRadius: Radius.pill,
    flex: 1,
    paddingVertical: 14,
  },
  segmentActive: { backgroundColor: AppColors.primary },
  segmentText: {
    color: AppColors.muted,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  segmentTextActive: { color: AppColors.onPrimary },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  listTitle: {
    color: AppColors.text,
    fontSize: Typography.cardTitle,
    fontWeight: '800',
    letterSpacing: -1,
  },
  count: { color: AppColors.primary },
  tip: { color: AppColors.muted, fontSize: Typography.caption, lineHeight: 18 },
  list: { gap: 16 },
  completedRow: {
    alignItems: 'center',
    backgroundColor: AppColors.warmSurface,
    borderRadius: Radius.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 22,
  },
  completedLeft: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  completedCheck: {
    alignItems: 'center',
    backgroundColor: AppColors.softMuted,
    borderRadius: Radius.pill,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  completedText: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
  },
});
