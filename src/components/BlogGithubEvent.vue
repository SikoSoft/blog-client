<template>
  <li class="blog-github-event">
    <a class="blog-github-event__link" :href="url">
      <span class="blog-github-event__icon" v-html="octiconSvg"></span>
      {{ message }}
    </a>
  </li>
</template>

<script>
import octicons from "@primer/octicons";

export default {
  name: "blog-github-event",

  props: ["id", "type", "repo", "payload"],

  computed: {
    octicon() {
      switch (this.type) {
        case "IssuesEvent":
          return "issue-opened";
        case "IssueCommentEvent":
          return "comment";
        case "PushEvent":
          return "git-commit";
        case "CreateEvent":
          return "git-branch";
        case "DeleteEvent":
          return "trashcan";
        case "PullRequestEvent":
          return "git-pull-request";
        default:
          return "alert";
      }
    },

    octiconSvg() {
      return octicons[this.octicon].toSVG({ width: 24, height: 24 });
    },

    repoName() {
      return this.repo.name.replace(/.*\//, "");
    },

    repoUrl() {
      return `https://github.com/${this.repo.name}`;
    },

    refName() {
      return this.payload.ref;
    },

    refType() {
      return this.payload.ref_type;
    },

    action() {
      if (this.payload.action === "closed") {
        return this.$strings.closed;
      } else {
        return this.$strings.opened;
      }
    },

    title() {
      return this.payload.pull_request ? this.payload.pull_request.title : "";
    },

    message() {
      return this.$strings.githubEventTypes[this.type]
        .replace("{repo}", this.repoName)
        .replace("{issue}", this.issueName)
        .replace("{desc}", this.commitDesc)
        .replace("{refName}", this.refName)
        .replace("{refType}", this.refType)
        .replace("{action}", this.action)
        .replace("{title}", this.title);
    },

    issueName() {
      if (this.type === "IssuesEvent" || this.type === "IssueCommentEvent") {
        return this.payload.issue.title;
      }
      return "";
    },

    commitDesc() {
      if (this.type === "PushEvent") {
        return this.payload.commits[0].message;
      }
      return "";
    },

    url() {
      switch (this.type) {
        case "IssuesEvent":
          return this.payload.issue.html_url;
        case "IssueCommentEvent":
          return this.payload.issue.html_url;
        case "PushEvent":
          return `${this.repoUrl}/commit/${this.payload.head}`;
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-github-event {
  padding: $space-xsmall 0;
  border: 1px;

  &__icon {
    border: 1px #444 solid;
    background-color: #222;
    border-radius: 4px;
    vertical-align: middle;
    height: 24px;
    display: inline-block;
    margin: 0 8px 8px 0;

    path {
      fill: #fff;
    }
  }

  &__link {
    color: $color-link-primary;
  }
}
</style>
