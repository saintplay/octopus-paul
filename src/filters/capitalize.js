export default function capitalize (value) {
  if (!value) {
    return ''
  }

  const valueString = value.toString()
  return valueString.charAt(0).toUpperCase() + value.slice(1)
}
