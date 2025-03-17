import { Typography } from '@beta-lyfe/ui/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import { Section } from '../-components/section'
import { $api, client } from '../../../../lib/backend'
import { Loader2Icon } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

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

const fetchDoctors = async ({ page }: { page: string }) => {
  const res = await client.GET('/api/doctors/', {
    params: {
      query: {
        page
      }
    }
  })

  if (res.error) {
    throw new Error(res.error.message)
  }

  return res.data
}

type DoctorsQueryResult = Awaited<ReturnType<typeof fetchDoctors>>

const DoctorsListing = () => {
  const { ref, inView: isInView } = useInView({
    threshold: 0,
    rootMargin: '500px'
  })

  const { data, status, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<DoctorsQueryResult>({
      initialPageParam: '1',
      queryKey: ['doctors', 'get'],
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) return null

        const url = new URL(lastPage.next)
        const nextPage = url.searchParams.get('page')
        if (!nextPage) return null

        return nextPage
      },
      queryFn: ({ pageParam }) => fetchDoctors({ page: pageParam as string })
    })

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [isInView, isFetchingNextPage, hasNextPage, fetchNextPage])

  if (status === 'error' || status === 'pending') return null

  const doctors = data.pages.reduce(
    (acc, curr) => acc.concat(curr.results.data),
    [] as Awaited<ReturnType<typeof fetchDoctors>>['results']['data']
  )

  return (
    <div>
      <div className="divide-y">
        {doctors.map((doctor) => (
          <div className="px-6 flex items-center gap-4 py-3" key={doctor.id}>
            <div className="size-10 bg-slate-300 rounded-full">
              {/*<img
                src={doctor.profile_picture_url}
                alt={`${doctor.first_name} ${doctor.last_name}`}
              />*/}
            </div>
            <div>
              <Typography.Paragraph>
                {doctor.first_name} {doctor.last_name}
              </Typography.Paragraph>
              <Typography.Info>General practitioner</Typography.Info>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-6" ref={ref}>
        {isFetchingNextPage && (
          <Loader2Icon className="animate-spin size-5 stroke-primary" />
        )}
      </div>
    </div>
  )
}

function DoctorsPage() {
  return (
    <div className="flex flex-col h-dvh">
      <TopBar />
      <div className="grow overflow-scroll">
        <DoctorsListing />
      </div>
    </div>
  )
}
