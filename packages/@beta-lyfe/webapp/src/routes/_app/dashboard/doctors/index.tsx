import { Typography } from '@beta-lyfe/ui/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import { Section } from '../-components/section'
import { $api } from '../../../../lib/backend'

export const Route = createFileRoute('/_app/dashboard/doctors/')({
  component: DoctorsPage
})

const TopBar = () => (
  <Section className="py-6">
    <nav className="flex gap-2 items-center">
      <Typography.PageHeading>Doctors</Typography.PageHeading>
    </nav>
  </Section>
)

const DoctorsListing = () => {
  const { data, status } = $api.useQuery('get', '/api/doctors/')

  if (status === 'error' || status === 'pending') return null

  const doctors = data.results.data

  return (
    <div className="divide-y">
      {doctors.map((doctor) => (
        <div className="px-6 flex items-center gap-4 py-3" key={doctor.id}>
          <div className="size-10 bg-slate-300 rounded-full" />
          <div>
            <Typography.Paragraph>
              {doctor.first_name} {doctor.last_name}
            </Typography.Paragraph>
            <Typography.Info>General practitioner</Typography.Info>
          </div>
        </div>
      ))}
    </div>
  )
}

function DoctorsPage() {
  return (
    <>
      <TopBar />
      <DoctorsListing />
    </>
  )
}
