<template>
  <div class="admin-banner">
    <div>
      <input type="text" v-model="heading" :placeholder="$strings.heading" />
    </div>
    <div>
      <input type="text" v-model="caption" :placeholder="$strings.caption" />
    </div>
    <div>
      <blog-image-input v-model="image" type="banner" />
    </div>
    <div>
      <blog-button
        create
        v-if="addLink"
        :text="$strings.add"
        :action="addBanner"
      />
      <blog-button
        create
        v-if="updateLink"
        :text="$strings.update"
        :action="updateBanner"
      />
      <blog-button
        destroy
        v-if="deleteLink"
        :text="$strings.delete"
        :action="deleteBanner"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import BlogButton from "@/components/BlogButton";
import BlogImageInput from "@/components/BlogImageInput";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-banner",

  components: { BlogImageInput, BlogButton },

  props: {
    initial: Object,
    links: Array
  },

  data() {
    return {
      id: this?.initial?.id || 0,
      heading: this?.initial?.heading || "",
      caption: this?.initial?.caption || "",
      image: this?.initial?.image || ""
    };
  },

  computed: {
    ...mapState(["banners"]),

    ...mapGetters(["contextIsReady"]),

    payload() {
      return {
        heading: this.heading,
        caption: this.caption,
        image: this.image
      };
    },

    addLink() {
      return this.link("POST", "banner");
    },

    updateLink() {
      return this.link("PUT", "banner");
    },

    deleteLink() {
      return this.link("DELETE", "banner");
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest"]),

    ...mapMutations(["setBanners"]),

    async addBanner() {
      const { banner } = await this.apiRequest({
        ...this.addLink,
        body: this.payload
      });
      this.setBanners({ banners: [...this.banners, banner] });
    },

    async updateBanner() {
      const { banner } = await this.apiRequest({
        ...this.updateLink,
        body: this.payload
      });
      this.setBanners({
        banners: [
          ...this.banners.map(_banner =>
            _banner.id === banner.id ? banner : _banner
          )
        ]
      });
    },

    async deleteBanner() {
      await this.apiRequest(this.deleteLink);
      this.setBanners({
        banners: [...this.banners.filter(banner => banner.id !== this.id)]
      });
    }
  }
};
</script>

<style lang="scss">
@import "@theme/mixins";

.admin-banner {
  @include admin-list-item;
}
</style>
