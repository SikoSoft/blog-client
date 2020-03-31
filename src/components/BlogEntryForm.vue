<template>
  <form class="blog-entry-form" @submit="submitForm" :id="formId">
    <div class="blog-entry-form__drafts" v-if="drafts">
      <select @change="loadDraft">
        <option value>{{ $strings.newEntry }}</option>
        <optgroup :label="$strings.unpublishedDrafts">
          <option v-for="draft in drafts" :value="draft.id" :key="draft.id">{{ draft.title }}</option>
        </optgroup>
      </select>
    </div>
    <div class="blog-entry-form__head">
      <h2 v-if="!entry.id">{{ $strings.newEntry }}</h2>
      <h2 v-else>{{ $strings.editEntry }}</h2>
    </div>
    <div class="blog-entry-form_title">
      <input
        type="text"
        class="blog-entry-form__title"
        v-model="title"
        @keyup="saveFormState"
        :placeholder="$strings.title"
      />
    </div>
    <div class="blog-entry-form__body">
      <div :id="editorId"></div>
    </div>
    <div class="blog-entry-form__tags">
      <blog-tag-manager :tags="tags" :api="api" />
    </div>
    <div class="blog-entry-form__buttons">
      <blog-button create v-if="entry.id" :text="$strings.updateEntry" :action="submitForm" />
      <blog-button create v-else :text="$strings.postEntry" :action="submitForm" />
      <blog-button create :text="$strings.saveAsDraft" :action="saveDraft" />
      <blog-button
        destroy
        type="button"
        v-if="entry.id && user.rights.includes('delete_entry')"
        :action="showConfirmationDialog"
        :text="$strings.deleteEntry"
      />
      <blog-confirmation-dialog
        :isOpen="confirmationDialogOpen"
        :title="$strings.deleteEntry"
        :message="$strings.confirmDeleteEntry"
      >
        <blog-button destroy :text="$strings.yes" :action="deleteEntry" />
        <blog-button :text="$strings.no" :action="hideConfirmationDialog" />
      </blog-confirmation-dialog>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Quill from "quill";

import BlogTagManager from "@/components/BlogTagManager.vue";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog.vue";
import BlogButton from "@/components/BlogButton.vue";
import imageHandler from "@/util/imageHandler";

export default {
  name: "blog-entry-form",

  props: ["initialEntry"],

  components: { BlogTagManager, BlogConfirmationDialog, BlogButton },

  data() {
    return {
      entry: this.initialEntry ? this.initialEntry : false,
      editor: false,
      initialized: false,
      confirmationDialogOpen: false,
      public: 1
    };
  },

  mounted() {
    this.getDrafts();
    this.editor = new Quill(`#${this.editorId}`, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          ["link", "image", "video", "code-block"]
        ]
      }
    });
    if (this.body) {
      this.editor.setContents(JSON.parse(this.body));
    }
    imageHandler.setup({
      editor: this.editor,
      uploadImage: this.api.uploadImage,
      headers: this.headers
    });
    this.editor.getModule("toolbar").addHandler("image", () => {
      imageHandler.selectLocalImage();
    });
    this.editor.on("text-change", () => {
      this.saveFormState();
    });
    if (localStorage.getItem(this.formId)) {
      this.loadFormState();
    }
    this.initialized = true;
  },

  computed: {
    ...mapGetters(["api", "headers", "user", "drafts"]),

    title() {
      return this.entry.title ? this.entry.title : "";
    },

    body() {
      return this.entry.body ? this.entry.body : "";
    },

    tags() {
      return this.entry.tags ? this.entry.tags : [];
    },

    editorId() {
      return `quilljs-editor${this.entry.id ? "-" + this.entry.id : ""}`;
    },

    formId() {
      return `entry-form${this.entry.id ? "-" + this.entry.id : ""}`;
    }
  },

  methods: {
    ...mapMutations(["setLoading"]),

    ...mapActions([
      "getEntries",
      "getDrafts",
      "hideEntryForm",
      "setEditMode",
      "setEntryById"
    ]),

    saveDraft(e) {
      this.public = 0;
      this.submitForm(e);
    },

    submitForm(e) {
      const bodyDelta = this.editor.getContents().ops;
      const entry = {
        title: this.title,
        body: bodyDelta,
        tags: this.tags,
        public: this.public
      };
      this.setLoading({ loading: true });
      fetch(this.entry.api.save.href, {
        method: this.entry.api.save.method,
        headers: this.headers,
        body: JSON.stringify(entry)
      })
        .then(response => response.json())
        .then(json => {
          this.getEntries(true).then(() => {
            this.setLoading({ loading: false });
            this.hideEntryForm();
            this.setEntryById({ id: json.id, entry });
            this.setEditMode({ id: json.id, mode: false });
            localStorage.removeItem(this.formId);
            if (window.location.pathname !== `/entry/${json.id}`) {
              this.$router.push({ path: `/entry/${json.id}` });
            }
          });
        });
      e.preventDefault();
    },

    deleteEntry() {
      fetch(this.entry.api.delete.href, {
        method: this.entry.api.delete.method,
        headers: this.headers
      })
        .then(response => response.json())
        .then(() => {
          this.getEntries(true);
        });
    },

    setTags(tags) {
      this.tags = tags;
      this.saveFormState();
    },

    saveFormState() {
      if (!this.initialized) {
        return;
      }
      localStorage.setItem(
        this.formId,
        JSON.stringify({
          title: this.title,
          body: this.editor.getContents().ops,
          tags: this.tags
        })
      );
    },

    loadFormState() {
      try {
        const state = JSON.parse(localStorage.getItem(this.formId));
        this.title = state.title;
        this.editor.setContents(state.body);
        this.tags = state.tags;
      } catch (e) {
        console.log("corrupt form data", e);
      }
    },

    showConfirmationDialog() {
      this.confirmationDialogOpen = true;
    },

    hideConfirmationDialog() {
      this.confirmationDialogOpen = false;
    },

    loadDraft(e) {
      if (e.target.value) {
        this.entry = this.$store.getters.draftById(e.target.value);
        this.editor.setContents(JSON.parse(this.entry.body));
      } else {
        this.entry = false;
        this.editor.setContents([]);
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-entry-form {
  margin: 16px 0;

  input,
  button,
  &__body {
    margin: 8px 0;
    border-radius: 4px;
    border: 4px #000 solid;
    background-color: #fff;
    color: #000;
  }

  .blog-entry-form__title {
    font-size: 2rem;
    width: 36rem;
    max-width: 100%;
    box-sizing: border-box;
  }

  .blog-entry-form__tags {
  }

  .ql-editor {
    min-height: 10rem;
    font-family: $font-family;
    font-size: $font-large;
  }
}
</style>
