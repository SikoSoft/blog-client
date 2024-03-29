<template>
  <form
    class="blog-comment-form"
    @submit="submitForm"
    :id="formId"
    v-if="open"
    :class="{ 'blog-comment-form--hidden': !open }"
  >
    <div class="blog-comment-form__head">
      <h3>{{ $strings.leaveAComment }}</h3>
    </div>
    <div class="blog-comment-form_name">
      <input
        type="text"
        class="blog-comment-form__name"
        v-model="name"
        @keyup="saveFormState"
        :placeholder="$strings.name"
      />
    </div>
    <div class="blog-comment-form__message">
      <div :id="editorId"></div>
    </div>
    <div class="blog-comment-form__buttons">
      <blog-button :action="submitForm" :text="$strings.postComment" />
    </div>
    <div class="blog-comment-form__captcha" v-if="settings.use_captcha">
      {{ $strings.captchaNotice }}
      <div class="blog-comment-form__captcha-links">
        <a
          class="blog-comment-form__captcha-link"
          href="https://policies.google.com/privacy"
          >{{ $strings.privacyPolicy }}</a
        >
        <a
          class="blog-comment-form__captcha-link"
          href="https://policies.google.com/terms"
          >{{ $strings.termsOfService }}</a
        >
      </div>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import Quill from "quill";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-comment-form",

  components: { BlogButton },

  data() {
    return {
      open: true,
      name: "",
      editor: false
    };
  },

  props: {
    entry: { type: Object }
  },

  mounted() {
    this.editor = new Quill(`#${this.editorId}`, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          ["link", "code-block"]
        ]
      }
    });
    if (this.body) {
      this.editor.setContents(JSON.parse(this.body));
    }
    this.editor.on("text-change", () => {
      this.saveFormState();
    });
    if (localStorage.getItem(this.formId)) {
      this.loadFormState();
    }
    this.initialized = true;
  },

  computed: {
    ...mapState(["entryComments", "settings"]),

    editorId() {
      return `quilljs-comment-editor${this.entry.id}`;
    },

    formId() {
      return `comment-form${this.entry.id}`;
    },

    comments() {
      return this.entryComments[this.entry.id] || [];
      //this.$store.getters.commentsByEntry(this.entry.id);
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["addToast", "apiRequest"]),

    ...mapMutations(["setEntryComments", "setComment"]),

    async getCaptchaToken() {
      if (!this.settings.use_captcha || !process.env.VUE_APP_RECAPTCHA_CODE) {
        return Promise.resolve();
      }
      return new Promise(resolve => {
        window.grecaptcha.ready(function() {
          window.grecaptcha
            .execute(process.env.VUE_APP_RECAPTCHA_CODE, {
              action: "postComment"
            })
            .then(token => {
              resolve(token);
            });
        });
      });
    },

    getFormErrors() {
      const errors = [];
      if (!this.name) {
        errors.push(this.$strings.pleaseEnterYourName);
      }
      if (!this.editor.getText().trim()) {
        errors.push(this.$strings.pleaseEnterAMessage);
      }
      return errors;
    },

    async submitForm(e) {
      const errors = this.getFormErrors();
      if (errors.length > 0) {
        errors.forEach(error => {
          this.addToast(error);
        });
      } else {
        const captchaToken = await this.getCaptchaToken();
        const link = this.link("POST", "comment", this.entry.links);
        const response = await this.apiRequest({
          ...link,
          body: {
            entryId: this.entry.id,
            name: this.name,
            message: this.editor.getContents().ops,
            captchaToken
          }
        });
        if (!response.errorCode) {
          localStorage.removeItem(this.formId);
        } else {
          this.addToast(this.$strings.errors[`CODE_${response.errorCode}`]);
        }
        this.setEntryComments({
          entryId: this.entry.id,
          comments: [response.comment, ...this.comments]
        });
        this.setComment({ id: response.comment.id, comment: response.comment });
        this.open = false;
      }
      e.preventDefault();
    },

    saveFormState() {
      if (!this.initialized) {
        return;
      }
      localStorage.setItem(
        this.formId,
        JSON.stringify({
          name: this.name,
          message: this.editor.getContents().ops
        })
      );
    },

    loadFormState() {
      try {
        const state = JSON.parse(localStorage.getItem(this.formId));
        this.name = state.name;
        this.editor.setContents(state.message);
      } catch (e) {
        console.log("corrupt form data", e);
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-comment-form {
  transition: all 0.2s;

  &--hidden {
    opacity: 0;
    height: 0;
  }

  &__message {
    margin: 8px 0;
    border-radius: 4px;
    border: 4px #000 solid;
    background-color: #fff;
    color: #000;
  }

  &__captcha {
    border-top: 1px #444 dotted;
    border-bottom: 1px #444 dotted;
    text-align: center;
    padding: $space-small;
    margin: $space 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05)
    );

    &-links {
      margin-top: $space-small;
    }

    &-link {
      margin: 0 $space-small;
    }
  }

  .ql-editor {
    min-height: 5rem;
  }
}
</style>
