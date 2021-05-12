/****************************************************************
 * created by Celsius on 2020-08-11 for main layout file
 ****************************************************************/

<template>
    <div class="home-container">
            <el-row :gutter="16" class="data-card">
                <el-col v-for="item in dataProject" :key="item.key" :span="8" >
                    <el-card :class="'data-card-' + item.key">
                        <span class="data-value">{{item.value}}%</span>
                    </el-card>
                </el-col>
            </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>重点项目</span>
            </div>
            <el-row :gutter="16">
                <el-col v-for="item in statProject" :key="item.key" :span="6">
                    <span class="stat-name">{{item.name}}</span>
                    <span :class="[item.cls, 'stat-value']">{{item.value}}</span>
                    <i :class="[`${item.icon}-icon`, 'stat-icon']"></i>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="margin: 16px 0;padding: 0;" class="box-card">
            <div slot="header" class="clearfix">
                <span>成果管理</span>
            </div>
            <div style="height: 300px;" ref="lineNode">
                <!-- content -->
            </div>
        </el-card>
        <el-row :gutter="16">
            <el-col :span="14">
                <el-card :body-style="{ margin: '16px',padding: 0 }">
                    <div slot="header" class="clearfix">
                        <span>项目推广</span>
                    </div>
                    <div style="height: 300px;" ref="barNode">
                        <!-- content -->
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card :body-style="{ margin: '16px',padding: 0 }">
                    <div slot="header" class="clearfix">
                        <span>项目推广数据演示</span>
                    </div>
                    <div style="height: 300px;" ref="pieNode">
                        <!-- content -->
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Ajax from "@/util/Ajax";
    import Echarts from "echarts";
    export default {
        data() {
            return {
                statProject: [
                    {name: '产品推广', icon: 'prod', value: 0, key: 'prod', cls: 'prod'},
                    {name: '项目管理', icon: 'mgr', value: 0, key: 'mgr', cls: 'mgr'},
                    {name: '评审管理', icon: 'rew', value: 0, key: 'rew', cls: 'rew'},
                    {name: '项目推广', icon: 'project', value: 0, key: 'project', cls: 'project'}
                ],
                dataProject: [
                    {icon: 'develop',value: 0,key: 'develop',cls: 'develop'},
                    {icon: 'data',value: 0,key: 'data', cls: 'data'},
                    {icon: 'work',value: 0,key: 'work', cls:'work'}
                ],
                lineChart: null,
                barChart: null,
                pieChart: null,
                lineTime: null
            }
        },
        created() {
            this.getStatData();
            this.getAnalysisData();
        },
        async mounted() {
            await this.$nextTick();
            this.lineChart = Echarts.init(this.$refs.lineNode);
            this.barChart = Echarts.init(this.$refs.barNode);
            this.pieChart = Echarts.init(this.$refs.pieNode);
            /** 监听窗口变化，改变线形图大小 */
            window.addEventListener('resize', this.resizeChart, false);
        },
        methods: {
            /** 获取统计数据并渲染 */
            async getStatData() {
                let result = await Ajax({url: '/home/statistical'});
                console.log(result);
                if (result.code === 200) {
                    let project = result.data.project,
                        temp = [];
                    this.statProject.map(it => {
                        it.value = project[it.key];
                        temp.push(it);
                    });
                    this.statProject = temp;
                    let progress = result.data.progress,
                        tempp = [];
                    this.dataProject.map(it =>{
                        it.value = progress[it.key];
                        tempp.push(it);
                    }) 
                }
            },
            /** 获取图表数据并渲染 */
            async getAnalysisData() {
                let load = this.$loading();
                let result = await Ajax({url: '/home/analysis'});
                if (result.code === 200) {
                    let line = result.data.line;
                    let bar = result.data.bar;
                    let pie = result.data.pie;
                    this.makeLineChart(line.month || [], line.res || [], line.prod || []);
                    this.makeBarChart(bar.city || [], bar.cRes || [], bar.cProd || []);
                    this.makePieChart(pie.res || '', pie.prod || '');
                }
                setTimeout(() => {
                    load.close();
                }, 500);
            },
            makeLineChart(labels, res, prod) {
                let option = {
                    xAxis: {
                        type: 'category',
                        data: labels,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            color: '#999',
                            interval: 0,
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                        },
                        axisLabel: {
                            color: '#999'
                        }
                    },
                    series: [
                        {
                            data: res,
                            type: 'line',
                            lineStyle: {
                                normal: {
                                    width: 4,
                                }
                            },
                            name: '成果推广',
                            smooth: true
                        },
                        {
                            data: prod,
                            type: 'line',
                            lineStyle: {
                                normal: {
                                    width: 4,
                                }
                            },
                            name: '产品推广',
                            smooth: true
                        }
                    ]
                };
                this.lineChart.setOption(option);
            },
            makeBarChart(city,cRes,cProd){
                let option = {
                    tooltip: {
                        show: true,
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['成果推广', '产品推广'],
                    },
                    xAxis: {
                        type: 'category',
                        data: city,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            color: '#999',
                            interval: 0,
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            color: '#999'
                        }
                    },
                    series: [{
                        data: cRes,
                        type: 'bar',
                        backgroundStyle: {
                            color: '#425fe1'
                        }
                    },
                    {
                        data: cProd,
                        type: 'bar',
                        backgroundStyle: {
                            color: '#02a94b'
                        }
                    }]
                };
                this.barChart.setOption(option);
            },
            makePieChart(res,prod){
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['项目推广', '产品推广']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '70%',
                            center: ['50%', '60%'],
                            data: [
                                {value: prod, name: '项目推广'},
                                {value: res, name: '产品推广'},
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                this.pieChart.setOption(option);
            },
            /** 监听视窗改变并重新渲染图表数据 */
            resizeChart(){
                if(this.lineTime){
                    clearTimeout(this.lineTime);
                    this.lineTime = null;
                }
                if(this.lineChart){
                    /** 防抖 */
                    this.lineTime = setTimeout(() => {
                        clearTimeout(this.lineTime);
                        this.lineTime = null;
                        this.lineChart.resize();
                    },300)
                }
            },
            beforeDestroy() {
                /** 移除定时器 */
                if(this.lineTime){
                    clearTimeout(this.lineTime);
                    this.lineTime = null;
                }
                /** 移除监听事件 */
                window.removeEventListener('resize', this.resizeChart);
            }
        } 
    }
</script>

<style lang="less" scoped>
    .data-card{
        margin-bottom: 16px;
        .data-value{
            display: block;
            padding: 10px;
            font-size: .8rem;
            text-align: left;
            font-size: 1.8rem;
            font-weight: bold;
            color: #fff;
        }
        .data-card-develop{
            height: 20vh;
            background: url(../../images/develop-icon.png) no-repeat;
            background-size: 100% 100%;
        }
        .data-card-data{
            height: 20vh;
            background: url(../../images/data-icon.png) no-repeat;
            background-size: 100% 100%;
        }
        .data-card-work{
            height: 20vh;
            background: url(../../images/work-icon.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .home-container {
        overflow-x: hidden;
    }
    .stat-name,
    .stat-value,
    .stat-icon {
        display: block;
        padding: 10px;
        font-size: .8rem;
        text-align: center;
    }
    .stat-value {
        font-size: 1.6rem;
    }
    .stat-icon {
        height: 60px;
    }
    @key: prod mgr rew project;
    @color: #24b8b9 #ed7375 #425fe1 #02a94b;
    .loop(@index: 1) when (@index <= length(@key)) {
        @k: extract(@key, @index);
        @c: extract(@color, @index);
        .@{k}-icon {
            background: url("../../images/@{k}-icon.png") center center / 260px 60px no-repeat;
        }
        .@{k} {
            color: @c;
        }
        .loop(@index + 1);
    }
    .loop();
</style>