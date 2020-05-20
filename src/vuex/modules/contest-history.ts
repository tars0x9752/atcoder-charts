import axios from 'axios'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/vuex/store'
import {
  RawContestResult,
  ContestResult,
  ContestHistory,
  RawContestHistory,
} from '@/types/contest-history'

const netlifyFunctions = 'https://havefn-atcoder-api.netlify.app/.netlify/functions/'

const httpClient = axios.create({
  baseURL: netlifyFunctions,
})

const formatRawData = (raw: RawContestResult) => {
  const {
    IsRated,
    Place,
    OldRating,
    NewRating,
    Performance,
    InnerPerformance,
    ContestScreenName,
    ContestName,
    EndTime,
  } = raw

  const camel: ContestResult = {
    isRated: IsRated,
    place: Place,
    oldRating: OldRating,
    newRating: NewRating,
    performance: Performance,
    innerPerformance: InnerPerformance,
    contestScreenName: ContestScreenName,
    contestName: ContestName,
    endTime: EndTime,
  }

  return camel
}

@Module({ dynamic: true, name: 'ContestHistoryModule', store, namespaced: true })
class ContestHistoryModule extends VuexModule {
  private contestHistory: ContestHistory | null = null

  get getContestHistory(): ContestHistory | null {
    return this.contestHistory
  }

  @Mutation
  setContestHistory(contestHistory: ContestHistory | null) {
    this.contestHistory = contestHistory
  }

  @Action({ rawError: true })
  async fetchContestHistory(username: string) {
    if (!username) {
      throw new Error('username required')
    }

    const res = await httpClient.get(`/history?user=${username}`)

    const rawContestHistory: RawContestHistory = res.data

    const contestHistory: ContestHistory = rawContestHistory.map(formatRawData)

    this.setContestHistory(contestHistory)
  }
}

export const contestHistoryModule = getModule(ContestHistoryModule)
