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
import { Users, Plus, User, Calendar, Activity, FileText, Clock, Heart, CreditCard as Edit, MoveVertical as MoreVertical } from 'lucide-react-native';

const FamilyManagement = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const familyMembers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      relation: 'Self',
      age: 32,
      bloodGroup: 'B+',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@email.com',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      healthScore: 85,
      recordsCount: 12,
      medicinesCount: 3,
      appointmentsCount: 2,
      lastVisit: '2024-01-15',
      conditions: ['Type 2 Diabetes', 'Hypertension'],
      emergencyContact: 'Priya Sharma',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      relation: 'Spouse',
      age: 29,
      bloodGroup: 'A+',
      phone: '+91 98765 43211',
      email: 'priya.sharma@email.com',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      healthScore: 92,
      recordsCount: 8,
      medicinesCount: 1,
      appointmentsCount: 1,
      lastVisit: '2024-01-12',
      conditions: ['Migraine'],
      emergencyContact: 'Rahul Sharma',
    },
    {
      id: 3,
      name: 'Arjun Sharma',
      relation: 'Son',
      age: 8,
      bloodGroup: 'B+',
      phone: 'Same as parent',
      email: 'Not applicable',
      avatar: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      healthScore: 98,
      recordsCount: 15,
      medicinesCount: 0,
      appointmentsCount: 1,
      lastVisit: '2024-01-08',
      conditions: ['Allergic Rhinitis'],
      emergencyContact: 'Rahul Sharma',
    },
    {
      id: 4,
      name: 'Sunita Sharma',
      relation: 'Mother',
      age: 65,
      bloodGroup: 'O+',
      phone: '+91 98765 43212',
      email: 'sunita.sharma@email.com',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      healthScore: 78,
      recordsCount: 25,
      medicinesCount: 6,
      appointmentsCount: 3,
      lastVisit: '2024-01-10',
      conditions: ['Arthritis', 'High Blood Pressure', 'Osteoporosis'],
      emergencyContact: 'Rahul Sharma',
    },
  ];

  const handleAddMember = () => {
    Alert.alert(
      'Add Family Member',
      'How would you like to add a family member?',
      [
        { 
          text: 'Create New Profile', 
          onPress: () => Alert.alert('Create Profile', 'Creating new profile:\n\n1. Enter basic details\n2. Set relationship\n3. Add health information\n4. Set permissions\n5. Generate access code\n\nProfile will be created and linked to your account.') 
        },
        { 
          text: 'Send Invitation', 
          onPress: () => Alert.alert('Send Invite', 'Sending invitation:\n\n1. Enter their phone/email\n2. They receive invitation link\n3. They create their profile\n4. Accept family connection\n5. Set shared permissions\n\nInvitation sent successfully!') 
        },
        { 
          text: 'Scan QR Code', 
          onPress: () => Alert.alert('QR Scanner', 'Opening QR code scanner to connect with existing Swasthio user...') 
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleMemberAction = (member, action) => {
    switch (action) {
      case 'view':
        setSelectedMember(member);
        break;
      case 'edit':
        Alert.alert('Edit Profile', `Editing ${member.name}'s profile:\n\n• Update personal information\n• Modify health conditions\n• Change emergency contacts\n• Update permissions\n• Add/remove access\n\nChanges will be synced across all devices.`);
        break;
      case 'records':
        Alert.alert('Health Records', `${member.name}'s Records:\n\n• ${member.recordsCount} total records\n• Last updated: ${member.lastVisit}\n• Recent: Blood test, X-ray\n• Shared with: 2 doctors\n\nTap to view detailed records.`);
        break;
      case 'appointments':
        Alert.alert('Appointments', `${member.name}'s Appointments:\n\n• Next: Dr. Sharma - Tomorrow 10 AM\n• Upcoming: Dental checkup - Next week\n• Past: 12 completed visits\n\nTap to schedule new appointment.`);
        break;
      default:
        break;
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getRelationIcon = (relation) => {
    switch (relation.toLowerCase()) {
      case 'self': return '👤';
      case 'spouse': return '💑';
      case 'son': case 'daughter': return '👶';
      case 'mother': case 'father': return '👨‍👩‍👧‍👦';
      default: return '👥';
    }
  };

  if (selectedMember) {
    return (
      <View style={styles.container}>
        {/* Member Detail Header */}
        <View style={styles.detailHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedMember(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleMemberAction(selectedMember, 'edit')}
          >
            <Edit size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailContent} showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <Image source={{ uri: selectedMember.avatar }} style={styles.profileAvatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{selectedMember.name}</Text>
              <Text style={styles.profileRelation}>
                {getRelationIcon(selectedMember.relation)} {selectedMember.relation}
              </Text>
              <View style={styles.profileMeta}>
                <Text style={styles.profileAge}>Age: {selectedMember.age}</Text>
                <Text style={styles.profileBloodGroup}>Blood: {selectedMember.bloodGroup}</Text>
              </View>
            </View>
            <View style={[styles.healthScoreBadge, { backgroundColor: `${getHealthScoreColor(selectedMember.healthScore)}15` }]}>
              <Text style={[styles.healthScoreText, { color: getHealthScoreColor(selectedMember.healthScore) }]}>
                {selectedMember.healthScore}
              </Text>
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{selectedMember.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{selectedMember.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Emergency Contact:</Text>
                <Text style={styles.infoValue}>{selectedMember.emergencyContact}</Text>
              </View>
            </View>
          </View>

          {/* Health Overview */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Health Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <FileText size={24} color="#2563eb" />
                <Text style={styles.statNumber}>{selectedMember.recordsCount}</Text>
                <Text style={styles.statLabel}>Records</Text>
              </View>
              <View style={styles.statCard}>
                <Clock size={24} color="#10b981" />
                <Text style={styles.statNumber}>{selectedMember.medicinesCount}</Text>
                <Text style={styles.statLabel}>Medicines</Text>
              </View>
              <View style={styles.statCard}>
                <Calendar size={24} color="#f59e0b" />
                <Text style={styles.statNumber}>{selectedMember.appointmentsCount}</Text>
                <Text style={styles.statLabel}>Appointments</Text>
              </View>
            </View>
          </View>

          {/* Medical Conditions */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Medical Conditions</Text>
            <View style={styles.infoCard}>
              {selectedMember.conditions.length > 0 ? (
                selectedMember.conditions.map((condition, index) => (
                  <View key={index} style={styles.conditionTag}>
                    <Text style={styles.conditionText}>{condition}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noConditions}>No known medical conditions</Text>
              )}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleMemberAction(selectedMember, 'records')}
              >
                <FileText size={20} color="#2563eb" />
                <Text style={styles.actionButtonText}>View Records</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleMemberAction(selectedMember, 'appointments')}
              >
                <Calendar size={20} color="#10b981" />
                <Text style={styles.actionButtonText}>Appointments</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Family Health</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
          <Plus size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Member</Text>
        </TouchableOpacity>
      </View>

      {/* Family Overview */}
      <View style={styles.overviewCard}>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Users size={24} color="#2563eb" />
            <Text style={styles.overviewNumber}>{familyMembers.length}</Text>
            <Text style={styles.overviewLabel}>Family Members</Text>
          </View>
          <View style={styles.overviewStat}>
            <Heart size={24} color="#10b981" />
            <Text style={styles.overviewNumber}>
              {Math.round(familyMembers.reduce((sum, member) => sum + member.healthScore, 0) / familyMembers.length)}
            </Text>
            <Text style={styles.overviewLabel}>Avg Health Score</Text>
          </View>
          <View style={styles.overviewStat}>
            <Activity size={24} color="#f59e0b" />
            <Text style={styles.overviewNumber}>
              {familyMembers.reduce((sum, member) => sum + member.appointmentsCount, 0)}
            </Text>
            <Text style={styles.overviewLabel}>Upcoming Visits</Text>
          </View>
        </View>
      </View>

      {/* Family Members List */}
      <ScrollView style={styles.membersList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Family Members</Text>
        
        {familyMembers.map((member) => (
          <TouchableOpacity
            key={member.id}
            style={styles.memberCard}
            onPress={() => handleMemberAction(member, 'view')}
          >
            <View style={styles.memberLeft}>
              <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRelation}>
                  {getRelationIcon(member.relation)} {member.relation} • Age {member.age}
                </Text>
                <Text style={styles.memberLastVisit}>Last visit: {member.lastVisit}</Text>
              </View>
            </View>
            
            <View style={styles.memberRight}>
              <View style={[
                styles.healthScoreBadge, 
                { backgroundColor: `${getHealthScoreColor(member.healthScore)}15` }
              ]}>
                <Text style={[
                  styles.healthScoreText, 
                  { color: getHealthScoreColor(member.healthScore) }
                ]}>
                  {member.healthScore}
                </Text>
              </View>
              
              <View style={styles.memberStats}>
                <View style={styles.memberStat}>
                  <FileText size={14} color="#6b7280" />
                  <Text style={styles.memberStatText}>{member.recordsCount}</Text>
                </View>
                <View style={styles.memberStat}>
                  <Clock size={14} color="#6b7280" />
                  <Text style={styles.memberStatText}>{member.medicinesCount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Family Health Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Family Health Tip</Text>
        <Text style={styles.tipsText}>
          Regular family health check-ups help catch issues early. Schedule annual visits for all family members.
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
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  overviewCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewStat: {
    alignItems: 'center',
    gap: 8,
  },
  overviewNumber: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  overviewLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  membersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  memberCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  memberInfo: {
    flex: 1,
    gap: 4,
  },
  memberName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  memberRelation: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  memberLastVisit: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  memberRight: {
    alignItems: 'center',
    gap: 8,
  },
  healthScoreBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  healthScoreText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  memberStats: {
    flexDirection: 'row',
    gap: 12,
  },
  memberStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  tipsContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  tipsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 24,
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
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  editButton: {
    padding: 8,
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
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
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  profileInfo: {
    flex: 1,
    gap: 6,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  profileRelation: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  profileMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  profileAge: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  profileBloodGroup: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    flex: 1,
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  conditionTag: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  conditionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#92400e',
  },
  noConditions: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
});

export default FamilyManagement;