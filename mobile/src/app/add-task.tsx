import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { AppButton } from '@/components/ui/app-button';
import { FeaturePlaceholder } from '@/components/ui/feature-placeholder';
import { Screen } from '@/components/ui/screen';
import { AppColors, Radius, Spacing } from '@/constants/design-system';

export default function AddTaskScreen() {
  return (
    <Screen
      title="새 할 일"
      subtitle="핵심 서비스 로직을 연습하며 채우는 3단계 흐름입니다."
    >
      <View
        style={{
          flexDirection: 'row',
          gap: Spacing.xs,
          padding: Spacing.sm,
          borderRadius: Radius.md,
          backgroundColor: AppColors.accentSurface,
        }}
      >
        <Text style={{ color: AppColors.primary, fontWeight: '700' }}>
          1. 할 일 입력
        </Text>
        <Text style={{ color: AppColors.muted }}>2. 장소 선택</Text>
        <Text style={{ color: AppColors.muted }}>3. 알림 설정</Text>
      </View>
      <FeaturePlaceholder
        title="직접 구현할 영역"
        description="텍스트·음성 입력, 장소 추천, 시간대·근처 알림 규칙은 이 화면에서 학습하며 구현하세요."
      />
      <AppButton
        label="닫기"
        variant="secondary"
        onPress={() => router.back()}
      />
    </Screen>
  );
}
