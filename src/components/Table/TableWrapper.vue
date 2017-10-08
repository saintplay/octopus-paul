<template>
  <div class="container">
    <div class="row">
      <div class="column column-50 column-offset-25">
        <h3>Posiciones Eliminatorias - Sudamérica</h3>
        <table>
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

        <table>
          <tbody>
            <match-resume v-for="match in matches" :key="match.homeTeam + match.awwayTeam" :match="match"/>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Position from './Position'
import MatchResume from '../Match/MatchResume'

export default {
  name: 'table-wrapper',
  mounted () {
    this.matches = require('__static/data/CONMEBOL/calendar').rounds[0].fixture[16].matches
    this.teams = require('__static/data/CONMEBOL/teams')
  },
  data () {
    return {
      matches: [],
      teams: []
    }
  },
  components: {
    Position,
    MatchResume
  }
}
</script>
