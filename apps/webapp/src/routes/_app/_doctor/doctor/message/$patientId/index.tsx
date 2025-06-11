import React, { useState } from 'react'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_doctor/doctor/message/$patientId/'
)({
  component: ChatPage
})

const initialMessages = [
  {
    id: '1',
    sender: 'Patient',
    content: 'Hello, I have a question about my results.',
    timestamp: '2024-09-01 10:00 AM'
  },
  {
    id: '2',
    sender: 'Doctor',
    content: 'Sure, what would you like to know?',
    timestamp: '2024-09-01 10:05 AM'
  },
  {
    id: '3',
    sender: 'Patient',
    content: 'Can you explain the results in more detail?',
    timestamp: '2024-09-01 10:15 AM'
  },
  {
    id: '4',
    sender: 'Doctor',
    content:
      'Of course. Your results show elevated glucose levels, which could indicate diabetes. I recommend a follow-up test.',
    timestamp: '2024-09-01 10:25 AM'
  },
  {
    id: '5',
    sender: 'Patient',
    content:
      'Thanks for the explanation. How should I prepare for the follow-up test?',
    timestamp: '2024-09-01 10:35 AM'
  },
  {
    id: '6',
    sender: 'Doctor',
    content:
      'You should fast for at least 8 hours before the test. Avoid sugary foods and drinks.',
    timestamp: '2024-09-01 10:45 AM'
  },
  {
    id: '7',
    sender: 'Patient',
    content: 'Got it. How long will it take to get the results?',
    timestamp: '2024-09-01 10:55 AM'
  },
  {
    id: '8',
    sender: 'Doctor',
    content:
      'Results typically come in within 24-48 hours. We’ll notify you as soon as they are available.',
    timestamp: '2024-09-01 11:05 AM'
  },
  {
    id: '9',
    sender: 'Patient',
    content: 'Great, thank you for your help!',
    timestamp: '2024-09-01 11:15 AM'
  },
  {
    id: '10',
    sender: 'Doctor',
    content:
      'You’re welcome! If you have any more questions, feel free to reach out.',
    timestamp: '2024-09-01 11:25 AM'
  }
]

function ChatPage() {
  //const { patientId } = useParams({from:""});
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleMessageChange = (e: any) => {
    setNewMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: (messages.length + 1).toString(),
        sender: 'Doctor', // Change to 'Patient' if the current user is a patient
        content: newMessage,
        timestamp: new Date().toLocaleString()
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Chat with Jane Doe</h1>
      <div className="flex flex-col h-80 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-3 rounded-lg max-w-[80%] ${message.sender === 'Doctor' ? 'bg-indigo-100 text-indigo-900 self-end' : 'bg-gray-100 text-gray-900 self-start'}`}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <textarea
          value={newMessage}
          onChange={handleMessageChange}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
          placeholder="Type your message here..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPage
