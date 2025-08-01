import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert,
  Image
} from 'react-native';
import { User, Bell, Shield, Globe, Smartphone, Heart, FileText, LogOut, ChevronRight, CreditCard as Edit, Eye, EyeOff, Lock, Download, Trash2, CircleHelp as HelpCircle } from 'lucide-react-native';
import { router } from 'expo-router';

const Settings = () => {
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
    healthScore: 85,
  };

  const languages = [
    { id: 'english', name: 'English', flag: '🇺🇸' },
    { id: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { id: 'marathi', name: 'मराठी', flag: '🇮🇳' },
    { id: 'gujarati', name: 'ગુજરાતી', flag: '🇮🇳' },
    { id: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { id: 'bengali', name: 'বাংলা', flag: '🇮🇳' },
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <View style={styles.profileCard}>
          <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
            <Text style={styles.profileMeta}>
              Member since {userProfile.memberSince} • Health Score: {userProfile.healthScore}
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Edit size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language & Region</Text>
        
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <View style={styles.settingCard}>
          <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
            <View style={styles.settingLeft}>
              <Download size={20} color="#10b981" />
              <View>
                <Text style={styles.settingLabel}>Export Health Data</Text>
                <Text style={styles.settingDescription}>Download all your records</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <View style={styles.settingCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color="#2563eb" />
              <Text style={styles.settingLabel}>Help Center</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

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
      <View style={styles.section}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  dangerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
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
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  profileMeta: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  settingCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 12,
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
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  appInfoText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
});

export default Settings;