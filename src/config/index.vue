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
      logLevel:'',
      source:'',
      department:'',
      agentId:'',
      httpMethods: [
        { label: "", value: '' },
        { label: "POST", value: "POST" },
        { label: "GET", value: "GET" },
        { label: "PUT", value: "PUT" },
        { label: "PATCH", value: "PATCH" },
        { label: "DELETE", value: "DELETE" },
      ],
      logLevels: [
        { label: "", value: '' },
        { label: "TRACE", value: "TRACE" },
        { label: "DEBUG", value: "DEBUG" },
        { label: "INFO", value: "INFO" },
        { label: "WARN", value: "WARN" },
        { label: "ERROR", value: "ERROR" },
        { label: "FATAL", value: "FATAL" },
        { label: "OFF", value: "OFF" },
      ],
      createdAtRange: [null, null],
      image: { bgImage: " " }
    }
  },
  methods: {
    getRequestLogs() {
      axios.post("/api/requestLogger/getByPageWithFilter", this.body)
      .then(res => this.data = res.data.data)
      .catch(err => console.log('Axios Error:', err) );
    },
    filter() {
      this.body.method = this.method;
      this.body.logLevel = this.logLevel;
      this.body.source = this.source;
      this.body.department = this.department;
      this.body.agentId = this.agentId;
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
      this.logLevel = '';
      this.source = '';
      this.department = '';
      this.agentId = '';
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
    <el-header>
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
        <el-col :xs="8" :sm="6" :md="4" :lg="3" >
          <el-select v-model="logLevel" placeholder="Select" style="width: 100%">
            <el-option
                v-for="item in logLevels"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" >
          <el-input v-model="url" placeholder="URL"/>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" >
          <el-input v-model="department" placeholder="Department"/>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top: 10px">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" >
          <el-input v-model="contentType" placeholder="Content Type"/>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" >
          <el-input v-model="content" placeholder="Content"/>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" >
          <el-input v-model="source" placeholder="Source"/>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" >
          <el-input v-model="agentId" placeholder="Agent ID"/>
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
          <el-button style="margin-top:10px" type="primary" @click="filter">Filter</el-button>
          <el-button style="margin-top:10px" @click="reset">Reset</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-divider style="margin-top:110px"/>
    <el-table
        :data="data.list"
        style="margin-bottom: 20px; margin-top:40px; border-radius: 4px"
        :lg="16"
        v-loading="loading"
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(122, 122, 122, 0.8)">
      <el-table-column prop="method" label="Method"  />
      <el-table-column prop="url" label="URL"  />
      <el-table-column prop="source" label="Source"  />
      <el-table-column prop="content" label="Content"  />
      <el-table-column prop="contentType" label="Content Type"  />
      <el-table-column prop="agent_id" label="Agent ID"  />
      <el-table-column prop="department" label="Department"  />
      <el-table-column prop="createdAt" label="Created At" :formatter="formatDate"/>
      <el-table-column prop="log_level" label="Log Level"  />
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
