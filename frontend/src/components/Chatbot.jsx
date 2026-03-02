import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Heart, Sparkles, Smile, Bot } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi there! I'm your empathetic AI companion. I'm here to listen, support, and help you navigate your feelings. How are you doing today?",
            sender: 'ai',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Sentiment analysis keywords
    const positiveKeywords = ['happy', 'great', 'good', 'awesome', 'excited', 'wonderful', 'joy', 'better', 'okay'];
    const negativeKeywords = ['sad', 'bad', 'terrible', 'awful', 'depressed', 'crying', 'down', 'upset'];
    const anxiousKeywords = ['anxious', 'worried', 'stressed', 'nervous', 'scared', 'fear', 'afraid', 'panic', 'overwhelmed'];
    const tiredKeywords = ['tired', 'exhausted', 'sleepy', 'fatigue', 'drain', 'burnout'];
    const lonelyKeywords = ['lonely', 'alone', 'isolated'];
    const angerKeywords = ['angry', 'mad', 'frustrated', 'annoyed', 'furious'];

    const analyzeSentimentAndRespond = (text) => {
        const lowerText = text.toLowerCase();

        // Simulate thinking delay
        setTimeout(() => {
            let response = "";

            if (anxiousKeywords.some(kw => lowerText.includes(kw))) {
                response = "I hear how overwhelmed you're feeling right now. It's completely normal to feel anxious. Take a slow, deep breath with me. You don't have to carry this all at once. What's the biggest thing weighing on your mind?";
            } else if (negativeKeywords.some(kw => lowerText.includes(kw))) {
                response = "I'm so sorry you're going through this. It's okay not to be okay. Please know that I'm here to listen without judgment. Do you want to talk more about what's making you feel down?";
            } else if (tiredKeywords.some(kw => lowerText.includes(kw))) {
                response = "You sound really depleted. It's so important to listen to your body and mind when they ask for rest. I hope you can find some time today to just pause and recharge. Be gentle with yourself.";
            } else if (lonelyKeywords.some(kw => lowerText.includes(kw))) {
                response = "Feeling lonely can be incredibly heavy. Even though I'm an AI, I want you to know you're not alone in this moment. I'm right here with you. Would you like to keep chatting?";
            } else if (angerKeywords.some(kw => lowerText.includes(kw))) {
                response = "Your frustration is entirely valid. It's okay to feel angry sometimes; it means a boundary was crossed or an expectation wasn't met. I'm here to hold space for your feelings if you need to vent.";
            } else if (positiveKeywords.some(kw => lowerText.includes(kw))) {
                response = "That's so wonderful to hear! 😊 It's important to celebrate these good moments. I'm really glad you're feeling this way today. What contributed to this positive feeling?";
            } else {
                response = "Thank you for sharing that with me. I'm here for you. How are you holding up with everything else going on? Remember, taking it one step at a time is enough.";
            }

            setMessages(prev => [...prev, {
                id: Date.now(),
                text: response,
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // 1.5 to 2.5 seconds typing delay
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const newUserMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputMessage('');
        setIsTyping(true);

        analyzeSentimentAndRespond(newUserMessage.text);
    };

    return (
        <>
            {/* Floating Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 bg-teal-600 text-white rounded-full shadow-lg shadow-teal-600/30 hover:bg-teal-700 transition-colors flex items-center justify-center group"
                        aria-label="Open Empathetic Chat"
                    >
                        <div className="relative">
                            <MessageCircle className="w-8 h-8" />
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.5, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute -top-1 -right-1 bg-rose-500 rounded-full w-3.5 h-3.5 border-2 border-white"
                            />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute right-full mr-4 bg-white text-slate-800 text-sm py-2 px-4 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium flex items-center gap-2 border border-slate-100">
                            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                            Here to listen
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 flex-shrink-0"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-5 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg leading-tight flex items-center gap-1.5">
                                        Hope <Sparkles className="w-4 h-4 text-yellow-300" />
                                    </h3>
                                    <p className="text-teal-100 text-xs font-medium tracking-wide">Empathetic AI Companion</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors focus:outline-none"
                                aria-label="Close Chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 relative custom-scrollbar">
                            {messages.map((message) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex flex-col max-w-[80%] gap-1 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`px-4 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed ${message.sender === 'user'
                                                    ? 'bg-teal-600 text-white rounded-br-sm'
                                                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium px-1">
                                            {message.timestamp}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center h-10">
                                        <motion.div
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} className="h-1" />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                            <form onSubmit={handleSendMessage} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Share how you're feeling..."
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder:text-slate-400 text-[15px]"
                                    disabled={isTyping}
                                />
                                <button
                                    type="submit"
                                    disabled={inputMessage.trim() === '' || isTyping}
                                    className="absolute right-2 p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                                    <Smile className="w-3 h-3" /> AI empathy simulation. Always here.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
