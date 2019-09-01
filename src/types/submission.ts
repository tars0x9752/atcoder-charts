/* eslint camelcase: 0 */

export interface Submission {
  id: number
  epoch_second: number
  problem_id: string
  contest_id: string
  user_id: string
  language: string
  point: number
  length: number
  result: Result
  execution_time: number
}

export enum Result {
  AC = 'AC',
  WA = 'WA',
  TLE = 'TLE',
  CE = 'CE',
  RE = 'RE',
}
