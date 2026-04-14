import React, { useState } from 'react';

const ShrineSeekerUI = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "🗡️ Shrine Seeker Compendium is online. What knowledge do you seek?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // This will point to your local FastAPI server running the MLX model
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', text: data.reply }]);
    } catch (error) {
      console.error("Failed to connect to the Sheikah Slate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
      {/* Main Chat Container - Styled like a Sheikah Slate */}
      <div className="w-full max-w-2xl h-[85vh] flex flex-col bg-slate-800 rounded-3xl border-[3px] border-cyan-700 shadow-[0_0_30px_rgba(8,_145,_178,_0.4)] overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 border-b-2 border-cyan-800 p-4 flex justify-between items-center">
          <h1 className="text-cyan-400 text-xl font-bold tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
            SHRINE SEEKER
          </h1>
          <div className="text-cyan-600 text-sm">v70.B</div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('/path-to-subtle-sheikah-pattern.png')] bg-cover">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-yellow-700 text-orange-50 rounded-br-none shadow-md' 
                  : 'bg-slate-900 text-cyan-100 border border-cyan-600 rounded-bl-none shadow-[0_0_15px_rgba(8,145,178,0.2)]'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 text-cyan-400 border border-cyan-600 p-4 rounded-2xl rounded-bl-none animate-pulse">
                Accessing Compendium...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-slate-900 border-t-2 border-cyan-800">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Hyrule..."
              className="flex-1 bg-slate-800 text-cyan-100 placeholder-cyan-700 border border-cyan-700 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-[0_0_10px_rgba(8,145,178,0.5)] disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShrineSeekerUI;
