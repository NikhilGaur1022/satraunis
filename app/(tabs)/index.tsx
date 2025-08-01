import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal
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
  Plus,
  HelpCircle,
  X,
  Home,
  User,
  Search
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [showHelpBot, setShowHelpBot] = useState(false);

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
    { title: 'Reports', value: '12', color: '#2563eb', icon: FileText },
    { title: 'Medicines', value: '3 Active', color: '#f59e0b', icon: Pill },
    { title: 'Reminders', value: '2 Today', color: '#ef4444', icon: Bell },
    { title: 'Family Members', value: '4', color: '#8b5cf6', icon: Users },
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

  const helpTopics = [
    { icon: Home, title: 'How to navigate the app', desc: 'Learn about the main features and tabs' },
    { icon: FileText, title: 'Uploading health records', desc: 'Step-by-step guide to add your documents' },
    { icon: Users, title: 'Managing family profiles', desc: 'Add and manage family member accounts' },
    { icon: Bell, title: 'Setting up reminders', desc: 'Never miss your medications' },
    { icon: Shield, title: 'Privacy and security', desc: 'How we protect your health data' },
  ];

  const handleHelpTopic = (topic) => {
    Alert.alert(topic.title, topic.desc + '\n\nDetailed help coming soon!');
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.userName}>Rahul!</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#ffffff" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <Heart size={28} color="#10b981" />
            <Text style={styles.welcomeTitle}>Your Health Dashboard</Text>
            <Text style={styles.welcomeSubtitle}>Stay on top of your health journey</Text>
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
        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                <action.icon size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionText} numberOfLines={2}>{action.title}</Text>
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
        <Text style={styles.sectionTitle}>Your Health at a Glance</Text>
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
          <Text style={styles.sectionTitle}>Recent Activity</Text>
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
            <Text style={styles.aiTipTitle}>Health Tip for You</Text>
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

      {/* Floating Help Bot */}
      <TouchableOpacity 
        style={styles.helpBotButton}
        onPress={() => setShowHelpBot(true)}
      >
        <HelpCircle size={28} color="#ffffff" />
      </TouchableOpacity>

      {/* Help Bot Modal */}
      <Modal
        visible={showHelpBot}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowHelpBot(false)}
      >
        <View style={styles.helpModalContainer}>
          <View style={styles.helpModalHeader}>
            <View style={styles.helpBotInfo}>
              <View style={styles.helpBotAvatar}>
                <HelpCircle size={24} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.helpBotTitle}>Help & Navigation</Text>
                <Text style={styles.helpBotSubtitle}>How can I help you today?</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.helpCloseButton}
              onPress={() => setShowHelpBot(false)}
            >
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.helpModalContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.helpSectionTitle}>Quick Help Topics</Text>
            
            {helpTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.helpTopicCard}
                onPress={() => handleHelpTopic(topic)}
              >
                <View style={styles.helpTopicIcon}>
                  <topic.icon size={20} color="#2563eb" />
                </View>
                <View style={styles.helpTopicContent}>
                  <Text style={styles.helpTopicTitle}>{topic.title}</Text>
                  <Text style={styles.helpTopicDesc}>{topic.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.helpContactSection}>
              <Text style={styles.helpContactTitle}>Need More Help?</Text>
              <TouchableOpacity style={styles.helpContactButton}>
                <MessageSquare size={20} color="#2563eb" />
                <Text style={styles.helpContactText}>Contact Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpContactButton}>
                <Search size={20} color="#2563eb" />
                <Text style={styles.helpContactText}>Search Help Articles</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContainer: {
    flex: 1,
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
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#dbeafe',
  },
  userName: {
    fontSize: 28,
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
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
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
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 120,
  },
  quickActionIcon: {
    padding: 12,
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 22,
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
    padding: 20,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 100,
  },
  healthStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthStatValue: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  healthStatTitle: {
    fontSize: 16,
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
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  activitiesList: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    padding: 20,
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
    padding: 10,
    borderRadius: 8,
  },
  activityContent: {
    flex: 1,
    gap: 4,
  },
  activityTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  activitySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  aiTipContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  aiTipCard: {
    padding: 24,
    borderRadius: 16,
    gap: 12,
  },
  aiTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiTipTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  aiTipText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    lineHeight: 24,
    opacity: 0.9,
  },
  aiTipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  aiTipButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
    marginBottom: 20,
  },
  securityText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  // Help Bot Styles
  helpBotButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  helpModalContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  helpModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  helpBotInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  helpBotAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpBotTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  helpBotSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  helpCloseButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  helpModalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  helpSectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginTop: 24,
    marginBottom: 16,
  },
  helpTopicCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  helpTopicIcon: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
  },
  helpTopicContent: {
    flex: 1,
    gap: 4,
  },
  helpTopicTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  helpTopicDesc: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 22,
  },
  helpContactSection: {
    marginTop: 32,
    marginBottom: 40,
  },
  helpContactTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  helpContactButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  helpContactText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
});

export default Dashboard;