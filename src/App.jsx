import axios from 'axios';
import { useState } from 'react';

function App() {
  const [userMessage, setUserMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [userQuestion, setUserQuestion] = useState('');

  const sendMessage = async () => {
    const ebook = { url: 'https://itbank.co.zw/NguzoAITraining.pdf' };

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
            content: `You are chatbot called NguzoBot. You will not talk about anything outside NguzoAI or in the pdf. Reply users in this message ${userMessage}`,
          },
        ],
      };
      const userQuestion = userMessage;
      const responseChat = await axios.post('https://api.chatpdf.com/v1/chats/message', chatData, {
        headers: { 'x-api-key': 'sec_6JMNi9x0nWy7P9BPjwyVpyuDgM4EXG6a', 'Content-Type': 'application/json' },
        stream: true,
      });
      setUserQuestion(`${userQuestion}`);
      setResponseMessage(`${responseChat.data}`);

      // Clear the userMessage after successfully sending the message
      setUserMessage('');
    } catch (error) {
      console.error(error);
      setResponseMessage('An error occurred while processing the request.');
    }
  };

  return (
    <div className="container mx-auto p-4 space-x-10 flex-col">
      <div className="text-center mb-4 text-5xl text-blue-900">
        <br/>
        <p><b><span className="underline">NguzoAI ChatBot</span></b></p> 
      </div>
      <div className="text-center mb-4 text-1xl text-blue-900">
        <br/>
        <p>Talk to me and ask me anything about NguzoAI.</p>
         <p></p>
        <p>** Press <span> ENTER after typing your question.</span> **</p>
      </div>
      <div className='mb-8  bg-white p-4 rounded-md active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>
        <p className="text-lg" ></p>
      </div>
      <div className=' mb-8 bg-white p-4 rounded-md active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>
        <p className="text-lg input-container">{responseMessage}</p>
      </div>
      <div className="flex mb-4 relative">
        <label className="mr-2 flex items-center flex-grow text-blue-900">
         <h3 className="text-start"></h3> 
          <input
  type="text"
  className="input-container focus:outline-none shadow-teal-700 placeholder:text-gray-200 text-sm text-white p-5 pr-16 rounded-xl bg-neutral-600"
  value={userMessage}
  onChange={(e) => setUserMessage(e.target.value)}    
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }}
/>
       </label>
       
      </div>
    </div>
  );
}
export default App;
