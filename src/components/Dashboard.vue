<template>
  <div class="dashboard">
    <h1 class="heading">Inventory Management System</h1>
    <h2>Dashboard</h2>
    <div class="overview">
      <h3>Overview</h3>
      <div class="flex">
        <div class="card shadow1">
          <h5 id="all">Total Items</h5>
          <p id="all">{{ this.working + this.defective }}</p>
        </div>
        <div class="card shadow1">
          <h5 id="working">Total Working Items</h5>
          <p id="working">{{ this.working }}</p>
        </div>
        <div class="card shadow1">
          <h5 id="defective">Total Defective Items</h5>
          <p id="defective">{{ this.defective }}</p>
        </div>
        <div class="card shadow1">
          <h5 id="assigned">Total Items Assigned</h5>
          <p id="assigned">0</p>
        </div>
      </div>
    </div>
    <div class="buttons">
      <a href="/inventory/add" class="button1">Add Inventory</a>
      <a href="/inventory/view" class="button1">View Inventory</a>
      <a href="/defective/add" class="button1">Mark Defective</a>
      <a href="/transaction/add" class="button1">Assign Inventory</a>
      <a href="/transaction/return" class="button1">Return Inventory</a>
      <a href="/transaction/all" class="button1">View Transactions</a>
    </div>
    <div class="buttons">
      <a @click="logout()" href="/auth" class="button1">Logout</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/index.js";
export default {
  name: "dashboard",
  data: () => ({
    working: null,
    defective: null,
  }),
  methods: {
    logout() {
      store.dispatch("logout");
    },
    async updateDashboard() {
      let result = await axios.get(process.env.VUE_APP_API + "/status/");
      this.working = result.data.working;
      this.defective = result.data.defective;
    },
  },
  mounted: function() {
    this.updateDashboard();
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#all {
  color: #000000;
}
#assigned {
  color: #294;
}
button {
  padding: 20px;
  background: #fff;
  max-width: 360px;
  border-radius: 20px;
  border: 0px solid black;
}
.button1 {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 10px 1em 1em 10px;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
}
.button1:hover {
  color: #000000;
  background-color: #ffffff;
}
.card {
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  margin: 40px 10px;
  width: 300px;
  height: 70px;
}

.highlight {
  font-weight: bold;
  color: #294;
}

.shadow1 {
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
}
#working {
  color: green;
}
#defective {
  color: red;
}
.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.box {
  border-radius: 7px;
  width: 200px;
  background: rgba(255, 255, 255, 0.7);
  /* background-color: rgba(245, 222, 179, 0.2); */
  margin: 10px;
}
.heading {
  font-size: 40px;
}
.overview {
  text-align: center;
  font-size: 30px;
}

.dashboard {
  background-color: #092756;
  height: 96vh;
  padding: 2vh;
}
</style>
