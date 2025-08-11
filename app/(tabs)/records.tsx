import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Calendar,
  Hospital,
  User,
  Download,
  Share,
  Eye,
  Brain,
  Plus,
  Bot
} from 'lucide-react-native';

const HealthRecords = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Records' },
    { id: 'blood-test', label: 'Blood Tests' },
    { id: 'imaging', label: 'Imaging' },
    { id: 'prescription', label: 'Prescriptions' },
    { id: 'consultation', label: 'Consultations' },
  ];

  const records = [
    {
      id: 1,
      title: 'Complete Blood Count',
      type: 'blood-test',
      date: '2024-01-15',
      hospital: 'Apollo Hospital',
      doctor: 'Dr. Priya Singh',
      status: 'reviewed',
      aiSummary: 'Your blood count levels are within normal range. Hemoglobin is slightly low, consider iron-rich foods.',
    },
    {
      id: 2,
      title: 'Chest X-Ray',
      type: 'imaging',
      date: '2024-01-10',
      hospital: 'Max Healthcare',
      doctor: 'Dr. Rajesh Kumar',
      status: 'new',
      aiSummary: 'Chest X-ray shows clear lungs with no abnormalities detected.',
    },
    {
      id: 3,
      title: 'Diabetes Consultation',
      type: 'consultation',
      date: '2024-01-08',
      hospital: 'Fortis Hospital',
      doctor: 'Dr. Amit Sharma',
      status: 'reviewed',
      aiSummary: 'Blood sugar levels are well controlled. Continue current medication regimen.',
    },
    {
      id: 4,
      title: 'Lipid Profile',
      type: 'blood-test',
      date: '2024-01-05',
      hospital: 'Apollo Hospital',
      doctor: 'Dr. Priya Singh',
      status: 'reviewed',
      aiSummary: 'Cholesterol levels are elevated. Consider dietary changes and regular exercise.',
    },
    {
      id: 5,
      title: 'Prescription - Diabetes',
      type: 'prescription',
      date: '2024-01-15',
      hospital: 'Fortis Hospital',
      doctor: 'Dr. Amit Sharma',
      status: 'new',
      aiSummary: 'New prescription includes Metformin 500mg twice daily and Glimepiride 2mg once daily for diabetes management.',
    },
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || record.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleUpload = () => {
    Alert.alert('Upload Record', 'Feature coming soon! You can upload PDFs, images, or text files.');
  };

  const handleViewRecord = (record) => {
    Alert.alert('AI Analysis', `Our AI has analyzed this record:\n\n${record.aiSummary}\n\nWould you like to ask the AI assistant for more details?`, [
      { text: 'Ask AI', onPress: () => Alert.alert('AI Assistant', 'Opening AI chat for detailed analysis...') },
      { text: 'View Record', onPress: () => Alert.alert('Record', 'Opening full record view...') },
      { text: 'Close', style: 'cancel' }
    ]);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'blood-test': return '#ef4444';
      case 'imaging': return '#2563eb';
      case 'prescription': return '#10b981';
      case 'consultation': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'blood-test': return <FileText size={16} color="#ffffff" />;
      case 'imaging': return <Eye size={16} color="#ffffff" />;
      case 'prescription': return <FileText size={16} color="#ffffff" />;
      case 'consultation': return <User size={16} color="#ffffff" />;
      default: return <FileText size={16} color="#ffffff" />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Records</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Plus size={20} color="#ffffff" />
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search records, doctors, hospitals..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.activeFilterChip
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.activeFilterText
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Records List */}
      <ScrollView style={styles.recordsList} showsVerticalScrollIndicator={false}>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <TouchableOpacity
              key={record.id}
              style={styles.recordCard}
              onPress={() => handleViewRecord(record)}
            >
              <View style={styles.recordHeader}>
                <View style={styles.recordLeft}>
                  <View style={[styles.typeIcon, { backgroundColor: getTypeColor(record.type) }]}>
                    {getTypeIcon(record.type)}
                  </View>
                  <View style={styles.recordInfo}>
                    <Text style={styles.recordTitle}>{record.title}</Text>
                    <View style={styles.recordMeta}>
                      <Calendar size={14} color="#6b7280" />
                      <Text style={styles.recordDate}>{record.date}</Text>
                    </View>
                    <View style={styles.recordMeta}>
                      <Hospital size={14} color="#6b7280" />
                      <Text style={styles.recordHospital}>{record.hospital}</Text>
                    </View>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  record.status === 'new' ? styles.newStatus : styles.reviewedStatus
                ]}>
                  <Text style={[
                    styles.statusText,
                    record.status === 'new' ? styles.newStatusText : styles.reviewedStatusText
                  ]}>
                    {record.status === 'new' ? 'New' : 'Reviewed'}
                  </Text>
                </View>
              </View>

              {/* AI Summary */}
              <View style={styles.aiSummaryContainer}>
                <View style={styles.aiSummaryHeader}>
                  <Bot size={16} color="#8b5cf6" />
                  <Text style={styles.aiSummaryTitle}>AI Summary</Text>
                </View>
                <Text style={styles.aiSummaryText} numberOfLines={2}>
                  {record.aiSummary}
                </Text>
              </View>

              {/* Actions */}
              <View style={styles.recordActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleViewRecord(record)}
                >
                  <Bot size={16} color="#8b5cf6" />
                  <Text style={styles.actionText}>AI Analysis</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => Alert.alert('Download', 'Downloading file...')}
                >
                  <Download size={16} color="#2563eb" />
                  <Text style={styles.actionText}>Download</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => Alert.alert('Share', 'Sharing options...')}
                >
                  <Share size={16} color="#2563eb" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <FileText size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No Records Found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Upload your first health record to get started'
              }
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={handleUpload}>
              <Upload size={20} color="#ffffff" />
              <Text style={styles.emptyButtonText}>Upload Record</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{records.length}</Text>
          <Text style={styles.summaryLabel}>Total Records</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {records.filter(r => r.status === 'new').length}
          </Text>
          <Text style={styles.summaryLabel}>New Reports</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {records.filter(r => r.type === 'blood-test').length}
          </Text>
          <Text style={styles.summaryLabel}>Lab Tests</Text>
        </View>
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
  uploadButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  activeFilterChip: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  recordsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recordCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  typeIcon: {
    padding: 10,
    borderRadius: 8,
  },
  recordInfo: {
    flex: 1,
    gap: 6,
  },
  recordTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  recordMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recordDate: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  recordHospital: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  newStatus: {
    backgroundColor: '#dbeafe',
  },
  reviewedStatus: {
    backgroundColor: '#dcfce7',
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  newStatusText: {
    color: '#2563eb',
  },
  reviewedStatusText: {
    color: '#10b981',
  },
  aiSummaryContainer: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#8b5cf6',
  },
  aiSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  aiSummaryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8b5cf6',
  },
  aiSummaryText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    lineHeight: 24,
  },
  recordActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  summaryNumber: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default HealthRecords;