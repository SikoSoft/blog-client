<template>
  <div class="blog-loader">
    <div class="blog-loader__image">
      <div class="blog-loader__pellets">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="blog-loader__pacman">
        <span class="blog-loader__pacman-top"></span>
        <span class="blog-loader__pacman-bottom"></span>
        <span class="blog-loader__pacman-left"></span>
        <div class="blog-loader__pacman-eye"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-loader"
};
</script>

<style lang="scss" scoped>
.blog-loader {
  position: relative;
  height: 10rem;
  width: 100%;

  &__image {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 60px;
    width: 160px;
    margin: 0;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  &__pellets {
    position: absolute;
    left: -5px;
    top: 0;
    height: 60px;
    width: 180px;
    -webkit-animation: animPellets 0.5s infinite linear;
    animation: animPellets 0.5s infinite linear;

    span {
      position: absolute;
      top: 25px;
      height: 12px;
      width: 12px;
      border-radius: 12px;
      background-color: #efefef;

      &:first-child {
        right: 80px;
      }
      &:nth-child(2) {
        right: 40px;
      }
      &:last-child {
        right: 0px;
      }
    }
  }

  &__pacman {
    position: absolute;
    left: 0;
    top: 0;
    height: 60px;
    width: 60px;

    span {
      position: absolute;
      top: 0;
      left: 0;
      height: 60px;
      width: 60px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        height: 30px;
        width: 60px;
        background-color: #fffb16;
      }
    }

    &-top {
      -webkit-animation: animTop 0.5s infinite;
      animation: animTop 0.5s infinite;

      &::before {
        top: 0;
        border-radius: 60px 60px 0px 0px;
      }
    }

    &-bottom {
      -webkit-animation: animBottom 0.5s infinite;
      animation: animBottom 0.5s infinite;

      &::before {
        bottom: 0;
        border-radius: 0px 0px 60px 60px;
      }
    }

    &-left {
      &::before {
        bottom: 0;
        height: 60px !important;
        width: 30px !important;
        border-radius: 60px 0px 0px 60px;
      }
    }

    &-eye {
      position: absolute;
      top: 10px;
      left: 28px;
      height: 7px;
      width: 7px;
      border-radius: 7px;
      background-color: #1c163a;
    }
  }
}

@keyframes animPellets {
  0% {
    -webkit-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }
  100% {
    -webkit-transform: translate(-40px, 0px);
    transform: translate(-40px, 0px);
  }
}

@keyframes animTop {
  0%,
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}

@keyframes animBottom {
  0%,
  100% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
</style>
