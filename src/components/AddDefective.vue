<template>
  <div class="main">
    <h1 class="title">Inventory Management System</h1>
    <h1>Mark as Defective</h1>
    <div class="form">
      <p>
        Select an existing product to mark it as defective:
      </p>
      <div v-if="this.warning" class="warning">Please select inventory</div>
      <div v-if="this.warning2" class="warning">Please select quantity</div>
      <select
        v-model="this.selected"
        @change="adjustID()"
        name="product"
        class="dropdown"
      >
        <option value="" disabled selected>Select an Inventory...</option>
        <option
          v-for="item in result"
          v-bind:key="{ item }"
          :value="{ item }"
          >{{ item.name }}</option
        >
      </select>
      <select class="dropdown" v-if="!this.selected">
        <option value="" disabled selected>Select Inventory first</option>
      </select>
      <select class="dropdown" v-else-if="!this.selected.item.workingQuantity">
        <option value="null" disabled selected>Stock Unavaliable</option>
      </select>
      <select v-else v-model="this.inventory.quantity" class="dropdown">
        <option value="null" disabled selected>Select Quantity...</option>
        <option
          v-bind:key="{ item }"
          v-for="item in this.selected.item.workingQuantity"
          >{{ item }}</option
        >
      </select>
      <br />
      <div v-if="this.success" class="success">
        Marked as Defective Succesfully✔️
      </div>
      <a @click="markAsDefective" class="button1">Mark as defective</a>
      <a href="/" class="button1">Go Back</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "add Defective",
  data: () => ({
    result: [],
    warning: false,
    warning2: false,
    success: false,
    selected: "",
    inventory: {
      id: "",
      quantity: null,
    },
  }),
  created: async function() {
    this.update();
  },
  methods: {
    update() {
      axios.get(process.env.VUE_APP_API + "/inventory/get").then((response) => {
        this.result = JSON.parse(JSON.stringify(response.data.result));
      });
    },
    adjustID() {
      this.inventory.id = this.selected.item._id;
    },
    reset() {
      this.warning = false;
      this.warning2 = false;
      this.success = false;
    },
    reset2() {
      this.selected = "";
      this.inventory = {
        id: "",
        quantity: null,
      };
    },
    async markAsDefective() {
      this.reset();
      if (!this.selected) {
        this.warning = true;
        return;
      }
      if (!this.inventory.quantity) {
        this.warning2 = true;
        return;
      }
      let result = await axios.post(
        process.env.VUE_APP_API + "/defect/add",
        this.inventory
      );
      if (result.data.message === "success") {
        this.success = true;
        this.update();
        this.reset2();
      }
    },
  },
};
</script>

<style scoped>
.form {
  margin-left: 20px;
  margin-top: 20px;
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  max-width: 900px;
}
.warning {
  margin: 10px 5px;
  padding: 5px;
  border-radius: 5px;
  width: 200px;
  margin-left: 20px;
  background-color: red;
}
.success {
  margin: 10px 5px;
  padding: 5px;
  border-radius: 5px;
  width: 300px;
  margin-left: 20px;
  background-color: green;
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
  color: white;
  text-align: center;
  transition: all 0.2s;
}
.button1:hover {
  color: #000000;
  background-color: #ffffff;
}

.dropdown {
  width: 25vw;
  margin-left: 20px;
  margin-top: 20px;
  font-family: Poppins;
  font-size: 20px;
  margin-bottom: 20px;
}
p {
  font-size: 20px;
}
.title {
  font-size: 40px;
}
.main {
  background: #092756;
  height: 100%;
  min-height: 96vh;
  padding: 2vh;
}
</style>
