import { router } from 'expo-router';
import { AppButton } from '@/components/ui/app-button';
import { FeaturePlaceholder } from '@/components/ui/feature-placeholder';
import { Screen } from '@/components/ui/screen';

export default function TasksScreen() {
  return <Screen title="할 일" subtitle="개인·공동 목록을 이 화면에서 관리합니다.">
    <FeaturePlaceholder title="비어 있는 작업 영역" description="할 일 카드, 개인/공동 탭, 완료 목록을 직접 구현하세요. 서비스 데이터와 정렬 로직은 아직 연결하지 않았습니다." />
    <AppButton label="새 할 일" onPress={() => router.push('/add-task')} />
  </Screen>;
}
