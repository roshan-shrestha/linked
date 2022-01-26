import { Actions, Mutations } from '@/store/modules/app/types'
import { Actions as CalendarActions } from '@/store/modules/calendar/types'
import {
  getLanguage,
  getTheme,
  getUpdateInterval,
  setLanguage,
  setTheme, 
  loadSearchIndex,
  setUpdateInterval
} from '@/store/modules/app/helper'

export default {
  async [Actions.INIT_APP](context) {
    const language = await getLanguage()
    const theme = await getTheme()
    await loadSearchIndex()

    await context.dispatch('calendar/' + CalendarActions.SET_CURRENT_WEEK, '', {
      root: true
    })
    
    context.commit(Mutations.SET_LANGUAGE, language)
    context.commit(Mutations.SET_THEME, theme)
  },

  async [Actions.SYNC_UPDATE_INTERVAL](context) {
    const updateInterval = await getUpdateInterval()
    context.commit(Mutations.SET_UPDATE_INTERVAL, updateInterval)
  },

  async [Actions.SET_LANGUAGE](context, language) {
    setLanguage(language).then(() => {
      context.commit(Mutations.SET_LANGUAGE, language)
    })
  },

  async [Actions.SET_THEME](context, theme) {
    setTheme(theme).then(() => {
      context.commit(Mutations.SET_THEME, theme)
    })
  },

  async [Actions.SET_UPDATE_INTERVAL](context, interval) {
    setUpdateInterval(interval).then(() => {
      context.commit(Mutations.SET_UPDATE_INTERVAL, interval)
    })
  }
}
