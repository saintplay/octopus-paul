export const eventCodes = {
  start: 'START',
  journey: 'JOR',
  pointsAwarded: 'PAW',
  end: 'END'
}

export function eventToSpanish (eventCode) {
  switch (eventCode) {
    case eventCodes.start:
      return 'Inicio'

    case eventCodes.journey:
      return 'Jornada'

    case eventCodes.pointsAwarded:
      return 'Fuera de la cancha'

    case eventCodes.end:
      return 'Fin'
  }
}
