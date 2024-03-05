import { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = new WebSocket('ws://localhost:8765');

    newWs.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  const sendMessage = () => {
    if (currentMessage && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Real-Time Chat</h1>
      <ul className="mb-4">
        {messages.map((message, index) => (
          <li key={index} className="bg-gray-200 rounded-md p-2 my-2">{message}</li>
        ))}
      </ul>
      <div className="flex">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white rounded-md p-2">
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
