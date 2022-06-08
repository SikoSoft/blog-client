<template>
  <div class="admin-setting">
    <blog-type-input
      :id="id"
      :label="label"
      :type="type"
      :listSource="listSource"
      :initialValue="value"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BlogTypeInput from "@/components/BlogTypeInput";

export default {
  name: "admin-setting",

  props: {
    id: { type: String, default: "" },
    label: { type: String, default: "" },
    type: {
      type: String,
      default: "toggle"
    },
    listSource: { type: String, default: "" },
    maxLength: { type: Number, default: 3 },
    initialValue: { type: [String, Number, Boolean] },
    links: Array
  },

  components: {
    BlogTypeInput
  },

  data() {
    return {
      value: this.initialValue ? this.initialValue : 0
    };
  },

  methods: {
    ...mapActions(["setSetting"]),

    handleChange(value) {
      this.setSetting({ links: this.links, id: this.id, value });
    }
  }
};
</script>
