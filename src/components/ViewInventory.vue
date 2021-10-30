<template>
  <div class="main">
    <h1 class="heading">Inventory Management System</h1>
    <h1>All Inventory</h1>
    <table>
      <col style="width:35%">

      <thead>
        <tr>
          <th class="wide-row">Name</th>
          <th>Total Qty</th>
          <th>Working Qty</th>
          <th>Defective Qty</th>
        </tr>
      </thead>

      <tbody>
        <tr v-bind:key="index" v-for="(record, index) in records">
          <td>{{ record.name }}</td>
          <td>{{ record.workingQuantity + record.defectiveQuantity }}</td>
          <td class="working">{{ record.workingQuantity }}</td>
          <td class="defective">{{ record.defectiveQuantity }}</td>
        </tr>
      </tbody>
    </table>
    <a href="/" class="button1">Go Back</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      records: [],
    };
  },
  mounted() {
    axios.get("http://localhost:5000/inventory/get").then((response) => {
      this.records = JSON.parse(JSON.stringify(response)).data.result;
    });
  },
};
</script>

<style scoped>
.heading{
  font-size: 40px;
}
.working{
    color: green;
}
.defective{
    color:red
}
body {
  color: #343a40;
  line-height: 1;
  display: flex;
  justify-content: center;
}

table {
  width: 97%;
  margin-left: 1.5%;
  margin-right: 1.5%;
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
  width: 25%;
}

tbody tr:nth-child(odd) {
  background-color: #f8f9fa;
}

tbody tr:nth-child(even) {
  background-color: #e9ecef;
}
.main {
  background: #092756;
  height: 100%;
  min-height: 96vh;
  padding: 2vh;
}
.button1 {
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #ffffff;
  margin: 10px 0.3em 0.3em 0;
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
</style>
