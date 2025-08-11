import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { Pill, Upload, Camera, Brain, Clock, CircleAlert as AlertCircle, Info, Calendar, User, Plus, Bell } from 'lucide-react-native';

const Prescriptions = () => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const prescriptions = [
    {
      id: 1,
      title: 'Diabetes Management',
      doctor: 'Dr. Amit Sharma',
      hospital: 'Fortis Hospital',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/3683079/pexels-photo-3683079.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      medicines: [
        {
          name: 'Metformin',
          genericName: 'Metformin Hydrochloride',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '30 days',
          timing: 'After meals',
          instructions: 'Take with food to reduce stomach upset',
          sideEffects: ['Nausea', 'Diarrhea', 'Loss of appetite'],
          remindersSet: true
        },
        {
          name: 'Glimepiride',
          genericName: 'Glimepiride',
          dosage: '2mg',
          frequency: 'Once daily',
          duration: '30 days',
          timing: 'Before breakfast',
          instructions: 'Take on empty stomach, 30 minutes before first meal',
          sideEffects: ['Dizziness', 'Low blood sugar', 'Weight gain'],
          remindersSet: false
        }
      ],
      aiExplanation: 'This prescription helps manage Type 2 diabetes. Metformin helps your body use insulin better and reduces glucose production. Glimepiride helps your pancreas release more insulin. Both work together to control blood sugar levels.',
      status: 'active'
    },
    {
      id: 2,
      title: 'Blood Pressure Control',
      doctor: 'Dr. Priya Singh',
      hospital: 'Apollo Hospital',
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/3683042/pexels-photo-3683042.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      medicines: [
        {
          name: 'Amlodipine',
          genericName: 'Amlodipine Besylate',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '90 days',
          timing: 'Morning',
          instructions: 'Take at the same time each day',
          sideEffects: ['Swelling of feet', 'Dizziness', 'Fatigue'],
          remindersSet: true
        }
      ],
      aiExplanation: 'Amlodipine is a calcium channel blocker that helps relax blood vessels, making it easier for your heart to pump blood and reducing blood pressure.',
      status: 'active'
    },
    {
      id: 3,
      title: 'Vitamin Supplements',
      doctor: 'Dr. Rajesh Kumar',
      hospital: 'Max Healthcare',
      date: '2024-01-05',
      image: 'https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      medicines: [
        {
          name: 'Vitamin D3',
          genericName: 'Cholecalciferol',
          dosage: '60000 IU',
          frequency: 'Once weekly',
          duration: '12 weeks',
          timing: 'Any time',
          instructions: 'Take with milk or after meals for better absorption',
          sideEffects: ['Constipation', 'Kidney stones (rare)'],
          remindersSet: false
        }
      ],
      aiExplanation: 'Vitamin D3 helps your body absorb calcium and supports bone health. The weekly dose helps correct vitamin D deficiency.',
      status: 'completed'
    }
  ];

  const handleUploadPrescription = () => {
    Alert.alert(
      'Upload Prescription',
      'Choose how to add your prescription:',
      [
        { text: 'Take Photo', onPress: () => Alert.alert('Camera', 'Opening camera...') },
        { text: 'Upload from Gallery', onPress: () => Alert.alert('Gallery', 'Opening gallery...') },
        { text: 'Scan Document', onPress: () => Alert.alert('Scanner', 'Opening document scanner...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSetReminder = (prescription, medicine) => {
    Alert.alert(
      'Set Reminder',
      `Set medication reminder for ${medicine.name}?`,
      [
        { 
          text: 'Set Daily Reminder', 
          onPress: () => Alert.alert('Success', `Daily reminder set for ${medicine.name}`)
        },
        { 
          text: 'Custom Schedule', 
          onPress: () => Alert.alert('Custom Reminder', 'Feature coming soon!')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'completed': return '#6b7280';
      case 'expired': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  if (selectedPrescription) {
    const prescription = selectedPrescription;
    
    return (
      <View style={styles.container}>
        {/* Detail Header */}
        <View style={styles.detailHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedPrescription(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>Prescription Details</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.detailContent} showsVerticalScrollIndicator={false}>
          {/* Prescription Info */}
          <View style={styles.prescriptionInfoCard}>
            <Image source={{ uri: prescription.image }} style={styles.prescriptionImage} />
            <View style={styles.prescriptionMeta}>
              <Text style={styles.prescriptionTitle}>{prescription.title}</Text>
              <View style={styles.prescriptionDetails}>
                <View style={styles.detailRow}>
                  <User size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{prescription.doctor}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{prescription.date}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(prescription.status)}15` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(prescription.status) }]}>
                  {getStatusText(prescription.status)}
                </Text>
              </View>
            </View>
          </View>

          {/* AI Explanation */}
          <View style={styles.aiExplanationCard}>
            <View style={styles.aiHeader}>
              <Bot size={20} color="#8b5cf6" />
              <Text style={styles.aiTitle}>AI Explanation</Text>
            </View>
            <Text style={styles.aiText}>{prescription.aiExplanation}</Text>
            <TouchableOpacity 
              style={styles.aiChatButton}
              onPress={() => Alert.alert('AI Assistant', 'Ask me anything about your prescription!')}
            >
              <Bot size={16} color="#8b5cf6" />
              <Text style={styles.aiChatButtonText}>Ask AI about this prescription</Text>
            </TouchableOpacity>
          </View>

          {/* Medicines */}
          <View style={styles.medicinesSection}>
            <Text style={styles.sectionTitle}>Medicines ({prescription.medicines.length})</Text>
            
            {prescription.medicines.map((medicine, index) => (
              <View key={index} style={styles.medicineCard}>
                <View style={styles.medicineHeader}>
                  <View style={styles.medicineInfo}>
                    <Text style={styles.medicineName}>{medicine.name}</Text>
                    <Text style={styles.medicineGeneric}>{medicine.genericName}</Text>
                    <Text style={styles.medicineDosage}>{medicine.dosage} • {medicine.frequency}</Text>
                  </View>
                  <TouchableOpacity 
                    style={[
                      styles.reminderButton,
                      medicine.remindersSet ? styles.reminderActive : styles.reminderInactive
                    ]}
                    onPress={() => handleSetReminder(prescription, medicine)}
                  >
                    <Bell size={16} color={medicine.remindersSet ? '#ffffff' : '#6b7280'} />
                    <Text style={[
                      styles.reminderText,
                      { color: medicine.remindersSet ? '#ffffff' : '#6b7280' }
                    ]}>
                      {medicine.remindersSet ? 'Set' : 'Set Reminder'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.medicineDetails}>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Duration:</Text>
                    <Text style={styles.detailValue}>{medicine.duration}</Text>
                  </View>
                  
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Timing:</Text>
                    <Text style={styles.detailValue}>{medicine.timing}</Text>
                  </View>
                  
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Instructions:</Text>
                    <Text style={styles.detailValue}>{medicine.instructions}</Text>
                  </View>
                </View>

                {/* Side Effects */}
                <View style={styles.sideEffectsContainer}>
                  <View style={styles.sideEffectsHeader}>
                    <AlertCircle size={16} color="#f59e0b" />
                    <Text style={styles.sideEffectsTitle}>Common Side Effects</Text>
                  </View>
                  <View style={styles.sideEffectsList}>
                    {medicine.sideEffects.map((effect, idx) => (
                      <View key={idx} style={styles.sideEffectTag}>
                        <Text style={styles.sideEffectText}>{effect}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.sideEffectsNote}>
                    These are common side effects. Contact your doctor if you experience severe symptoms.
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prescriptions</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPrescription}>
          <Plus size={20} color="#ffffff" />
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* Upload Options */}
      <View style={styles.uploadOptions}>
        <TouchableOpacity style={styles.uploadOption} onPress={handleUploadPrescription}>
          <Camera size={24} color="#2563eb" />
          <Text style={styles.uploadOptionText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadOption} onPress={handleUploadPrescription}>
          <Upload size={24} color="#2563eb" />
          <Text style={styles.uploadOptionText}>Upload File</Text>
        </TouchableOpacity>
      </View>

      {/* Prescriptions List */}
      <ScrollView style={styles.prescriptionsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Prescriptions</Text>
        
        {prescriptions.map((prescription) => (
          <TouchableOpacity
            key={prescription.id}
            style={styles.prescriptionCard}
            onPress={() => setSelectedPrescription(prescription)}
          >
            <Image source={{ uri: prescription.image }} style={styles.cardImage} />
            
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{prescription.title}</Text>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: `${getStatusColor(prescription.status)}15` }
                ]}>
                  <Text style={[styles.statusText, { color: getStatusColor(prescription.status) }]}>
                    {getStatusText(prescription.status)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.cardMeta}>
                <View style={styles.metaRow}>
                  <User size={14} color="#6b7280" />
                  <Text style={styles.metaText}>{prescription.doctor}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Calendar size={14} color="#6b7280" />
                  <Text style={styles.metaText}>{prescription.date}</Text>
                </View>
              </View>

              <View style={styles.medicineCount}>
                <Pill size={16} color="#10b981" />
                <Text style={styles.medicineCountText}>
                  {prescription.medicines.length} medicine{prescription.medicines.length !== 1 ? 's' : ''}
                </Text>
              </View>

              {/* AI Summary Preview */}
              <View style={styles.aiPreview}>
                <Bot size={14} color="#8b5cf6" />
                <Text style={styles.aiPreviewText} numberOfLines={2}>
                  {prescription.aiExplanation}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Info size={20} color="#2563eb" />
        <Text style={styles.infoBannerText}>
          AI explanations are for educational purposes. Always consult your doctor for medical advice.
        </Text>
      </View>
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
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  uploadButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  uploadOptions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    gap: 12,
  },
  uploadOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  uploadOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  prescriptionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginVertical: 16,
  },
  prescriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  cardMeta: {
    gap: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  medicineCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  medicineCountText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10b981',
  },
  aiPreview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  aiPreviewText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#dbeafe',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1d4ed8',
    lineHeight: 20,
  },
  // Detail View Styles
  detailHeader: {
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
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  detailTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  placeholder: {
    width: 32,
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  prescriptionInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  prescriptionImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  prescriptionMeta: {
    gap: 12,
  },
  prescriptionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  prescriptionDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  aiExplanationCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8b5cf6',
  },
  aiText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    lineHeight: 22,
    marginBottom: 12,
  },
  aiChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  aiChatButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#8b5cf6',
  },
  medicinesSection: {
    marginBottom: 20,
  },
  medicineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medicineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  medicineInfo: {
    flex: 1,
    gap: 4,
  },
  medicineName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  medicineGeneric: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  medicineDosage: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  reminderActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  reminderInactive: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  reminderText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  medicineDetails: {
    gap: 12,
    marginBottom: 16,
  },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    width: 80,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    textAlign: 'right',
  },
  sideEffectsContainer: {
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  sideEffectsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  sideEffectsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
  },
  sideEffectsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  sideEffectTag: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sideEffectText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#92400e',
  },
  sideEffectsNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#92400e',
    fontStyle: 'italic',
  },
});

export default Prescriptions;