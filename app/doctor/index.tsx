import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  Stethoscope, 
  ArrowLeft, 
  Mail, 
  Eye, 
  EyeOff,
  Shield,
  User,
  Building
} from 'lucide-react-native';

const DoctorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState('doctor'); // 'doctor' or 'admin'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hospitalId: '',
  });

  const handleLogin = () => {
    if (formData.email && formData.password) {
      if (loginType === 'admin' && !formData.hospitalId) {
        Alert.alert('Error', 'Hospital ID is required for admin login');
        return;
      }
      
      Alert.alert(
        'Login Successful', 
        `Welcome ${loginType === 'doctor' ? 'Doctor' : 'Admin'}!`,
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#dbeafe', '#ffffff']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2563eb" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Stethoscope size={40} color="#2563eb" />
          <Text style={styles.logoText}>Swasthio</Text>
        </View>
        
        <Text style={styles.welcomeText}>
          {loginType === 'doctor' ? 'Doctor Portal' : 'Admin Portal'}
        </Text>
        <Text style={styles.subtitleText}>
          {loginType === 'doctor' 
            ? 'Access patient records and manage prescriptions' 
            : 'Manage hospital operations and staff'
          }
        </Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        {/* Login Type Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, loginType === 'doctor' && styles.activeToggle]}
            onPress={() => setLoginType('doctor')}
          >
            <Stethoscope size={20} color={loginType === 'doctor' ? '#ffffff' : '#6b7280'} />
            <Text style={[styles.toggleText, loginType === 'doctor' && styles.activeToggleText]}>
              Doctor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, loginType === 'admin' && styles.activeToggle]}
            onPress={() => setLoginType('admin')}
          >
            <Shield size={20} color={loginType === 'admin' ? '#ffffff' : '#6b7280'} />
            <Text style={[styles.toggleText, loginType === 'admin' && styles.activeToggleText]}>
              Admin
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address *</Text>
          <View style={styles.inputWrapper}>
            <Mail size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder={`Enter your ${loginType} email`}
              placeholderTextColor="#9ca3af"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Hospital ID for Admin */}
        {loginType === 'admin' && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Hospital ID *</Text>
            <View style={styles.inputWrapper}>
              <Building size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Enter hospital ID"
                placeholderTextColor="#9ca3af"
                value={formData.hospitalId}
                onChangeText={(text) => setFormData({...formData, hospitalId: text})}
                autoCapitalize="characters"
              />
            </View>
          </View>
        )}

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password *</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputWithIconRight}
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 
                <EyeOff size={20} color="#6b7280" /> : 
                <Eye size={20} color="#6b7280" />
              }
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>
            {loginType === 'doctor' ? 'Login as Doctor' : 'Login as Admin'}
          </Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Features for Doctors/Admins */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>
            {loginType === 'doctor' ? 'Doctor Features' : 'Admin Features'}
          </Text>
          
          {loginType === 'doctor' ? (
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Upload prescriptions directly to patient profiles</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Review and analyze patient health records</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>AI-powered patient history summaries</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Secure messaging with patients</Text>
              </View>
            </View>
          ) : (
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Manage hospital staff and doctors</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Monitor patient data and analytics</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Configure hospital-wide settings</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>Access administrative reports</Text>
              </View>
            </View>
          )}
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Shield size={20} color="#10b981" />
          <Text style={styles.securityText}>
            Your login is secured with bank-level encryption. All patient data is protected according to healthcare privacy regulations.
          </Text>
        </View>

        {/* Support */}
        <View style={styles.supportContainer}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Contact IT Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>View User Guide</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
    marginLeft: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    padding: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#2563eb',
  },
  toggleText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeToggleText: {
    color: '#ffffff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWithIcon: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingLeft: 48,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    flex: 1,
  },
  inputWithIconRight: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 48,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    flex: 1,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  loginButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  forgotButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  forgotButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  featuresContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureBullet: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    lineHeight: 20,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#15803d',
    lineHeight: 20,
  },
  supportContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  supportButton: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  supportButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});

export default DoctorLogin;