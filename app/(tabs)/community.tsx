import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  Heart,
  MessageSquare,
  User,
  Calendar,
  ThumbsUp,
  Shield,
  Filter,
  TrendingUp
} from 'lucide-react-native';

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics', icon: MessageCircle },
    { id: 'diabetes', name: 'Diabetes Care', icon: Heart },
    { id: 'pregnancy', name: 'Pregnancy', icon: User },
    { id: 'childcare', name: 'Child Care', icon: User },
    { id: 'elderly', name: 'Elderly Care', icon: User },
    { id: 'nutrition', name: 'Nutrition', icon: User },
    { id: 'exercise', name: 'Exercise', icon: TrendingUp },
  ];

  const posts = [
    {
      id: 1,
      title: 'Managing blood sugar during festivals',
      content: 'With Diwali approaching, I\'m worried about managing my diabetes. Any tips for enjoying sweets in moderation?',
      author: 'Priya K.',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'diabetes',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 8,
      isVerified: false,
      tags: ['diabetes', 'festivals', 'diet']
    },
    {
      id: 2,
      title: 'Exercise routine for seniors',
      content: 'I\'m 68 and looking to start a gentle exercise routine. What would be safe for someone with mild arthritis?',
      author: 'Dr. Rajesh M.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'elderly',
      timestamp: '4 hours ago',
      likes: 25,
      comments: 15,
      isVerified: true,
      tags: ['exercise', 'seniors', 'arthritis']
    },
    {
      id: 3,
      title: 'Postpartum nutrition tips',
      content: 'New mom here! What foods should I focus on while breastfeeding? Looking for Indian meal suggestions.',
      author: 'Anita S.',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'pregnancy',
      timestamp: '6 hours ago',
      likes: 18,
      comments: 12,
      isVerified: false,
      tags: ['pregnancy', 'nutrition', 'breastfeeding']
    },
    {
      id: 4,
      title: 'Home remedies for common cold in kids',
      content: 'My 5-year-old has a cold. Apart from doctor\'s medicine, what safe home remedies can help?',
      author: 'Meera J.',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'childcare',
      timestamp: '8 hours ago',
      likes: 8,
      comments: 6,
      isVerified: false,
      tags: ['children', 'cold', 'home-remedies']
    },
    {
      id: 5,
      title: 'Understanding HbA1c levels',
      content: 'Can someone explain what HbA1c levels mean in simple terms? My report shows 7.2% and I\'m confused.',
      author: 'Amit P.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'diabetes',
      timestamp: '1 day ago',
      likes: 35,
      comments: 22,
      isVerified: false,
      tags: ['diabetes', 'tests', 'hba1c']
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = () => {
    Alert.alert(
      'Create Post',
      'Share your health question or experience with the community.',
      [
        { text: 'Ask Question', onPress: () => Alert.alert('Create Question', 'Feature coming soon!') },
        { text: 'Share Experience', onPress: () => Alert.alert('Share Experience', 'Feature coming soon!') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleLikePost = (postId) => {
    Alert.alert('Liked!', 'Post has been liked.');
  };

  const handleCommentPost = (post) => {
    Alert.alert('Comments', `View comments for "${post.title}" - Feature coming soon!`);
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      'diabetes': '#ef4444',
      'pregnancy': '#f59e0b',
      'childcare': '#10b981',
      'elderly': '#8b5cf6',
      'nutrition': '#2563eb',
      'exercise': '#06b6d4',
    };
    return colors[categoryId] || '#6b7280';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
          <Plus size={20} color="#ffffff" />
          <Text style={styles.createButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search discussions..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.activeCategoryChip
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <category.icon 
              size={16} 
              color={selectedCategory === category.id ? '#ffffff' : '#6b7280'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.activeCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Posts */}
      <ScrollView style={styles.postsList} showsVerticalScrollIndicator={false}>
        <View style={styles.postsHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Discussions' : 
             categories.find(c => c.id === selectedCategory)?.name + ' Discussions'}
          </Text>
          <Text style={styles.postsCount}>
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {filteredPosts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.authorInfo}>
                <Image source={{ uri: post.avatar }} style={styles.authorAvatar} />
                <View style={styles.authorDetails}>
                  <View style={styles.authorNameContainer}>
                    <Text style={styles.authorName}>{post.author}</Text>
                    {post.isVerified && (
                      <Shield size={14} color="#10b981" />
                    )}
                  </View>
                  <Text style={styles.postTimestamp}>{post.timestamp}</Text>
                </View>
              </View>
              <View style={[
                styles.categoryBadge,
                { backgroundColor: `${getCategoryColor(post.category)}15` }
              ]}>
                <Text style={[
                  styles.categoryBadgeText,
                  { color: getCategoryColor(post.category) }
                ]}>
                  {categories.find(c => c.id === post.category)?.name}
                </Text>
              </View>
            </View>

            <View style={styles.postContent}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postText} numberOfLines={3}>
                {post.content}
              </Text>
              
              <View style={styles.postTags}>
                {post.tags.slice(0, 3).map((tag, index) => (
                  <View key={index} style={styles.tagChip}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLikePost(post.id)}
              >
                <ThumbsUp size={16} color="#6b7280" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleCommentPost(post)}
              >
                <MessageSquare size={16} color="#6b7280" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {filteredPosts.length === 0 && (
          <View style={styles.emptyState}>
            <MessageCircle size={48} color="#9ca3af" />
            <Text style={styles.emptyTitle}>No discussions found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or category'
                : 'Be the first to start a discussion!'
              }
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={handleCreatePost}>
              <Plus size={20} color="#ffffff" />
              <Text style={styles.emptyButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Community Guidelines */}
      <View style={styles.guidelinesContainer}>
        <Shield size={16} color="#10b981" />
        <Text style={styles.guidelinesText}>
          Community guidelines: Be respectful, share experiences, not medical advice. 
          All posts are moderated by verified healthcare professionals.
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
  createButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 14,
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
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
  },
  activeCategoryChip: {
    backgroundColor: '#2563eb',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  postsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  postsCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorDetails: {
    flex: 1,
  },
  authorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  postTimestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  postContent: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  postText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  postTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
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
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  guidelinesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f0fdf4',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  guidelinesText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#15803d',
    lineHeight: 16,
  },
});

export default Community;