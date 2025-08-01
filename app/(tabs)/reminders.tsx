import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import { Clock, Plus, Pill, Droplets, Activity, Bell, CreditCard as Edit, Trash2, CircleCheck as CheckCircle, Calendar, Repeat } from 'lucide-react-native';

const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Metformin',
      type: 'medicine',
      time: '08:00 AM',
      frequency: 'Daily',
      isActive: true,
      nextDue: '2024-01-16 08:00',
      description: '500mg tablet after breakfast',
      daysLeft: 25,
      completedToday: false
    },
    {
      id: 2,
      title: 'Blood Pressure Check',
      type: 'health',
      time: '09:00 AM',
      frequency: 'Daily',
      isActive: true,
      nextDue: '2024-01-16 09:00',
      description: 'Monitor blood pressure',
      completedToday: true
    },
    {
      id: 3,
      title: 'Drink Water',
      type: 'wellness',
      time: 'Every 2 hours',
      frequency: 'Multiple',
      isActive: true,
      nextDue: '2024-01-16 10:00',
      description: 'Stay hydrated - 8 glasses daily',
      completedToday: false
    },
    {
      id: 4,
      title: 'Glimepiride',
      type: 'medicine',
      time: '07:30 AM',
      frequency: 'Daily',
      isActive: false,
      nextDue: '2024-01-16 07:30',
      description: '2mg tablet before breakfast',
      daysLeft: 28,
      completedToday: false
    },
    {
      id: 5,
      title: 'Evening Walk',
      type: 'wellness',
      time: '06:00 PM',
      frequency: 'Daily',
      isActive: true,
      nextDue: '2024-01-16 18:00',
      description: '30 minutes brisk walk',
      completedToday: false
    },
    {
      id: 6,
      title: 'Vitamin D3',
      type: 'medicine',
      time: '10:00 AM',
      frequency: 'Weekly',
      isActive: true,
      nextDue: '2024-01-21 10:00',
      description: '60000 IU capsule with milk',
      daysLeft: 84,
      completedToday: false
    }
  ]);

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, isActive: !reminder.isActive }
        : reminder
    ));
  };

  const markCompleted = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completedToday: !reminder.completedToday }
        : reminder
    ));
  };

  const handleAddReminder = () => {
    Alert.alert(
      'Add Reminder',
      'Choose reminder type:',
      [
        { text: 'Medicine', onPress: () => Alert.alert('Medicine Reminder', 'Feature coming soon!') },
        { text: 'Health Check', onPress: () => Alert.alert('Health Reminder', 'Feature coming soon!') },
        { text: 'Wellness Activity', onPress: () => Alert.alert('Wellness Reminder', 'Feature coming soon!') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleEditReminder = (reminder) => {
    Alert.alert('Edit Reminder', `Edit ${reminder.title} - Feature coming soon!`);
  };

  const handleDeleteReminder = (id) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setReminders(reminders.filter(r => r.id !== id))
        }
      ]
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'medicine': return <Pill size={20} color="#2563eb" />;
      case 'health': return <Activity size={20} color="#ef4444" />;
      case 'wellness': return <Droplets size={20} color="#10b981" />;
      default: return <Clock size={20} color="#6b7280" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'medicine': return '#2563eb';
      case 'health': return '#ef4444';
      case 'wellness': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getTypeBackground = (type) => {
    switch (type) {
      case 'medicine': return '#dbeafe';
      case 'health': return '#fee2e2';
      case 'wellness': return '#dcfce7';
      default: return '#f3f4f6';
    }
  };

  const activeReminders = reminders.filter(r => r.isActive);
  const completedToday = reminders.filter(r => r.completedToday).length;
  const pendingToday = reminders.filter(r => r.isActive && !r.completedToday).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reminders</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
          <Plus size={20} color="#ffffff" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <CheckCircle size={24} color="#10b981" />
          <Text style={styles.statNumber}>{completedToday}</Text>
          <Text style={styles.statLabel}>Completed Today</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color="#f59e0b" />
          <Text style={styles.statNumber}>{pendingToday}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Bell size={24} color="#2563eb" />
          <Text style={styles.statNumber}>{activeReminders.length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>

      {/* Reminders List */}
      <ScrollView style={styles.remindersList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Reminders</Text>
        
        {reminders.map((reminder) => (
          <View key={reminder.id} style={[
            styles.reminderCard,
            !reminder.isActive && styles.inactiveCard,
            reminder.completedToday && styles.completedCard
          ]}>
            <View style={styles.reminderContent}>
              <View style={styles.reminderLeft}>
                <TouchableOpacity 
                  style={[
                    styles.completionButton,
                    reminder.completedToday && styles.completionButtonActive
                  ]}
                  onPress={() => markCompleted(reminder.id)}
                  disabled={!reminder.isActive}
                >
                  <CheckCircle 
                    size={20} 
                    color={reminder.completedToday ? '#10b981' : '#d1d5db'} 
                  />
                </TouchableOpacity>
                
                <View style={[styles.typeIcon, { backgroundColor: getTypeBackground(reminder.type) }]}>
                  {getTypeIcon(reminder.type)}
                </View>
                
                <View style={styles.reminderInfo}>
                  <Text style={[
                    styles.reminderTitle,
                    !reminder.isActive && styles.inactiveText,
                    reminder.completedToday && styles.completedText
                  ]}>
                    {reminder.title}
                  </Text>
                  <Text style={styles.reminderDescription}>
                    {reminder.description}
                  </Text>
                  <View style={styles.reminderMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#6b7280" />
                      <Text style={styles.metaText}>{reminder.time}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Repeat size={14} color="#6b7280" />
                      <Text style={styles.metaText}>{reminder.frequency}</Text>
                    </View>
                    {reminder.daysLeft && (
                      <View style={styles.metaItem}>
                        <Calendar size={14} color="#6b7280" />
                        <Text style={styles.metaText}>{reminder.daysLeft} days left</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.reminderActions}>
                <Switch
                  value={reminder.isActive}
                  onValueChange={() => toggleReminder(reminder.id)}
                  trackColor={{ false: '#f3f4f6', true: '#dcfce7' }}
                  thumbColor={reminder.isActive ? '#10b981' : '#d1d5db'}
                />
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleEditReminder(reminder)}
                  >
                    <Edit size={16} color="#6b7280" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleDeleteReminder(reminder.id)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {reminder.isActive && !reminder.completedToday && (
              <View style={styles.nextDueContainer}>
                <Text style={styles.nextDueText}>
                  Next due: {new Date(reminder.nextDue).toLocaleString()}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Quick Add Suggestions */}
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>💡 Quick Add</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.suggestionChip} onPress={handleAddReminder}>
            <Pill size={16} color="#2563eb" />
            <Text style={styles.suggestionText}>Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionChip} onPress={handleAddReminder}>
            <Droplets size={16} color="#10b981" />
            <Text style={styles.suggestionText}>Water</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionChip} onPress={handleAddReminder}>
            <Activity size={16} color="#f59e0b" />
            <Text style={styles.suggestionText}>Exercise</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionChip} onPress={handleAddReminder}>
            <Clock size={16} color="#ef4444" />
            <Text style={styles.suggestionText}>Check-up</Text>
          </TouchableOpacity>
        </ScrollView>
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
  addButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  remindersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginVertical: 16,
  },
  reminderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inactiveCard: {
    opacity: 0.6,
  },
  completedCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  reminderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  completionButton: {
    padding: 4,
  },
  completionButtonActive: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
  },
  typeIcon: {
    padding: 8,
    borderRadius: 8,
  },
  reminderInfo: {
    flex: 1,
    gap: 6,
  },
  reminderTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  inactiveText: {
    color: '#9ca3af',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  reminderDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  reminderMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  reminderActions: {
    alignItems: 'center',
    gap: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f9fafb',
  },
  nextDueContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  nextDueText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#f59e0b',
    textAlign: 'center',
  },
  suggestionsContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  suggestionsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
});

export default Reminders;