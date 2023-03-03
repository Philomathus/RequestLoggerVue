<script>
import axios from "axios";

export default {
  data() {
    return {
      requestLogs: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    getRequestLogs(body) {
      axios.post("http://localhost:42069/api/requestLogger/getByPageWithFilter",
          body = {}).then(
          (res) => {
            this.requestLogs = res.data.data.list;
            this.total = res.data.data.total;
            console.log(this.requestLogs)
          }).catch((err) => { console.log('Axios Error:', err); });
    }
  },
  mounted() {
    this.getRequestLogs();
  }
}

</script>
<template>
  <div>
    <el-table
        :data = "requestLogs"
        style="width: 1000%; margin-bottom: 20px"
        row-key="id">
      <el-table-column width='200' prop="createdAt" label="Date"  />
      <el-table-column width='200' prop="method" label="Method"  />
      <el-table-column width='200' prop="url" label="URL"  />
      <el-table-column width='200' prop="contentType" label="Content Type"  />
      <el-table-column width='200' prop="content" label="Content"  />
    </el-table>
    <div class="example-pagination-block">
      <el-pagination :page-size="pageSize" @next-click="getRequestLogs({ pageNum: pageNum, pageSize: pageSize })" :page-count="pageNum" layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>

