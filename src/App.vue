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
              <input type="text" class="form-control" v-model="pattern" placeholder="type your pattern" />
              <div class="input-group-append">
                <button class="input-group-text" @click="textMatch">Search</button>
              </div>
            </div>
          </div>

          <!-- menu-body -->
          <div class="row">
            <!-- result -->
            <div class="col-8 d-flex">
              <div ref="regexp-result" class="regexp-result border shadow-sm w-100 p-3 position-relative">
                {{ result }}
                <i class="far fa-times-circle position-absolute" @click="clearResult"></i>
              </div>
            </div>
            <!-- replace -->
            <div class="col-2 form-group mb-0">
              <div class="card h-100">
                <h6 class="card-header text-center">Replace</h6>

                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                  <input type="text" class="form-control mb-1" v-model="replaceTo" placeholder="replace to" />
                  <button class="btn btn-secondary" @click="textReplace">Replace</button>
                </div>
              </div>
            </div>

            <!-- flags -->
            <div class="col-2 form-group mb-0">
              <div class="card h-100">
                <h6 class="card-header text-center">Select flags</h6>
                <!--  -->
                <div class="card-body d-flex justify-content-center">
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
    }
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
    this.$refs["regexp-result"].style.height = this.$refs["regexp-result"].getBoundingClientRect().height + "px";
  },
  components: {
    componentText
  }
};
</script>

<style>
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

.regexp {
  font-size: 1rem;
}
.regexp-result {
  overflow-y: auto;
}

.fa-times-circle {
  right: 10px;
  top: 10px;
  font-size: 22px;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 300ms, transform 300ms;
}
.fa-times-circle:hover {
  transform: scale(1.1);
  opacity: 1;
}
</style>
