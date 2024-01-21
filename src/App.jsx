import axios from 'axios';
import { useState } from 'react';

function App() {
  const [userMessage, setUserMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const sendMessage = async () => {
    const ebook = { url: 'https://itbank.co.zw/WiseSureCustomerService.pdf' };

    try {
      const responseUrl = await axios.post(
        'https://api.chatpdf.com/v1/sources/add-url',
        ebook,
        { headers: { 'x-api-key': 'sec_6JMNi9x0nWy7P9BPjwyVpyuDgM4EXG6a', 'Content-Type': 'application/json' } }
      );

      const chatData = {
        stream: true,
        sourceId: responseUrl.data.sourceId,
        messages: [
          {
            role: 'user',
            content: userMessage,
          },
        ],
      };

      const responseChat = await axios.post('https://api.chatpdf.com/v1/chats/message', chatData, {
        headers: { 'x-api-key': 'sec_6JMNi9x0nWy7P9BPjwyVpyuDgM4EXG6a', 'Content-Type': 'application/json' },
        stream: true,
      });

      setResponseMessage(`Received message: ${userMessage}, ChatPDF Response: ${responseChat.data}`);

      // Clear the userMessage after successfully sending the message
      setUserMessage('');
    } catch (error) {
      console.error(error);
      setResponseMessage('An error occurred while processing the request.');
    }
  };

  return (
    <div className="container mx-auto p-4 space-x-10 flex-col">
      <div className="text-center mb-4 text-3xl text-blue-800">
        PDF BOT
      </div>
      <div className="flex mb-4 relative">
        <label className="mr-2 flex items-center flex-grow text-blue-900">
         <h3 className="text-start text-4xl">Enter message:</h3> 
          <input
            type="text"
            className="w-full focus:outline-none shadow-teal-700 shadow-xl placeholder:text-gray-200 text-sm text-white p-5 pr-16 rounded-xl bg-neutral-600 "
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
        </label>
        <button
          className="  shadow-teal-700 shadow-md placeholder:text-blue-900 rounded-md  active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
          onClick={sendMessage}
        >
          <h3 className="p-5 text-blue-900">send message</h3>
        </button>
      </div>
      <div className='mb-8 border border-black bg-white p-4 rounded-md active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>
        <p className="text-lg">{responseMessage}</p>
      </div>
    </div>
  );
}

export default App;
