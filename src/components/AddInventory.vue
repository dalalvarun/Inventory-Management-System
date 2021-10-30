<template>
  <div class="main">
    <h1 class="heading">Inventory Management System</h1>
    <div class="form">
      <div class="title">Add Inventory</div>
      <div>Duplicates will be merged!</div>
      <div v-if="this.warning" class="warning">
        Warning: Name cannot be empty!
      </div>
      <div v-if="this.warning2" class="warning">
        Warning: Enter appropriate quantity!
      </div>
      <div class="input-container ic1">
        <input
          id="firstname"
          class="input"
          v-model="this.inventory.name"
          type="text"
          placeholder=" "
        />
        <div class="cut"></div>
        <label for="firstname" class="placeholder">Inventory Name</label>
      </div>
      <div class="input-container ic2">
        <input
          id="lastname"
          class="input"
          v-model="this.inventory.quantity"
          type="number"
        />
        <div class="cut cut-short"></div>
        <label for="lastname" class="placeholder">Quantity</label>
      </div>
      <div>
        <br />
        <p>Type:</p>
        <form>
          <input
            type="radio"
            id="working"
            checked
            v-model="this.inventory.status"
            name="fav_language"
            value="WORKING"
          />
          <label for="working">Working</label> &nbsp;
          <input
            type="radio"
            id="defective"
            v-model="this.inventory.status"
            name="fav_language"
            value="DEFECTIVE"
          />
          <label for="defective">Defective</label><br />
        </form>
        <div v-if="this.success" class="success">Added Succesfully✔️</div>
      </div>
      <button type="text" @click="submit()" class="submit">
        Add Inventory
      </button>
      <button @click="goToHome()" type="text" class="submit">Go Back</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Add Inventory",
  methods: {
    goToHome() {
      // console.log(this.inventory);
      this.$router.push("/");
    },
    reset2() {
      this.warning = false;
      this.warning2 = false;
      this.success = false;
    },
    reset() {
      this.warning = false;
      this.warning2 = false;
      this.success = false;
      this.inventory = {
        name: "",
        quantity: 0,
        status: "WORKING",
      };
    },
    submit: async function() {
      if (this.inventory.name && this.inventory.quantity > 0) {
        await axios.post(
          process.env.VUE_APP_API + "/inventory/add",
          this.inventory
        );
        this.reset();
        let x = this.reset2;
        this.success = true;
        setTimeout(function() {
          x();
        }, 3000);
      } else {
        let x = this.reset2;
        if (!this.inventory.name) {
          this.warning = true;
          setTimeout(function() {
            x();
          }, 3000);
        } else if (this.inventory.quantity < 1) {
          this.warning2 = true;
          setTimeout(function() {
            x();
          }, 3000);
        }
      }
    },
  },
  data: () => ({
    warning: false,
    warning2: false,
    success: false,
    inventory: {
      name: "",
      quantity: 0,
      status: "WORKING",
    },
  }),
};
</script>

<style scoped>
.success {
  background-color: green;
  padding: 8px;
  border-radius: 10px;
}
.warning {
  margin-top: 10px;
  background-color: red;
  border-radius: 5px;
  padding: 5px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.main {
  background: #092756;
  height: 100%;
  min-height: 96vh;
  padding: 2vh;
}
body {
  align-items: center;
  background-color: #000;
  display: flex;
  justify-content: center;
  height: 100vh;
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
  color: #eee;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: #eee;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}
.heading {
  font-size: 40px;
}
.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 115px;
}

.cut-short {
  width: 70px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 19px;
  text-align: center;
  width: 100%;
  font-family: Poppins;
}

.submit:active {
  background-color: #06b;
}
</style>
