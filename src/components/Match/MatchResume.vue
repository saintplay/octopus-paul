<template>
  <tr>
    <td>{{ match.homeTeam }}</td>
    <td>{{ match.results.homeTeamGoals }}</td>
    <td>{{ match.results.awayTeamGoals }}</td>
    <td>{{ match.awayTeam }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    match: {
      type: Object,
      default: null
    }
  },
  name: 'match-resume'
}
</script>
