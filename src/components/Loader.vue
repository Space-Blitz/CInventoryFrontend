<template>
  <div class="loader" v-if="isLoading">
    <b-spinner label="Loading..."  variant="primary"></b-spinner>
    <p>Loading..</p>
  </div>
</template>
<script>
export default {
  name: "Loader",
  props: { isLoading: Boolean },
};
</script>
<style lang="scss" scoped>
.loader {
  position: fixed;
  text-align: center;
  top: 40%;
  left: 50%;
  z-index: 1000;
  background-color: #fff;
  padding: 10pt 10pt;
  border-radius: 5pt;
  box-shadow: 0 0 10pt rgba(0, 0, 0, 0.1);
  border: 1px solid #aaa;
  p {
    margin: 0;
    // padding-top: 8pt;
  }
}
</style>