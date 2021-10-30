<template>
  <div class="main">
    <h1 class="title">Inventory Management System</h1>
    <h3>View all the transactions of inventories here.</h3>
    <div class="overview">
      <h3>Overview</h3>
      <div class="flex">
        <div class="card shadow1">
          <h5 id="all">Total Assigned items</h5>
          <p id="all">{{ "2" }}</p>
        </div>
        <div class="card shadow1">
          <h5 id="working">Active Transactions</h5>
          <p id="working">{{ "5" }}</p>
        </div>
        
      </div>
    </div>
    <table>
      <col style="width:35%">

      <thead>
        <tr>
          <th class="wide-row">Name</th>
          <th>Assigned Qty</th>
          <th>Department</th>
          <th>Status</th>
          <th>Assigned On</th>
          <th>Returned On</th>
        </tr>
      </thead>

      <tbody>
        <tr v-bind:key="index" v-for="(record, index) in transactions">
          <td>{{this.names[index]}}</td>
          <td>{{ record.assignedQty }}</td>
          <td >{{ record.assignedTo }}</td>
          <td >{{ record.status }}</td>
          <td >{{ record.assignedOn.split('T')[0]}}</td>
          <td >{{ record.returnedOn ? record.returnedOn : "-" }}</td>
        </tr>
      </tbody>
    </table>
    <a href="/" class="button1">Go Back</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "View Transactions",
  methods: {
    async update() {
      let result = await axios.get(
        process.env.VUE_APP_API + "/transaction/all"
      );
      this.transactions = result.data.reverse();
      for(let i =0; i<this.transactions.length;i++)
      {
        //   console.log(this.transactions[i].inventory);
          let id = this.transactions[i].inventory;
         let temp = await axios.post(process.env.VUE_APP_API + "/inventory/getByID",{id});
         this.names.push(temp.data.name);
      }
    //   console.log(this.names)
    },
    async getName(id)
    {
        let result = await axios.post(process.env.VUE_APP_API + "/inventory/getByID",id);
        // console.log(result);
        return result;
    }
  },
  data: () => ({
    transactions: [],
    names:[],
  }),
  mounted() {
    this.update();
  },
};
</script>

<style scoped>
.card {
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  margin: 40px 10px;
  width: 300px;
  height: 70px;
  color: #000000;
}
.overview {
  text-align: center;
  font-size: 30px;
}
.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.shadow1 {
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
}
table {
  width: 90%;
  margin-left: 4%;
  margin-right: 4%;
  border-right-color: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  /* /* border: 1px solid #343a40; */
  border-collapse: collapse;
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
th,
td {
  /* border: 1px solid #343a40; */
  padding: 16px 24px;
  text-align: left;
  color: black;
}

th {
  background-color: #087f5b;
  color: #fff;
  width: 13vw;
}

tbody tr:nth-child(odd) {
  background-color: #f8f9fa;
}

tbody tr:nth-child(even) {
  background-color: #e9ecef;
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
