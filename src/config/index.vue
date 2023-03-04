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
      <el-row :gutter="5">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <el-select v-model="method" placeholder="Select">
            <el-option
                v-for="item in httpMethods"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <el-input v-model="url" placeholder="URL"/>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <el-input v-model="content" placeholder="Content"/>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3">
          <el-input v-model="contentType" placeholder="Content Type"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="margin-top: 10px" :xs="2" :sm="2" :md="2" :lg="2">
          <el-date-picker
              v-model="createdAtRange"
              type="datetimerange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-button style="margin-top: 10px" type="primary" @click="filter">Filter</el-button>
      <el-button style="margin-top: 10px" @click="reset">Reset</el-button>
      <el-divider/>

      <el-table
          :data="data.list"
          style="width: 100%; margin-bottom: 20px">
        <el-table-column prop="method" label="Method"  />
        <el-table-column prop="url" label="URL"  />
        <el-table-column prop="content" label="Content"  />
        <el-table-column prop="contentType" label="Content Type"  />
        <el-table-column prop="createdAt" label="Created At" :formatter="formatDate"/>
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

<style>
  .date-picking{
    width: 50px;
  }
</style>
