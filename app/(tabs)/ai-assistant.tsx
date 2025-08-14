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
  Utensils,
  MessageCircle,
  Pill,
  Clock,
  Phone,
  AlertCircle
} from 'lucide-react-native';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। मैं आपकी दवाइयों, स्वास्थ्य की जांच और सामान्य सवालों में मदद कर सकता हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?",
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const quickPrompts = [
    { 
      icon: Pill, 
      text: "मेरी दवाई का समय कब है?", 
      color: "#10b981",
      response: "आपकी दवाइयों का समय:\n\n• सुबह 8:00 बजे - मेटफॉर्मिन 500mg (नाश्ते के बाद)\n• सुबह 7:30 बजे - ग्लिमेपिराइड 2mg (नाश्ते से पहले)\n• शाम 6:00 बजे - एम्लोडिपाइन 5mg\n\nक्या आपको कोई दवाई लेने में परेशानी हो रही है?"
    },
    { 
      icon: Heart, 
      text: "मेरा ब्लड प्रेशर कैसा है?", 
      color: "#ef4444",
      response: "आपका आज का ब्लड प्रेशर रीडिंग 135/85 है। यह थोड़ा ऊंचा है। कृपया:\n\n• नमक कम खाएं\n• रोज 30 मिनट टहलें\n• तनाव कम करें\n• अपनी दवाई समय पर लें\n\nअगर यह 140/90 से ऊपर रहे तो डॉक्टर से मिलें।"
    },
    { 
      icon: Utensils, 
      text: "आज क्या खाना चाहिए?", 
      color: "#f59e0b",
      response: "आज के लिए स्वस्थ खाना:\n\n**नाश्ता:**\n• दलिया बादाम के साथ\n• हरी चाय\n\n**दोपहर का खाना:**\n• रोटी, दाल, सब्जी\n• सलाद\n• छाछ\n\n**रात का खाना:**\n• ब्राउन राइस\n• मछली की करी\n• उबली सब्जी\n\n**नाश्ता:**\n• मुट्ठी भर बादाम\n• सेब के टुकड़े\n\nचीनी और तली चीजें कम खाएं।"
    },
    { 
      icon: Clock, 
      text: "डॉक्टर से कब मिलना है?", 
      color: "#2563eb",
      response: "आपकी अगली अपॉइंटमेंट:\n\n• डॉ. अमित शर्मा - कल सुबह 10:00 बजे\n• डॉ. प्रिया सिंह - अगले हफ्ते मंगलवार\n\nकृपया अपनी रिपोर्ट्स साथ लेकर जाएं:\n• ब्लड शुगर चार्ट\n• ब्लड प्रेशर रीडिंग\n• दवाइयों की लिस्ट\n\nक्या आपको कोई नया लक्षण दिख रहा है?"
    }
  ];

  const emergencyContacts = [
    { name: "डॉ. अमित शर्मा", number: "+91 98765 43211", type: "मधुमेह विशेषज्ञ" },
    { name: "डॉ. प्रिया सिंह", number: "+91 98765 43212", type: "हृदय रोग विशेषज्ञ" },
    { name: "आपातकाल", number: "102", type: "एम्बुलेंस" }
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
      lowerText.includes(prompt.text.toLowerCase().substring(0, 5))
    );
    if (quickPrompt) return quickPrompt.response;

    // Hindi keyword responses
    if (lowerText.includes('पानी') || lowerText.includes('water')) {
      return "रोज 8-10 गिलास पानी पिएं। खासकर मधुमेह में पानी पीना जरूरी है। नींबू पानी, नारियल पानी भी पी सकते हैं। अगर पेशाब का रंग हल्का पीला है तो आप पर्याप्त पानी पी रहे हैं।";
    }
    
    if (lowerText.includes('व्यायाम') || lowerText.includes('exercise') || lowerText.includes('टहलना')) {
      return "रोज 30 मिनट टहलना बहुत अच्छा है। सुबह या शाम टहलें। योग भी कर सकते हैं। व्यायाम से पहले और बाद में ब्लड शुगर चेक करें। नया व्यायाम शुरू करने से पहले डॉक्टर से पूछें।";
    }
    
    if (lowerText.includes('खाना') || lowerText.includes('भोजन') || lowerText.includes('diet')) {
      return "संतुलित आहार लें। रोटी, दाल, सब्जी, सलाद खाएं। चीनी, मिठाई, तली चीजें कम करें। थोड़ा-थोड़ा करके 5-6 बार खाएं। खाने के बाद ब्लड शुगर चेक करें।";
    }
    
    if (lowerText.includes('तनाव') || lowerText.includes('परेशानी') || lowerText.includes('stress')) {
      return "तनाव कम करना जरूरी है। गहरी सांस लें, ध्यान करें। परिवार से बात करें। अच्छी नींद लें। अगर ज्यादा परेशानी हो तो डॉक्टर से मिलें।";
    }
    
    if (lowerText.includes('नींद') || lowerText.includes('सोना') || lowerText.includes('sleep')) {
      return "अच्छी नींद बहुत जरूरी है। 7-8 घंटे सोएं। रात को फोन कम देखें। कमरा अंधेरा रखें। सोने से पहले गर्म दूध पिएं। अगर नींद नहीं आती तो डॉक्टर से बात करें।";
    }
    
    if (lowerText.includes('दवाई') || lowerText.includes('medicine') || lowerText.includes('गोली')) {
      return "दवाई के बारे में सिर्फ डॉक्टर से पूछें। मैं आपको दवाई का समय याद दिला सकता हूँ। दवाई समय पर लेना बहुत जरूरी है। कभी भी अपने आप दवाई बंद न करें।";
    }

    if (lowerText.includes('आपातकाल') || lowerText.includes('emergency') || lowerText.includes('तबीयत खराब')) {
      return "अगर तबीयत बहुत खराब है तो तुरंत 102 पर कॉल करें या नजदीकी अस्पताल जाएं। सांस लेने में तकलीफ, सीने में दर्द, या बेहोशी हो तो देर न करें।";
    }

    // Default response
    return "मैं आपकी बात समझ गया हूँ। सामान्य स्वास्थ्य सलाह के लिए मैं यहाँ हूँ, लेकिन खास मेडिकल सवालों के लिए डॉक्टर से मिलें। क्या कोई और सवाल है जिसमें मैं आपकी मदद कर सकूं?";
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
            <Text style={styles.headerTitle}>स्वास्थ्य सहायक</Text>
            <Text style={styles.headerSubtitle}>आपकी सेहत की देखभाल में सहायक</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.emergencyButton}>
          <Phone size={20} color="#ef4444" />
        </TouchableOpacity>
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
            <Text style={styles.quickPromptsTitle}>मुझसे पूछें:</Text>
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

        {/* Emergency Contacts */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>🚨 आपातकालीन संपर्क</Text>
          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity key={index} style={styles.emergencyCard}>
              <View style={styles.emergencyInfo}>
                <Text style={styles.emergencyName}>{contact.name}</Text>
                <Text style={styles.emergencyType}>{contact.type}</Text>
              </View>
              <View style={styles.emergencyActions}>
                <Text style={styles.emergencyNumber}>{contact.number}</Text>
                <Phone size={16} color="#10b981" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Reminder */}
        <View style={styles.reminderSection}>
          <View style={styles.reminderCard}>
            <AlertCircle size={20} color="#f59e0b" />
            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>आज की याददाश्त</Text>
              <Text style={styles.reminderText}>शाम 6 बजे दवाई लेना न भूलें</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="अपना सवाल यहाँ लिखें..."
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
          ⚠️ यह केवल सामान्य सलाह देता है। मेडिकल सलाह के लिए डॉक्टर से मिलें।
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  emergencyButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
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
    backgroundColor: '#10b981',
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
    backgroundColor: '#10b981',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 18,
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
    fontSize: 14,
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
    fontSize: 18,
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
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  emergencySection: {
    marginTop: 20,
  },
  emergencyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  emergencyCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  emergencyType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  emergencyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emergencyNumber: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
  },
  reminderSection: {
    marginTop: 20,
  },
  reminderCard: {
    backgroundColor: '#fffbeb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
  },
  reminderText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400e',
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
    fontSize: 18,
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
    backgroundColor: '#10b981',
  },
  sendButtonInactive: {
    backgroundColor: '#f3f4f6',
  },
  disclaimer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
});

export default AIAssistant;