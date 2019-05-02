<template>
  <div class="chip-container">
    <div 
      v-for="(chip, i) of chips" 
      :key="chip.label"
      class="chip" 
    >
      {{ chip }}
      <span 
        class="ico ico2-cross" 
        @click.prevent.stop="deleteChip(i)"
      />
    </div>
    <input 
      v-model="currentInput" 
      class="a_input"
      @keypress.enter="saveChip" 
      @keydown.delete="backspaceDelete"
    >
  </div>
</template>

<script>
export default {
  props: {
    set: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentInput: ''
    }
  },
  computed: {
    chips: {
      get(){
        return this.value
      },
    }
  },
  methods: {
    saveChip() {
      const {chips, currentInput, set} = this;
      ((set && chips.indexOf(currentInput) === -1) || !set) 
        && chips.push(currentInput);
      this.currentInput = ''
      this.updateModel()
    },
    deleteChip(index) {
      this.chips.splice(index, 1)
      this.updateModel()
    },
    backspaceDelete({which}) {
      which == 8 
        && this.currentInput === '' 
        && this.chips.splice(this.chips.length - 1);
      this.updateModel()
    },
    updateModel() {
      this.$emit('input', this.chips)
    }
  },
}
</script>

<style lang="scss" scoped>
.chip-container:focus-within {
  border-color: #38ba8f;
  background: rgb(237, 255, 242);
}

.chip-container {
  width: 100%;
  border: 1px solid #ccc;
  border-color: #ccc;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;

  .chip {
    margin:4px;
    background: #e0e0e0;
    color:blue;
    padding:0px 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display:flex;
    align-items: center;

    i {
      cursor: pointer;
      opacity: .56;
      margin-left:8px;
    }
  }
  input {
    flex: 1 1 auto;
    width:30px;
    border: none;
    outline: none;
    padding:4px;
  }
}

.ico {
  background: red;
  color: grey;
  padding: 0 0 0 8px;
  cursor: pointer;
}
</style>
