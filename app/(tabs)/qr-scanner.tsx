import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Modal,
  Image
} from 'react-native';
import { QrCode, Camera, Upload, X, Shield, Phone, User, Heart, TriangleAlert as AlertTriangle } from 'lucide-react-native';

const QRScanner = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEmergencyQR, setShowEmergencyQR] = useState(false);

  const userEmergencyData = {
    name: 'Rahul Sharma',
    age: 32,
    bloodGroup: 'B+',
    emergencyContact: '+91 98765 43210',
    medicalConditions: ['Type 2 Diabetes', 'Hypertension'],
    allergies: ['Penicillin'],
    currentMedications: ['Metformin 500mg', 'Amlodipine 5mg'],
    doctorContact: 'Dr. Amit Sharma - +91 98765 43211'
  };

  const handleShowEmergencyQR = () => {
    setShowOptions(false);
    setShowEmergencyQR(true);
  };

  const handleScanReport = () => {
    setShowOptions(false);
    Alert.alert('Scan Report', 'Opening camera to scan medical report...');
  };

  const handleUploadReport = () => {
    setShowOptions(false);
    Alert.alert('Upload Report', 'Opening gallery to upload report...');
  };

  const generateQRData = () => {
    return JSON.stringify({
      type: 'emergency_medical_info',
      data: userEmergencyData,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QR Scanner</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.qrIconContainer}>
          <TouchableOpacity 
            style={styles.qrButton}
            onPress={() => setShowOptions(true)}
          >
            <QrCode size={80} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.qrButtonText}>Tap to access QR options</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>QR Code Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Shield size={20} color="#10b981" />
              <Text style={styles.featureText}>Emergency medical information</Text>
            </View>
            <View style={styles.featureItem}>
              <Camera size={20} color="#2563eb" />
              <Text style={styles.featureText}>Scan medical reports</Text>
            </View>
            <View style={styles.featureItem}>
              <Upload size={20} color="#f59e0b" />
              <Text style={styles.featureText}>Upload documents quickly</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Options Modal */}
      <Modal
        visible={showOptions}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>QR Options</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowOptions(false)}
            >
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.optionCard}
              onPress={handleShowEmergencyQR}
            >
              <View style={styles.optionIcon}>
                <Shield size={32} color="#ef4444" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Emergency QR</Text>
                <Text style={styles.optionDescription}>
                  Show your medical information for emergencies
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionCard}
              onPress={handleScanReport}
            >
              <View style={styles.optionIcon}>
                <Camera size={32} color="#2563eb" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Scan Report</Text>
                <Text style={styles.optionDescription}>
                  Use camera to scan medical documents
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionCard}
              onPress={handleUploadReport}
            >
              <View style={styles.optionIcon}>
                <Upload size={32} color="#10b981" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Upload Report</Text>
                <Text style={styles.optionDescription}>
                  Select files from your device
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Emergency QR Modal */}
      <Modal
        visible={showEmergencyQR}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowEmergencyQR(false)}
      >
        <View style={styles.emergencyContainer}>
          <View style={styles.emergencyHeader}>
            <View style={styles.emergencyTitle}>
              <AlertTriangle size={24} color="#ef4444" />
              <Text style={styles.emergencyTitleText}>EMERGENCY QR CODE</Text>
            </View>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowEmergencyQR(false)}
            >
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.qrContainer}>
            <View style={styles.qrCodePlaceholder}>
              <QrCode size={200} color="#1f2937" />
              <Text style={styles.qrCodeText}>QR Code would appear here</Text>
            </View>
          </View>

          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyInfoTitle}>Medical Information</Text>
            <View style={styles.emergencyDetails}>
              <View style={styles.emergencyRow}>
                <User size={16} color="#6b7280" />
                <Text style={styles.emergencyLabel}>Name:</Text>
                <Text style={styles.emergencyValue}>{userEmergencyData.name}</Text>
              </View>
              <View style={styles.emergencyRow}>
                <Heart size={16} color="#ef4444" />
                <Text style={styles.emergencyLabel}>Blood Group:</Text>
                <Text style={styles.emergencyValue}>{userEmergencyData.bloodGroup}</Text>
              </View>
              <View style={styles.emergencyRow}>
                <Phone size={16} color="#10b981" />
                <Text style={styles.emergencyLabel}>Emergency Contact:</Text>
                <Text style={styles.emergencyValue}>{userEmergencyData.emergencyContact}</Text>
              </View>
            </View>
          </View>

          <View style={styles.emergencyWarning}>
            <AlertTriangle size={16} color="#f59e0b" />
            <Text style={styles.emergencyWarningText}>
              This QR code contains your medical information for emergency use only
            </Text>
          </View>
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
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrIconContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  qrButton: {
    backgroundColor: '#ffffff',
    padding: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  qrButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    textAlign: 'center',
  },
  infoSection: {
    width: '100%',
  },
  infoTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    flex: 1,
  },
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
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  optionsContainer: {
    padding: 20,
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
  },
  emergencyContainer: {
    flex: 1,
    backgroundColor: '#ef4444',
  },
  emergencyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emergencyTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emergencyTitleText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  qrContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  qrCodePlaceholder: {
    backgroundColor: '#ffffff',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    gap: 16,
  },
  qrCodeText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  emergencyInfo: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  emergencyInfoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  emergencyDetails: {
    gap: 12,
  },
  emergencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emergencyLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    width: 120,
  },
  emergencyValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    flex: 1,
  },
  emergencyWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fef3c7',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  emergencyWarningText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400e',
    flex: 1,
    lineHeight: 20,
  },
});

export default QRScanner;