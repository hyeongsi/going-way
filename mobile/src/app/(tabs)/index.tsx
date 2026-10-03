import { router } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/home/home-header';
import { HomeMapPreview } from '@/components/home/home-map-preview';
import { HomeTaskCard } from '@/components/home/home-task-card';
import { AppColors, Spacing } from '@/constants/design-system';

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader onProfilePress={() => router.push('/settings')} />

        <HomeMapPreview />

        <HomeTaskCard
          sectionTitle="다음 출근길 추천"
          actionText="지금 가면 딱 좋아요"
          icon="laundry"
          title="세탁소에서 옷 찾기"
          detail="경로 내 · 3분 들름"
          highlighted
          onPress={() => router.push('/nearby-alert')}
        />

        <HomeTaskCard
          sectionTitle="주변에 이런 할 일이 있어요"
          actionText="지금 들러보세요"
          icon="medicine"
          title="감기약 구매"
          detail="350m · 영업 중"
          onPress={() => router.push('/add-task')}
        />

        <HomeTaskCard
          sectionTitle="오늘의 할 일"
          actionText="잊지 말고 챙겨요"
          icon="cart"
          title="우유 사기"
          detail="집 근처 마트"
          onPress={() => router.push('/tasks')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.background,
    flex: 1,
  },
  content: {
    gap: 14,
    paddingBottom: 20,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
});
