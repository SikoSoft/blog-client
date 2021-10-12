<template>
  <div class="home">
    <blog-entries
      v-if="initialized"
      :type="type"
      :entries="entries[type].list"
    />
  </div>
</template>

<script>
import Entries from "@/shared/Entries.js";

export default { ...Entries, name: "entries-default" };
</script>
