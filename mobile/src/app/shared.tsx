import { router } from 'expo-router';
import { AppButton } from '@/components/ui/app-button';
import { FeaturePlaceholder } from '@/components/ui/feature-placeholder';
import { Screen } from '@/components/ui/screen';
export default function SharedScreen() { return <Screen title="공동 목록" subtitle="가족·룸메이트와 할 일을 함께 관리합니다."><FeaturePlaceholder title="구현 예정" description="로그인, 초대 링크·코드, 공동 목록 동기화와 완료 알림은 핵심 서비스 기능으로 남겨 두었습니다." /><AppButton label="닫기" variant="secondary" onPress={() => router.back()} /></Screen>; }
