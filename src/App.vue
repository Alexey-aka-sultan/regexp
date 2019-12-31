<template>
  <div id="app">
    <!-- header -->
    <header class="jumbotron shadow-sm border container">
      <h1 class="display-3 text-center">Регулярные выражения</h1>
    </header>

    <!-- main -->
    <main>
      <!-- menu -->
      <section class="pt-5 pb-5">
        <div class="container">
          <div id="symbol-classes" class="row pb-2">
            <div
              class="symbol-classes__item d-flex justify-content-center align-items-center bg-secondary text-white m-1 rounded-circle"
              v-for="(item, i) in symbolClasses"
              :key="i"
              @click="appendSymbolClass(item.name)"
              :title="item.desc"
              data-toggle="tooltip"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- menu-header -->
          <div class="row justify-content-end pb-4">
            <!-- regexp -->
            <div class="col-12 col-sm-6 d-flex align-items-center">
              <code class="regexp border-bottom border-top w-100 pt-1 pb-1">{{ regexp }}</code>
            </div>
            <!-- pattern -->
            <div class="input-group col-12 col-sm-6">
              <input
                ref="search-input"
                type="search"
                class="form-control"
                v-model="pattern"
                placeholder="type your pattern"
              />
              <div class="input-group-append">
                <button class="input-group-text" @click="textMatch">Search</button>
              </div>
            </div>
          </div>

          <!-- menu-body -->
          <div class="row">
            <!-- result -->
            <div class="col-12 col-lg-8 d-flex position-relative mb-2 mb-lg-0">
                <i class="far fa-times-circle position-absolute" @click="clearResult"></i>
              <div ref="regexp-result" class="regexp-result border shadow-sm w-100 pt-4 p-3 ">
                {{ result }}
              </div>
            </div>
            <!-- replace -->
            <div class="col-6 col-lg-2 form-group mb-0">
              <div class="card shadow-sm h-100">
                <h6 class="card-header text-center">Replace</h6>

                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                  <label style="height: 1em">
                    <code>{{ replaceTo }}</code>
                  </label>
                  <input type="text" class="form-control" v-model="replaceTo" placeholder="replace to" maxlength="12" />
                  <i class=" text-muted">$&amp; $` $' $$</i>
                  <button class="btn btn-secondary border shadow-sm" @click="textReplace">Replace</button>
                </div>
              </div>
            </div>

            <!-- flags -->
            <div class="col-6 col-lg-2 form-group mb-0">
              <div class="card shadow-sm h-100">
                <h6 class="card-header text-center">Select flags</h6>
                <!--  -->
                <div class="card-body d-flex justify-content-center align-items-center">
                  <div>
                    <div class="custom-control custom-switch" v-for="(item, i) in flags" :key="i">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        :id="`${i}-flag`"
                        @input="switchFlag($event, i)"
                      />
                      <label class="custom-control-label" :for="`${i}-flag`">
                        {{ `${i}-flag` }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <componentText></componentText>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import componentText from "./components/componentText";
export default {
  data() {
    return {
      pattern: "",
      flags: { g: "", i: "", m: "", u: "", s: "", y: "" },
      symbolClasses: [
        { name: "\\", desc: "экранирование" },
        { name: "\\d", desc: "цифры" },
        { name: "\\D", desc: "не цифры" },
        { name: "\\s", desc: "пробельные символы, табы, новые строки" },
        { name: "\\S", desc: "все, кроме \\s" },
        { name: "\\w", desc: "латиница, цифры, подчёркивание '_'" },
        { name: "\\W", desc: "все, кроме \\w" },
        { name: "\\b", desc: "граница слова" },
        { name: ".", desc: "любой символ, кроме перевода строки \\n. или любой символ если с флагом s" },
        { name: "^", desc: "совпадение с началом текста" },
        { name: "$", desc: "совпадение с концом текста" },
        { name: "[]", desc: "диапазон значений" },
        { name: "{}", desc: "квантификатор" },
        { name: "()", desc: "скобосная группа" }
      ],
      replaceTo: "",
      result: undefined
    };
  },
  methods: {
    textMatch() {
      this.result = this.text.match(this.regexp);
    },
    textReplace() {
      this.result = this.text.replace(this.regexp, this.replaceTo);
    },
    switchFlag(e, val) {
      e.target.checked ? (this.flags[val] = val) : (this.flags[val] = "");
    },
    clearResult() {
      this.result = "";
    },
    appendSymbolClass(val) {
      const selectionStart = this.$refs["search-input"].selectionStart;
      let arr = this.pattern.split("");
      arr.splice(selectionStart, 0, val);
      this.pattern = arr.join("");
    }
  },
  computed: {
    text() {
      return this.$store.getters.text.trim();
    },
    regexp() {
      const flags = `${this.flags.g}${this.flags.i}${this.flags.m}${this.flags.u}${this.flags.s}${this.flags.y}`;
      try {
        return new RegExp(this.pattern, flags);
      } catch (error) {}
    }
  },
  mounted() {
    //
    this.$refs["regexp-result"].style.height = this.$refs["regexp-result"].getBoundingClientRect().height + "px";
    //
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  components: {
    componentText
  }
};
</script>

<style>
header {
  background-image: url('./assets/images/js.png');
  background-repeat: no-repeat;
  background-position: top center;
}

.custom-control-input,
.custom-control-label {
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  transition: text-shadow 300ms;
}
.custom-control-input:hover,
.custom-control-label:hover {
  text-shadow: 0 0 1px black;
}

#symbol-classes .symbol-classes__item {
  font-size: 16px;
  width: 32px;
  height: 32px;
  box-shadow: 0 3px 3px black;

  cursor: pointer;
  transition: transform 300ms;
}

#symbol-classes .symbol-classes__item:hover {
  transform: translateY(-3px);
}

.regexp {
  font-size: 1rem;
}
.regexp-result {
  min-height: 200px;
  overflow-y: scroll;
  overflow-wrap: break-word;
}

.fa-times-circle {
  right: 35px;
  top: 5px;
  font-size: 22px;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 300ms, transform 300ms;
}
.fa-times-circle:hover {
  transform: scale(1.1);
  opacity: 1;
}

@media (max-width: 576px) {
  h1.display-3 {
    padding-top: 50px;
    font-size: 2.5rem;
  }
}
</style>
