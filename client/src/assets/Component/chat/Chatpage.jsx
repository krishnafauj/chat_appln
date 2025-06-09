import { useEffect, useState } from 'react';
import { connectSocket, getSocket } from './Connection';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('user1@example.com'); // Current user email
  const [toEmail, setToEmail] = useState('user2@example.com'); // Receiver email

  useEffect(() => {
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

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>

      <div className="mb-2">
        <label>
          Your Email:
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-1 ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label>
          Send To:
          <input
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            className="border p-1 ml-2"
          />
        </label>
      </div>

      <div className="border h-64 overflow-y-auto p-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.self ? 'text-right' : 'text-left'}>
            <b>{msg.self ? 'You' : msg.from}:</b> {msg.message}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
}

export default ChatPage;
