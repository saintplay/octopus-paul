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
                <th>GV</th>
                <th>DF</th>
              </tr>
            </thead>
            <transition-group name="flip-list" tag="tbody">
              <position v-for="(team, teamIndex) in orderedTeams" :key="team.code" :team="team" :rank="teamIndex + 1"/>
            </transition-group>
          </table>
        </div>

        <div v-if="currentEvent === eventCodes.journey" class="column column-30 column-offset-10">
          <h3 class="title is-3">Partidos de la Jornada {{ currentJourney.journeyNumber + 1 | twoDigitalize }}</h3>
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
                <p v-if="currentEvent === eventCodes.journey" class="title">{{ currentJourney.journeyNumber + 1 | twoDigitalize }}</p>
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
import orderBy from 'lodash.orderby'

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
  data () {
    return {
      currentEvent: eventCodes.start,
      currentJourney: {
        journeyNumber: 0
      },
      journeys: [],
      matches: [],
      teams: [],
      eventCodes
    }
  },
  computed: {
    orderedTeams () {
      return orderBy(this.teams, ['points', 'goalDifference', 'awayGoals'], ['desc', 'desc', 'desc'])
    }
  },
  filters: {
    twoDigitalize
  },
  methods: {
    previousEvent () {
      if (this.currentEvent === eventCodes.end) {
        this.currentEvent = eventCodes.journey
      }

      const journeyNumber = this.currentJourney.journeyNumber - 1

      if (this.currentJourney.journeyNumber === 0) {
        this.currentEvent = eventCodes.start
      }

      this.currentJourney.matches.forEach((match) => {
        let homeTeam = teamNameByCode(match.homeTeam, this.teams)
        let awayTeam = teamNameByCode(match.awayTeam, this.teams)

        homeTeam.goalsFor -= match.results.homeTeamGoals
        awayTeam.goalsAgainst -= match.results.homeTeamGoals

        awayTeam.goalsFor -= match.results.awayTeamGoals
        awayTeam.awayGoals -= match.results.awayTeamGoals
        homeTeam.goalsAgainst -= match.results.awayTeamGoals

        homeTeam.goalDifference -= match.results.homeTeamGoals - match.results.awayTeamGoals
        awayTeam.goalDifference -= match.results.awayTeamGoals - match.results.homeTeamGoals

        if (match.results.homeTeamGoals > match.results.awayTeamGoals) {
          homeTeam.won --
          awayTeam.lost --

          homeTeam.points -= 3
        } else if (match.results.homeTeamGoals < match.results.awayTeamGoals) {
          homeTeam.lost --
          awayTeam.won --

          awayTeam.points -= 3
        } else {
          homeTeam.draw --
          awayTeam.draw --

          homeTeam.points -= 1
          awayTeam.points -= 1
        }
      }, this)

      if (this.currentEvent !== eventCodes.start) {
        this.currentJourney = this.journeys[journeyNumber]
      }
    },
    nextEvent () {
      let journeyNumber = this.currentJourney.journeyNumber + 1

      if (this.currentEvent === eventCodes.start) {
        this.currentEvent = eventCodes.journey
        journeyNumber = 0
      }

      if (this.currentJourney.journeyNumber === this.journeys.length) {
        this.currentEvent = eventCodes.end
        this.currentJourney = { journeyNumber: this.journeys.length }
        return
      }

      this.currentJourney = this.journeys[journeyNumber]

      this.currentJourney.matches.forEach((match) => {
        let homeTeam = teamNameByCode(match.homeTeam, this.teams)
        let awayTeam = teamNameByCode(match.awayTeam, this.teams)

        homeTeam.goalsFor += match.results.homeTeamGoals
        awayTeam.goalsAgainst += match.results.homeTeamGoals

        awayTeam.goalsFor += match.results.awayTeamGoals
        awayTeam.awayGoals += match.results.awayTeamGoals
        homeTeam.goalsAgainst += match.results.awayTeamGoals

        homeTeam.goalDifference += match.results.homeTeamGoals - match.results.awayTeamGoals
        awayTeam.goalDifference += match.results.awayTeamGoals - match.results.homeTeamGoals

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

