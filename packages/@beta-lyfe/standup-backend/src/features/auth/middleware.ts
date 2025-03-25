import type { MiddlewareHandler } from 'hono'
import type { User } from './types'
import { AuthServiceImpl } from './service'
import { APIResponse, StatusCodes } from '../http'

namespace AuthMiddleware {
  export const middleware: MiddlewareHandler<{
    Variables: {
      user: User
    }
  }> = async (c, next) => {
    const authService = new AuthServiceImpl()

    const authHeader = c.req.header('authorization')
    if (!authHeader)
      return c.json(
        APIResponse.err('Invalid token!', StatusCodes.UNAUTHORIZED),
        {
          status: StatusCodes.UNAUTHORIZED
        }
      )

    const [, accessToken] = authHeader.split(' ')
    if (!accessToken)
      return c.json(
        APIResponse.err('Invalid token!', StatusCodes.UNAUTHORIZED),
        {
          status: StatusCodes.UNAUTHORIZED
        }
      )

    const res = await authService.getUserProfile(accessToken)

    if (res.isErr) {
      return c.json(APIResponse.err('Invalid token!', StatusCodes.UNAUTHORIZED))
    }

    const maybeUser = res.value

    if (maybeUser.isNothing)
      return c.json(
        APIResponse.err('Invalid token!', StatusCodes.UNAUTHORIZED),
        {
          status: StatusCodes.UNAUTHORIZED
        }
      )

    const user = maybeUser.value

    c.set('user', user)

    await next()
  }
}

export { AuthMiddleware }
