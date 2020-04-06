<template>
  <form class="blog-entry-form" @submit="submitForm" :id="formId">
    <div class="blog-entry-form__drafts" v-if="!initialEntry.id && drafts">
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
      <template v-if="!entryId || entry.public === 1">
        <blog-button create v-if="entry.id" :text="$strings.updateEntry" :action="submitForm" />
        <blog-button create v-else :text="$strings.postEntry" :action="submitForm" />
        <blog-button create v-if="!entry.id" :text="$strings.saveAsDraft" :action="saveDraft" />
        <blog-button
          destroy
          type="button"
          v-if="entry.id && user.rights.includes('delete_entry')"
          :action="showConfirmationDialog"
          :text="$strings.deleteEntry"
        />
      </template>
      <template v-else>
        <blog-button create :text="$strings.publishDraft" :action="publishDraft" />
        <blog-button create :text="$strings.updateDraft" :action="saveDraft" />
        <blog-button
          destroy
          type="button"
          v-if="entry.id && user.rights.includes('delete_entry')"
          :action="showConfirmationDialog"
          :text="$strings.deleteDraft"
        />
      </template>
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
      title: this.initialEntry.title ? this.initialEntry.title : "",
      body: this.initialEntry.body ? this.initialEntry.body : "",
      tags: this.initialEntry.tags ? this.initialEntry.tags : [],
      entry: this.initialEntry ? this.initialEntry : false,
      editor: false,
      initialized: false,
      confirmationDialogOpen: false,
      public: this.initialEntry.public ? this.initialEntry.public : 1
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

    entryId() {
      return this.entry && this.entry.id ? this.entry.id : false;
    },

    editorId() {
      return `quilljs-editor${this.entryId ? "-" + this.entryId : ""}`;
    },

    formId() {
      return `entry-form${this.entryId ? "-" + this.entryId : ""}`;
    }
  },

  methods: {
    ...mapMutations(["setLoading"]),

    ...mapActions([
      "getEntries",
      "getDrafts",
      "hideEntryForm",
      "setEditMode",
      "setEntryById",
      "setDraftById"
    ]),

    publishDraft(e) {
      this.public = 1;
      this.submitForm(e);
    },

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
          this[this.public === 1 ? "getEntries" : "getDrafts"](true).then(
            () => {
              this.setLoading({ loading: false });
              this.hideEntryForm();
              this[this.public === 1 ? "setEntryById" : "setDraftById"]({
                id: json.id,
                [this.public === 1 ? "entry" : "draft"]: entry
              });
              this.setEditMode({ id: json.id, mode: false });
              localStorage.removeItem(this.formId);
              const routeType = this.public === 1 ? "entry" : "draft";
              if (window.location.pathname !== `/${routeType}/${json.id}`) {
                this.$router.push({ path: `/${routeType}/${json.id}` });
              }
            }
          );
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
        this.title = this.entry.title;
        this.body = this.entry.body;
        this.tags = this.entry.tags;
        this.public = this.entry.public;
        this.editor.setContents(JSON.parse(this.entry.body));
      } else {
        this.entry = false;
        this.public = 0;
        this.loadFormState();
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
