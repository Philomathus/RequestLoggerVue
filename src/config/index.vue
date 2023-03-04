<script>
import axios from "axios";

function toLocalISOString(date) {
  return date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -1) : '';
}

export default {
  data() {
    return {
      data: {},
      body: {
        pageNum: 1,
        pageSize: 10,
      },
      method: '',
      url: '',
      content: '',
      contentType: '',
      httpMethods: [
        { label: "ALL", value: '' },
        { label: "POST", value: "POST" },
        { label: "GET", value: "GET" },
        { label: "PUT", value: "PUT" },
        { label: "PATCH", value: "PATCH" },
        { label: "DELETE", value: "DELETE" },
      ],
      createdAtRange: [null, null]
    }
  },
  methods: {
    getRequestLogs() {
      axios.post("http://localhost:42069/api/requestLogger/getByPageWithFilter", this.body)
      .then(res => this.data = res.data.data)
      .catch(err => console.log('Axios Error:', err) );
    },
    filter() {
      this.body.method = this.method;
      this.body.url = this.url;
      this.body.contentType = this.contentType;
      this.body.content = this.content;
      this.body.minCreatedAt = toLocalISOString(this.createdAtRange[0]);
      this.body.maxCreatedAt = toLocalISOString(this.createdAtRange[1]);
      this.getRequestLogs();
    },
    reset() {
      this.method = '';
      this.url = '';
      this.contentType = '';
      this.content = '';
      this.createdAtRange = [null, null];
      this.filter();
    }
  },
  mounted() {
    this.getRequestLogs();
  }
}

</script>
<template>
  <div>
    <el-select v-model="method" placeholder="Select">
      <el-option
          v-for="item in httpMethods"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-input v-model="url" placeholder="URL"></el-input>
    <el-input v-model="content" placeholder="Content"></el-input>
    <el-input v-model="contentType" placeholder="Content Type"></el-input>
    <el-date-picker
        v-model="createdAtRange"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date">
    </el-date-picker>

    <el-button type="primary" @click="filter">Filter</el-button>
    <el-button @click="reset">Reset</el-button>

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

