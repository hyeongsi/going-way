import { SymbolView } from 'expo-symbols';
import { Text, type ColorValue, type TextStyle } from 'react-native';

type IconName =
  | 'home'
  | 'tasks'
  | 'plus'
  | 'back'
  | 'close'
  | 'forward'
  | 'pin'
  | 'store'
  | 'cart'
  | 'medicine'
  | 'laundry'
  | 'bell'
  | 'search'
  | 'check'
  | 'more'
  | 'people'
  | 'person'
  | 'work'
  | 'clock'
  | 'settings'
  | 'navigate'
  | 'location';

const symbols: Record<IconName, { ios: string; android: string }> = {
  home: { ios: 'house.fill', android: 'home' },
  tasks: { ios: 'checklist', android: 'checklist' },
  plus: { ios: 'plus', android: 'add' },
  back: { ios: 'chevron.left', android: 'arrow_back' },
  close: { ios: 'xmark', android: 'close' },
  forward: { ios: 'chevron.right', android: 'chevron_right' },
  pin: { ios: 'mappin.and.ellipse', android: 'location_on' },
  store: { ios: 'storefront.fill', android: 'storefront' },
  cart: { ios: 'cart.fill', android: 'shopping_cart' },
  medicine: { ios: 'pills.fill', android: 'medication' },
  laundry: { ios: 'hanger', android: 'apparel' },
  bell: { ios: 'bell.fill', android: 'notifications' },
  search: { ios: 'magnifyingglass', android: 'search' },
  check: { ios: 'checkmark', android: 'check' },
  more: { ios: 'ellipsis', android: 'more_horiz' },
  people: { ios: 'person.2.fill', android: 'groups' },
  person: { ios: 'person.fill', android: 'person' },
  work: { ios: 'building.2.fill', android: 'work' },
  clock: { ios: 'clock.fill', android: 'schedule' },
  settings: { ios: 'gearshape.fill', android: 'settings' },
  navigate: { ios: 'location.fill', android: 'near_me' },
  location: { ios: 'location.fill', android: 'my_location' },
};

type Props = {
  name: IconName;
  size?: number;
  color: ColorValue;
  style?: TextStyle;
};

export function AppIcon({ name, size = 24, color, style }: Props) {
  const symbol = symbols[name];

  return (
    <SymbolView
      name={{
        ios: symbol.ios as never,
        android: symbol.android as never,
        web: symbol.android as never,
      }}
      size={size}
      tintColor={color}
      fallback={
        <Text style={[{ color, fontSize: size, lineHeight: size }, style]}>
          •
        </Text>
      }
    />
  );
}
