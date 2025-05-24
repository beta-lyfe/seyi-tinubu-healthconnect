import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'

export const Route = createFileRoute('/_app/_doctor/doctor/support/')({
  component: DoctorSupportPage
})

const faqs = [
  {
    question: 'How do I access patient records?',
    answer:
      "To access patient records, navigate to the 'Patients' section and select the patient whose records you wish to view."
  },
  {
    question: 'What should I do if I encounter technical issues?',
    answer:
      'Please use the support form below to report technical issues. Our technical team will assist you promptly.'
  },
  {
    question: 'How can I update my availability for consultations?',
    answer:
      "You can update your availability by going to the 'Settings' section and selecting 'Availability'."
  },
  {
    question: 'How do I handle appointment cancellations?',
    answer:
      "Go to the 'Appointments' section and select the appointment you wish to cancel. Follow the prompts to update the status."
  }
]

function DoctorSupportPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Support request submitted:', { name, email, subject, message })
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Doctor Support / Help</h1>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50"
            >
              <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Support Form 
      <section>
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </section>*/}

      {/* Resource Links */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a
              href="/docs/doctor-guide"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Doctor’s Guide
            </a>
          </li>
          <li>
            <a
              href="/docs/technical-support"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Technical Support Documentation
            </a>
          </li>
          <li>
            <a
              href="/docs/appointment-management"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Appointment Management
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default DoctorSupportPage
