import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Volume2, Bot, Loader2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAIWaiterResponse } from '../services/aiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIWaiter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'أهلاً بك في مطعم نداء! اضغط على الميكروفون وتحدث معي، سأقوم بمساعدتك في اختيار أشهى الأطباق اليوم.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcription, setTranscription] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, transcription]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ar-SA';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setTranscription(transcript);
        
        if (event.results[0].isFinal) {
          handleVoiceInput(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    // Prioritize Arabic voices
    const arVoice = voices.find(v => v.lang.startsWith('ar')) || voices.find(v => v.lang.includes('ar')) || voices[0];
    if (arVoice) utterance.voice = arVoice;
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Slightly higher pitch for a friendly service tone
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      window.speechSynthesis.cancel();
      setTranscription('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  };

  const handleVoiceInput = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setTranscription('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getAIWaiterResponse(text, history);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
    speak(response);
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[90vw] max-w-[420px] h-[580px] bg-white rounded-[2rem] shadow-2xl border border-greek-light-blue overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-greek-blue p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isSpeaking ? 'bg-white text-greek-blue scale-110 shadow-[0_0_20px_rgba(255,255,255,0.6)]' : 'bg-white/20 text-white'}`}>
                  {isSpeaking ? <Volume2 className="animate-pulse" size={32} /> : <Bot size={32} />}
                </div>
                <div>
                  <h3 className="font-bold text-xl">نِداء الذكي (صوتي)</h3>
                  <p className="text-sm text-greek-light-blue font-light">تحدث معي، أنا أسمعك..</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  window.speechSynthesis.cancel();
                  recognitionRef.current?.stop();
                }}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* AI Experience Stage */}
            <div className="h-44 bg-greek-blue flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-inner">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:25px_25px]" />
               
               {/* Listening Animation */}
               <AnimatePresence>
                 {isListening && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-end gap-1.5 h-16"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                        <motion.div
                          key={i}
                          animate={{ height: [12, 48, 16, 60, 20] }}
                          transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                          className="w-2 bg-white rounded-full shadow-sm"
                        />
                      ))}
                    </motion.div>
                 )}
               </AnimatePresence>

               {/* Speaking Animation */}
               <AnimatePresence>
                 {isSpeaking && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 h-16"
                    >
                       {[1, 2, 3, 4, 5].map(i => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.8, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-4 h-4 bg-greek-light-blue rounded-full shadow-[0_0_10px_rgba(225,245,254,0.8)]"
                        />
                      ))}
                    </motion.div>
                 )}
               </AnimatePresence>

               {!isListening && !isSpeaking && !isLoading && (
                 <motion.p 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="text-white text-lg font-medium tracking-wide animate-pulse"
                 >
                   تحدث معي الآن..
                 </motion.p>
               )}

               {isLoading && (
                 <div className="flex flex-col items-center gap-2">
                   <Loader2 size={32} className="animate-spin text-white" />
                   <p className="text-white/60 text-xs">جاري تحضير الرد...</p>
                 </div>
               )}
            </div>

            {/* Transcription Feed (Briefly shows what was heard) */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 min-h-[60px] flex items-center justify-center text-center">
              {transcription ? (
                <p className="text-slate-500 italic text-lg leading-snug">"{transcription}..."</p>
              ) : messages[messages.length-1].role === 'model' ? (
                <div className="flex flex-col items-center gap-2">
                   <p className="text-greek-blue font-medium text-sm line-clamp-2">{messages[messages.length-1].text}</p>
                </div>
              ) : null}
            </div>

            {/* History Preview (Minimalistic) */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-white">
               {messages.slice(-2).map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] p-4 rounded-3xl shadow-sm border ${
                    m.role === 'user' 
                      ? 'bg-slate-50 text-slate-600 border-slate-100 rounded-tr-none' 
                      : 'bg-greek-blue/5 text-greek-blue border-greek-blue/10 rounded-tl-none font-medium'
                  }`}>
                    <p className="text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Giant Push-to-Talk Button */}
            <div className="p-8 pb-10 bg-white border-t border-slate-50 flex flex-col items-center gap-6">
              <div className="relative">
                {isListening && (
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-red-400 rounded-full"
                  />
                )}
                <button
                  onClick={toggleListening}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-90 ${
                    isListening 
                      ? 'bg-red-500 shadow-red-200' 
                      : 'bg-greek-blue hover:scale-105 shadow-greek-blue/30'
                  }`}
                >
                  {isListening ? <MicOff size={40} className="text-white" /> : <Mic size={40} className="text-white" />}
                </button>
              </div>
              <div className="text-center">
                <p className={`text-xl font-bold mb-1 ${isListening ? 'text-red-500' : 'text-greek-blue'}`}>
                  {isListening ? 'أنا أسمعك.. اضغط للإنهاء' : 'اضغط وتحدث معي'}
                </p>
                <p className="text-slate-400 text-xs">سأقوم بالرد عليك صوتياً فوراً</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) {
             window.speechSynthesis.cancel();
             recognitionRef.current?.stop();
          }
        }}
        className={`w-20 h-20 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group transition-all duration-500 border-4 border-white ${isOpen ? 'bg-red-500 rotate-90' : 'bg-greek-blue border-greek-light-blue/20'}`}
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        {isOpen ? <X size={32} className="text-white" /> : <Mic size={32} className="text-white" />}
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg"
          >
            LIVE
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};
