import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Keyboard,
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
import {
  CircleIcon,
  IconButton,
  PrimaryButton,
  Radio,
} from '@/components/ui/app-ui';

type Step = 1 | 2 | 3;
const placeOptions = [
  {
    name: 'OO마트',
    detail: '집 근처 · 250m · 영업 중',
    icon: 'cart' as const,
    recommended: true,
  },
  {
    name: 'OO편의점',
    detail: '퇴근길 · 3분 들름 · 영업 중',
    icon: 'store' as const,
  },
];
const alertOptions = [
  { title: '퇴근길', detail: '평일 17:30~20:30', icon: 'work' as const },
  {
    title: '지금 주변',
    detail: '장소 근처에 도착했을 때',
    icon: 'pin' as const,
  },
  {
    title: '둘 다',
    detail: '시간대 시작과 장소 근처에서',
    icon: 'clock' as const,
  },
];

export default function AddTaskScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [step, setStep] = useState<Step>(1);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isTaskInputFocused, setIsTaskInputFocused] = useState(false);
  const [taskInputTop, setTaskInputTop] = useState(0);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState(0);
  const [alert, setAlert] = useState(0);
  const goBack = () =>
    step === 1 ? router.back() : setStep((value) => (value - 1) as Step);
  const revealTaskInput = () => setIsTaskInputFocused(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
        if (isTaskInputFocused) {
          requestAnimationFrame(() => {
            scrollViewRef.current?.scrollTo({
              animated: true,
              y: Math.max(taskInputTop - 132, 0),
            });
          });
        }
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [isTaskInputFocused, taskInputTop]);
  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Spacing.xl + keyboardHeight },
          ]}
          automaticallyAdjustKeyboardInsets
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.top}>
            <IconButton
              name="back"
              onPress={goBack}
            />
            <Text style={styles.topTitle}>새 할 일</Text>
            <View style={styles.topSpacer} />
          </View>
          <Stepper step={step} />
          {step === 1 ? (
            <TaskInput
              title={title}
              onChange={setTitle}
              onFocus={revealTaskInput}
              onBlur={() => setIsTaskInputFocused(false)}
              onInputLayout={setTaskInputTop}
              onNext={() => setStep(2)}
            />
          ) : null}
          {step === 2 ? (
            <PlaceChoice
              selected={place}
              onChoose={setPlace}
              onNext={() => setStep(3)}
            />
          ) : null}
          {step === 3 ? (
            <AlertChoice
              selected={alert}
              onChoose={setAlert}
              onSave={() => router.replace('/tasks')}
            />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Stepper({ step }: { step: Step }) {
  const labels = ['할 일 입력', '장소 선택', '알림 설정'];
  return (
    <View style={styles.stepper}>
      {labels.map((label, index) => {
        const position = index + 1;
        const done = position < step;
        const active = position === step;
        return (
          <View
            key={label}
            style={styles.stepItem}
          >
            {index !== 0 ? (
              <View
                style={[
                  styles.stepLine,
                  position <= step && styles.stepLineDone,
                ]}
              />
            ) : null}
            <View
              style={[
                styles.stepCircle,
                (done || active) && styles.stepCircleActive,
              ]}
            >
              <Text style={styles.stepNumber}>{done ? '✓' : position}</Text>
            </View>
            <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function TaskInput({
  title,
  onChange,
  onFocus,
  onBlur,
  onInputLayout,
  onNext,
}: {
  title: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onInputLayout: (top: number) => void;
  onNext: () => void;
}) {
  return (
    <View style={styles.stepContent}>
      <View style={styles.notepad}>
        <Text style={styles.noteLine}>━</Text>
        <Text style={styles.noteLine}>━</Text>
        <Text style={styles.noteLine}>━</Text>
      </View>
      <Text style={styles.question}>무엇을 해야 하나요?</Text>
      <Text style={styles.description}>
        말하거나 적으면 장소와 알림을 이어서 설정할게요.
      </Text>
      <View
        style={styles.inputWrap}
        onLayout={(event) => onInputLayout(event.nativeEvent.layout.y)}
      >
        <TextInput
          value={title}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={styles.input}
          placeholder="예: 퇴근길에 우유 사기"
          placeholderTextColor={AppColors.softMuted}
        />
        <View style={styles.mic}>
          <Text style={styles.micText}>♩</Text>
        </View>
      </View>
      <Text style={styles.example}>예: 집 근처 약국에서 감기약 사기</Text>
      <PrimaryButton
        label="다음: 장소 선택"
        icon="forward"
        onPress={onNext}
        style={styles.bottomButton}
      />
    </View>
  );
}

function PlaceChoice({
  selected,
  onChoose,
  onNext,
}: {
  selected: number;
  onChoose: (value: number) => void;
  onNext: () => void;
}) {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.question}>어디에서 할까요?</Text>
      <Text style={styles.description}>
        집 주변과 퇴근길 기준으로 찾았어요.
      </Text>
      <View style={styles.smallMap}>
        <View style={styles.smallMapPin}>
          <AppIcon
            name="pin"
            color={AppColors.onPrimary}
            size={IconSize.large}
          />
        </View>
      </View>
      <View style={styles.choiceList}>
        {placeOptions.map((option, index) => (
          <Pressable
            onPress={() => onChoose(index)}
            key={option.name}
            style={[
              styles.choiceCard,
              selected === index && styles.choiceSelected,
            ]}
          >
            <CircleIcon icon={option.icon} />
            <View style={styles.choiceCopy}>
              <View style={styles.choiceTitleRow}>
                <Text style={styles.choiceTitle}>{option.name}</Text>
                {option.recommended ? (
                  <Text style={styles.recommend}>추천</Text>
                ) : null}
              </View>
              <Text style={styles.choiceDetail}>{option.detail}</Text>
            </View>
            <Radio selected={selected === index} />
          </Pressable>
        ))}
      </View>
      <Text style={styles.searchHeading}>다른 장소를 찾아보세요</Text>
      <View style={styles.searchBox}>
        <AppIcon
          name="search"
          color={AppColors.softMuted}
          size={IconSize.large}
        />
        <Text style={styles.searchText}>장소나 주소 검색</Text>
      </View>
      <PrimaryButton
        label="다음: 알림 설정"
        icon="forward"
        onPress={onNext}
        style={styles.bottomButton}
      />
    </View>
  );
}

function AlertChoice({
  selected,
  onChoose,
  onSave,
}: {
  selected: number;
  onChoose: (value: number) => void;
  onSave: () => void;
}) {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.question}>언제 알려드릴까요?</Text>
      <Text style={styles.description}>
        먼저 간단히 고르고, 필요하면 자세히 조정하세요.
      </Text>
      <View style={styles.choiceList}>
        {alertOptions.map((option, index) => (
          <Pressable
            onPress={() => onChoose(index)}
            key={option.title}
            style={[
              styles.choiceCard,
              selected === index && styles.choiceSelected,
            ]}
          >
            <CircleIcon icon={option.icon} />
            <View style={styles.choiceCopy}>
              <Text style={styles.choiceTitle}>{option.title}</Text>
              <Text style={styles.choiceDetail}>{option.detail}</Text>
            </View>
            <Radio selected={selected === index} />
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.advanced}>
        <AppIcon
          name="settings"
          color={AppColors.text}
          size={IconSize.large}
        />
        <Text style={styles.advancedText}>
          고급 설정: 요일 · 시간 · 알림 방식
        </Text>
        <AppIcon
          name="forward"
          color={AppColors.muted}
          size={IconSize.row}
        />
      </Pressable>
      <PrimaryButton
        label="할 일 저장"
        onPress={onSave}
        style={styles.bottomButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: AppColors.background, flex: 1 },
  keyboardAvoidingView: { flex: 1 },
  content: { flexGrow: 1, padding: Spacing.md, paddingBottom: Spacing.xl },
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
  topSpacer: { width: 48 },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 42,
    marginTop: 36,
  },
  stepItem: { alignItems: 'center', flex: 1, position: 'relative' },
  stepLine: {
    backgroundColor: '#D7DAD5',
    height: 3,
    left: '-50%',
    position: 'absolute',
    top: 24,
    width: '100%',
  },
  stepLineDone: { backgroundColor: AppColors.primary },
  stepCircle: {
    alignItems: 'center',
    backgroundColor: '#E8E9E5',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  stepCircleActive: { backgroundColor: AppColors.primary },
  stepNumber: {
    color: AppColors.onPrimary,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  stepLabel: {
    color: AppColors.muted,
    fontSize: Typography.caption,
    fontWeight: '700',
    marginTop: 10,
  },
  stepLabelActive: { color: AppColors.primary },
  stepContent: { flexGrow: 1, paddingBottom: Spacing.sm },
  notepad: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: 20,
    elevation: 2,
    gap: 5,
    justifyContent: 'center',
    marginBottom: 42,
    marginTop: 24,
    padding: 28,
    transform: [{ rotate: '-8deg' }],
    width: 130,
  },
  noteLine: {
    color: '#9DB59B',
    fontSize: Typography.body,
    lineHeight: 20,
  },
  question: {
    color: AppColors.text,
    fontSize: Typography.brand,
    fontWeight: '900',
    letterSpacing: -1.7,
  },
  description: {
    color: AppColors.muted,
    fontSize: Typography.body,
    lineHeight: 24,
    marginTop: 12,
  },
  inputWrap: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderColor: '#D7DAD5',
    borderRadius: Radius.lg,
    borderWidth: 2,
    flexDirection: 'row',
    marginTop: 50,
    paddingHorizontal: 18,
  },
  input: {
    color: AppColors.text,
    flex: 1,
    fontSize: Typography.body,
    minHeight: ComponentSize.primaryButtonHeight,
  },
  mic: {
    alignItems: 'center',
    backgroundColor: AppColors.accentSurface,
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  micText: { color: AppColors.primary, fontSize: Typography.pageTitle },
  example: {
    color: AppColors.softMuted,
    fontSize: Typography.label,
    marginTop: 17,
  },
  bottomButton: {
    marginBottom: Spacing.sm,
    marginTop: 32,
    minHeight: ComponentSize.primaryButtonHeight,
  },
  smallMap: {
    backgroundColor: AppColors.map,
    borderRadius: Radius.lg,
    height: 125,
    marginTop: 28,
    overflow: 'hidden',
  },
  smallMapPin: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    left: '65%',
    position: 'absolute',
    top: 28,
    width: 60,
  },
  choiceList: { gap: 14, marginTop: 24 },
  choiceCard: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.lg,
    borderWidth: 2,
    flexDirection: 'row',
    gap: 15,
    minHeight: ComponentSize.selectionCardMinHeight,
    padding: Spacing.md,
  },
  choiceSelected: {
    backgroundColor: '#F4FAF1',
    borderColor: AppColors.primary,
  },
  choiceCopy: { flex: 1, gap: 7 },
  choiceTitleRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  choiceTitle: {
    color: AppColors.text,
    fontSize: Typography.cardTitle,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  choiceDetail: { color: AppColors.muted, fontSize: Typography.caption },
  recommend: {
    backgroundColor: AppColors.accentSurface,
    borderRadius: Radius.pill,
    color: AppColors.primary,
    fontSize: Typography.caption,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  searchHeading: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
    marginTop: 37,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.md,
    borderWidth: 2,
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
    padding: 18,
  },
  searchText: { color: AppColors.softMuted, fontSize: Typography.body },
  advanced: {
    alignItems: 'center',
    borderTopColor: AppColors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 14,
    marginTop: 28,
    paddingTop: 22,
  },
  advancedText: { color: AppColors.text, flex: 1, fontSize: Typography.label },
});
