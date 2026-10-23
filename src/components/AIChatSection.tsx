import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { Crop, Language, LocationState } from '../types/farming';
import { TRANSLATIONS } from '../data/translations';

interface AIChatSectionProps {
  crop: Crop;
  location: LocationState;
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIChatSection: React.FC<AIChatSectionProps> = ({
  crop,
  location,
  language,
}) => {
  const t = TRANSLATIONS[language].aiAssistant;

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        language === 'kn'
          ? `ನಮಸ್ಕಾರ ರೈತ ಬಂಧುಗಳೇ! ನಾನು ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ರೈತ ಸಹಾಯಕ. ${crop.kannadaName} ಬೆಳೆ, ಗೊಬ್ಬರ, ಕೀಟ ನಿಯಂತ್ರಣ, ಮಂಡಿ ದರ ಅಥವಾ ಹವಾಮಾನದ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ.`
          : language === 'hi'
          ? `नमस्ते किसान भाई! मैं आपका स्मार्ट किसान सहायक हूँ। ${crop.hindiName} की खेती, खाद, कीट नियंत्रण, मंडी भाव या किसी भी समस्या के बारे में पूछें।`
          : `Hello Farmer Friend! I am your Smart Farmer Assistant. Ask me anything about ${crop.name}, fertilizers, pest control, weather or mandi prices in ${location.district}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Suggested quick farmer questions
  const sampleQuestions = {
    en: [
      `When should I sow ${crop.name} in ${location.district}?`,
      `My ${crop.name} leaves are turning yellow. What could be the reason?`,
      `What are the most common pests affecting ${crop.name}?`,
      `How much organic compost/FYM should I apply for ${crop.name}?`,
    ],
    kn: [
      `${location.district} ಭಾಗದಲ್ಲಿ ${crop.kannadaName} ಬಿತ್ತನೆಗೆ ಸೂಕ್ತ ಸಮಯ ಯಾವುದು?`,
      `${crop.kannadaName} ಎಲೆಗಳು ಹಳದಿಯಾಗುತ್ತಿವೆ, ಕಾರಣ ಮತ್ತು ಪರಿಹಾರವೇನು?`,
      `${crop.kannadaName} ಬೆಳೆಗೆ ಸಾವಯವ ಕೀಟನಾಶಕ (ಬೇವಿನ ಎಣ್ಣೆ) ಹೇಗೆ ಬಳಸುವುದು?`,
      `${crop.kannadaName} ಬೆಳೆಗೆ ನೀರಿನ ನಿರ್ಣಾಯಕ ಹಂತಗಳು ಯಾವುವು?`,
    ],
    hi: [
      `${crop.hindiName} की बुवाई का सही समय क्या है?`,
      `${crop.hindiName} के पत्ते पीले पड़ रहे हैं, क्या उपाय करें?`,
      `${crop.hindiName} में जैविक कीट नियंत्रण कैसे करें?`,
      `${crop.hindiName} की अच्छी पैदावार के लिए खाद प्रबंधन बताएं।`,
    ],
  };

  const currentQuestions = sampleQuestions[language] || sampleQuestions.en;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          language: language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English',
          cropContext: `${crop.name} (${crop.kannadaName})`,
          locationContext: `${location.district}, ${location.state}`,
        }),
      });

      if (!res.ok) throw new Error('Assistant API returned error');

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'Could not fetch response. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text:
          language === 'kn'
            ? `ಕ್ಷಮಿಸಿ, ಎಐ ಸಂಪರ್ಕದಲ್ಲಿ ತೊಂದರೆಯಾಗಿದೆ. ${crop.kannadaName} ಬೆಳೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ದಯವಿಟ್ಟು ಮೇಲಿನ 'ಬೆಳೆ ಮಾಹಿತಿ' ಮತ್ತು 'ಕೀಟ ನಿರ್ವಹಣೆ' ವಿಭಾಗಗಳನ್ನು ನೋಡಿ ಅಥವಾ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು (RSK) ಸಂಪರ್ಕಿಸಿ.`
            : `AI advisory is currently running in offline resilience mode. For ${crop.name}, refer to the detailed Crop Dashboard cards above or visit your local Raitha Samparka Kendra (RSK) / KVK.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'kn') utterance.lang = 'kn-IN';
    else if (language === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-IN';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[650px] max-h-[80vh]">
      
      {/* Header */}
      <div className="bg-emerald-800 text-white p-3.5 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">{t.title}</h3>
            <p className="text-xs text-emerald-200">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-emerald-100">AI Active</span>
        </div>
      </div>

      {/* Quick Suggested Farmer Questions */}
      <div className="p-3 bg-stone-50 border-b border-stone-200 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[11px] font-bold text-stone-500 whitespace-nowrap">
          {t.quickQuestions}
        </span>
        {currentQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:border-emerald-500 hover:bg-emerald-50 text-xs whitespace-nowrap transition active:scale-95 shadow-2xs font-medium"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3.5 bg-stone-50/40">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 shadow-xs text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-700 text-white rounded-br-none'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
                }`}
              >
                {/* Message text with basic bullet rendering */}
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Footer action: Speech Synthesis for farmer accessibility */}
                {!isUser && (
                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <button
                      onClick={() => handleSpeakText(msg.text)}
                      className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold transition"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{t.voiceListen}</span>
                        </>
                      )}
                    </button>
                    <span>{msg.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-stone-200 max-w-[240px] text-xs text-emerald-800 font-semibold shadow-xs">
            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <span>{t.thinking}</span>
          </div>
        )}
      </div>

      {/* Input Form Bar */}
      <div className="p-3 bg-white border-t border-stone-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={t.askPlaceholder}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 p-3 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <p className="text-[10px] text-stone-400 text-center mt-1.5">
          Agricultural AI Assistant. Always verify dosage with your local Krishi Vigyan Kendra (KVK).
        </p>
      </div>

    </div>
  );
};
