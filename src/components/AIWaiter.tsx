import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Volume2, Bot, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAIWaiterResponse } from '../services/aiService';

export const AIWaiter: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusText, setStatusText] = useState('هلا بك في نداء.. نورتنا! اطلب وسولف معي بالصوت');
  const [transcription, setTranscription] = useState('');
  const recognitionRef = useRef<any>(null);

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
        if (!isLoading) setTranscription('');
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setStatusText('ما سمعتك زين يا بطل.. جرب مرة ثانية؟');
      };
    }
  }, [isLoading]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.startsWith('ar')) || voices.find(v => v.lang.includes('ar')) || voices[0];
    if (arVoice) utterance.voice = arVoice;
    utterance.rate = 1.1; 
    utterance.pitch = 1.1; 
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setStatusText(text);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setStatusText('أنا معك.. وش تبي تطلب بعد؟');
    };
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      window.speechSynthesis.cancel();
      setTranscription('');
      setStatusText('أسمعك.. سمّ يا بعدي');
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

    setIsLoading(true);
    setStatusText('ثواني بس.. أشوف لك أفضل شي');

    const response = await getAIWaiterResponse(text, []);
    setIsLoading(false);
    speak(response);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-4">
      <div className="bg-white/5 backdrop-blur-lg rounded-[2.5rem] border border-white/20 p-6 md:p-8 flex flex-col items-center gap-4 shadow-2xl relative overflow-hidden transition-all hover:bg-white/10">
        {/* Progress bar for listening/speaking */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden rounded-t-full">
           <AnimatePresence>
             {(isListening || isSpeaking || isLoading) && (
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 exit={{ opacity: 0 }}
                 className={`h-full ${isListening ? 'bg-red-500' : 'bg-greek-light-blue'} animate-pulse`}
               />
             )}
           </AnimatePresence>
        </div>

        <div className="z-10 text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <motion.div 
              animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${isSpeaking ? 'bg-white/30' : 'bg-white/10'}`}
            >
              <Bot size={20} />
            </motion.div>
            <h3 className="text-lg font-serif font-bold text-white opacity-80 uppercase tracking-widest text-xs">منادي نداء الذكي</h3>
          </div>
          
          <motion.p 
            key={statusText}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white text-xl md:text-2xl font-bold px-2 leading-tight drop-shadow-md"
          >
            {statusText}
          </motion.p>
          
          <AnimatePresence>
            {transcription && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="text-greek-light-blue italic text-sm md:text-base font-light"
              >
                "{transcription}..."
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="z-10 flex flex-col items-center">
          <button
            onClick={toggleListening}
            disabled={isLoading}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95 ${
              isListening 
                ? 'bg-red-500 scale-110' 
                : 'bg-white text-greek-blue hover:scale-105'
            } ${isLoading ? 'opacity-50 grayscale' : ''}`}
          >
            {isLoading ? (
              <Loader2 size={32} className="animate-spin" />
            ) : isListening ? (
              <MicOff size={32} />
            ) : (
              <Mic size={32} />
            )}
            
            {isListening && (
              <motion.div 
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-white rounded-full bg-red-400"
              />
            )}
          </button>
        </div>

        {/* Waves Animation */}
        <div className="flex items-center gap-0.5 h-4 opacity-50">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <motion.div
              key={i}
              animate={{ 
                height: (isListening || isSpeaking) ? [4, 16, 4] : 4,
                backgroundColor: (isListening || isSpeaking) ? '#fff' : '#ffffff44'
              }}
              transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
              className="w-1 rounded-full bg-white/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
