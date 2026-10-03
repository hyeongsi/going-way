import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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
import { IconButton, PrimaryButton } from '@/components/ui/app-ui';

type PlaceType = 'home' | 'work' | 'mart' | 'other';

const placeTypes = [
  { value: 'home' as const, label: '집', icon: 'home' as const },
  { value: 'work' as const, label: '회사', icon: 'work' as const },
  { value: 'mart' as const, label: '마트', icon: 'cart' as const },
  { value: 'other' as const, label: '기타', icon: 'more' as const },
];

export default function AddPlaceScreen() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [placeType, setPlaceType] = useState<PlaceType>('home');
  const [customType, setCustomType] = useState('');
  const [isCustomTypeFocused, setIsCustomTypeFocused] = useState(false);

  useEffect(() => {
    // Android 뒤로가기는 TextInput을 blur하지 않고 키보드만 닫을 수 있습니다.
    // 키보드가 닫히는 순간 입력 전용 레이아웃도 함께 원래대로 돌립니다.
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsCustomTypeFocused(false);
    });

    return () => hideSubscription.remove();
  }, []);

  const useCurrentLocation = () => {
    // 실제 위치 권한과 좌표 변환 API는 서버/지도 연동 단계에서 연결합니다.
    setAddress('현재 위치');
  };
  const registerPlace = () => {
    if (!name.trim() || !address.trim()) {
      Alert.alert('입력 확인', '장소 이름과 주소를 입력해주세요.');
      return;
    }
    if (placeType === 'other' && !customType.trim()) {
      Alert.alert('입력 확인', '장소 유형을 입력해주세요.');
      return;
    }

    Alert.alert('장소 등록', `${name.trim()}을(를) 내 장소에 등록했어요.`, [
      { text: '확인', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom']}
    >
      <KeyboardAvoidingView
        // Android는 app.json의 resize 설정이 화면 높이를 이미 조정합니다.
        // 여기서 height까지 적용하면 ScrollView가 맨 위로 되돌아갈 수 있습니다.
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.top}>
            <IconButton
              name="back"
              onPress={() => router.back()}
            />
            <Text style={styles.topTitle}>새 장소 등록</Text>
            <View style={styles.topSpacer} />
          </View>

          <View
            style={[
              styles.intro,
              isCustomTypeFocused && styles.hiddenDuringCustomInput,
            ]}
          >
            <Text style={styles.question}>어디를 자주 가시나요?</Text>
            <Text style={styles.description}>
              장소를 저장해두면 가는 길에 더 알차게 추천해드려요.
            </Text>
          </View>

          <View style={isCustomTypeFocused && styles.hiddenDuringCustomInput}>
            <PlaceIllustration />
          </View>

          <View
            style={[
              styles.form,
              isCustomTypeFocused && styles.hiddenDuringCustomInput,
            ]}
          >
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>장소 이름</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="예: 우리 집, 회사, 단골 마트"
                placeholderTextColor={AppColors.softMuted}
                style={styles.textInput}
                returnKeyType="next"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>주소 또는 장소</Text>
              <View style={styles.searchField}>
                <AppIcon
                  name="search"
                  color={AppColors.primaryDark}
                  size={IconSize.row}
                />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="장소나 주소 검색"
                  placeholderTextColor={AppColors.softMuted}
                  style={styles.searchInput}
                  returnKeyType="done"
                />
              </View>
            </View>

            <Pressable
              onPress={useCurrentLocation}
              style={styles.currentLocationButton}
            >
              <View style={styles.locationIcon}>
                <AppIcon
                  name="navigate"
                  color={AppColors.primaryDark}
                  size={IconSize.row}
                />
              </View>
              <Text style={styles.currentLocationText}>현재 위치로 등록</Text>
            </Pressable>
          </View>

          <View style={styles.categorySection}>
            <Text style={styles.categoryHeading}>이 장소는 어떤 곳인가요?</Text>
            <View style={styles.categoryRow}>
              {placeTypes.map((type) => {
                const selected = type.value === placeType;
                return (
                  <Pressable
                    key={type.value}
                    onPress={() => {
                      // 다른 유형을 누르면 입력 전용 상태와 키보드를 모두 닫습니다.
                      Keyboard.dismiss();
                      setIsCustomTypeFocused(false);
                      setPlaceType(type.value);
                    }}
                    style={[styles.categoryChip, selected && styles.categoryChipSelected]}
                  >
                    <AppIcon
                      name={type.icon}
                      color={selected ? AppColors.onPrimary : AppColors.muted}
                      size={IconSize.compact}
                    />
                    <Text style={[styles.categoryText, selected && styles.categoryTextSelected]}>
                      {type.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {placeType === 'other' ? (
              <View style={styles.customTypeField}>
                <Text style={styles.fieldLabel}>장소 유형 입력</Text>
                <TextInput
                  value={customType}
                  onChangeText={setCustomType}
                  placeholder="예: 병원, 학교, 헬스장, 카페"
                  placeholderTextColor={AppColors.softMuted}
                  style={styles.textInput}
                  onFocus={() => setIsCustomTypeFocused(true)}
                  onBlur={() => setIsCustomTypeFocused(false)}
                />
              </View>
            ) : null}
          </View>

          <PrimaryButton
            label="장소 등록"
            onPress={registerPlace}
            style={styles.registerButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function PlaceIllustration() {
  return (
    <View style={styles.illustration}>
      <View style={styles.hillLeft} />
      <View style={styles.hillRight} />
      <View style={styles.road} />
      <View style={styles.pinCircle}>
        <AppIcon
          name="pin"
          color={AppColors.onPrimary}
          size={IconSize.illustration}
        />
      </View>
      <View style={styles.sunRayOne} />
      <View style={styles.sunRayTwo} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: AppColors.background, flex: 1 },
  keyboardAvoidingView: { flex: 1 },
  content: {
    flexGrow: 1,
    gap: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
    paddingTop: 8,
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topTitle: {
    color: AppColors.text,
    fontSize: Typography.pageTitle,
    fontWeight: '900',
    letterSpacing: -1,
  },
  topSpacer: { width: ComponentSize.touchTarget },
  intro: { gap: 8, marginTop: Spacing.sm },
  hiddenDuringCustomInput: { display: 'none' },
  question: {
    color: AppColors.text,
    fontSize: Typography.brand,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  description: { color: AppColors.muted, fontSize: Typography.body, lineHeight: 24 },
  illustration: {
    alignItems: 'center',
    backgroundColor: AppColors.map,
    borderRadius: Radius.lg,
    height: 156,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  hillLeft: {
    backgroundColor: '#D8E8D1',
    borderRadius: Radius.pill,
    bottom: -32,
    height: 108,
    left: -20,
    position: 'absolute',
    transform: [{ rotate: '-12deg' }],
    width: 190,
  },
  hillRight: {
    backgroundColor: '#E7EEDC',
    borderRadius: Radius.pill,
    bottom: -50,
    height: 132,
    position: 'absolute',
    right: -30,
    transform: [{ rotate: '14deg' }],
    width: 220,
  },
  road: {
    backgroundColor: AppColors.surface,
    bottom: -45,
    height: 150,
    position: 'absolute',
    transform: [{ rotate: '27deg' }],
    width: 28,
  },
  pinCircle: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: Radius.pill,
    height: ComponentSize.floatingAction,
    justifyContent: 'center',
    width: ComponentSize.floatingAction,
  },
  sunRayOne: {
    backgroundColor: '#8EB883',
    borderRadius: Radius.pill,
    height: 28,
    position: 'absolute',
    right: '33%',
    top: 24,
    transform: [{ rotate: '20deg' }],
    width: 7,
  },
  sunRayTwo: {
    backgroundColor: '#8EB883',
    borderRadius: Radius.pill,
    height: 7,
    position: 'absolute',
    right: '23%',
    top: 43,
    transform: [{ rotate: '-25deg' }],
    width: 28,
  },
  form: { gap: Spacing.md },
  fieldGroup: { gap: 8 },
  fieldLabel: { color: AppColors.text, fontSize: Typography.body, fontWeight: '800' },
  textInput: {
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.md,
    borderWidth: 1,
    color: AppColors.text,
    fontSize: Typography.body,
    minHeight: ComponentSize.compactButtonHeight,
    paddingHorizontal: Spacing.md,
  },
  searchField: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.sm,
    minHeight: ComponentSize.compactButtonHeight,
    paddingHorizontal: Spacing.md,
  },
  searchInput: { color: AppColors.text, flex: 1, fontSize: Typography.body },
  currentLocationButton: {
    alignItems: 'center',
    backgroundColor: AppColors.accentSurface,
    borderRadius: Radius.md,
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'center',
    minHeight: ComponentSize.compactButtonHeight,
    paddingHorizontal: Spacing.md,
  },
  locationIcon: {
    alignItems: 'center',
    backgroundColor: '#DCEBD7',
    borderRadius: Radius.pill,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  currentLocationText: {
    color: AppColors.primaryDark,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  categorySection: { gap: Spacing.sm },
  categoryHeading: { color: AppColors.text, fontSize: Typography.body, fontWeight: '800' },
  categoryRow: { flexDirection: 'row', gap: 8 },
  categoryChip: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.md,
    borderWidth: 1,
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    minHeight: ComponentSize.compactButtonHeight,
  },
  categoryChipSelected: { backgroundColor: AppColors.primary, borderColor: AppColors.primary },
  categoryText: { color: AppColors.muted, fontSize: Typography.caption, fontWeight: '800' },
  categoryTextSelected: { color: AppColors.onPrimary },
  customTypeField: { gap: 8, marginTop: Spacing.xs },
  registerButton: { marginTop: 'auto' },
});
