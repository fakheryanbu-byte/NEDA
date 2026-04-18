import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Volume2, Bot, Loader2, Sparkles, Send } from 'lucide-react';
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
    <div className="w-full max-w-2xl mx-auto mt-6 px-4">
      {/* The Central "Stage" */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 flex flex-col items-center gap-6 shadow-2xl relative border border-white/10"
      >
        <button
          onClick={toggleListening}
          disabled={isLoading}
          className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
            isListening 
              ? 'bg-red-500 scale-110 shadow-red-500/40' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          } ${isLoading ? 'opacity-50 grayscale' : ''}`}
        >
          {isLoading ? (
            <Loader2 size={40} className="animate-spin" />
          ) : isListening ? (
            <MicOff size={40} />
          ) : (
            <Mic size={40} />
          )}
          
          {isListening && (
            <motion.div 
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-red-400 rounded-full"
            />
          )}
        </button>

        <div className="text-center space-y-2 z-10">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">المساعد الصوتي الذكي</h3>
          <p className="text-greek-light-blue/80 text-sm md:text-base font-medium">اضغط هنا للسؤال عن المنيو، السعرات، وخدمات المطعم</p>
        </div>

        <AnimatePresence mode="wait">
          {(isListening || isSpeaking || isLoading) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full flex flex-col items-center gap-4 overflow-hidden"
            >
              {/* Waves */}
              <div className="flex items-center gap-1 h-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: (isListening || isSpeaking) ? [10, 30, 10] : 8 }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                    className="w-1.5 rounded-full bg-greek-light-blue"
                  />
                ))}
              </div>

              <motion.div 
                key={statusText}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 w-full max-w-md border border-white/5"
              >
                <p className="text-white text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm">
                  {statusText}
                </p>
                {transcription && (
                  <p className="text-greek-light-blue/60 italic text-sm mt-2 border-t border-white/5 pt-2">
                    "{transcription}..."
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Buttons Below Stage */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button 
          onClick={() => window.open(`https://wa.me/966567107510`, '_blank')}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-3xl flex items-center gap-3 transition-all border border-white/10 font-bold"
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
             <Send size={16} className="text-white" />
          </div>
          <span>واتساب</span>
        </button>

        <button 
          onClick={() => window.open('https://maps.app.goo.gl/Kg8S4oPE3GLDMGPSA', '_blank')}
          className="bg-greek-light-blue text-greek-blue px-8 py-4 rounded-3xl flex items-center gap-3 transition-all font-bold hover:scale-105"
        >
          <div className="w-8 h-8 bg-greek-blue rounded-full flex items-center justify-center">
             <Bot size={16} className="text-white" />
          </div>
          <span>الموقع والخدمات</span>
        </button>
      </div>
    </div>
  );
};
