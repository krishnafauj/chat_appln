import { useEffect, useState, useRef } from 'react';
import { connectSocket, getSocket } from './Connection';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function ChatPage() {
  const location = useLocation();
  const userFromState = location.state?.user || null;
  const user1 = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(''); // Current user email
  const [toEmail, setToEmail] = useState('user2@example.com'); // Receiver email
  const messagesEndRef = useRef(null); // Ref for scrolling

  useEffect(() => {
    setEmail(user1);
    setToEmail(userFromState.email);
  }, [user1, userFromState]);

  useEffect(() => {
    if (!email) return;

    connectSocket();
    const socket = getSocket();

    socket.emit('register', email);

    socket.on('receive-message', (msg) => {
      setMessages((prev) => [...prev, { ...msg, self: false }]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, [email]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const socket = getSocket();

    socket.emit('send-message', {
      toEmail,
      fromEmail: email,
      message,
    });

    setMessages((prev) => [...prev, { from: email, message, self: true }]);
    setMessage('');
  };

  // Scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Chat</h2>

      <div className="mb-2">
        <label className="font-semibold">Your Email: {user1}</label>
      </div>

      <div className="mb-4">
        <label className="font-semibold">To Email: {toEmail}</label>
      </div>

      <div className="flex-1 border border-gray-300 rounded-lg overflow-y-auto p-4 mb-2 bg-white shadow-md">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.self ? 'text-right' : 'text-left mb-2'}>
            <b>{msg.self ? 'You' : msg.from}:</b> <span>{msg.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
      </div>

      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />

        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
