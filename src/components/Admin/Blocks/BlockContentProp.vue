<template>
  <div class="admin-block-content-prop">
    <blog-type-input
      :id="id"
      :label="label"
      :type="type"
      :initialValue="value"
      @change="handleChange"
    />
  </div>
</template>

<script>
import BlogTypeInput from "@/components/BlogTypeInput";

export default {
  name: "admin-block-content-prop",

  components: { BlogTypeInput },

  props: {
    id: String,
    label: String,
    type: String,
    value: [String, Number]
  },

  methods: {
    handleChange(value) {
      console.log("handleChange", value);
    }
  }
};
</script>
