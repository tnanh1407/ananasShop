import { UAParser } from 'ua-parser-js'

export const parseDevice = (ua?: string) => {
  const parser = new UAParser(ua)

  const browser = parser.getBrowser().name ?? 'Unknown'
  const os = parser.getOS().name ?? 'Unknown'
  const device = parser.getDevice().type ?? 'desktop'

  return `${browser} on ${os} (${device})`
}