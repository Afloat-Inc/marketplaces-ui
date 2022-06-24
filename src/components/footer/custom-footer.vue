<template lang="pug">
.row.justify-center
  q-toolbar(class="text-primary")
    q-toolbar-title
      .row.justify-center.q-pb-md
        div.taxGiving The Company
      ContactInfo
      SocialMedias.q-py-lg
      LinksTabs
      Copyright.q-pb-md
</template>

<script>
import SocialMedias from '../../components/footer/components/social-medias.vue'
import ContactInfo from '../../components/footer/components/contact-info.vue'
import LinksTabs from '../../components/footer/components/links-tabs.vue'
import Copyright from '../../components/footer/components/copyright.vue'
export default {
  name: 'CustomFooter',
  components: {
    SocialMedias,
    ContactInfo,
    LinksTabs,
    Copyright
  }
}
</script>

<style lang="stylus" scoped>
.taxGiving
  margin-left: 0 !important
  margin-right: 0 !important
  font-family: 'Whitney SSm A', 'Whitney SSm B'
  font-style: normal
  font-weight: 500
  font-size: 0.8rem

.logoFullFooter
    height: 65px
    width: 124px
    display: inline-block
    vertical-align: middle
    background: url('../../assets/full-afloat-logo-blue-registered.svg') no-repeat center center
    background-size: contain
</style>
