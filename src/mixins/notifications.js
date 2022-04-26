import { Notify } from 'quasar'

export default function () {
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

  return {
    showNotification
  }
}
