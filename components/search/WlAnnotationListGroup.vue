<template>
  <div>
    <h3 class="annotation-group">
      <button 
        class="group-toggle"
        @click="toggle"
      >
        <div class="toggle-group-title">
          <span 
            class="ico2-group-icon"
            :class="icon"
          />
          <span class="title">
            {{ title }}
          </span>
        </div>
        <span
          class="toggle-group-icon" 
          :class="[iconToggle]"
        />
      </button>
    </h3>
    <ul
      v-if="show"
      class="document-info_ul"
    >
      <li
        v-for="annotation in annotations"
        :key="annotation.id"
        class="document-info_li"
      >
        <wl-annotation-info
          :annotation="annotation"
          :selected="selected"
          @show-annotation="select($event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import WlAnnotationInfo from '~/components/search/WlAnnotationInfo.vue'

export default {
  components: {
    WlAnnotationInfo,
  },
  props: {
    annotations: {
      type: Array,
      required: true,
    },
    selected: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    iconToggle() {
      return this.show
        ? 'ico-angle-up'
        : 'ico-angle-down'
    }
  },
  methods: {
    select(annotationId) {
      this.$emit('show-annotation', annotationId)
    },
    toggle(){
      this.show = !this.show
    }
  },
}
</script>

<style lang="scss" scoped>
.group-toggle {
  display: flex;
  width: 100%;
  background-color: #fff;
  color: #555;
  justify-content: space-between;
  font-size: 1.2rem;
  border-bottom: 1px solid #555;
}

.group-toggle:hover {
  background: lightgrey;
}

.toggle-group-icon {
  padding: .5em 1em;
}

.title {
  margin-left: 10px;
}

.toggle-group-title {
  padding: .5em 1em;
  text-align: left;
}

.document-info_ul:last-child {
  border-bottom: 1px solid #555 !important;
}
</style>