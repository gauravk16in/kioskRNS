import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowUp, Bot, Wifi, BatteryFull, HelpCircle, Settings, Mic, MicOff } from 'lucide-react';
import { ScreenProps } from '../types';
import { useVoice } from '../hooks/useVoice';

interface Message {
  id: number;
  text: string;
  speaker: 'user' | 'kiosk';
}

export function AskQuestionScreen({ onNavigate, session, backendUrl }: ScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: Date.now(), text: `Hello ${session?.user_name || 'there'}! How can I help you today?`, speaker: 'kiosk' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize voice hook
  const { listening, liveText, setLiveText, startListening, stopListening, speak } = useVoice((text) => {
    // When recognition ends automatically, we could trigger send, but since we rely on liveText, we will handle it below
  });

  // Scroll to bottom when messages change or liveText changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveText]);

  // Sync liveText to inputText
  useEffect(() => {
    if (listening && liveText) {
      setInputText(liveText);
    }
  }, [liveText, listening]);

  // Auto-send when voice recognition naturally ends (silence detected)
  useEffect(() => {
    if (!listening && inputText.trim() && !isAsking) {
      // Small timeout to ensure state settles
      const timeout = setTimeout(() => {
        handleSend(inputText);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [listening]);

  const addMessage = (text: string, speaker: 'user' | 'kiosk') => {
    setMessages((prev) => [...prev, { id: Date.now(), text, speaker }]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isAsking) return;
    
    setIsAsking(true);
    setInputText('');
    setLiveText('');
    if (listening) stopListening();

    // Add user message
    addMessage(text, 'user');
    
    const lowerText = text.toLowerCase();
    const isCafeteria = lowerText.includes('cafeteria') || lowerText.includes('canteen') || lowerText.includes('food');

    // Optional: Log message to backend
    if (backendUrl && session?.session_id) {
      try {
        fetch(`${backendUrl}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: session.session_id,
            text,
            speaker: 'user'
          })
        }).catch(console.error);
      } catch (e) {
        console.error(e);
      }
    }

    if (isCafeteria) {
      // Intercept cafeteria questions to provide accurate response and show the 3D map
      setTimeout(() => {
        const answer = "The Cafeteria is just a 2-minute walk away. Let me show you the map on the screen.";
        addMessage(answer, 'kiosk');
        speak(answer);
        
        // Navigate to location detail after speaking starts
        setTimeout(() => {
          onNavigate('location-detail', { target: 'cafeteria' });
        }, 3500);
        
        setIsAsking(false);
      }, 600);
      return; // Skip backend call
    }

    // Ask backend
    try {
      const response = await fetch(`${backendUrl}/ask?question=${encodeURIComponent(text)}`);
      if (response.ok) {
        const data = await response.json();
        const answer = data.answer || "I'm not sure how to answer that.";
        addMessage(answer, 'kiosk');
        speak(answer);
        
        // Log kiosk answer to backend
        if (backendUrl && session?.session_id) {
          fetch(`${backendUrl}/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              session_id: session.session_id,
              text: answer,
              speaker: 'kiosk'
            })
          }).catch(console.error);
        }
      } else {
        addMessage("Sorry, I'm having trouble connecting right now.", 'kiosk');
      }
    } catch (e) {
      console.error(e);
      addMessage("Sorry, I'm offline right now.", 'kiosk');
    } finally {
      setIsAsking(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
      if (inputText.trim()) {
        handleSend(inputText);
      }
    } else {
      setInputText('');
      setLiveText('');
      startListening();
    }
  };

  return (
    <div className="bg-background text-on-surface h-full w-full flex flex-col relative bg-[radial-gradient(circle_at_50%_100%,rgba(216,226,255,0.4)_0%,rgba(250,249,254,1)_60%)]">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-16 md:h-[80px] bg-white/70 backdrop-blur-xl border-b-[0.5px] border-white/20 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-[20px] md:text-headline-md font-bold tracking-tight text-on-surface">RNSIT Kiosk</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-3 text-on-surface-variant mr-4">
            <span className="text-label-sm font-semibold">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <Wifi className="w-5 h-5" />
            <BatteryFull className="w-5 h-5" />
          </div>
          <button className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <HelpCircle className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <Settings className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto mt-16 md:mt-[80px] flex flex-col items-center px-4 md:px-container-padding relative z-10 overflow-hidden">
        <div className="w-full max-w-3xl flex-1 flex flex-col justify-start pb-[260px] md:pb-[280px] pt-8 no-scrollbar overflow-y-auto">
          <div className="flex flex-col gap-4 md:gap-stack-md w-full mt-auto justify-end min-h-full">
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full transform transition-all duration-500 opacity-100 ${msg.speaker === 'user' ? 'justify-end' : 'justify-start delay-100'}`}>
                {msg.speaker === 'kiosk' ? (
                  <div className="flex items-end gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-primary-container flex items-center justify-center mb-1 shadow-sm">
                      <Bot className="text-on-primary-container w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="glass-panel rounded-t-xl rounded-br-xl rounded-bl-sm px-4 py-3 md:px-6 md:py-4 max-w-[90%] md:max-w-[85%] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                      <p className="text-[16px] md:text-body-lg text-on-surface leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="glass-panel-darker rounded-t-xl rounded-bl-xl rounded-br-sm px-4 py-3 md:px-6 md:py-4 max-w-[90%] md:max-w-[80%] shadow-sm">
                    <p className="text-[16px] md:text-body-lg text-on-surface">{msg.text}</p>
                  </div>
                )}
              </div>
            ))}

            {isAsking && (
               <div className="flex justify-start w-full transform transition-all duration-500 opacity-100 delay-100">
                <div className="flex items-end gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-primary-container flex items-center justify-center mb-1 shadow-sm">
                    <Bot className="text-on-primary-container w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                  </div>
                  <div className="glass-panel rounded-t-xl rounded-br-xl rounded-bl-sm px-4 py-3 md:px-6 md:py-4 flex gap-1 items-center">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
               </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Bottom Action Bar / Input Area */}
      <div className="fixed bottom-0 left-0 w-full z-40 flex flex-col items-center justify-end pb-8 md:pb-12 pt-24 md:pt-32 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-10 flex flex-col md:flex-row items-center justify-between relative pointer-events-auto">
          {/* Back Button */}
          <button 
            onClick={() => onNavigate('entry')} 
            className="hidden md:flex w-14 h-14 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30 transition-all active:scale-95 shadow-sm absolute left-10 top-2 z-50">
            <ArrowLeft className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Centered Input & Orb */}
          <div className="flex-1 flex flex-col items-center gap-4 md:gap-6 z-40 relative w-full">
            <div className="glass-panel w-full sm:max-w-xl h-14 md:h-16 rounded-full flex items-center px-1 pr-1 pl-4 md:pr-2 md:pl-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-primary-container/50 focus-within:border-primary/30 transition-all">
              {/* Mobile Back inside input bar area */}
              <button onClick={() => onNavigate('entry')} className="md:hidden mr-2 p-2 text-on-surface-variant active:scale-95 rounded-full hover:bg-surface-variant">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <input 
                className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] md:text-body-lg text-on-surface placeholder:text-outline h-full px-0 outline-none min-w-0" 
                placeholder="Type your question or tap mic..." 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend(inputText);
                }}
              />
              <button 
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim() || isAsking}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-sm shrink-0 md:ml-2 ${!inputText.trim() || isAsking ? 'bg-surface-variant text-on-surface-variant' : 'bg-primary text-on-primary hover:bg-primary/90'}`}
              >
                <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Persistent Voice Orb */}
            <button 
              onClick={toggleListening}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,88,188,0.3)] cursor-pointer group active:scale-95 transition-all duration-300 -mt-2 md:mt-0 ${listening ? 'bg-error animate-pulse' : 'bg-gradient-to-br from-primary-fixed to-primary animate-orb-glow'}`}>
              {listening ? (
                <MicOff className="text-on-error w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
              ) : (
                <Mic className="text-on-primary w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
              )}
            </button>
            <span className="text-[11px] md:text-label-sm text-outline-variant absolute -bottom-4 md:-bottom-6">
              {listening ? 'Listening... Tap to stop' : 'Tap to speak or type above'}
            </span>
          </div>

          {/* Empty right spacer to balance the back button */}
          <div className="hidden md:block w-14 h-14 absolute right-10"></div>
        </div>
      </div>
    </div>
  );
}
