<template>
  <div ref="text" class="p-3 border shadow-sm">
    <span>
      Регулярное выражение состоит из шаблона и необязательных флагов: <kbd>g</kbd>, <kbd>i</kbd>, <kbd>m</kbd>,
      <kbd>u</kbd>, <kbd>s</kbd>, <kbd>y</kbd>.
    </span>
    <br /><span>
      Без флагов и специальных символов, поиск по регулярному выражению аналогичен поиску подстроки.
    </span>
    <br /><span
      >Метод <code>str.match(regexp)</code> ищет совпадения: все, если есть флаг <kbd>g</kbd>, иначе только
      первое.</span
    >
    <br /><span>
      Метод <code>str.replace(regexp, replacement)</code> заменяет совпадения с <code>regexp</code> на
      <code>replacement</code>: все, если у регулярного выражения есть флаг <kbd>g</kbd>, иначе только первое.
    </span>
    <br /><span>
      Метод <code>regexp.test(str)</code> возвращает <code>true</code>, если есть хоть одно совпадение, иначе
      <code>false</code>.
    </span>
    <br /><span>
      Круглые скобки группируют вместе часть регулярного выражения, так что квантификатор применяется к ним в целом.
    </span>
    <br /><span>+7(405)235-78-98 / 1 22 \ 333</span>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("text", this.$refs.text.textContent);
  }
};
</script>

<style></style>
