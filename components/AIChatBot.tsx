import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, ChevronDown } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your A406 specialist. How can I help with your glazing project today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await generateChatResponse(history, userMsg.text);
      const botMsg: ChatMessage = { role: 'model', text: responseText || "I'm sorry, I couldn't process that.", timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
      {/* Chat Window */}
      <div 
        className={`bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ease-out pointer-events-auto flex flex-col mb-4 origin-bottom-right ${
          isOpen ? 'w-[90vw] sm:w-[380px] h-[550px] opacity-100 scale-100' : 'w-[380px] h-0 opacity-0 scale-90'
        }`}
      >
        {/* Header - Black & Professional */}
        <div className="bg-brand-black p-5 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg border border-white/10">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-none tracking-wide">A406 Assistant</h3>
              <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area - Light Gray Clean */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 scroll-smooth">
          <div className="text-center py-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Today</p>
          </div>
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-brand-red text-white rounded-2xl rounded-br-none' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none flex gap-1.5 items-center h-12 shadow-sm">
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1.4s_infinite_0ms]"></span>
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1.4s_infinite_200ms]"></span>
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-[bounce_1.4s_infinite_400ms]"></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - White */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 text-brand-black border-transparent focus:bg-white border focus:border-brand-red rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder-gray-400"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-brand-black text-white p-3 rounded-xl hover:bg-brand-red disabled:opacity-50 disabled:hover:bg-brand-black transition-all shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button (The Icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
            isOpen 
            ? 'bg-gray-200 text-brand-black rotate-90' 
            : 'bg-brand-red text-white hover:bg-brand-redHover'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        
        {/* Notification Dot if closed */}
        {!isOpen && messages.length > 0 && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-brand-red"></span>
            </span>
        )}
      </button>
    </div>
  );
};

export default AIChatBot;