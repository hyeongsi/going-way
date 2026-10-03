import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  AppColors,
  ComponentSize,
  IconSize,
  Radius,
  Typography,
} from '@/constants/design-system';
import { AppIcon } from '@/components/ui/app-icon';

const icons = { index: 'home', tasks: 'tasks' } as const;
const labels = { index: '홈', tasks: '할 일' } as const;

type TabBarProps = {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: { navigate: (name: string) => void };
};

export function GoingWayTabBar({ state, navigation }: TabBarProps) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const routeName = route.name as keyof typeof icons;
        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            <AppIcon
              name={icons[routeName]}
              color={focused ? AppColors.primary : AppColors.softMuted}
              size={IconSize.navigation}
            />
            <Text style={[styles.label, focused && styles.activeLabel]}>
              {labels[routeName]}
            </Text>
            {focused ? <View style={styles.indicator} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: AppColors.surface,
    borderTopColor: AppColors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: ComponentSize.tabBarHeight,
    justifyContent: 'space-between',
    paddingHorizontal: 48,
    position: 'relative',
  },
  tab: { alignItems: 'center', gap: 3, justifyContent: 'center', minWidth: 56 },
  label: {
    color: AppColors.softMuted,
    fontSize: Typography.caption,
    fontWeight: '700',
  },
  activeLabel: { color: AppColors.primary },
  indicator: {
    backgroundColor: AppColors.primary,
    borderRadius: Radius.pill,
    bottom: 4,
    height: 4,
    position: 'absolute',
    width: 34,
  },
});
