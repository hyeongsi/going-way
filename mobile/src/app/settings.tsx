import { useState, type ReactNode } from 'react';
import { router } from 'expo-router';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
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

type IconName = Parameters<typeof AppIcon>[0]['name'];

export default function SettingsScreen() {
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState('형시');
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [signedOut, setSignedOut] = useState(false);

  if (editing) {
    return (
      <ProfileEditor
        nickname={nickname}
        onChange={setNickname}
        onBack={() => setEditing(false)}
        onSave={() => {
          setEditing(false);
          Alert.alert('저장했어요', '프로필 정보가 업데이트되었습니다.');
        }}
        onLogout={() =>
          Alert.alert('로그아웃할까요?', '이 기기에서만 로그아웃됩니다.', [
            { text: '취소', style: 'cancel' },
            {
              text: '로그아웃',
              style: 'destructive',
              onPress: () => {
                setSignedOut(true);
                setEditing(false);
              },
            },
          ])
        }
      />
    );
  }

  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconButton
            name="back"
            onPress={() => router.back()}
          />
          <Text style={styles.pageTitle}>설정</Text>
          <View style={styles.headerSpacer} />
        </View>
        <Text style={styles.eyebrow}>나의 가는김에</Text>
        <Pressable
          onPress={() => setEditing(true)}
          style={styles.profileCard}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {signedOut ? '?' : nickname.slice(0, 1)}
            </Text>
          </View>
          <View style={styles.profileCopy}>
            <Text style={styles.profileName}>
              {signedOut ? '게스트' : `${nickname}님`}
            </Text>
            <Text style={styles.profileDescription}>
              {signedOut
                ? '로그인하고 내 할 일을 저장하세요'
                : '프로필과 계정 정보를 관리해요'}
            </Text>
          </View>
          <AppIcon
            name="forward"
            color={AppColors.muted}
            size={IconSize.row}
          />
        </Pressable>

        <SectionTitle title="내 생활" />
        <View style={styles.menuGroup}>
          <SettingRow
            icon="person"
            title="내 계정"
            description="프로필 · 로그인 계정"
            onPress={() => setEditing(true)}
          />
          <SettingRow
            icon="pin"
            title="내 장소"
            description="집, 회사, 자주 가는 장소"
            onPress={() => router.push('/places')}
          />
          <SettingRow
            icon="people"
            title="우리 집"
            description="가족·룸메이트 초대와 공동 목록"
            onPress={() => router.push('/shared')}
          />
        </View>

        <SectionTitle title="알림과 개인정보" />
        <View style={styles.menuGroup}>
          <SettingRow
            icon="bell"
            title="알림 설정"
            description="할 일과 근처 알림을 받아요"
            trailing={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#D7DCD6', true: '#94B98D' }}
                thumbColor={AppColors.surface}
              />
            }
          />
          <SettingRow
            icon="location"
            title="위치 및 개인정보"
            description={
              locationEnabled ? '현재 위치 사용 중' : '현재 위치 사용 안 함'
            }
            trailing={
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: '#D7DCD6', true: '#94B98D' }}
                thumbColor={AppColors.surface}
              />
            }
          />
        </View>

        <SectionTitle title="앱" />
        <View style={styles.menuGroup}>
          <SettingRow
            icon="settings"
            title="앱 정보"
            description="가는김에 버전 1.0.0"
            onPress={() =>
              Alert.alert('가는김에', '버전 1.0.0\n오늘도, 가는 길이 더 알차게')
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileEditor({
  nickname,
  onChange,
  onBack,
  onSave,
  onLogout,
}: {
  nickname: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onSave: () => void;
  onLogout: () => void;
}) {
  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom']}
    >
      <View style={styles.editor}>
        <View style={styles.header}>
          <IconButton
            name="back"
            onPress={onBack}
          />
          <Text style={styles.pageTitle}>내 계정</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.editorAvatar}>
          <Text style={styles.avatarText}>{nickname.slice(0, 1) || '형'}</Text>
        </View>
        <Text style={styles.editorHeading}>프로필 편집</Text>
        <Text style={styles.editorDescription}>
          가는김에에서 사용할 이름을 설정해요.
        </Text>
        <Text style={styles.fieldLabel}>닉네임</Text>
        <TextInput
          value={nickname}
          onChangeText={onChange}
          maxLength={12}
          style={styles.input}
          placeholder="이름을 입력하세요"
          placeholderTextColor={AppColors.softMuted}
        />
        <Text style={styles.fieldLabel}>로그인 계정</Text>
        <View style={styles.readOnly}>
          <Text style={styles.readOnlyText}>hyeongsi@example.com</Text>
        </View>
        <PrimaryButton
          label="변경 사항 저장"
          onPress={onSave}
          style={styles.saveButton}
        />
        <Pressable
          onPress={onLogout}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </Pressable>
        <Text style={styles.accountNotice}>
          계정 탈퇴는 서버 계정 기능을 연결한 뒤 제공됩니다.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}
function SettingRow({
  icon,
  title,
  description,
  onPress,
  trailing,
}: {
  icon: IconName;
  title: string;
  description: string;
  onPress?: () => void;
  trailing?: ReactNode;
}) {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={styles.row}
    >
      <View style={styles.rowIcon}>
        <AppIcon
          name={icon}
          color={AppColors.primaryDark}
          size={IconSize.row}
        />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      {trailing ?? (
        <AppIcon
          name="forward"
          color={AppColors.muted}
          size={IconSize.compact}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: AppColors.background, flex: 1 },
  content: { gap: Spacing.md, padding: Spacing.md, paddingBottom: 40 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerSpacer: { width: ComponentSize.touchTarget },
  pageTitle: {
    color: AppColors.text,
    fontSize: Typography.pageTitle,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  eyebrow: {
    color: AppColors.primary,
    fontSize: Typography.label,
    fontWeight: '800',
    marginTop: Spacing.sm,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#F0F7ED',
    borderColor: '#D8E7D4',
    borderRadius: Radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.md,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: Radius.pill,
    height: ComponentSize.profileCardAvatar,
    justifyContent: 'center',
    width: ComponentSize.profileCardAvatar,
  },
  avatarText: {
    color: AppColors.onPrimary,
    fontSize: Typography.cardTitle,
    fontWeight: '800',
  },
  profileCopy: { flex: 1, gap: 4 },
  profileName: {
    color: AppColors.text,
    fontSize: Typography.cardTitle,
    fontWeight: '800',
  },
  profileDescription: { color: AppColors.muted, fontSize: Typography.label },
  sectionTitle: {
    color: AppColors.text,
    fontSize: Typography.label,
    fontWeight: '800',
    marginTop: Spacing.md,
  },
  menuGroup: {
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.sm,
    minHeight: ComponentSize.settingRowHeight,
    paddingHorizontal: Spacing.md,
  },
  rowIcon: {
    alignItems: 'center',
    backgroundColor: AppColors.accentSurface,
    borderRadius: Radius.sm,
    height: ComponentSize.menuIcon,
    justifyContent: 'center',
    width: ComponentSize.menuIcon,
  },
  rowCopy: { flex: 1, gap: 3 },
  rowTitle: {
    color: AppColors.text,
    fontSize: Typography.body,
    fontWeight: '800',
  },
  rowDescription: { color: AppColors.muted, fontSize: Typography.caption },
  editor: { flex: 1, padding: Spacing.md },
  editorAvatar: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: Radius.pill,
    height: 88,
    justifyContent: 'center',
    marginTop: 44,
    width: 88,
  },
  editorHeading: {
    color: AppColors.text,
    fontSize: Typography.brand,
    fontWeight: '900',
    marginTop: 40,
    textAlign: 'center',
  },
  editorDescription: {
    color: AppColors.muted,
    fontSize: Typography.body,
    marginTop: 8,
    textAlign: 'center',
  },
  fieldLabel: {
    color: AppColors.text,
    fontSize: Typography.label,
    fontWeight: '800',
    marginTop: 32,
  },
  input: {
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderRadius: Radius.md,
    borderWidth: 1,
    color: AppColors.text,
    fontSize: Typography.body,
    marginTop: 9,
    minHeight: ComponentSize.primaryButtonHeight,
    paddingHorizontal: Spacing.md,
  },
  readOnly: {
    backgroundColor: '#F2F3F0',
    borderRadius: Radius.md,
    marginTop: 9,
    minHeight: ComponentSize.primaryButtonHeight,
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  readOnlyText: { color: AppColors.muted, fontSize: Typography.body },
  saveButton: { marginTop: 'auto' },
  logoutButton: { alignItems: 'center', paddingVertical: Spacing.md },
  logoutText: {
    color: '#B64A45',
    fontSize: Typography.label,
    fontWeight: '800',
  },
  accountNotice: {
    color: AppColors.softMuted,
    fontSize: Typography.caption,
    textAlign: 'center',
  },
});
