import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I'm Alex's AI Assistant. Ask me about his tech stack or projects." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash';
      
      const systemInstruction = `
        You are an AI portfolio assistant for Alex Chen, a Senior Frontend Architect.
        Style: Brief, technical, professional, yet slightly "cyberpunk" in tone.
        Knowledge:
        - Alex loves Next.js, Tailwind, and React.
        - Core strengths: Frontend Architecture, AI integration.
        - Do not answer questions unrelated to coding, design, or Alex.
      `;

      // Construct history for context
      // Note: In a real app, you'd map standard history types properly.
      
      const responseStream = await ai.models.generateContentStream({
        model,
        contents: [
            { role: 'user', parts: [{ text: userMsg.text }]}
        ],
        config: {
          systemInstruction,
        }
      });

      let fullResponse = "";
      const modelMsgPlaceholder: ChatMessage = { role: 'model', text: "", isLoading: true };
      setMessages(prev => [...prev, modelMsgPlaceholder]);

      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullResponse += chunk.text;
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = { role: 'model', text: fullResponse, isLoading: false };
            return newArr;
          });
        }
      }

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "System error: Neural link unstable." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-mono">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 glass-panel rounded-xl overflow-hidden flex flex-col h-96 border border-accent-blue/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-fade-in-up">
          {/* Header */}
          <div className="p-3 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></div>
              <span className="text-xs text-accent-blue tracking-widest uppercase">AI_LINK::ACTIVE</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
              <i className="ph ph-x"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-accent-blue/10 border border-accent-blue/20 text-accent-blue' 
                      : 'bg-white/5 border border-white/10 text-gray-300'
                  }`}
                >
                  {msg.text}
                  {msg.isLoading && <span className="inline-block w-1 h-4 bg-accent-blue ml-1 animate-blink"/>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-black/20 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Execute command..."
              disabled={isTyping}
              className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-white/30"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !inputValue.trim()}
              className="text-accent-blue hover:text-white disabled:opacity-30 transition-colors"
            >
              <i className="ph ph-paper-plane-right text-lg"></i>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full glass-panel border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10 transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-accent-blue"></span>
        <i className={`ph ${isOpen ? 'ph-x' : 'ph-chat-circle-text'} text-2xl`}></i>
      </button>
    </div>
  );
};

export default AIChat;