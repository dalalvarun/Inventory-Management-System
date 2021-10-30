<template>
  <div class="main">
    <h1 class="title">Inventory Management System</h1>
    <h3>Return Inventories here</h3>
    <h3>Only non returned inventories shown here</h3>
    <div v-if="this.success" class="green">
        Returned Inventory Succesfully✔️
      </div>
      <h1 class="overview" v-if="this.n===0"> No Records Found</h1>
  <table v-else>
      <col style="width:35%">

      <thead>
        <tr>
          <th class="wide-row">Name</th>
          <th>Assigned Qty</th>
          <th>Department</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody  v-bind:key={index} v-for="(record, index) in transactions">
        <tr v-bind:key="index" v-if="record.status===`Assigned`"  >
          
          <td>{{this.names[index]}}</td>
          <td>{{ record.assignedQty }}</td>
          <td >{{ record.assignedTo }}</td>
          <td><button class="inputs" @click="returnInventory(record._id)">Return</button></td>
        </tr>
      </tbody>
    </table>
    <a href="/" class="button1">Go Back</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Return Inventory",
  data: () => ({
    transactions: [],
    names:[],
    n:0,
    success:false,
  }),
  mounted() {
    this.update();
  },
  methods: {
    async update() {
      let result = await axios.get(
        process.env.VUE_APP_API + "/transaction/all"
      );
      this.transactions = result.data.reverse();
      for(let i =0; i<this.transactions.length;i++)
      {
        //   console.log(this.transactions[i].inventory);
        if(this.transactions[i].status==='Assigned')
        {
            this.n++;
            let id = this.transactions[i].inventory;
            let temp = await axios.post(process.env.VUE_APP_API + "/inventory/getByID",{id});
            this.names.push(temp.data.name);
        }
      }
      console.log(this.transactions)
    //   console.log(this.names)
    },
    reset()
    {
        this.success = false;
    },
    async getName(id)
    {
        let result = await axios.post(process.env.VUE_APP_API + "/inventory/getByID",id);
        // console.log(result);
        return result;
    },
    async returnInventory(id)
    {
        this.reset();
        let result = await axios.post(process.env.VUE_APP_API + "/transaction/return",{id});
        if(result.data.message ==='success')
        {
            this.reset();
            this.success = true;
            this.update();
        }       
    }
  },
};
</script>

<style scoped>
.overview{
    text-align: center;
    margin-top: 25px;
    margin-bottom: 25px;
}
.green {
  margin: 10px 5px;
  padding: 5px;
  border-radius: 5px;
  width: 350px;
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
.inputs {
  width: 100px;
  font-family: Poppins;
  font-size: 20px;
  height: 37px;
  /* padding: 3px; */
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
