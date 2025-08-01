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
  Heart, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Users,
  UserPlus
} from 'lucide-react-native';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    accountType: 'self' // 'self' or 'family'
  });

  const handleAuth = () => {
    if (isLogin) {
      // Simple validation for demo
      if (formData.email && formData.password) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Please fill in all fields');
      }
    } else {
      // Signup validation
      if (formData.name && formData.email && formData.password && formData.confirmPassword) {
        if (formData.password === formData.confirmPassword) {
          router.replace('/(tabs)');
        } else {
          Alert.alert('Error', 'Passwords do not match');
        }
      } else {
        Alert.alert('Error', 'Please fill in all required fields');
      }
    }
  };

  const handleGoogleSignIn = () => {
    // Simulate Google sign-in
    Alert.alert('Google Sign-In', 'Feature coming soon!');
  };

  const handleOTPSignIn = () => {
    // Simulate OTP sign-in
    Alert.alert('OTP Sign-In', 'Feature coming soon!');
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
          <Heart size={40} color="#2563eb" />
          <Text style={styles.logoText}>Swasthio</Text>
        </View>
        
        <Text style={styles.welcomeText}>
          {isLogin ? 'Welcome back!' : 'Join Swasthio today'}
        </Text>
        <Text style={styles.subtitleText}>
          {isLogin 
            ? 'Sign in to manage your health records' 
            : 'Create your digital health profile'
          }
        </Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        {/* Toggle between Login/Signup */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, isLogin && styles.activeToggle]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, !isLogin && styles.activeToggle]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        {!isLogin && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#9ca3af"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address *</Text>
          <View style={styles.inputWrapper}>
            <Mail size={20} color="#6b7280" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {!isLogin && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Phone size={20} color="#6b7280" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Enter your phone number"
                placeholderTextColor="#9ca3af"
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        )}

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

        {!isLogin && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password *</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#9ca3af"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
              secureTextEntry={true}
            />
          </View>
        )}

        {!isLogin && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Account Type</Text>
            <View style={styles.accountTypeContainer}>
              <TouchableOpacity 
                style={[
                  styles.accountTypeButton,
                  formData.accountType === 'self' && styles.activeAccountType
                ]}
                onPress={() => setFormData({...formData, accountType: 'self'})}
              >
                <UserPlus size={20} color={formData.accountType === 'self' ? '#ffffff' : '#6b7280'} />
                <Text style={[
                  styles.accountTypeText,
                  formData.accountType === 'self' && styles.activeAccountTypeText
                ]}>
                  For Myself
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.accountTypeButton,
                  formData.accountType === 'family' && styles.activeAccountType
                ]}
                onPress={() => setFormData({...formData, accountType: 'family'})}
              >
                <Users size={20} color={formData.accountType === 'family' ? '#ffffff' : '#6b7280'} />
                <Text style={[
                  styles.accountTypeText,
                  formData.accountType === 'family' && styles.activeAccountTypeText
                ]}>
                  For Family
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Main Auth Button */}
        <TouchableOpacity 
          style={styles.authButton}
          onPress={handleAuth}
        >
          <Text style={styles.authButtonText}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Alternative Sign-in Methods */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity 
          style={styles.socialButton}
          onPress={handleGoogleSignIn}
        >
          <Text style={styles.socialButtonText}>🔍 Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialButton}
          onPress={handleOTPSignIn}
        >
          <Phone size={20} color="#2563eb" />
          <Text style={styles.socialButtonText}>Sign in with OTP</Text>
        </TouchableOpacity>

        {/* Doctor Login */}
        <TouchableOpacity 
          style={styles.doctorButton}
          onPress={() => router.push('/doctor')}
        >
          <Text style={styles.doctorButtonText}>Doctor/Admin Login</Text>
        </TouchableOpacity>

        {/* Terms */}
        {!isLogin && (
          <Text style={styles.termsText}>
            By creating an account, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        )}
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
    paddingVertical: 12,
    alignItems: 'center',
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
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
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
  accountTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  accountTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  activeAccountType: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  accountTypeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeAccountTypeText: {
    color: '#ffffff',
  },
  authButton: {
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
  authButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginHorizontal: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  doctorButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 12,
  },
  doctorButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 20,
  },
  linkText: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});

export default AuthPage;