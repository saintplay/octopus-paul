<template>
  <tr>
    <td class="has-text-centered team-column">{{ teamNameByCode(match.homeTeam) | capitalize }}</td>
    <td class="has-text-centered">
      <strong>
        {{ match.results.homeTeamGoals }}
      </strong>
      <span>
        -
      </span>
      <strong>
        {{ match.results.awayTeamGoals }}
      </strong>
    </td>
    <td class="has-text-centered team-column">{{ teamNameByCode(match.awayTeam) | capitalize }}</td>
  </tr>
</template>

<script>
import capitalize from '@/filters/capitalize'

export default {
  name: 'match-resume',
  props: {
    match: {
      type: Object,
      default: null
    }
  },
  created () {
    this.teams = require('__static/data/CONMEBOL/teams')
  },
  data () {
    return {
      teams: []
    }
  },
  filters: {
    capitalize
  },
  methods: {
    teamNameByCode (teamCode) {
      const team = this.teams.filter((t) => { return t.code === teamCode })[0]
      return team.name
    }
  }
}
</script>

<style lang="scss" scoped>
td.team-column {
  min-width: 180px;
}
</style>

