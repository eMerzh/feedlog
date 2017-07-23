 export default function two_digits(value)
 {
  if (value.toString().length <= 1) {
    return '0' + value.toString();
  } else {
    return value.toString();
  }
}
