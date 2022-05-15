import { Notify, useQuasar, QSpinnerFacebook } from 'quasar'

export default {
  data () {
    return {
      notifications: undefined
    }
  },
  beforeMount () {
    this.notifications = useNotifications()
  },
  methods: {
    showNotification (params) {
      this.notifications.showNotification(params)
    },
    showLoading (params) {
      this.notifications.showLoading(params)
    },
    hideLoading () {
      this.notifications.hideLoading()
    }
  }
}

export function useNotifications () {
  const $q = useQuasar()

  function showNotification ({ message, color = 'green', icon = 'fas fa-times' }) {
    Notify.create({
      message,
      color,
      position: 'bottom',
      timeout: 4000,
      actions: [
        { icon: 'notification_important', color: 'white', handler: () => { /* ... */ } }
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
