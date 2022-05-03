import { Notify, useQuasar, QSpinnerFacebook } from 'quasar'

export default function () {
  const $q = useQuasar()

  function showNotification ({ message, color = 'green', icon = 'fas fa-times' }) {
    Notify.create({
      message,
      color,
      position: 'bottom',
      timeout: 4000,
      actions: [
        { icon, color: 'white', handler: () => { /* ... */ } }
      ]
    })
  }

  function showLoading (props) {
    let message, color, background
    const defaultMessage = 'Please wait a moment...'
    const defaultColor = 'white'
    const defaultBackground = 'gray'

    if (props) {
      message = props.message || defaultMessage
      color = props.color || defaultColor
      background = props.background || defaultBackground
    } else {
      message = defaultMessage
      color = defaultColor
      background = defaultBackground
    }

    $q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: color,
      spinnerSize: 140,
      backgroundColor: background,
      message: `<div class="text-h5">${message}</div>`,
      messageColor: color,
      html: true
    })
  }

  function hideLoading () {
    $q.loading.hide()
  }

  return {
    showNotification,
    showLoading,
    hideLoading
  }
}
