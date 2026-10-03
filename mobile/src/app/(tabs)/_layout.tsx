import { Tabs } from 'expo-router';
import { GoingWayTabBar } from '@/components/navigation/going-way-tab-bar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <GoingWayTabBar {...props} />}
      screenOptions={{
        headerShown: false,
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
