<template>
    <div class="mean-chart-bar-graph">
        <div class="top-bar-graph">
            <div class="scale-label-max">
            <span class="bar-graph-scale-item scale-label">{{options.maxVal}}</span>        
            </div>
            <div class="bar-graph-scale-background" v-for="(d, index) in dataPoints" :key="index"></div>
        </div>
        
        <div class="middle-bar-graph" :style="{height:options.height}">
            <div class="bar-graph-scale">          
            <div class="bar-graph-scale-item-container" v-for="(i, index) in scale" :key="index">
                <span class="bar-graph-scale-item scale-label">{{i}}</span>
                <div class="bar-graph-scale-background" v-for="(d, index) in dataPoints" :key="index"></div>
            </div>
            </div>
            <div class="bargraph-bars">  
            <div class="bar-graph-label-spacer"></div>
            <div class="bar-graph-bar-container" v-for="(d, index) in dataPoints" :key="index" :style="{ height: d.percentage + '%'}">
                <div class="bar-graph-bar" :style="{ backgroundColor: d.color }"></div>
            </div>
            </div>
        </div>
        <div class="bottom-bar-graph">
            <div class="bar-graph-label-spacer"></div>
            <div class="bar-graph-label" v-for="(d, index) in dataPoints" :key="index">{{d.label}}</div>
        </div>
        <div v-if="!dataPoints.length > 0" class="no-data-message">No data</div>
    </div>
</template>

<script>
import MeanChart from "mean-chart";
export default {
    name: "BarGraph",
    props: ["data", "config"],
    data() {
        return {
            dataPoints: [],
            options: {
                height: "300px",
                width: "100%",
                minVal: 0,
                maxVal: 100,
                interval: 10
            },
            scale: []
        }
    },
    computed: {
    },
    created() {
        this.dataPoints = this.data;

        if(this.config.height) {
            this.options.height = this.config.height;
        }

        if(this.config.width) {
            this.options.width = this.config.width;
        }

        if(this.dataPoints.length > 0) {
            let chart = MeanChart(this.dataPoints);            
            this.scale = chart.scale;
            this.dataPoints = chart.data;
            this.options.maxVal = chart.max;
            this.options.interval = chart.interval;
        }
    },
    methods: {
    }
}
</script>

<style src='mean-chart/styles/main.css' scoped></style>