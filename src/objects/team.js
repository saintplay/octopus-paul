import Vue from 'vue/dist/vue.runtime.esm.js'

export function teamNameByCode (teamCode, teamsSource) {
  const teams = teamsSource || require('__static/data/CONMEBOL/teams')
  const team = teams.filter((t) => { return t.code === teamCode })[0]

  return team
}

/**
 *
 * @param {Array} teams
 */

export function setScoresToZero (teams) {
  teams.forEach((team) => {
    Vue.set(team, 'points', 0)
    Vue.set(team, 'won', 0)
    Vue.set(team, 'draw', 0)
    Vue.set(team, 'lost', 0)
    Vue.set(team, 'goalsFor', 0)
    Vue.set(team, 'goalsAgainst', 0)
    Vue.set(team, 'awayGoals', 0)
    Vue.set(team, 'goalDifference', 0)
  })
}
