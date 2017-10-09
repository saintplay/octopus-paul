<template>
  <tr>
    <td>{{ rank }}</td>
    <td>{{ team.name | capitalize }}</td>
    <td>{{ team.points }}</td>
    <td>{{ team.won }}</td>
    <td>{{ team.draw }}</td>
    <td>{{ team.lost }}</td>
    <td>{{ team.goalsFor }}</td>
    <td>{{ team.goalsAgainst }}</td>
    <td>{{ team.goalDifference }}</td>
  </tr>
</template>

<script>
import capitalize from '@/filters/capitalize'

export default {
  name: 'position',
  props: {
    rank: {
      Number,
      default: 0
    },
    team: {
      type: Object,
      default: null
    }
  },
  filters: {
    capitalize
  }
}
</script>

<style lang="scss" scoped>
td {
  background-color: rgba(255, 255, 255, 0.4); 
}
</style>
