<template>
<div>

    <label class="texto_labels" style="margin-top:10px;">{{title}}</label>

    <div class="box_input_btn">

        <wl-button :ico="'ico-refresh'" :onlyIcon="true" :disable="disable" :title="'Actualizar'"></wl-button>

        <input v-model="textFilter" class="input_text_btn" :disabled="disable" type="text" :name="name" :id="id" :placeholder="placeholder" maxlength="20" />

        <button class="btn_cancel" title="Quitar filtro" v-show="isVisible" @click="clearText()">
            <span class="ico-plus"></span>
        </button>
    </div>
</div>
</template>

<script>
import WlButton from "~/components/WlButton.vue";

export default {
    data() {
        return {
            textFilter: ""
        };
    },
    components: {
        WlButton
    },

    props: {
        title: String,
        name: String,
        placeholder: String,
        id: String,
        disable: false
    },
    computed: {
        isVisible() {
            return this.textFilter.length > 2;
        }
    },
    methods: {
        clearText() {
            this.textFilter = "";
        }
    }
};
</script>

<style>
.btn_cancel {
    flex-basis: 35px;
    background: #fff;
    display: block;
    border: 1px solid #bbb;
    border-left: none !important;
    width: 100%;
    height: 35px;
    color: #666;
    font-size: large;
    font-size-adjust: -webkit- 0.8;
    cursor: pointer;
    overflow: hidden;
}

.btn_cancel:disabled {
    background: #fff;
}

.btn_cancel span {
    display: flex;
    color: #666;
}

.btn_cancel span:before {
    height: 100%;
    width: 100%;
    align-self: center;
    justify-content: center;
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.ico_input_text {
    background: #0f745b;
    color: #fff;
    display: flex;
    justify-content: center;
    font-size: x-large;
    height: 100%;
}

.ico_input_text>span {
    height: 100%;
    display: flex;
}

.ico_input_text>span:before {
    align-self: center;
}
</style>
