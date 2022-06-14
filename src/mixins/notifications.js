import { Notify, QSpinnerFacebook, Loading, QSpinnerPuff } from 'quasar'
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
      return this.notifications.showNotification(params)
    },
    showLoading (params) {
      this.notifications.showLoading(params)
    },
    hideLoading () {
      this.notifications.hideLoading()
    }
  }
}

export const showGlobalNotification = ({ message, color = 'green', icon = 'fas fa-times' }) => {
  return Notify.create({
    message,
    color,
    position: 'bottom',
    timeout: 4000,
    actions: [
      { icon: 'notification_important', color: 'white', handler: () => { /* ... */ } }
    ]
  })
}

/**
 * This function is used globally to show loadings in vue2, vue3 and out of quasar components
 * @param {String} message Message to show
 * @param {String} color Text color
 * @param {String} background Background for loading
 * @param {String} type Spinner switcher
 */
export const showGlobalLoading = (props) => {
  let message, color, background, type
  const defaultMessage = 'Please wait a moment...'
  const defaultColor = 'white'
  const defaultBackground = 'gray'
  const defaultType = 'loading'

  if (props) {
    message = props.message || defaultMessage
    color = props.color || defaultColor
    background = props.background || defaultBackground
    type = props.type || defaultType
  } else {
    message = defaultMessage
    color = defaultColor
    background = defaultBackground
    type = defaultType
  }

  // Get spinner
  let spinner
  switch (type) {
  case 'loading':
    spinner = QSpinnerPuff
    break
  case 'listening':
    // spinner = QSpinnerFacebook
    spinner = QSpinnerFacebook
    break
  default:
    spinner = QSpinnerFacebook
  }

  Loading.show({
    spinner,
    spinnerColor: color,
    spinnerSize: 140,
    backgroundColor: background,
    message: `<div class="text-h5">${message}</div>`,
    messageColor: color,
    html: true
  })
}

export const hideGlobalLoading = () => {
  Loading.hide()
}

export function useNotifications () {
  const showNotification = showGlobalNotification
  const showLoading = showGlobalLoading
  const hideLoading = hideGlobalLoading

  return {
    showNotification,
    showLoading,
    hideLoading
  }
}
