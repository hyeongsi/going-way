export const AppColors = {
  background: '#FCF9F2',
  surface: '#FFFFFF',
  text: '#1E2C22',
  muted: '#687269',
  softMuted: '#99A19A',
  primary: '#527D55',
  primaryDark: '#285238',
  onPrimary: '#FFFFFF',
  accentSurface: '#E9F2E4',
  map: '#EDF2EA',
  mapBlue: '#CFE8F4',
  warmSurface: '#F7F5EE',
  warning: '#D89926',
  border: '#E2E7DF',
  shadow: 'rgba(35, 56, 41, 0.10)',
} as const;

export const Spacing = { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 } as const;
export const Radius = { sm: 12, md: 16, lg: 24, pill: 999 } as const;

// 홈 화면의 실제 크기를 기준으로 잡은 공통 타이포그래피 단계입니다.
export const Typography = {
  brand: 32,
  pageTitle: 26,
  cardTitle: 20,
  body: 16,
  subtitle: 15,
  label: 14,
  caption: 12,
  button: 18,
  illustration: 48,
} as const;

export const IconSize = {
  badge: 15,
  label: 17,
  metadata: 18,
  compact: 20,
  row: 22,
  navigation: 24,
  action: 25,
  large: 28,
  illustration: 48,
} as const;

// 화면마다 같은 조작 요소가 다른 크기로 커지는 것을 막기 위한 공통 치수입니다.
export const ComponentSize = {
  primaryButtonHeight: 64,
  compactButtonHeight: 56,
  // 설정 목록과 일반 카드에서 사용하는 아이콘 영역입니다.
  // 화면마다 달라지지 않도록 한 가지 크기로 고정합니다.
  cardIcon: 42,
  menuIcon: 42,
  settingRowHeight: 76,
  taskCardMinHeight: 112,
  selectionCardMinHeight: 96,
  touchTarget: 48,
  tabBarHeight: 78,
  floatingAction: 66,
  checkbox: 34,
  profileAvatar: 40,
  // 프로필 카드는 사람을 식별하는 영역이라 일반 카드 아이콘보다 크게 유지합니다.
  profileCardAvatar: 64,
} as const;
