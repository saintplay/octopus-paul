<template>
  <tr>
    <td class="centering-column">&nbsp;</td>
    <td class="has-text-centered">
      <img src="/static/img/blank.gif" :class="'flag flag-' + match.homeTeam.toLowerCase()">
    </td>
    <td class="has-text-centered team-column">
      {{ teamNameByCode(match.homeTeam).name | capitalize }}
    </td>
    <td v-if="!noStarted" class="has-text-centered">
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
    <td v-else>
      <strong>{{ match.date | trimDate }}</strong>
    </td>
    <td class="has-text-centered team-column">
      {{ teamNameByCode(match.awayTeam).name | capitalize }}
    </td>
    <td class="has-text-centered">
      <img src="/static/img/blank.gif" :class="'flag flag-' + match.awayTeam.toLowerCase()">
    </td>
    <td class="centering-column">&nbsp;</td>
  </tr>
</template>

<script>
import capitalize from '@/filters/capitalize'
import trimDate from '@/filters/trimDate'
import { teamNameByCode } from '@/objects/team'

export default {
  name: 'match-resume',
  props: {
    match: {
      type: Object,
      default: null
    },
    noStarted: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      teams: []
    }
  },
  filters: {
    capitalize,
    trimDate
  },
  methods: {
    teamNameByCode
  }
}
</script>

<style lang="scss" scoped>
td.team-column {
  min-width: 100px;
}

td.centering-column {
  min-width: 90px;
}
</style>

