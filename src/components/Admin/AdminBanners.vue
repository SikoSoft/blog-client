<template>
  <div class="admin-banners">
    <admin-banner
      v-for="banner in banners"
      :key="banner.id"
      :initial="banner"
      :links="banner.links"
    />
    <fieldset>
      <legend>{{ $strings.newBanner }}</legend>
      <admin-banner :links="links" />
    </fieldset>
  </div>
</template>

<script>
import AdminBanner from "@/components/Admin/AdminBanner";

export default {
  name: "admin-banners",

  components: { AdminBanner },

  props: {
    banners: Array,
    links: Array
  }
};
</script>
