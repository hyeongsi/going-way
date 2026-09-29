import { router } from 'expo-router';
import { View } from 'react-native';
import { AppButton } from '@/components/ui/app-button';
import { FeaturePlaceholder } from '@/components/ui/feature-placeholder';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/design-system';

export default function HomeScreen() {
  return <Screen title="가는김에" subtitle="가는 길에 처리할 일을 모아보세요.">
    <FeaturePlaceholder title="홈 화면" description="지도 요약, 다음 동선 추천, 지금 주변, 오늘의 할 일을 이 화면에서 학습하며 구현하세요." />
    <View style={{ gap: Spacing.sm }}><AppButton label="새 할 일" onPress={() => router.push('/add-task')} /><AppButton label="내 장소" variant="secondary" onPress={() => router.push('/places')} /><AppButton label="공동 목록" variant="secondary" onPress={() => router.push('/shared')} /></View>
    <FeaturePlaceholder note title="구현 순서 제안" description="더미 할 일 카드 → 장소 선택 → 알림 설정 → 위치·알림 연동 순서로 진행하세요." />
  </Screen>;
}
