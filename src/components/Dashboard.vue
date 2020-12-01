<template>
  <div class="px-2">
    <div class="row mx-0 my-2">
      <div class="col">
        <div class="h-100 d-flex align-items-center">
          <h1 class="page-title m-0">Dashboard</h1>
        </div>
      </div>
      <div class="col-auto pt-1"></div>
    </div>
    <hr />
    <div class="row m-0 mb-3">
      <div class="alert alert-success" role="alert">
        Items: {{ items.length }}
      </div>
    </div>

    <div class="col-12">
      <div class="card p-0 mb-5">
        <div class="card-header">
          <div class="row">
            <div class="col">
              <h4>Top credits users</h4>
            </div>
            <div class="col-auto">
              <router-link to="/item-add" class="sublink"
                >Add Item</router-link
              >
            </div>
          </div>
        </div>
        <div class="card-body scroll p-0">
          <table class="w-100 table-stripes table">
            <thead>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th class="text-right">Number</th>
              <th class="t">User</th>
              <th width="1px">Price(UGX)</th>
            </thead>
            <tbody>
              <tr v-for="(credit, index) in items" :key="index">
                <td width="1px" class="txt-primary">{{ index + 1 }}</td>
                <td class="text-muted">
                  {{
                    credit.item_name.length > 13
                      ? credit.item_name.substring(0, 12) + "..."
                      : credit.item_name
                  }}
                </td>
                <td class="text-muted">{{
                    credit.description.length > 13
                      ? credit.description.substring(0, 12) + "..."
                      : credit.description
                  }}</td>
                <td class="text-right">
                  <b>{{ credit.number_added }}</b>
                </td>
                <td class>
                  <b class="txt-primary">{{ credit.surname }}</b>
                </td>
                <td class>
                  <b class="txt-primary">{{ credit.price }}</b>
                </td>
                <td class="text-muted">

                  <router-link :to="{name: 'edit', params: { id: credit.id }}"
                  class="btn btn-rounded btn-sm m-0 btn-outline-dark"

                  >View Details
                  </router-link>
                  <!-- <button
                    class="btn btn-rounded btn-sm m-0 btn-outline-dark"
                    @click="viewItem(credit)"
                  >
                    View details
                  </button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <loader :isLoading="loading" />
  </div>
</template>

<script>
import Loader from "../components/Loader";
import axios from "axios";
// import { bus } from "../main.js";

export default {
  name: "adminDashboard",
  props: {
    maID: String,
  },
  components: { Loader },

  data() {
    return {
      loading: false,
      items: [],
      user: sessionStorage.getItem("token"),
    }
  },
  mounted: function () {
    this.getItems(this)
  },
  methods: {
    showDetails(index) {
      this.itemSelected = this.credits[index];
    },
    getItems(dataObj) {
      console.log('here')

      dataObj.loading = true;

      axios
        .get("http://localhost:5000/api/v1/items", {
          headers: { Authorization: "Bearer " + this.user },
        })
        .then(function (response) {
          dataObj.items = response.data

          dataObj.loading = false
        })
        .catch(function (error) {
          console.log(error)
          dataObj.loading = false
        });
    },
    viewItem(credit){
      event.preventDefault()
      console.log(credit)
      console.log('dashboard')
      this.$router.push({
          path: '/item/?id='+credit.id,
          props: {new_item:credit}
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.scroll {
  height: 360px;
  overflow: auto;
}

.card.accent {
  color: #fff;
  background-color: #d94a8d;
  border-color: #d94a8d;
}

.card.accent .value {
  color: #fff;
}

.card.used {
  background-color: #edf3f6;
  border-color: #42768a;
  color: #42768a;
}

.card.used .value {
  color: #42768a;
}
</style>
