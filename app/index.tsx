import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Animated, 
  Dimensions,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  Heart, 
  Shield, 
  Users, 
  Brain, 
  FileText, 
  Clock,
  Star,
  ChevronRight,
  Smartphone,
  UserCheck,
  Activity
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const LandingPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for medical icons
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const features = [
    { icon: Brain, title: 'Smart AI Assistant', desc: 'Get personalized health insights' },
    { icon: FileText, title: 'Digital Records', desc: 'Secure, organized health data' },
    { icon: Users, title: 'Family Profiles', desc: 'Manage entire family health' },
    { icon: Clock, title: 'Smart Reminders', desc: 'Never miss medications' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', text: 'Swasthio made managing my diabetes so much easier!', rating: 5 },
    { name: 'Dr. Rajesh Kumar', text: 'Perfect tool for patient record management.', rating: 5 },
    { name: 'Amit Patel', text: 'My elderly parents love how simple it is to use.', rating: 5 },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#dbeafe', '#ffffff']}
        style={styles.heroSection}
      >
        <Animated.View 
          style={[
            styles.heroContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Heart size={48} color="#2563eb" />
            </Animated.View>
            <Text style={styles.logoText}>Swasthio</Text>
          </View>
          
          <Text style={styles.tagline}>
            India's First User-Centric Digital Health Record
          </Text>
          
          <Text style={styles.subtitle}>
            Secure, simple, and smart healthcare management for you and your family
          </Text>

          <View style={styles.ctaContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.push('/auth')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <ChevronRight size={20} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/auth')}
            >
              <Text style={styles.secondaryButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.demoButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.demoButtonText}>View Demo</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose Swasthio?</Text>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Animated.View 
              key={index}
              style={[
                styles.featureCard,
                {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: Animated.add(slideAnim, new Animated.Value(index * 20))
                  }]
                }
              ]}
            >
              <View style={styles.featureIcon}>
                <feature.icon size={32} color="#2563eb" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How Swasthio Works</Text>
        
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <UserCheck size={24} color="#10b981" />
              <Text style={styles.stepTitle}>Sign Up & Create Profile</Text>
              <Text style={styles.stepDesc}>Quick registration for you and family members</Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <FileText size={24} color="#10b981" />
              <Text style={styles.stepTitle}>Upload Health Records</Text>
              <Text style={styles.stepDesc}>Securely store all medical documents</Text>
            </View>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Activity size={24} color="#10b981" />
              <Text style={styles.stepTitle}>Get AI Insights</Text>
              <Text style={styles.stepDesc}>Receive personalized health recommendations</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Testimonials */}
      <View style={styles.testimonialsSection}>
        <Text style={styles.sectionTitle}>What Our Users Say</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {testimonials.map((testimonial, index) => (
            <View key={index} style={styles.testimonialCard}>
              <View style={styles.stars}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} color="#fbbf24" fill="#fbbf24" />
                ))}
              </View>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              <Text style={styles.testimonialName}>- {testimonial.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Go Digital with Confidence</Text>
        
        <View style={styles.benefitsList}>
          <View style={styles.benefit}>
            <Shield size={20} color="#10b981" />
            <Text style={styles.benefitText}>Bank-level security for your health data</Text>
          </View>
          <View style={styles.benefit}>
            <Smartphone size={20} color="#10b981" />
            <Text style={styles.benefitText}>Access records anywhere, anytime</Text>
          </View>
          <View style={styles.benefit}>
            <Users size={20} color="#10b981" />
            <Text style={styles.benefitText}>Manage entire family's health in one place</Text>
          </View>
          <View style={styles.benefit}>
            <Brain size={20} color="#10b981" />
            <Text style={styles.benefitText}>AI-powered health insights and tips</Text>
          </View>
        </View>
      </View>

      {/* Final CTA */}
      <View style={styles.finalCtaSection}>
        <LinearGradient
          colors={['#2563eb', '#1d4ed8']}
          style={styles.finalCtaCard}
        >
          <Text style={styles.finalCtaTitle}>Start Your Health Journey Today</Text>
          <Text style={styles.finalCtaSubtitle}>
            Join thousands of Indians taking control of their health
          </Text>
          <TouchableOpacity 
            style={styles.finalCtaButton}
            onPress={() => router.push('/auth')}
          >
            <Text style={styles.finalCtaButtonText}>Get Started Free</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
    marginLeft: 12,
  },
  tagline: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  demoButton: {
    paddingVertical: 8,
  },
  demoButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textDecorationLine: 'underline',
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    width: (width - 56) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  howItWorksSection: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  stepsContainer: {
    gap: 24,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  stepNumber: {
    backgroundColor: '#2563eb',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  stepContent: {
    flex: 1,
    gap: 8,
  },
  stepTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  stepDesc: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
  },
  testimonialsSection: {
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  testimonialCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    lineHeight: 24,
    marginBottom: 12,
  },
  testimonialName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
  },
  benefitsSection: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  benefitsList: {
    gap: 16,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    flex: 1,
  },
  finalCtaSection: {
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  finalCtaCard: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
  },
  finalCtaTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  finalCtaSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#dbeafe',
    textAlign: 'center',
    marginBottom: 24,
  },
  finalCtaButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  finalCtaButtonText: {
    color: '#2563eb',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
});

export default LandingPage;