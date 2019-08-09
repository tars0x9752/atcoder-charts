import axios from 'axios'
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/vuex/store'
import { Submission } from '@/types/submission'

const httpClient = axios.create({
  baseURL: 'https://kenkoooo.com/atcoder/atcoder-api',
})

@Module({ dynamic: true, name: 'SubmissionModule', store, namespaced: true })
class SubmissionModule extends VuexModule {
  private submissions: null = null

  get getSubmissions(): null {
    return this.submissions
  }

  @Mutation
  setSubmissions(submissions: null) {
    this.submissions = submissions
  }

  @Action({ rawError: true })
  async fetchSubmissions(username: string) {
    try {
      if (!username) {
        throw new Error('username required')
      }

      const res = await httpClient.get('/results', {
        params: {
          user: username,
        },
      })

      const submissions: Submission[] = res.data
    } catch (err) {
      console.log(err)
    }
  }
}

export const submissionModule = getModule(SubmissionModule)
