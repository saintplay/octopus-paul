<template>
  <tr>
    <td class="has-text-centered team-column">{{ teamNameByCode(match.homeTeam).name | capitalize }}</td>
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
    <td class="has-text-centered team-column">{{ teamNameByCode(match.awayTeam).name | capitalize }}</td>
  </tr>
</template>

<script>
import capitalize from '@/filters/capitalize'
import { teamNameByCode } from '@/objects/team'

export default {
  name: 'match-resume',
  props: {
    match: {
      type: Object,
      default: null
    }
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
    teamNameByCode
  }
}
</script>

<style lang="scss" scoped>
td.team-column {
  min-width: 180px;
}
</style>

