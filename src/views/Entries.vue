<template>
  <div class="home">
    <blog-entries v-if="initialized" :entries="entries" />
  </div>
</template>

<script>
import Entries from "@/shared/Entries.js";

export default { ...Entries, name: "entries-default" };
</script>
