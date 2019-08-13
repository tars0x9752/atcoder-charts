export interface RawContestResult {
  IsRated: boolean
  Place: number
  OldRating: number
  NewRating: number
  Performance: number
  InnerPerformance: number
  ContestScreenName: string
  ContestName: string
  EndTime: string
}

export interface ContestResult {
  isRated: boolean
  place: number
  oldRating: number
  newRating: number
  performance: number
  innerPerformance: number
  contestScreenName: string
  contestName: string
  endTime: string
}

export type RawContestHistory = RawContestResult[]

export type ContestHistory = ContestResult[]
