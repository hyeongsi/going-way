import { router } from 'expo-router';
import { AppButton } from '@/components/ui/app-button';
import { FeaturePlaceholder } from '@/components/ui/feature-placeholder';
import { Screen } from '@/components/ui/screen';
export default function PlacesScreen() { return <Screen title="내 장소" subtitle="집, 회사, 자주 가는 장소를 관리합니다."><FeaturePlaceholder title="구현 예정" description="지도 검색, 현재 위치, 주소 입력과 저장 장소 카드를 직접 구현하세요." /><AppButton label="닫기" variant="secondary" onPress={() => router.back()} /></Screen>; }
