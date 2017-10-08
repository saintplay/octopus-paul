<template>
  <tr>
    <td>{{ rank }}</td>
    <td>{{ team.name | capitalize }}</td>
    <td>{{ points }}</td>
    <td>{{ won }}</td>
    <td>{{ draw }}</td>
    <td>{{ lost }}</td>
    <td>{{ goalsFor }}</td>
    <td>{{ goalsAgaint }}</td>
    <td>{{ goalDifference }}</td>
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
    },
    points: {
      Number,
      default: 0
    },
    won: {
      Number,
      default: 0
    },
    draw: {
      Number,
      default: 0
    },
    lost: {
      Number,
      default: 0
    },
    goalsFor: {
      Number,
      default: 0
    },
    goalsAgaint: {
      Number,
      default: 0
    }
  },
  computed: {
    goalDifference () {
      return this.goalsFor - this.goalsAgaint
    }
  },
  filters: {
    capitalize
  }
}
</script>
