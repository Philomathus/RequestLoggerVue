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
      createdAtRange: [null, null],
      image: { bgImage: " " }
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
    },
    formatDate(row, col, cellValue) {
      return cellValue.replace('T', ' ');
    }
  },
  mounted() {
    this.getRequestLogs();
  }
}

</script>
<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" >
        <el-select v-model="method" placeholder="Select" style="width: 100%">
          <el-option
              v-for="item in httpMethods"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
        <el-input v-model="url" placeholder="URL"/>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" >
        <el-input v-model="contentType" placeholder="Content Type"/>
      </el-col>
      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
        <el-input v-model="content" placeholder="Content"/>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-col :xs="4" :sm="4" :md="4" :lg="4">
        <el-date-picker
            v-model="createdAtRange"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date">
        </el-date-picker>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-button type="primary" @click="filter">Filter</el-button>
      <el-button @click="reset">Reset</el-button>
    </el-row>

    <el-divider/>

    <el-table
        :data="data.list"
        style="margin-bottom: 20px; border-radius: 4px"
        :lg="16">
      <el-table-column prop="method" label="Method"  />
      <el-table-column prop="url" label="URL"  />
      <el-table-column prop="content" label="Content"  />
      <el-table-column prop="contentType" label="Content Type"  />
      <el-table-column prop="createdAt" label="Created At" :formatter="formatDate"/>
    </el-table>

    <el-pagination
        @current-change="getRequestLogs"
        @size-change="getRequestLogs"
        v-model:current-page="body.pageNum"
        v-model:page-size="body.pageSize"
        :total="data.total"
        layout="prev, pager, next, ->, sizes, total"/>
  </div>
</template>

<style>

</style>
