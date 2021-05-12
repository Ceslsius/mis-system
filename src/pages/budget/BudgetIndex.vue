/****************************************************************
 * created by Celsius on 2020-08-11 for BudgetIndex entry file
 ****************************************************************/

 <template>
    <div style="height: 100%; padding-top: 10px;">
        <router-view :key="viewKey"></router-view>
    </div>
</template>

<script>
    export default {
        watch: {
            viewKey: function(val) {
                console.log(val);
            },
            /** . - 不能作为变量名字符 */
            '$route.path': function() {
                this.viewKey = Date.now()
            }
        },
        data() {
            return {
                viewKey: 0
            }
        }
    }
</script>