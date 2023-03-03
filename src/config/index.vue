<script>
import axios from "axios";

export default {
  data() {
    return {
      data: {},
      body: {
        pageNum: 1,
        pageSize: 10
      },
      httpMethods: [
          "POST",
          "GET"
      ]
    }
  },
  methods: {
    getRequestLogs() {
      axios.post("http://localhost:42069/api/requestLogger/getByPageWithFilter", this.body)
      .then(res => this.data = res.data.data)
      .catch(err => console.log('Axios Error:', err) );
    }
  },
  mounted() {
    this.getRequestLogs();
  }
}

</script>
<template>
  <div>
    <el-select v-model="value" placeholder="Select">
      <el-option
          v-for="item in httpMethods"
          :key="item"
          :label="item"
          :value="item">
      </el-option>
    </el-select>
    <el-input placeholder="URL"></el-input>
    <el-input placeholder="Content"></el-input>
    <el-input placeholder="Content Type"></el-input>
    <el-date-picker
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date">
    </el-date-picker>

    <el-table
        :data="data.list"
        style="width: 100%; margin-bottom: 20px">
      <el-table-column width='200' prop="method" label="Method"  />
      <el-table-column width='200' prop="url" label="URL"  />
      <el-table-column width='200' prop="content" label="Content"  />
      <el-table-column width='200' prop="contentType" label="Content Type"  />
      <el-table-column width='200' prop="createdAt" label="Date"  />
    </el-table>
    <div class="example-pagination-block">
      <el-pagination
          @current-change="getRequestLogs"
          @size-change="getRequestLogs"
          v-model:current-page="body.pageNum"
          v-model:page-size="body.pageSize"
          :total="data.total"
          layout="prev, pager, next, ->, sizes, total"/>
    </div>
  </div>
</template>

