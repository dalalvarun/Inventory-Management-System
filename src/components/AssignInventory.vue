<template>
  <div class="main">
    <h1 class="title">Inventory Management System</h1>
    <div class="form">
      <h1>Assign Inventory</h1>
      <div v-if="this.warning" class="warning">Please select inventory</div>
      <div v-if="this.warning2" class="warning">Please select quantity</div>
      <div v-if="this.warning3" class="warning">
        Please add Department to be assigned
      </div>

      <input
        placeholder="Department to be assigned"
        class="inputs"
        type="text"
        v-model="data.assignedTo"
        name="assignedTo"
      />
      <select
        v-model="this.selected"
        @change="adjustID()"
        name="product"
        class="inputs"
      >
        <option value="" disabled selected>Select an Inventory...</option>
        <option
          v-for="item in result"
          v-bind:key="{ item }"
          :value="{ item }"
          >{{ item.name }}</option
        >
      </select>

      <select class="inputs" v-if="!this.selected">
        <option value="" disabled selected>Select Inventory first</option>
      </select>

      <select class="inputs" v-else-if="!this.selected.item.workingQuantity">
        <option value="null" disabled selected>Stock Unavaliable</option>
      </select>
      <select v-else v-model="this.data.assignedQty" class="inputs">
        <option value="null" disabled selected>Select Quantity...</option>
        <option
          v-bind:key="{ item }"
          v-for="item in this.selected.item.workingQuantity"
          >{{ item }}</option
        >
      </select>
      <br />
      <div v-if="this.success" class="green">
        Assigned Inventory Succesfully✔️
      </div>
      <div class="buttons">
        <a class="button1" @click="assignInventory()">Assign Inventory</a>
        <a href="/" class="button1">Go Back</a>
      </div>
      <p class="text">
        Note: Today's date would be assigned automatically
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Assign Inventory",
  methods: {
    adjustID() {
      this.data.inventory = this.selected.item._id;
    },
    update() {
      axios.get(process.env.VUE_APP_API + "/inventory/get").then((response) => {
        this.result = JSON.parse(JSON.stringify(response.data.result));
      });
    },
    reset() {
      this.warning = false;
      this.warning2 = false;
      this.warning3 = false;
      this.success = false;
    },
    reset2() {
      this.selected = "";
      this.data = {
        assignedTo: "",
        inventory: "",
        assignedQty: null,
      };
    },
    async assignInventory() {
      // console.log(this.selected);
      this.reset();
      if (!this.data.assignedTo) {
        this.warning3 = true;
      }
      if (!this.data.inventory) {
        this.warning = true;
      }
      if (!this.data.assignedQty) {
        this.warning2 = true;
      }
      let result = await axios.post(
        process.env.VUE_APP_API + "/transaction/add",
        this.data
      );
      if (result.data.message === "success") {
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 5000);
        this.update();
        this.reset2();
      }
    },
  },
  async created() {
    this.update();
  },
  data: () => ({
    result: [],
    selected: "",
    warning: false,
    warning2: false,
    warning3: false,
    success: false,
    data: {
      assignedTo: "",
      inventory: "",
      assignedQty: null,
    },
  }),
};
</script>

<style scoped>
.warning {
  margin: 10px 5px;
  padding: 5px;
  border-radius: 5px;
  width: 350px;
  margin-left: 20px;
  background-color: red;
}
.green {
  margin: 10px 5px;
  padding: 5px;
  border-radius: 5px;
  width: 350px;
  margin-left: 20px;
  background-color: green;
}
.buttons {
  margin-left: 10px;
}
.text {
  margin-left: 15px;
}
.inputs {
  width: 350px;
  margin-left: 20px;
  margin-top: 20px;
  font-family: Poppins;
  font-size: 20px;
  margin-bottom: 20px;
  height: 37px;
  /* padding: 3px; */
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
.form {
  margin-left: 20px;
  margin-top: 20px;
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  max-width: 500px;
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
