import * as loglevel from "loglevel"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prettyJson = (write: any): string => JSON.stringify(write, null, 2)

export const log = loglevel
log.setDefaultLevel("debug")

export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
