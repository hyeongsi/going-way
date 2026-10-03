import { Tabs } from 'expo-router';
import { AppColors } from '@/constants/design-system';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.muted,
        tabBarStyle: {
          backgroundColor: AppColors.surface,
          borderTopColor: AppColors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: '홈' }}
      />
      <Tabs.Screen
        name="tasks"
        options={{ title: '할 일' }}
      />
    </Tabs>
  );
}
