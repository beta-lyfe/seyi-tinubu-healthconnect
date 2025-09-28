import { createFileRoute, useRouter, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_doctor/doctor/message/')({
  component: MessagesPage
})

import React, { useState } from 'react'

const initialMessages = [
  {
    id: '1',
    sender: 'Patient A',
    content: 'I have a question about my test results.',
    timestamp: '2024-09-01 10:00 AM'
  },
  {
    id: '2',
    sender: 'Patient B',
    content: 'Can I schedule a follow-up appointment?',
    timestamp: '2024-09-01 11:30 AM'
  },
  {
    id: '3',
    sender: 'Patient C',
    content: 'I need to discuss my medication dosage.',
    timestamp: '2024-09-01 01:00 PM'
  },
  {
    id: '4',
    sender: 'Patient D',
    content: 'Can you provide more details about my diagnosis?',
    timestamp: '2024-09-02 09:15 AM'
  },
  {
    id: '5',
    sender: 'Patient E',
    content: 'I’m experiencing side effects from the treatment.',
    timestamp: '2024-09-02 10:45 AM'
  },
  {
    id: '6',
    sender: 'Patient F',
    content: 'How long will the recovery process take?',
    timestamp: '2024-09-03 02:30 PM'
  },
  {
    id: '7',
    sender: 'Patient G',
    content: 'Is it safe to travel while on this medication?',
    timestamp: '2024-09-03 04:00 PM'
  },
  {
    id: '8',
    sender: 'Patient H',
    content: 'I have a new symptom I’d like to discuss.',
    timestamp: '2024-09-04 11:00 AM'
  },
  {
    id: '9',
    sender: 'Patient I',
    content: 'Could you clarify the dietary restrictions?',
    timestamp: '2024-09-04 03:30 PM'
  },
  {
    id: '10',
    sender: 'Patient J',
    content: 'When should I come in for a follow-up visit?',
    timestamp: '2024-09-05 09:00 AM'
  }
]

function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [currentMessage, setCurrentMessage] = useState('')
  const [response, setResponse] = useState('')
  const router = useRouter()

  const handleResponseChange = (e: any) => {
    setResponse(e.target.value)
  }

  const handleSendResponse = (messageId: number) => {
    // Logic to send the response
    console.log(`Responding to message ${messageId}: ${response}`)
    setResponse('')
    setCurrentMessage('') // Reset the current message after sending the response
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="overflow-x-auto scrollbar-none">
        <table className="min-w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((message, index) => (
              <tr
                key={message.id}
                onClick={() => router.history.push(`/doctor/message/${index}`)}
                className="hover:cursor-pointer select-none"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {message.sender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {message.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MessagesPage
