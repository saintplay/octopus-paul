export default function capitalize (value) {
  if (isNaN(value)) {
    return value
  }

  const numericValue = Number.parseInt(value)
  return numericValue < 10 ? `0${value}` : value
}
