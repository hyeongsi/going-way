import { router } from 'expo-router';
import { AppButton } from '@/components/ui/app-button';
import { FeaturePlaceholder } from '@/components/ui/feature-placeholder';
import { Screen } from '@/components/ui/screen';
export default function SettingsScreen() { return <Screen title="설정" subtitle="권한과 개인화 설정을 관리합니다."><FeaturePlaceholder note title="권한은 필요한 순간에 요청" description="현재 위치·알림 권한은 기능을 누른 직후에 요청하세요. 백그라운드 위치 권한은 근처 도착 알림을 실제 구현할 때만 추가합니다." /><AppButton label="닫기" variant="secondary" onPress={() => router.back()} /></Screen>; }
