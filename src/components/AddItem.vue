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
            type="text"
            class="form-control"
            v-model="new_item.number_added"
            required
          />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input
            type="text"
            class="form-control"
            v-model="new_item.price"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Add New Item</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { db } from '../firebaseDb';
import axios from "axios";

export default {
  name: "ItemAdd",

  data() {
    return {
    user:sessionStorage.getItem('token'),
      new_item: {
        number_added: "20",
        name: "new item name",
        description: "new item descriptino",
        price: "4000",
      },
    };
  },
  created() {

  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      axios
        .post("http://localhost:5000/api/v1/items",this.new_item,  {
          headers: { Authorization: "Bearer " + this.user }},
        )
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