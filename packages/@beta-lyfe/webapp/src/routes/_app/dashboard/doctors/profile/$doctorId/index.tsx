import { createFileRoute, Link } from '@tanstack/react-router'
import { Typography } from '@beta-lyfe/ui/components/typography'
import { Button } from '@beta-lyfe/ui/components/shad/ui/button'
import { ChevronLeftIcon, MessageCircleMoreIcon } from 'lucide-react'
import { BackLink } from '@beta-lyfe/ui/components/link'

export const Route = createFileRoute(
  '/_app/dashboard/doctors/profile/$doctorId/'
)({
  component: () => <DoctorProfile />
})

function DoctorProfile() {
  return (
    <main>
      <ChatNavbar />
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-center gap-4 flex-row p-4">
          <img
            className="rounded-[50px] w-[100px] h-[100px]"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          />
          <Typography.Info className="text-lg text-black"></Typography.Info>
        </div>
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Dr. John Doe, MD</h1>
          <p className="py-2">Cardiologist at Salvation hospital Nigeria</p>
        </div>
      </div>

      <div className="text-center pb-5">
        <Link to="/dashboard/chats/$doctorId" params={{ doctorId: '4' }}>
          <Button className="flex-row gap-2">
            Chat Now
            <MessageCircleMoreIcon />
          </Button>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            About Me
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Hello, I'm Dr. John Doe, a passionate and dedicated cardiologist
            with over 15 years of experience in the field. My journey in
            medicine has been driven by a commitment to provide the best care to
            my patients and stay updated with the latest advancements in
            cardiology. When I'm not in the hospital, I enjoy hiking, reading
            medical journals, and spending time with my family.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Specialization
          </h2>
          <p className="text-gray-600">
            <strong>Field:</strong> Cardiology
          </p>
          <p className="text-gray-600">
            <strong>Sub-specialties:</strong> Interventional Cardiology, Heart
            Failure Management
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Experience
          </h2>
          <p className="text-gray-600">
            <strong>Years of Practice:</strong> 15 years
          </p>
          <p className="text-gray-600">
            <strong>Current Hospital:</strong> Heart Care Clinic
          </p>
          <p className="text-gray-600">
            <strong>Previous Positions:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>Senior Cardiologist at City Hospital (2010-2015)</li>
            <li>Cardiology Resident at Health General Hospital (2005-2010)</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Education
          </h2>
          <p className="text-gray-600">
            <strong>Medical School:</strong> Harvard Medical School (Graduated:
            2005)
          </p>
          <p className="text-gray-600">
            <strong>Residency:</strong> Health General Hospital, Cardiology
            (2005-2010)
          </p>
          <p className="text-gray-600">
            <strong>Fellowship:</strong> Advanced Cardiac Care, City Hospital
            (2010-2012)
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>Board Certified in Cardiology</li>
            <li>ACLS (Advanced Cardiovascular Life Support) Certified</li>
            <li>Certified in Interventional Cardiology</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Memberships
          </h2>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>American College of Cardiology</li>
            <li>American Heart Association</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Awards & Recognitions
          </h2>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>Top Cardiologist Award, Health Magazine (2018)</li>
            <li>Excellence in Cardiac Care, City Hospital (2017)</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Patient Reviews
          </h2>
          <p className="text-gray-600">
            <strong>Average Rating:</strong> 4.8/5
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>
              <strong>Jane Smith</strong> -{' '}
              <span className="text-yellow-500">★★★★★</span>
              <p className="text-gray-600">
                Dr. Doe is very knowledgeable and compassionate. He took the
                time to explain my condition and treatment options thoroughly.
              </p>
            </li>
            <li>
              <strong>John Miller</strong> -{' '}
              <span className="text-yellow-500">★★★★☆</span>
              <p className="text-gray-600">
                Great experience overall, but the wait time was a bit long.
              </p>
            </li>
            <li>
              <strong>Emily Davis</strong> -{' '}
              <span className="text-yellow-500">★★★★★</span>
              <p className="text-gray-600">
                Dr. Doe's expertise in cardiology is impressive. I felt very
                comfortable and confident in his care.
              </p>
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Schedule an Appointment
          </h2>
          <p className="text-gray-600">
            <strong>Next Available:</strong> July 15, 2024
          </p>
          <p className="text-gray-600">
            <strong>Contact:</strong> (555) 123-4567
          </p>
        </div>
      </div>
    </main>
  )
}

function ChatNavbar() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full">
        <div className="flex items-center gap-2 bg-primary text-white shadow-md">
          <BackLink className="p-5">
            <ChevronLeftIcon className="size-6 stroke-[3px]" />
          </BackLink>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 size-10 rounded-full overflow-hidden">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="Doctor"
                  className="size-full object-cover"
                />
              </span>
              <Typography.ChatHeading>Dr. John Doe, MD</Typography.ChatHeading>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16" />
    </>
  )
}
