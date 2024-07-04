import { useMutation } from "@tanstack/react-query";
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
