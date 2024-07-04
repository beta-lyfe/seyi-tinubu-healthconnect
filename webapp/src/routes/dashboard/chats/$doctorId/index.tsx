import { Input } from '@/components/input'
import { BackLink } from '@/components/link'
import { Typography } from '@/components/typography'
import { cn } from '@/shad/lib/utils'
import { Button } from '@/shad/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronLeftIcon, PaperclipIcon, SearchIcon, SendHorizonalIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/chats/$doctorId/')({
  component: DoctorChatPage
})

function ChatNavbar() {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full"
      >
        <div
          className="flex items-center gap-2 bg-primary text-white shadow-md"
        >
          <BackLink
            className="p-5"
          >
            <ChevronLeftIcon className="size-6 stroke-[3px]" />
          </BackLink>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 size-10 rounded-full overflow-hidden">
                <img
                  src="/images/doctors/john-doe.png"
                  alt="Doctor"
                  className="size-full object-cover" />
              </span>
              <Typography.ChatHeading>
                Reginald Goodseed
              </Typography.ChatHeading>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16" />
    </>
  )
}

type Message = {
  sender: string
  recipient: string
  message: string
  attachments: string[]
  dateSent: string
  readReceipt: boolean
}

const chats = [
  {
    sender: "patient",
    recipient: "doctor",
    message: "Hi Dr. Reginald, I have a question about my allergies.  It seems like my medication isn't working as well as it used to.",
    attachments: [],
    dateSent: "2024-03-29",
    readReceipt: false,
  },
  {
    sender: "doctor",
    recipient: "patient",
    message: "Hi Sarah, thanks for reaching out. I'm happy to help! Can you tell me more about what symptoms you're experiencing and how long it's been going on?",
    attachments: [],
    dateSent: "2024-03-29",
    readReceipt: true,
  },
  {
    sender: "patient",
    recipient: "doctor",
    message: "Sure, for the past few weeks I've been having more frequent sneezing and my eyes get itchy in the mornings.  I started taking the medication in January.",
    attachments: [],
    dateSent: "2024-03-29",
    readReceipt: false,
  },
  {
    sender: "doctor",
    recipient: "patient",
    message: "I see. It's possible your allergies may have changed or become more sensitive.  Would you like to schedule an appointment to discuss this further and potentially adjust your medication?",
    attachments: [],
    dateSent: "2024-03-29",
    readReceipt: false,
  },
  {
    sender: "patient",
    recipient: "doctor",
    message: "Yes, I'd like to schedule an appointment if possible.  Is there anything specific I should bring with me?",
    attachments: [],
    dateSent: "2024-03-29",
    readReceipt: false,
  },
  {
    sender: "doctor",
    recipient: "patient",
    message: "Absolutely!  There's no need to bring anything specific, but if you have any past allergy test results or the name of the medication you're currently taking, that would be helpful.  We have a few openings next week, would Tuesday at 11 am or Thursday at 3 pm work for you?",
    attachments: [],
    dateSent: "2024-03-29",
    readReceipt: false,
  },
  {
    sender: "patient",
    recipient: "doctor",
    message: "Tuesday at 11 am sounds great!  I don't have any past test results, but I can bring the medication bottle.",
    attachments: [],
    dateSent: "2024-03-29",
    readReceipt: false,
  },
  {
    sender: "doctor",
    recipient: "patient",
    message: "Perfect, see you then!  In the meantime, if your symptoms worsen or you experience anything new, don't hesitate to reach out.",
    attachments: [],
    dateSent: "2024-03-29",
    readReceipt: false,
  },
]

function BottomChatSection() {
  return (
    <>
      <div className="h-20" />
      <div className="fixed bottom-0 left-0 p-5 py-2 bg-white w-full">
        <div className="flex gap-2">
          <div
            className="grow"
          >
            <Input
              icon={<PaperclipIcon className="stroke-[3px] text-slate-300 size-5" />}
            />
          </div>
          <Button className="h-auto flex gap-2">
            Send
            <SendHorizonalIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}

function ChatSection() {
  return (
    <div>
      <div className="p-5 grid grid-flow-row gap-4">
        {chats.map(chat => (
          <div
            key={chat.message}
            className={cn(
              "grid grid-flow-col gap-2",
            )}
          >
            <div className={cn(
              "flex flex-col justify-end",
              chat.sender === "patient" && "order-last"
            )}>
              <span
                className={cn(
                  "bg-gray-200 size-10 rounded-full overflow-hidden flex items-center justify-center",
                )}
              >
                {chat.sender === "patient"
                  ? "PP"
                  : (
                    <img
                      src="/images/doctors/john-doe.png"
                      alt="Doctor"
                      className="size-full object-cover align-self-end" />
                  )
                }
              </span>
            </div>
            <div
              className={cn(
                "rounded-lg bg-primary p-2 text-white shadow-md w-[80%]",
                chat.sender === "patient" && "justify-self-end",
                chat.sender === "patient"
                  ? "rounded-br-none"
                  : "rounded-bl-none"
              )}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>
      <BottomChatSection />
    </div >
  )
}

function DoctorChatPage() {
  return (
    <div>
      <ChatNavbar />
      <div>
        <ChatSection />
      </div>
    </div>
  )
}
