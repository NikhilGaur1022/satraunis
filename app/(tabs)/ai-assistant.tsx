import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { 
  Bot, 
  Send, 
  Heart, 
  Activity,
  Droplets,
  Moon,
  Sun,
  Utensils,
  MessageCircle
} from 'lucide-react-native';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Health Assistant. I can help you with wellness tips, healthy habits, and general health guidance. How can I assist you today?",
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const quickPrompts = [
    { 
      icon: Droplets, 
      text: "How much water should I drink daily?", 
      color: "#2563eb",
      response: "Based on general guidelines, you should aim for 8-10 glasses (about 2-2.5 liters) of water daily. However, this can vary based on your activity level, climate, and overall health. Since you have diabetes, staying well-hydrated is especially important for blood sugar management."
    },
    { 
      icon: Activity, 
      text: "What exercises are good for diabetes?", 
      color: "#10b981",
      response: "For diabetes management, I recommend a combination of aerobic exercises and strength training:\n\n• 30 minutes of brisk walking daily\n• Swimming or cycling 3-4 times a week\n• Light weight training twice a week\n• Yoga for stress management\n\nAlways check your blood sugar before and after exercise, and consult your doctor before starting any new routine."
    },
    { 
      icon: Utensils, 
      text: "Healthy meal suggestions for today", 
      color: "#f59e0b",
      response: "Here are diabetes-friendly meal suggestions for today:\n\n**Breakfast:**\n• Oats with almonds and berries\n• Green tea\n\n**Lunch:**\n• Grilled chicken with quinoa\n• Mixed vegetable salad\n• Buttermilk\n\n**Dinner:**\n• Fish curry with brown rice\n• Steamed vegetables\n• Small portion of yogurt\n\n**Snacks:**\n• Handful of nuts\n• Apple slices with peanut butter\n\nRemember to monitor portion sizes and check blood sugar levels regularly."
    },
    { 
      icon: Moon, 
      text: "Tips for better sleep", 
      color: "#8b5cf6",
      response: "Good sleep is crucial for managing diabetes and overall health. Here are some tips:\n\n• Maintain a consistent sleep schedule\n• Keep your bedroom cool and dark\n• Avoid caffeine 6 hours before bedtime\n• Try relaxation techniques like deep breathing\n• Limit screen time before bed\n• Consider a light walk after dinner\n\nPoor sleep can affect blood sugar levels, so aim for 7-9 hours of quality sleep each night."
    }
  ];

  const healthTips = [
    "Take a 5-minute walk after every meal to help with digestion and blood sugar control.",
    "Practice deep breathing for 2 minutes when you feel stressed - it can help lower blood pressure.",
    "Keep a water bottle nearby as a visual reminder to stay hydrated throughout the day.",
    "Set up your exercise clothes the night before to make morning workouts easier.",
    "Add more colorful vegetables to your plate - aim for at least 3 different colors per meal."
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(text.trim());
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userText) => {
    const lowerText = userText.toLowerCase();
    
    // Check for quick prompt responses
    const quickPrompt = quickPrompts.find(prompt => 
      lowerText.includes(prompt.text.toLowerCase().substring(0, 10))
    );
    if (quickPrompt) return quickPrompt.response;

    // General responses based on keywords
    if (lowerText.includes('water') || lowerText.includes('hydration')) {
      return "Staying hydrated is essential! Aim for 8-10 glasses of water daily. You can also include herbal teas and water-rich fruits like watermelon and cucumber. Monitor your urine color - pale yellow indicates good hydration.";
    }
    
    if (lowerText.includes('exercise') || lowerText.includes('workout')) {
      return "Regular exercise is great for your health! Based on your health profile, I recommend starting with 15-20 minutes of walking daily and gradually increasing. Always consult your doctor before starting new exercises, especially with your current medications.";
    }
    
    if (lowerText.includes('diet') || lowerText.includes('food') || lowerText.includes('eat')) {
      return "A balanced diet is key to managing your health. Focus on whole grains, lean proteins, vegetables, and healthy fats. Given your diabetes, monitor carbohydrate intake and consider smaller, frequent meals to maintain steady blood sugar levels.";
    }
    
    if (lowerText.includes('stress') || lowerText.includes('anxiety')) {
      return "Managing stress is important for overall health. Try deep breathing exercises, meditation, or gentle yoga. Even a 5-minute break can help. If stress persists, consider talking to a healthcare professional.";
    }
    
    if (lowerText.includes('sleep') || lowerText.includes('tired')) {
      return "Quality sleep is crucial for health and blood sugar management. Aim for 7-9 hours nightly. Create a bedtime routine, keep your room cool and dark, and avoid screens before bed. If sleep issues persist, consult your doctor.";
    }
    
    if (lowerText.includes('medication') || lowerText.includes('medicine')) {
      return "I can't provide specific medical advice about medications. Please consult your doctor or pharmacist for any questions about your prescriptions. I can help you set up reminders to take medications on time though!";
    }

    // Default response
    return "I understand you're asking about your health. While I can provide general wellness tips, for specific medical concerns, please consult your healthcare provider. Is there a particular wellness topic I can help you with today?";
  };

  const handleQuickPrompt = (prompt) => {
    handleSendMessage(prompt.text);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.botAvatar}>
            <Bot size={24} color="#ffffff" />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Health Assistant</Text>
            <Text style={styles.headerSubtitle}>Here to help with wellness tips</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View 
            key={message.id}
            style={[
              styles.messageContainer,
              message.isBot ? styles.botMessageContainer : styles.userMessageContainer
            ]}
          >
            {message.isBot && (
              <View style={styles.botAvatarSmall}>
                <Bot size={16} color="#ffffff" />
              </View>
            )}
            <View style={[
              styles.messageBubble,
              message.isBot ? styles.botBubble : styles.userBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isBot ? styles.botMessageText : styles.userMessageText
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.messageTime,
                message.isBot ? styles.botMessageTime : styles.userMessageTime
              ]}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessageContainer]}>
            <View style={styles.botAvatarSmall}>
              <Bot size={16} color="#ffffff" />
            </View>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <Text style={styles.typingText}>AI is typing...</Text>
            </View>
          </View>
        )}

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <View style={styles.quickPromptsSection}>
            <Text style={styles.quickPromptsTitle}>Try asking me about:</Text>
            {quickPrompts.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickPromptCard}
                onPress={() => handleQuickPrompt(prompt)}
              >
                <View style={[styles.promptIcon, { backgroundColor: `${prompt.color}15` }]}>
                  <prompt.icon size={20} color={prompt.color} />
                </View>
                <Text style={styles.quickPromptText}>{prompt.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Health Tips */}
        <View style={styles.healthTipsSection}>
          <Text style={styles.healthTipsTitle}>💡 Daily Health Tips</Text>
          {healthTips.slice(0, 2).map((tip, index) => (
            <View key={index} style={styles.healthTipCard}>
              <Heart size={16} color="#10b981" />
              <Text style={styles.healthTipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask me about your health and wellness..."
            placeholderTextColor="#9ca3af"
            value={inputText}
            onChangeText={setInputText}
            multiline={true}
            maxLength={500}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={() => handleSendMessage()}
            disabled={!inputText.trim()}
          >
            <Send size={20} color={inputText.trim() ? "#ffffff" : "#9ca3af"} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.disclaimer}>
          ⚠️ This AI provides general wellness tips only. For medical advice, consult your doctor.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
  botAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 4,
  },
  botBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  botMessageText: {
    color: '#1f2937',
  },
  userMessageText: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    alignSelf: 'flex-end',
  },
  botMessageTime: {
    color: '#9ca3af',
  },
  userMessageTime: {
    color: '#dbeafe',
  },
  typingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  quickPromptsSection: {
    marginVertical: 20,
  },
  quickPromptsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickPromptCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  promptIcon: {
    padding: 8,
    borderRadius: 8,
  },
  quickPromptText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  healthTipsSection: {
    marginTop: 20,
  },
  healthTipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  healthTipCard: {
    backgroundColor: '#f0fdf4',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  healthTipText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    lineHeight: 20,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#2563eb',
  },
  sendButtonInactive: {
    backgroundColor: '#f3f4f6',
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
});

export default AIAssistant;