import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const CommunityEducationPage = () => {
  const [storyText, setStoryText] = useState('');
  const [showLegalGuideModal, setShowLegalGuideModal] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/DashboardPage');
    }
  };

  const handleExplore = () => {
    setShowLegalGuideModal(true);
  };

  const handleSurvivorStory = (survivorId: string) => {
    const stories = {
      'survivor1': {
        title: 'Finding Strength in Community',
        author: 'Survivor1',
        story: 'When I first found Guardian, I felt alone and scared. Sharing my experiences here helped me realize I wasn\'t the only one going through this. The community support gave me the courage to seek help and rebuild my life. Today, I\'m helping others find their voice too.',
        rating: 5,
        date: 'March 15, 2025'
      },
      'survivor2': {
        title: 'The Power of Being Heard',
        author: 'Survivor2',
        story: 'For years, I stayed silent about what I was experiencing. This platform gave me a safe space to document my experiences and connect with others who understood. The legal resources and educational content helped me understand my rights and take action.',
        rating: 5,
        date: 'March 10, 2025'
      }
    };
    
    const story = stories[survivorId as keyof typeof stories];
    if (story) {
      setSelectedStory(story);
      setShowStoryModal(true);
    }
  };

  const handleDiscussionTopic = (topic: string) => {
    const topics = {
      'trauma': 'Healing from Trauma',
      'abuse': 'Recognizing Abuse Patterns',
      'support': 'Building Support Networks'
    };
    
    setSelectedTopic(topics[topic as keyof typeof topics] || topic);
    setShowDiscussionModal(true);
  };

  const handleResourceArticle = (article: string) => {
    const articles = {
      'legal-rights': {
        title: 'Understanding Your Legal Rights',
        content: 'As a survivor, you have specific legal protections and rights...'
      },
      'safety-planning': {
        title: 'Creating a Safety Plan',
        content: 'A safety plan is a personalized, practical plan to improve your safety...'
      },
      'documentation': {
        title: 'Documenting Evidence',
        content: 'Proper documentation can be crucial for legal proceedings...'
      }
    };
    
    const articleData = articles[article as keyof typeof articles];
    if (articleData) {
      Alert.alert(articleData.title, articleData.content);
    }
  };

  const handleViewAllResources = () => {
    Alert.alert(
      'Educational Resources',
      'Explore our comprehensive library of articles, guides, and resources to help you understand your rights, create safety plans, and connect with support services.',
      [
        { text: 'Browse Legal Guides', onPress: () => handleExplore() },
        { text: 'Safety Resources', onPress: () => router.push('/SupportServicesPage') },
        { text: 'Close', style: 'cancel' }
      ]
    );
  };

  const handleSubmitStory = () => {
    if (storyText.trim()) {
      Alert.alert(
        'Share Your Story',
        'Your story can help others in similar situations. All stories are shared anonymously and reviewed before publication.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Submit', 
            onPress: () => {
              setStoryText('');
              Alert.alert('Thank You', 'Your story has been submitted for review. It will help others in the community.');
            }
          }
        ]
      );
    } else {
      Alert.alert('Empty Story', 'Please write your story before submitting.');
    }
  };

  const handleHome = () => {
    router.push('/DashboardPage');
  };

  const handleEmergency = () => {
    router.push('/EmergencyPage');
  };

  const handleSettings = () => {
    router.push('/SettingsPage');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon 
        key={index} 
        name="star" 
        size={12} 
        color={index < rating ? "#FCD34D" : "#E5E7EB"} 
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Icon name="security" size={20} color="#333" />
          <Text style={styles.headerText}>Guardian Community & Education</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Legal Rights Interactive Guide */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Legal Rights Interactive Guide</Text>
                <Text style={styles.sectionSubtitle}>Know your legal options</Text>
              </View>
              <TouchableOpacity style={styles.exploreButton} onPress={handleExplore}>
                <Text style={styles.exploreButtonText}>Explore</Text>
                <Icon name="chevron-right" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.legalRightsCard}>
              <Text style={styles.cardTitle}>What Are Your Legal Rights?</Text>
              <View style={styles.tagContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Legal</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Rights</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Learn about the laws protecting survivors of abuse.
              </Text>
              <Text style={styles.expertLabel}>Legal Expert</Text>
            </View>
          </View>

          {/* Survivors' Stories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Survivors' Stories</Text>
            
            <View style={styles.storiesContainer}>
              <TouchableOpacity 
                style={styles.storyCard} 
                onPress={() => handleSurvivorStory('survivor1')}
              >
                <View style={styles.storyHeader}>
                  <Text style={styles.storyLabel}>Survivor1</Text>
                  <View style={styles.starsContainer}>
                    {renderStars(5)}
                  </View>
                </View>
                <Text style={styles.storyText}>
                  Sharing my journey has been empowering.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.storyCard} 
                onPress={() => handleSurvivorStory('survivor2')}
              >
                <View style={styles.storyHeader}>
                  <Text style={styles.storyLabel}>Survivor2</Text>
                  <View style={styles.starsContainer}>
                    {renderStars(5)}
                  </View>
                </View>
                <Text style={styles.storyText}>
                  The community support here is incredible.
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Discussion Topics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Discussion Topics</Text>
            
            <View style={styles.topicsContainer}>
              <TouchableOpacity 
                style={styles.topicCard} 
                onPress={() => handleDiscussionTopic('trauma')}
              >
                <Icon name="chat-bubble-outline" size={20} color="#666" />
                <Text style={styles.topicText}>Trauma...</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.topicCard} 
                onPress={() => handleDiscussionTopic('abuse')}
              >
                <Icon name="favorite" size={20} color="#EF4444" />
                <Text style={styles.topicText}>Recognizing Abuse...</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.topicCard} 
                onPress={() => handleDiscussionTopic('support')}
              >
                <Icon name="support" size={20} color="#F59E0B" />
                <Text style={styles.topicText}>Support...</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Resource Articles */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resource Articles</Text>
            
            <View style={styles.articlesContainer}>
              <TouchableOpacity 
                style={styles.articleCard} 
                onPress={() => handleResourceArticle('trauma')}
              >
                <View style={styles.articleIcon}>
                  <Icon name="article" size={20} color="#8B5CF6" />
                </View>
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>Understanding Trauma Recovery</Text>
                  <Text style={styles.articleSubtitle}>Tips for healing</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.articleCard} 
                onPress={() => handleResourceArticle('red-flags')}
              >
                <View style={styles.articleIcon}>
                  <Icon name="search" size={20} color="#8B5CF6" />
                </View>
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>Recognizing Red Flags</Text>
                  <Text style={styles.articleSubtitle}>Signs of abuse</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recommended Resources */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Recommended Resources</Text>
                <Text style={styles.sectionSubtitle}>Explore helpful tools</Text>
              </View>
              <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllResources}>
                <Text style={styles.viewAllButtonText}>View All</Text>
                <Icon name="chevron-right" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.resourcesContainer}>
              <View style={styles.resourceCard}>
                <View style={styles.resourceImagePlaceholder}>
                  <Text style={styles.imagePlaceholder}>Image</Text>
                </View>
                <Text style={styles.resourceCategory}>Therapy Apps</Text>
                <Text style={styles.resourceTitle}>Find mental health support...</Text>
                <Text style={styles.recommendedLabel}>Recommended</Text>
              </View>

              <View style={styles.resourceCard}>
                <View style={styles.resourceImagePlaceholder}>
                  <Text style={styles.imagePlaceholder}>Image</Text>
                </View>
                <Text style={styles.resourceCategory}>Self-Care Books</Text>
                <Text style={styles.resourceTitle}>Books for personal growth...</Text>
                <Text style={styles.recommendedLabel}>Recommended</Text>
              </View>
            </View>
          </View>

          {/* Community Stories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Community Stories</Text>
            
            <View style={styles.communityStoryCard}>
              <View style={styles.storyUserInfo}>
                <Text style={styles.storyUser}>User1</Text>
                <Text style={styles.storyTime}>2 hours ago • SafeHaven Community</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <Icon name="more-horiz" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.storyImagePlaceholder}>
                <Text style={styles.imagePlaceholder}>Image</Text>
              </View>
              
              <Text style={styles.storyContent}>
                I found strength in sharing my story with others.
              </Text>
              <Text style={styles.storyCategory}>Inspiration</Text>
              
              <TouchableOpacity style={styles.likeButton}>
                <Icon name="favorite" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Share Your Story */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Share Your Story</Text>
            
            <TextInput
              style={styles.storyInput}
              placeholder="Write your experience here"
              value={storyText}
              onChangeText={setStoryText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitStory}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusContent}>
          <View style={styles.statusLeft}>
            <View style={styles.safeIndicator} />
            <View>
              <Text style={styles.statusTitle}>Safe</Text>
              <Text style={styles.statusSubtitle}>Risk Level: Low</Text>
            </View>
          </View>
          <View style={styles.statusIcons}>
            <Icon name="mic" size={20} color="#fff" />
            <Icon name="location-on" size={20} color="#fff" style={{ marginLeft: 8 }} />
            <Icon name="directions-walk" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={handleHome}>
          <Icon name="home" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleEmergency}>
          <View style={styles.emergencyIconContainer}>
            <Icon name="warning" size={24} color="#666" />
          </View>
          <Text style={styles.navText}>Emergency</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={handleSettings}>
          <Icon name="settings" size={24} color="#666" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Legal Guide Modal */}
      <Modal
        visible={showLegalGuideModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowLegalGuideModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowLegalGuideModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Legal Rights Guide</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.guideSection}>
              <Text style={styles.guideTitle}>Your Legal Rights as a Survivor</Text>
              <Text style={styles.guideText}>
                Understanding your legal rights is crucial for your safety and recovery. Here are key rights you should know:
              </Text>
            </View>

            <View style={styles.rightItem}>
              <Icon name="gavel" size={24} color="#8B5CF6" />
              <View style={styles.rightContent}>
                <Text style={styles.rightTitle}>Right to Protection</Text>
                <Text style={styles.rightDescription}>
                  You have the right to seek protection orders and restraining orders against your abuser.
                </Text>
              </View>
            </View>

            <View style={styles.rightItem}>
              <Icon name="security" size={24} color="#8B5CF6" />
              <View style={styles.rightContent}>
                <Text style={styles.rightTitle}>Right to Safety</Text>
                <Text style={styles.rightDescription}>
                  You have the right to live free from violence and to seek help from law enforcement.
                </Text>
              </View>
            </View>

            <View style={styles.rightItem}>
              <Icon name="account-balance" size={24} color="#8B5CF6" />
              <View style={styles.rightContent}>
                <Text style={styles.rightTitle}>Right to Legal Representation</Text>
                <Text style={styles.rightDescription}>
                  You have the right to legal counsel and may be eligible for free legal aid services.
                </Text>
              </View>
            </View>

            <View style={styles.rightItem}>
              <Icon name="visibility-off" size={24} color="#8B5CF6" />
              <View style={styles.rightContent}>
                <Text style={styles.rightTitle}>Right to Privacy</Text>
                <Text style={styles.rightDescription}>
                  Your personal information and case details have privacy protections under the law.
                </Text>
              </View>
            </View>

            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => router.push('/SupportServicesPage')}
              >
                <Icon name="phone" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Contact Legal Aid</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Discussion Topic Modal */}
      <Modal
        visible={showDiscussionModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDiscussionModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowDiscussionModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedTopic}</Text>
            <TouchableOpacity>
              <Icon name="share" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.discussionHeader}>
              <Text style={styles.discussionTitle}>Community Discussion</Text>
              <Text style={styles.discussionSubtitle}>
                Share experiences, ask questions, and support each other in a safe space.
              </Text>
            </View>

            <View style={styles.discussionPost}>
              <View style={styles.postHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>A</Text>
                </View>
                <View style={styles.postInfo}>
                  <Text style={styles.username}>Anonymous User</Text>
                  <Text style={styles.postTime}>2 hours ago</Text>
                </View>
              </View>
              <Text style={styles.postContent}>
                This topic is so important. Learning to recognize the patterns helped me understand that what I was experiencing wasn't normal. The community here has been incredibly supportive.
              </Text>
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.postAction}>
                  <Icon name="thumb-up" size={16} color="#8B5CF6" />
                  <Text style={styles.postActionText}>12</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Icon name="comment" size={16} color="#6B7280" />
                  <Text style={styles.postActionText}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.discussionPost}>
              <View style={styles.postHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>S</Text>
                </View>
                <View style={styles.postInfo}>
                  <Text style={styles.username}>Survivor</Text>
                  <Text style={styles.postTime}>5 hours ago</Text>
                </View>
              </View>
              <Text style={styles.postContent}>
                Thank you for creating this space. It's comforting to know we're not alone. The educational resources have been life-changing for me.
              </Text>
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.postAction}>
                  <Icon name="thumb-up" size={16} color="#8B5CF6" />
                  <Text style={styles.postActionText}>18</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Icon name="comment" size={16} color="#6B7280" />
                  <Text style={styles.postActionText}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.joinDiscussion}>
              <Text style={styles.joinTitle}>Join the Conversation</Text>
              <TextInput
                style={styles.discussionInput}
                placeholder="Share your thoughts, experiences, or questions..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.submitDiscussion}>
                <Text style={styles.submitDiscussionText}>Post Anonymously</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Story Modal */}
      <Modal
        visible={showStoryModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowStoryModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowStoryModal(false)}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Survivor Story</Text>
            <TouchableOpacity>
              <Icon name="share" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          
          {selectedStory && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.storyModalHeader}>
                <Text style={styles.storyModalTitle}>{selectedStory.title}</Text>
                <View style={styles.storyMeta}>
                  <Text style={styles.storyAuthor}>By {selectedStory.author}</Text>
                  <Text style={styles.storyDate}>{selectedStory.date}</Text>
                </View>
                <View style={styles.storyRating}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon 
                      key={index} 
                      name="star" 
                      size={16} 
                      color={index < selectedStory.rating ? "#FCD34D" : "#E5E7EB"} 
                    />
                  ))}
                </View>
              </View>
              
              <View style={styles.storyModalContent}>
                <Text style={styles.storyModalText}>{selectedStory.story}</Text>
              </View>
              
              <View style={styles.storyActions}>
                <TouchableOpacity style={styles.supportButton}>
                  <Icon name="favorite" size={20} color="#EF4444" />
                  <Text style={styles.supportButtonText}>Send Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareStoryButton}>
                  <Icon name="share" size={20} color="#8B5CF6" />
                  <Text style={styles.shareStoryButtonText}>Share Story</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 25,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  exploreButtonText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  legalRightsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  expertLabel: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  storiesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  storyCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  storyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  topicsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  topicCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  articlesContainer: {
    gap: 12,
  },
  articleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  articleSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  resourcesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  resourceCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceImagePlaceholder: {
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  imagePlaceholder: {
    fontSize: 14,
    color: '#666',
  },
  resourceCategory: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 4,
  },
  resourceTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 8,
  },
  recommendedLabel: {
    fontSize: 12,
    color: '#666',
  },
  communityStoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyUserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storyUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  storyTime: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    marginLeft: 8,
  },
  moreButton: {
    padding: 4,
  },
  storyImagePlaceholder: {
    height: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  storyContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  storyCategory: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 8,
  },
  likeButton: {
    alignSelf: 'flex-start',
    padding: 4,
  },
  storyInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBar: {
    backgroundColor: '#9F7AEA',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginRight: 12,
  },
  statusTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusSubtitle: {
    color: '#E9D5FF',
    fontSize: 12,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  emergencyIconContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Legal Guide Modal Styles
  guideSection: {
    paddingVertical: 20,
  },
  guideTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  guideText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginVertical: 8,
  },
  rightContent: {
    marginLeft: 12,
    flex: 1,
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  rightDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
  },
  actionSection: {
    paddingVertical: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  // Discussion Modal Styles
  discussionHeader: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  discussionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  discussionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
  },
  discussionPost: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  postInfo: {
    marginLeft: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  postTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postActionText: {
    fontSize: 12,
    color: '#6B7280',
  },
  joinDiscussion: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  joinTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  discussionInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 80,
    marginBottom: 12,
  },
  submitDiscussion: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitDiscussionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  // Story Modal Styles
  storyModalHeader: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  storyModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storyAuthor: {
    fontSize: 14,
    color: '#6B7280',
  },
  storyDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  storyRating: {
    flexDirection: 'row',
    gap: 2,
  },
  storyModalContent: {
    paddingVertical: 20,
  },
  storyModalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  storyActions: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 20,
  },
  supportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  shareStoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  shareStoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CommunityEducationPage;
