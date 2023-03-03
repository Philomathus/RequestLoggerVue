<script>
import axios from "axios";

export default {
  data() {
    return {
      requestLogs: [],
      pageNum: 1,
      pageSize: 10,
      pages: 0,
      total: 0
    }
  },
  methods: {
    getRequestLogs(body = {}) {
      axios.post(
          "http://localhost:42069/api/requestLogger/getByPageWithFilter",
          body
      ).then(
          (res) => {
            this.requestLogs = res.data.data.list;
            this.pages = res.data.data.pages;
            this.total = res.data.data.total;
          }
      ).catch((err) => { console.log('Axios Error:', err); });
    },
    nextPage() {
      this.pageNum++;
      this.getRequestLogs({ pageNum: this.pageNum, pageSize: this.pageSize });
    },
    prevPage() {
      this.pageNum--;
      this.getRequestLogs({ pageNum: this.pageNum, pageSize: this.pageSize });
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
      <el-pagination :page-count="pages" :total="total" @next-click="nextPage" @prev-click="prevPage" layout="prev, pager, next"/>
    </div>
  </div>
</template>

