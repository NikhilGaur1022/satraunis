import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert,
  Image,
  Modal
} from 'react-native';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone, 
  Heart, 
  FileText, 
  LogOut, 
  ChevronRight, 
  Edit, 
  Eye, 
  EyeOff, 
  Lock, 
  Download, 
  Trash2, 
  HelpCircle,
  Settings,
  ChevronDown,
  X,
  Pill,
  Clock,
  Bot
} from 'lucide-react-native';
import { router } from 'expo-router';

const Profile = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notifications, setNotifications] = useState({
    medicineReminders: true,
    appointmentAlerts: true,
    healthTips: false,
    communityUpdates: false,
    systemUpdates: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'family',
    healthDataSharing: false,
    analyticsOptIn: true,
  });

  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const userProfile = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    memberSince: 'January 2024',
  };

  const languages = [
    { id: 'english', name: 'English', flag: '🇺🇸' },
    { id: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { id: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { id: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' },
    { id: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { id: 'bengali', name: 'বাংলা', flag: '🇮🇳' },
  ];

  const quickActions = [
    { icon: Pill, title: 'Prescriptions', route: '/prescriptions', color: '#10b981' },
    { icon: Clock, title: 'Reminders', route: '/reminders', color: '#f59e0b' },
    { icon: Bot, title: 'AI Assistant', route: '/ai-assistant', color: '#8b5cf6' },
  ];

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyToggle = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Change Language',
      'Select your preferred language:',
      [
        ...languages.map(lang => ({
          text: `${lang.flag} ${lang.name}`,
          onPress: () => {
            setSelectedLanguage(lang.id);
            Alert.alert('Language Changed', `Language set to ${lang.name}`);
          }
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Health Data',
      'Your health data will be exported as a PDF file. This may take a few moments.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => Alert.alert('Success', 'Health data exported successfully!') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and all your health data will be permanently lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Account Deleted', 'Your account has been scheduled for deletion.')
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => router.replace('/')
        }
      ]
    );
  };

  const handleQuickAction = (action) => {
    Alert.alert(action.title, `Navigate to ${action.title} - Feature coming soon!`);
  };

  return (
    <View style={styles.container}>
      {/* Header with Settings Dropdown */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={() => setShowSettingsModal(true)}
        >
          <Settings size={24} color="#2563eb" />
          <ChevronDown size={16} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
            <Text style={styles.profilePhone}>{userProfile.phone}</Text>
            <Text style={styles.profileMeta}>
              Member since {userProfile.memberSince}
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Edit size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => handleQuickAction(action)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Health Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Summary</Text>
          <View style={styles.healthSummaryCard}>
            <View style={styles.summaryItem}>
              <FileText size={20} color="#2563eb" />
              <Text style={styles.summaryLabel}>Total Records</Text>
              <Text style={styles.summaryValue}>12</Text>
            </View>
            <View style={styles.summaryItem}>
              <Pill size={20} color="#10b981" />
              <Text style={styles.summaryLabel}>Active Medicines</Text>
              <Text style={styles.summaryValue}>3</Text>
            </View>
            <View style={styles.summaryItem}>
              <Clock size={20} color="#f59e0b" />
              <Text style={styles.summaryLabel}>Reminders Set</Text>
              <Text style={styles.summaryValue}>5</Text>
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.actionCard}>
            <TouchableOpacity style={styles.actionItem} onPress={handleExportData}>
              <View style={styles.actionLeft}>
                <Download size={20} color="#10b981" />
                <Text style={styles.actionLabel}>Export Health Data</Text>
              </View>
              <ChevronRight size={20} color="#6b7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionLeft}>
                <HelpCircle size={20} color="#2563eb" />
                <Text style={styles.actionLabel}>Help & Support</Text>
              </View>
              <ChevronRight size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Swasthio v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ in India</Text>
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <Modal
        visible={showSettingsModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowSettingsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Settings</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowSettingsModal(false)}
            >
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Notifications */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Notifications</Text>
              
              <View style={styles.settingCard}>
                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Bell size={20} color="#2563eb" />
                    <Text style={styles.settingLabel}>Medicine Reminders</Text>
                  </View>
                  <Switch
                    value={notifications.medicineReminders}
                    onValueChange={() => handleNotificationToggle('medicineReminders')}
                    trackColor={{ false: '#f3f4f6', true: '#dcfce7' }}
                    thumbColor={notifications.medicineReminders ? '#10b981' : '#d1d5db'}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Bell size={20} color="#f59e0b" />
                    <Text style={styles.settingLabel}>Appointment Alerts</Text>
                  </View>
                  <Switch
                    value={notifications.appointmentAlerts}
                    onValueChange={() => handleNotificationToggle('appointmentAlerts')}
                    trackColor={{ false: '#f3f4f6', true: '#dcfce7' }}
                    thumbColor={notifications.appointmentAlerts ? '#10b981' : '#d1d5db'}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Heart size={20} color="#10b981" />
                    <Text style={styles.settingLabel}>Daily Health Tips</Text>
                  </View>
                  <Switch
                    value={notifications.healthTips}
                    onValueChange={() => handleNotificationToggle('healthTips')}
                    trackColor={{ false: '#f3f4f6', true: '#dcfce7' }}
                    thumbColor={notifications.healthTips ? '#10b981' : '#d1d5db'}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Smartphone size={20} color="#8b5cf6" />
                    <Text style={styles.settingLabel}>Community Updates</Text>
                  </View>
                  <Switch
                    value={notifications.communityUpdates}
                    onValueChange={() => handleNotificationToggle('communityUpdates')}
                    trackColor={{ false: '#f3f4f6', true: '#dcfce7' }}
                    thumbColor={notifications.communityUpdates ? '#10b981' : '#d1d5db'}
                  />
                </View>
              </View>
            </View>

            {/* Privacy & Security */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Privacy & Security</Text>
              
              <View style={styles.settingCard}>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Eye size={20} color="#2563eb" />
                    <View>
                      <Text style={styles.settingLabel}>Profile Visibility</Text>
                      <Text style={styles.settingDescription}>Family members only</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#6b7280" />
                </TouchableOpacity>

                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Shield size={20} color="#10b981" />
                    <View>
                      <Text style={styles.settingLabel}>Health Data Sharing</Text>
                      <Text style={styles.settingDescription}>Share with research</Text>
                    </View>
                  </View>
                  <Switch
                    value={privacy.healthDataSharing}
                    onValueChange={() => handlePrivacyToggle('healthDataSharing')}
                    trackColor={{ false: '#f3f4f6', true: '#dcfce7' }}
                    thumbColor={privacy.healthDataSharing ? '#10b981' : '#d1d5db'}
                  />
                </View>

                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Lock size={20} color="#ef4444" />
                    <Text style={styles.settingLabel}>Change Password</Text>
                  </View>
                  <ChevronRight size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Language & Region */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Language & Region</Text>
              
              <View style={styles.settingCard}>
                <TouchableOpacity style={styles.settingItem} onPress={handleLanguageChange}>
                  <View style={styles.settingLeft}>
                    <Globe size={20} color="#2563eb" />
                    <View>
                      <Text style={styles.settingLabel}>Language</Text>
                      <Text style={styles.settingDescription}>
                        {languages.find(l => l.id === selectedLanguage)?.name || 'English'}
                      </Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Data Management */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Data Management</Text>
              
              <View style={styles.settingCard}>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <FileText size={20} color="#6b7280" />
                    <View>
                      <Text style={styles.settingLabel}>Storage Usage</Text>
                      <Text style={styles.settingDescription}>125 MB used</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Support */}
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Support</Text>
              
              <View style={styles.settingCard}>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <FileText size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>Terms of Service</Text>
                  </View>
                  <ChevronRight size={20} color="#6b7280" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Shield size={20} color="#6b7280" />
                    <Text style={styles.settingLabel}>Privacy Policy</Text>
                  </View>
                  <ChevronRight size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Danger Zone */}
            <View style={styles.modalSection}>
              <Text style={styles.dangerTitle}>Danger Zone</Text>
              
              <View style={styles.settingCard}>
                <TouchableOpacity style={styles.settingItem} onPress={handleDeleteAccount}>
                  <View style={styles.settingLeft}>
                    <Trash2 size={20} color="#ef4444" />
                    <View>
                      <Text style={[styles.settingLabel, { color: '#ef4444' }]}>Delete Account</Text>
                      <Text style={styles.settingDescription}>Permanently delete your account</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
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
  header: {
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
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    gap: 6,
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  profilePhone: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  profileMeta: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  editButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
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
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    textAlign: 'center',
  },
  healthSummaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    alignItems: 'center',
    gap: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  actionLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#fee2e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 4,
  },
  appInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  modalHeader: {
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
  modalTitle: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalSection: {
    marginTop: 24,
  },
  modalSectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  dangerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  settingDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
});

export default Profile;