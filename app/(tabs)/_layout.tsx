import { Tabs } from 'expo-router';
import { Home, FileText, Bot, Users } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 12,
          paddingTop: 12,
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'Inter-SemiBold',
          marginTop: 6,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ size, color }) => (
            <FileText size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai-assistant"
        options={{
          title: 'AI Helper',
          tabBarIcon: ({ size, color }) => (
            <Bot size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="family"
        options={{
          title: 'Family',
          tabBarIcon: ({ size, color }) => (
            <Users size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}