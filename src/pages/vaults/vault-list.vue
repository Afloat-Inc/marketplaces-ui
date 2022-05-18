<template lang="pug">
#container
  .text-h5 Vault List
  q-btn(
    label="go to details"
    :to="{ name: 'vaultDetails' }"
  )
</template>

<script>
export default {
  name: 'VaultList'
}
</script>
