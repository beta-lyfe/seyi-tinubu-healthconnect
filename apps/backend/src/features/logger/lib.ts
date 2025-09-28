import { type ILogObj, Logger as TslogLogger } from 'tslog'

export const Logger = new TslogLogger<ILogObj>({ name: 'App', type: 'pretty' })
