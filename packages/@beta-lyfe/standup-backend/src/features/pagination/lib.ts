import { z } from 'zod'

namespace Pagination {
  export const fields = ['page', 'perPage'] as const

  export const defaults = {
    page: 1,
    perPage: 20
  }

  export const schema = z.object({
    page: z
      .string()
      .pipe(z.coerce.number().min(1))
      .optional()
      .default(defaults.page.toString()),
    perPage: z
      .string()
      .pipe(z.coerce.number().max(50).min(1))
      .optional()
      .default(defaults.perPage.toString())
  })

  export type Options = z.infer<typeof schema>

  export type Paginated<T> = {
    data: T[]
    meta: {
      page: number
      perPage: number
      total: number
    }
  }

  type MetaOptions = Options & {
    total: number
  }

  export const paginate = <T>(
    data: T[],
    options: MetaOptions
  ): Paginated<T> => {
    return {
      data,
      meta: options
    }
  }

  export type Single<T> = {
    data: T
  }

  export function single<T>(data: T): Single<T> {
    return {
      data
    }
  }
}

export default Pagination
