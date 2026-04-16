import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Volume2, Bot, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAIWaiterResponse } from '../services/aiService';

export const AIWaiter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusText, setStatusText] = useState('هلا بك في نداء.. نورتنا!');
  const [transcription, setTranscription] = useState('');
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
        setStatusText('ما سمعتك زين.. جرب مرة ثانية؟');
      };
    }
  }, [isLoading]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.startsWith('ar')) || voices.find(v => v.lang.includes('ar')) || voices[0];
    if (arVoice) utterance.voice = arVoice;
    utterance.rate = 1.1; // Friendly fast pace
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

    // We only send the latest message for a clean voice-first UX, 
    // but we could maintain session state if needed.
    const response = await getAIWaiterResponse(text, []);
    setIsLoading(false);
    speak(response);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-[60vh] bg-greek-blue text-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,40,85,0.3)] flex flex-col items-center justify-between p-8 relative overflow-hidden"
          >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-10 w-64 h-64 bg-greek-light-blue/20 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Header / Close */}
            <div className="w-full flex justify-between items-center z-10">
               <div className="flex items-center gap-2">
                 <Bot size={20} className="text-greek-light-blue" />
                 <span className="text-xs font-bold tracking-widest uppercase opacity-60">نِداء الذكي | Voice Assistant</span>
               </div>
               <button 
                 onClick={() => {
                   setIsOpen(false);
                   window.speechSynthesis.cancel();
                   recognitionRef.current?.stop();
                 }}
                 className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
               >
                 <X size={24} />
               </button>
            </div>

            {/* Central Immersive Visualizer */}
            <div className="flex-grow flex flex-col items-center justify-center gap-8 z-10 w-full max-w-2xl text-center">
               <div className="relative">
                  <AnimatePresence mode="wait">
                    {isSpeaking && (
                      <motion.div 
                        key="speaking"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex gap-2 h-24 items-center"
                      >
                         {[1, 2, 3, 4, 5, 6, 7].map(i => (
                           <motion.div
                             key={i}
                             animate={{ 
                               height: [20, 80, 40, 90, 30],
                               backgroundColor: ['#e1f5fe', '#ffffff', '#e1f5fe']
                             }}
                             transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                             className="w-3 rounded-full"
                           />
                         ))}
                      </motion.div>
                    )}
                    {isListening && (
                      <motion.div 
                        key="listening"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative w-32 h-32 flex items-center justify-center"
                      >
                         <motion.div
                           animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.1, 0.5] }}
                           transition={{ repeat: Infinity, duration: 1.5 }}
                           className="absolute inset-0 bg-white/20 rounded-full"
                         />
                         <div className="w-4 h-4 bg-white rounded-full animate-ping" />
                      </motion.div>
                    )}
                    {!isSpeaking && !isListening && !isLoading && (
                       <motion.div 
                         key="idle"
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="flex items-center gap-1"
                       >
                         {[1, 2, 3].map(i => (
                           <motion.div
                             key={i}
                             animate={{ scale: [1, 1.2, 1] }}
                             transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                             className="w-2 h-2 bg-greek-light-blue rounded-full opacity-40"
                           />
                         ))}
                       </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               <div className="space-y-4">
                 <motion.h2 
                   key={statusText}
                   initial={{ y: 10, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   className="text-2xl md:text-3xl font-serif font-bold leading-tight px-4"
                 >
                   {statusText}
                 </motion.h2>
                 
                 <AnimatePresence>
                   {transcription && (
                     <motion.p 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 0.6 }}
                       exit={{ opacity: 0 }}
                       className="text-lg italic font-light font-sans"
                     >
                       "{transcription}..."
                     </motion.p>
                   )}
                 </AnimatePresence>
               </div>
            </div>

            {/* Giant Action Area */}
            <div className="w-full flex flex-col items-center gap-6 z-10 pb-4">
               <div className="relative group">
                  <motion.div 
                    animate={isListening ? { scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] } : { scale: 1, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-[-20px] bg-white/30 rounded-full blur-xl"
                  />
                  <button
                    onClick={toggleListening}
                    disabled={isLoading}
                    className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-90 ${
                      isListening 
                        ? 'bg-red-500 shadow-red-500/40 text-white' 
                        : 'bg-white text-greek-blue'
                    } ${isLoading ? 'opacity-50 grayscale' : ''}`}
                  >
                    {isLoading ? (
                      <Loader2 size={48} className="animate-spin" />
                    ) : isListening ? (
                      <MicOff size={48} />
                    ) : (
                      <Mic size={48} />
                    )}
                  </button>
               </div>
               
               <div className="flex flex-col items-center gap-2">
                 <p className="text-greek-light-blue text-sm font-bold tracking-widest flex items-center gap-2">
                   {isListening ? 'أنا أسمعك.. تكلّم' : isSpeaking ? 'جاري الرد..' : 'اضغط واسألني عن المنيو'}
                   {isListening && <Sparkles size={14} className="animate-pulse" />}
                 </p>
                 <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      animate={isListening ? { x: ['-100%', '100%'] } : { x: '0%' }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="h-full w-1/2 bg-greek-light-blue"
                    />
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Landing Launch Button */}
      {!isOpen && (
        <motion.div 
          layoutId="assistant-button"
          className="mb-8 w-full max-w-sm px-6"
        >
          <button
            onClick={() => {
              setIsOpen(true);
              speak('يا هلا بك في نداء! سم يا بعدي.. وش بخاطرك اليوم؟');
            }}
            className="w-full bg-greek-blue text-white py-6 rounded-[2rem] shadow-2xl flex items-center justify-center gap-4 group hover:bg-greek-blue/90 transition-all border-4 border-white/50"
          >
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
               <Mic size={24} />
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">تحدث مع مُساعد نداء</p>
              <p className="text-xs text-greek-light-blue/60 font-medium">اطلب وسولف معنا بالصوت</p>
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
};
