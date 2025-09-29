// Chatbot Component
const Chatbot = ({ isOpen, setIsOpen }) => {
    const [messages, setMessages] = useState([
        { 
            type: 'bot', 
            text: 'Hi! I\'m your TripBuddy assistant. I can help with destination recommendations, cost calculations, and travel guidance. How can I assist you today?',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = { 
            type: 'user', 
            text: inputText,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate bot thinking time
        await new Promise(resolve => setTimeout(resolve, 1000));

        const botResult = ChatbotAPI.getResponse(inputText);
        const botMessage = {
            type: 'bot',
            text: botResult.success ? botResult.response : 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
    };

    const clearChat = () => {
        setMessages([
            { 
                type: 'bot', 
                text: 'Chat cleared! How can I help you plan your next trip?',
                timestamp: new Date()
            }
        ]);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg floating-widget transition-all z-50"
                title="Open TripBuddy Assistant"
            >
                <i className="fas fa-comments text-xl"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center pulse-dot">
                    !
                </span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                <div className="flex items-center">
                    <i className="fas fa-robot mr-2"></i>
                    <span className="font-semibold">TripBuddy Assistant</span>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={clearChat}
                        className="text-white hover:text-gray-300 transition-colors"
                        title="Clear chat"
                    >
                        <i className="fas fa-trash text-sm"></i>
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-gray-300 transition-colors"
                        title="Close chat"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            message.type === 'user' ? 'text-right' : 'text-left'
                        }`}
                    >
                        <div
                            className={`inline-block max-w-xs p-3 rounded-lg text-sm ${
                                message.type === 'user'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                            style={{ whiteSpace: 'pre-line' }}
                        >
                            {message.text}
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 ${
                            message.type === 'user' ? 'text-right' : 'text-left'
                        }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="text-left">
                        <div className="inline-block bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            TripBuddy is typing...
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask about destinations, costs..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={isTyping || !inputText.trim()}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-2 rounded-lg transition-all"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};