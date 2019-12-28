<template>
  <div id="app">
    <!-- header -->
    <header class="jumbotron container">
      <h1 class="display-3 text-center">Регулярные выражения</h1>
    </header>

    <!-- main -->
    <main>
      <!-- menu -->
      <section class="pt-5 pb-5">
        <div class="container">
          <!-- menu-header -->
          <div class="row justify-content-end pb-4">
            <!-- regexp -->
            <div class="col-6 d-flex align-items-center">
              <code class="regexp border-bottom border-top w-100 pt-1 pb-1">{{ regexp }}</code>
            </div>
            <!-- pattern -->
            <div class="input-group col-6">
              <input
                type="text"
                class="form-control"
                v-model="pattern"
                placeholder="type your pattern"
              />
              <div class="input-group-append">
                <button class="input-group-text" @click="showResult">Search</button>
              </div>
            </div>
          </div>

          <!-- menu-body -->
          <div class="row">
            <!--  -->
            <div class="col-10 d-flex">
              <div ref="regexp-result" class="regexp-result border shadow-sm w-100">
                {{result}}
              </div>
            </div>
            <!-- flags -->
            <div class="col-2 form-group mb-0">
              <div class="card">
                <h6 class="card-header">Select flags</h6>

                <div class="card-body">
                  <div
                    class="custom-control custom-switch"
                    v-for="(flagName, i) in flagNames"
                    :key="i"
                  >
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="`${flagName}-flag`"
                      @input="switchFlag($event, flagName)"
                    />
                    <label class="custom-control-label" :for="`${flagName}-flag`">{{
                      `${flagName}-flag`
                    }}</label>
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
      flagNames: ["g", "i", "m", "u", "s", "y"],
      flags: {
        g: "",
        i: "",
        m: "",
        u: "",
        s: "",
        y: ""
      },
      result: undefined
    };
  },
  methods: {
    showResult() {
      this.result = this.text.match(this.regexp);
    },
    switchFlag(e, val) {
      e.target.checked ? (this.flags[val] = val) : (this.flags[val] = "");
    },
    createRegExp() {}
  },
  computed: {
    text() {
      return this.$store.getters.text;
    },
    regexp() {
      const flags = `${this.flags.g}${this.flags.i}${this.flags.m}${this.flags.u}${this.flags.s}${this.flags.y}`;
      return new RegExp(this.pattern, flags);
    }
  },
  mounted() {
    this.$refs['regexp-result'].style.height = this.$refs['regexp-result'].getBoundingClientRect().height + 'px';
  },
  components: {
    componentText
  }
};
</script>

<style>
.custom-control-input,
.custom-control-label {
  user-select: none;
  cursor: pointer;
}
.custom-control-input:hover,
.custom-control-label:hover {
  font-weight: 600;
}

.regexp {
  font-size: 1rem;
}
.regexp-result {
  overflow-y: auto;
}
</style>
