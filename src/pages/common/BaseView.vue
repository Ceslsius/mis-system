/****************************************************************
 * created by Celsius on 2020-08-11 for blank layout file
 ****************************************************************/

<script>
    export default {
        data() {
            return {
                tableData: [],
                pageSize: 10,
                pageNum: 1,
                pageTotal: 0
            }
        },
        methods: {
            logs(str) {
                console.log('>>>>>>>>>>>>>>>>>>>>>', str);
            },
            /** 每页条数发生变化的回调方法 */
            handleSizeChange(val) {
                this.pageSize = val;
                this.getDataList();
            },
            /** 页码发生变化的回调方法 */
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getDataList();
            },
            /** 获取表格数据方法，每个继承页面需要重写此方法 */
            getDataList() {
                // todo something here
            }
        }
    }
</script>