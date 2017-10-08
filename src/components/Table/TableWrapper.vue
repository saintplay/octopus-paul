<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <h3 class="title is-3">Tabla Posiciones CONMEBOL</h3>
          <table class="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>EQUIPO</th>
                <th>PTS</th>
                <th>PG</th>
                <th>PE</th>
                <th>PP</th>
                <th>GF</th>
                <th>GC</th>
                <th>DF</th>
              </tr>
            </thead>
            <tbody>
              <position v-for="(team, teamIndex) in teams" :key="team.code" :team="team" :rank="teamIndex + 1"/>
            </tbody>
          </table>
        </div>

        <div v-if="currentEvent === eventCodes.journey" class="column column-30 column-offset-10">
          <h3 class="title is-3">Partidos de la Jornada {{ currentJourney.journeyNumber | twoDigitalize }}</h3>
          <table class="table journey-matches-table">
            <tbody>
              <match-resume v-for="match in currentJourney.matches" :key="match.homeTeam + match.awayTeam" :match="match"/>
            </tbody>
          </table>
        </div>
      </div>

      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <nav class="level">
            <div class="level-item has-text-centered">
              <button class="button is-info" :disabled="currentEvent === eventCodes.start" @click="previousEvent()">Anterior</button>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">{{ eventToSpanish(currentEvent) }}</p>
                <p v-if="currentEvent === eventCodes.journey" class="title">{{ currentJourney.journeyNumber | twoDigitalize }}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <button class="button is-primary"  :disabled="currentEvent === eventCodes.end" @click="nextEvent()">Siguiente</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Position from './Position'
import MatchResume from '../Match/MatchResume'
import { eventCodes, eventToSpanish } from '@/objects/qualifierEvent'
import twoDigitalize from '@/filters/twoDigitalize'
import { teamNameByCode, setScoresToZero } from '@/objects/team'

export default {
  name: 'table-wrapper',
  created () {
    this.journeys = require('__static/data/CONMEBOL/calendar').rounds[0].fixture
    this.teams = require('__static/data/CONMEBOL/teams')
    setScoresToZero(this.teams)
  },
  mounted () {
    this.currentJourney = this.journeys[0]
  },
  data () {
    return {
      currentEvent: eventCodes.journey,
      currentJourney: {
        journeyNumber: 0
      },
      journeys: [],
      matches: [],
      teams: [],
      eventCodes
    }
  },
  filters: {
    twoDigitalize
  },
  methods: {
    previousEvent () {
      const journeyNumber = this.currentJourney.journeyNumber - 1
      const journeyIndex = journeyNumber - 1

      this.currentJourney = this.journeys[journeyIndex]
    },
    nextEvent () {
      const journeyNumber = this.currentJourney.journeyNumber + 1
      const journeyIndex = journeyNumber - 1

      this.currentJourney = this.journeys[journeyIndex]

      this.currentJourney.matches.forEach((match) => {
        let homeTeam = teamNameByCode(match.homeTeam, this.teams)
        let awayTeam = teamNameByCode(match.awayTeam, this.teams)

        homeTeam.goalsFor += match.results.homeTeamGoals
        awayTeam.goalsAgainst += match.results.homeTeamGoals

        awayTeam.goalsFor += match.results.awayTeamGoals
        homeTeam.goalsAgainst += match.results.awayTeamGoals

        if (match.results.homeTeamGoals > match.results.awayTeamGoals) {
          homeTeam.won ++
          awayTeam.lost ++

          homeTeam.points += 3
        } else if (match.results.homeTeamGoals < match.results.awayTeamGoals) {
          homeTeam.lost ++
          awayTeam.won ++

          awayTeam.points += 3
        } else {
          homeTeam.draw ++
          awayTeam.draw ++

          homeTeam.points += 1
          awayTeam.points += 1
        }
      }, this)
    },
    eventToSpanish
  },
  components: {
    Position,
    MatchResume
  }
}
</script>

<style lang="scss" scoped>
table.journey-matches-table {
  min-width: 420px;
}
</style>

