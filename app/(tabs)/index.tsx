import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Heart, 
  Calendar, 
  Pill, 
  MessageSquare, 
  FileText,
  Bell,
  TrendingUp,
  Users,
  Activity,
  Shield,
  Clock,
  Plus
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const quickActions = [
    { icon: FileText, title: 'Upload Report', color: '#2563eb' },
    { icon: Pill, title: 'Add Medicine', color: '#10b981' },
    { icon: Calendar, title: 'Book Appointment', color: '#f59e0b' },
    { icon: Users, title: 'Family Health', color: '#8b5cf6' },
  ];

  const healthStats = [
    { title: 'Health Score', value: '85/100', color: '#10b981', icon: TrendingUp },
    { title: 'Reports', value: '12', color: '#2563eb', icon: FileText },
    { title: 'Medicines', value: '3 Active', color: '#f59e0b', icon: Pill },
    { title: 'Reminders', value: '2 Today', color: '#ef4444', icon: Bell },
  ];

  const recentActivities = [
    { 
      title: 'Blood Test Report', 
      subtitle: 'Lab Corp - Today', 
      icon: FileText, 
      status: 'new' 
    },
    { 
      title: 'Medicine Reminder', 
      subtitle: 'Metformin - 2 hours ago', 
      icon: Pill, 
      status: 'completed' 
    },
    { 
      title: 'Dr. Appointment', 
      subtitle: 'Dr. Sharma - Tomorrow 10 AM', 
      icon: Calendar, 
      status: 'upcoming' 
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#2563eb', '#1d4ed8']}
        style={styles.header}
      >
        <Animated.View 
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good Morning!</Text>
              <Text style={styles.userName}>Rahul Sharma</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#ffffff" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Health Status Card */}
          <View style={styles.healthStatusCard}>
            <View style={styles.healthStatusLeft}>
              <Heart size={32} color="#10b981" />
              <View style={styles.healthStatusText}>
                <Text style={styles.healthStatusTitle}>Health Status</Text>
                <Text style={styles.healthStatusSubtitle}>Good • Last updated today</Text>
              </View>
            </View>
            <View style={styles.healthScoreBadge}>
              <Text style={styles.healthScoreText}>85</Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Quick Actions */}
      <Animated.View 
        style={[
          styles.quickActionsContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                <action.icon size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Health Overview */}
      <Animated.View 
        style={[
          styles.healthOverviewContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={styles.sectionTitle}>Health Overview</Text>
        <View style={styles.healthStatsGrid}>
          {healthStats.map((stat, index) => (
            <View key={index} style={styles.healthStatCard}>
              <View style={styles.healthStatHeader}>
                <stat.icon size={20} color={stat.color} />
                <Text style={styles.healthStatValue}>{stat.value}</Text>
              </View>
              <Text style={styles.healthStatTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Recent Activities */}
      <Animated.View 
        style={[
          styles.recentActivitiesContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.activitiesList}>
          {recentActivities.map((activity, index) => (
            <TouchableOpacity key={index} style={styles.activityCard}>
              <View style={styles.activityLeft}>
                <View style={[
                  styles.activityIcon,
                  { 
                    backgroundColor: activity.status === 'new' ? '#dbeafe' : 
                                   activity.status === 'completed' ? '#dcfce7' : '#fef3c7'
                  }
                ]}>
                  <activity.icon 
                    size={20} 
                    color={
                      activity.status === 'new' ? '#2563eb' : 
                      activity.status === 'completed' ? '#10b981' : '#f59e0b'
                    } 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                { 
                  backgroundColor: activity.status === 'new' ? '#2563eb' : 
                                 activity.status === 'completed' ? '#10b981' : '#f59e0b'
                }
              ]}>
                <Text style={styles.statusText}>
                  {activity.status === 'new' ? 'New' : 
                   activity.status === 'completed' ? 'Done' : 'Soon'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* AI Health Tip */}
      <Animated.View 
        style={[
          styles.aiTipContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <LinearGradient
          colors={['#10b981', '#059669']}
          style={styles.aiTipCard}
        >
          <View style={styles.aiTipHeader}>
            <Activity size={24} color="#ffffff" />
            <Text style={styles.aiTipTitle}>Today's Health Tip</Text>
          </View>
          <Text style={styles.aiTipText}>
            Based on your recent blood test, consider taking a 15-minute walk after meals 
            to help maintain healthy glucose levels.
          </Text>
          <TouchableOpacity style={styles.aiTipButton}>
            <Text style={styles.aiTipButtonText}>Learn More</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {/* Security Banner */}
      <View style={styles.securityBanner}>
        <Shield size={20} color="#10b981" />
        <Text style={styles.securityText}>
          Your health data is encrypted and secure
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    gap: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#dbeafe',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  healthStatusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  healthStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  healthStatusText: {
    gap: 4,
  },
  healthStatusTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  healthStatusSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  healthScoreBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  healthScoreText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    width: (width - 56) / 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    padding: 12,
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    textAlign: 'center',
  },
  healthOverviewContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  healthStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthStatCard: {
    backgroundColor: '#ffffff',
    width: (width - 56) / 2,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  healthStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthStatValue: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  healthStatTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  recentActivitiesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  activitiesList: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  activityIcon: {
    padding: 8,
    borderRadius: 8,
  },
  activityContent: {
    flex: 1,
    gap: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  activitySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  aiTipContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  aiTipCard: {
    padding: 20,
    borderRadius: 16,
    gap: 12,
  },
  aiTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiTipTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  aiTipText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    lineHeight: 20,
    opacity: 0.9,
  },
  aiTipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  aiTipButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    marginBottom: 20,
  },
  securityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});

export default Dashboard;