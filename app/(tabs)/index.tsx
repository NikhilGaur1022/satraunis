import React, { useRef, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  Image,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Calendar, Pill, MessageSquare, FileText, Bell, TrendingUp, Users, Activity, Shield, Clock, Plus, CircleHelp as HelpCircle, X, Chrome as Home, User, Search, Settings, Bot, Eye, Stethoscope } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [showHelpBot, setShowHelpBot] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
    { icon: Clock, title: 'Reminders', color: '#f59e0b', route: '/reminders' },
    { icon: Calendar, title: 'Appointments', color: '#2563eb', route: '/appointments' },
    { icon: Bot, title: 'Talk to AI', color: '#8b5cf6', route: '/ai-assistant' },
    { icon: Activity, title: 'Health Glance', color: '#10b981', route: '/health-glance' },
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
    let helpContent = '';
    switch (topic.title) {
      case 'How to navigate the app':
        helpContent = 'Navigation Guide:\n\n1. Home: Dashboard with health overview\n2. Records: Upload and view health documents\n3. Family: Manage family member profiles\n4. Q&A: Chat with AI health assistant\n5. Community: Connect with health groups\n\nUse the bottom tabs to switch between sections.';
        break;
      case 'Uploading health records':
        helpContent = 'Upload Records:\n\n1. Go to Records tab\n2. Tap the "+" Upload button\n3. Choose file type (PDF, Image, Text)\n4. Select from camera or gallery\n5. Add description and date\n6. AI will analyze and summarize\n\nSupported formats: PDF, JPG, PNG, DOC';
        break;
      case 'Managing family profiles':
        helpContent = 'Family Management:\n\n1. Go to Family tab\n2. Tap "Add Member" button\n3. Enter family member details\n4. Set relationship and permissions\n5. Share access code with them\n6. They can accept invitation\n\nYou can manage up to 6 family members.';
        break;
      case 'Setting up reminders':
        helpContent = 'Medicine Reminders:\n\n1. Go to Home → Quick Actions → Reminders\n2. Tap "Add Reminder"\n3. Enter medicine name and dosage\n4. Set time and frequency\n5. Choose notification sound\n6. Enable location-based reminders\n\nReminders sync across all devices.';
        break;
      case 'Privacy and security':
        helpContent = 'Your Privacy:\n\n• All data encrypted with AES-256\n• Biometric authentication required\n• No data sold to third parties\n• HIPAA compliant storage\n• Regular security audits\n• You control data sharing\n\nData stored in secure Indian servers.';
        break;
      default:
        helpContent = topic.desc + '\n\nFor detailed guidance, contact our support team.';
    }
    Alert.alert(topic.title, helpContent);
  };

  const handleQuickAction = (action) => {
    switch (action.title) {
      case 'Talk to AI':
        router.push('/(tabs)/ai-assistant');
        break;
      case 'Health Glance':
        Alert.alert('Health Overview', 'Your health score is 85/100. Recent activities show good progress!');
        break;
      case 'Reminders':
        Alert.alert('Medicine Reminders', 'Next: Metformin 500mg at 8:00 PM\nUpcoming: Vitamin D at 9:00 AM tomorrow');
        break;
      case 'Appointments':
        Alert.alert('Appointments', 'Next appointment: Dr. Sharma tomorrow at 10:00 AM\nLocation: Apollo Hospital');
        break;
      default:
        Alert.alert(action.title, `Navigate to ${action.title}`);
    }
  };

  const userProfile = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    healthScore: 85,
  };

  const profileMenuItems = [
    { 
      icon: User, 
      title: 'My Profile', 
      action: () => {
        Alert.alert('My Profile', 'Name: Rahul Sharma\nAge: 32\nBlood Group: B+\nPhone: +91 98765 43210\nEmail: rahul.sharma@email.com\n\nHealth Conditions:\n• Type 2 Diabetes\n• Hypertension\n\nLast Updated: Today');
      }
    },
    { 
      icon: Settings, 
      title: 'Settings', 
      action: () => {
        Alert.alert('Settings', 'App Settings:\n\n• Notifications: Enabled\n• Language: English\n• Theme: Auto\n• Data Sync: Enabled\n• Biometric Lock: Enabled\n\nTap to modify settings');
      }
    },
    { 
      icon: Shield, 
      title: 'Privacy & Security', 
      action: () => {
        Alert.alert('Privacy & Security', 'Your data is protected with:\n\n• End-to-end encryption\n• Biometric authentication\n• Secure cloud backup\n• HIPAA compliance\n• No data sharing with third parties\n\nLast security check: Today');
      }
    },
    { 
      icon: HelpCircle, 
      title: 'Help & Support', 
      action: () => {
        Alert.alert('Help & Support', 'Get help with:\n\n• How to upload records\n• Managing family profiles\n• Setting up reminders\n• Understanding AI insights\n\nContact: support@swasthio.com\nPhone: 1800-HEALTH');
      }
    },
  ];

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
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={24} color="#ffffff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => setShowProfile(true)}
              >
                <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Health Score Card */}
          <View style={styles.healthScoreCard}>
            <View style={styles.healthScoreLeft}>
              <Heart size={24} color="#10b981" />
              <View>
                <Text style={styles.healthScoreTitle}>Health Score</Text>
                <Text style={styles.healthScoreSubtitle}>Looking good!</Text>
              </View>
            </View>
            <View style={styles.healthScoreRight}>
              <Text style={styles.healthScoreValue}>{userProfile.healthScore}</Text>
              <Text style={styles.healthScoreMax}>/100</Text>
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
            <TouchableOpacity key={index} style={styles.quickActionCard} onPress={() => handleQuickAction(action)}>
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
            <Bot size={24} color="#ffffff" />
            <Text style={styles.aiTipTitle}>Health Tip for You</Text>
          </View>
          <Text style={styles.aiTipText}>
            Based on your recent blood test, consider taking a 15-minute walk after meals 
            to help maintain healthy glucose levels.
          </Text>
          <TouchableOpacity style={styles.aiTipButton} onPress={() => handleQuickAction({ title: 'Talk to AI' })}>
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

      {/* Profile Sidebar Modal */}
      <Modal
        visible={showProfile}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowProfile(false)}
      >
        <View style={styles.profileModalContainer}>
          <View style={styles.profileModalHeader}>
            <Text style={styles.profileModalTitle}>Profile</Text>
            <TouchableOpacity 
              style={styles.profileCloseButton}
              onPress={() => setShowProfile(false)}
            >
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileModalContent}>
            {/* Profile Info */}
            <View style={styles.profileInfoCard}>
              <Image source={{ uri: userProfile.avatar }} style={styles.profileModalAvatar} />
              <View style={styles.profileModalInfo}>
                <Text style={styles.profileModalName}>{userProfile.name}</Text>
                <Text style={styles.profileModalEmail}>{userProfile.email}</Text>
                <View style={styles.healthScoreBadge}>
                  <Heart size={16} color="#10b981" />
                  <Text style={styles.healthScoreBadgeText}>Health Score: {userProfile.healthScore}</Text>
                </View>
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.profileMenuContainer}>
              {profileMenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.profileMenuItem}
                  onPress={item.action}
                >
                  <View style={styles.profileMenuLeft}>
                    <item.icon size={20} color="#6b7280" />
                    <Text style={styles.profileMenuText}>{item.title}</Text>
                  </View>
                  <Text style={styles.profileMenuArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* App Info */}
            <View style={styles.profileAppInfo}>
              <Text style={styles.profileAppInfoText}>Swasthio v1.0.0</Text>
              <Text style={styles.profileAppInfoText}>Made with ❤️ in India</Text>
            </View>
          </View>
        </View>
      </Modal>

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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  profileButton: {
    padding: 2,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  healthScoreCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  healthScoreLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  healthScoreTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  healthScoreSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  healthScoreRight: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  healthScoreValue: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  healthScoreMax: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
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
  // Profile Modal Styles
  profileModalContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  profileModalHeader: {
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
  profileModalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  profileCloseButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  profileModalContent: {
    flex: 1,
    padding: 20,
  },
  profileInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileModalAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileModalInfo: {
    flex: 1,
    gap: 6,
  },
  profileModalName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  profileModalEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  healthScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  healthScoreBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#15803d',
  },
  profileMenuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  profileMenuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileMenuText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  profileMenuArrow: {
    fontSize: 20,
    color: '#6b7280',
  },
  profileAppInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 4,
  },
  profileAppInfoText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
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