import { useMutation, useQuery } from "@tanstack/react-query";
import { backend } from "../backend";

export const useCreateRoom = () =>
  useMutation({
    mutationFn: async () => {
      const res = await backend.client.api.consultation.$post()
      const json = await res.json()

      if (json.variant === 'error')
        throw new Error(json.error)

      return json.data
    }
  })

export const useFetchApiToken = (roomId: string) =>
  useQuery({
    queryKey: ['consultation', roomId, 'api-key'],
    queryFn: async () => {
      const res = await backend.client.api.consultation[":id"]["access-token"].$get({
        param: {
          id: roomId
        }
      })

      const json = await res.json()

      if (json.variant === 'error')
        throw new Error(json.error)

      return json.data
    }
  })
