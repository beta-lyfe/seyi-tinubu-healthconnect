import { useQuery } from '@tanstack/react-query'
import doctorJohnDoe from '@beta-lyfe/webapp/assets/images/doctors/john-doe.png'
import doctorAnnaMichaels from '@beta-lyfe/webapp/assets/images/doctors/anna-michaels.png'
import doctorMariaWatts from '@beta-lyfe/webapp/assets/images/doctors/maria-watts.png'

export type Doctor = {
  id: string
  first_name: string
  last_name: string
  specialty: string
  image_url: string
}



const useGetDoctors = () =>
  useQuery({
    queryKey: ['backend', 'api', 'doctors', 'get'],
    queryFn: (): Doctor[] => {
      return [
        {
          id: '1',
          first_name: 'Goodseed',
          last_name: 'Reginald',
          specialty: 'Prosthetitian',
          image_url: doctorJohnDoe
        },
        {
          id: '2',
          first_name: 'Anna',
          last_name: 'Michaels',
          specialty: 'Paediatritian',
          image_url: doctorAnnaMichaels
        },
        {
          id: '3',
          first_name: 'Maria',
          last_name: 'Watts',
          specialty: 'Geriatritian',
          image_url: doctorMariaWatts
        }
      ]
    }
  })

export default {
  useGetDoctors
}
