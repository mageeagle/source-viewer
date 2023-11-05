export default function regainPointer () {
    if (!(
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i)
    )) {
      document.exitPointerLock()
    }
  }