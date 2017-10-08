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
            <position/>
            <position/>
            <position/>
            <position/>
            <position/>
            <position/>
            <position/>
            <position/>
            <position/>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Position from './Position'

export default {
  name: 'table-wrapper',
  components: {
    Position
  }
}
</script>
