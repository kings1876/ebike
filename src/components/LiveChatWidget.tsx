import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, CheckCircle } from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'G\'day! Welcome to E Bikes for Sale Australia. How can we help you choose your electric bike or assist with your order today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'How do I claim the 10% Crypto/Osko discount?',
    'What are shipping times across Australia?',
    'Which bike is best for hill climbs & trails?',
    'Is the 250W model 100% road legal in Australia?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user' as const, text }];
    setMessages(newMessages);
    if (!textToSend) setInputText('');

    // Intelligent immediate automated response
    setTimeout(() => {
      let reply = 'Thank you for your question! One of our Australian specialists is also notified at support@ebikesforsale.com.au.';
      const lower = text.toLowerCase();

      if (lower.includes('crypto') || lower.includes('discount') || lower.includes('osko')) {
        reply = 'You receive an instant 10% discount automatically deducted when you choose Cryptocurrency (BTC/ETH/USDT), Australian Bank Transfer, or Osko on our checkout order form. No coupon code needed!';
      } else if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('melbourne') || lower.includes('sydney')) {
        reply = 'We provide 100% Free Nationwide Delivery across Australia. Metro deliveries arrive in 2–4 business days; regional deliveries in 3–6 business days with tracked freight insurance.';
      } else if (lower.includes('hill') || lower.includes('trail') || lower.includes('mountain') || lower.includes('climb')) {
        reply = 'For steep climbs and off-road tracks, we recommend browsing our Electric Mountain Bikes range (hardtail and dual-suspension) from brands like Trek, Orbea and Bianchi. Tell us your budget and where you ride and we will point you to the right one.';
      } else if (lower.includes('legal') || lower.includes('road') || lower.includes('250w') || lower.includes('en15194')) {
        reply = 'Yes! All our 250W commuter and step-through models strictly adhere to EN15194 (25km/h motor cutoff), making them 100% street-legal without licence or registration across all Australian states.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer group active:scale-95"
            aria-label="Open Australian E-Bike Live Support"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold hidden sm:inline whitespace-nowrap">Live Help & Questions</span>
          </button>
        )}
      </div>

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">E-Bikes Australia Support</h4>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span>Fast Answers & Orders Desk</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex gap-1.5 overflow-x-auto text-[11px]">
            {quickPrompts.slice(0, 2).map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-700 hover:border-emerald-600 hover:text-emerald-700 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Ask a question or inquire about order..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 text-slate-900"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
