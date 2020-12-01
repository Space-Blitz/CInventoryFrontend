<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Update new_item</h3>
      <form @submit.prevent="onUpdateForm">
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="new_item.name"
            required
          />
        </div>

        <div class="form-group">
          <label>Description</label>
          <input
            type="text"
            class="form-control"
            v-model="new_item.description"
            required
          />
        </div>

        <div class="form-group">
          <label>Quantity</label>
          <input
            type="number"
            class="form-control"
            v-model="new_item.number_added"
            required
          />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input
            type="number"
            class="form-control"
            v-model="new_item.price"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Edit Item</button>
        </div>
        
      </form>
      <div class="form-group">
          <button class="btn btn-danger btn-block"
          @click="deleteItem"
          >Delete Item</button>
        </div>
    </div>
  </div>
</template>

<script>
// import { db } from '../firebaseDb';
import axios from "axios";

export default {
  name: "ItemEdit",

  data() {
    return {
      user: sessionStorage.getItem("token"),
      new_item:{
        number_added: "",
        name: "",
        description: "",
        price: "",
      }
    };
  },
  created() {
    //   console.log(this.$route.params)

      this.getItem(this, this.$route.params.id)
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      console.log(this.new_item)
      console.log('edit page')
      axios
        .put("http://localhost:5000/api/v1/items/"+this.new_item.id, this.new_item, {
          headers: { Authorization: "Bearer " + this.user },
        })
        .then(() => {
          this.loading = false;

          this.errorMessage = "";
          this.successMessage = "successfully added.";
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error;
          this.successMessage = "";
        });
    },
    getItem(dataObj, id) {
      console.log('here')

      dataObj.loading = true;

      axios
        .get("http://localhost:5000/api/v1/items/"+id, {
          headers: { Authorization: "Bearer " + this.user },
        })
        .then(function (response) {
          dataObj.new_item = response.data[0];

          dataObj.loading = false
        })
        .catch(function (error) {
          console.log(error)
          dataObj.loading = false
        });
    },
    deleteItem(event) {
      event.preventDefault();
      axios
        .delete("http://localhost:5000/api/v1/items/"+this.new_item.id,{
          headers: { Authorization: "Bearer " + this.user },
        })
        .then(() => {
          this.loading = false;

          this.errorMessage = "";
          this.successMessage = "successfully added.";
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.loading = false;
          this.errorMessage = error;
          this.successMessage = "";
        });
    },
  },
};
</script>