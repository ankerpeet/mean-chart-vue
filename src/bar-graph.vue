<template>
    <div id="barGraph">
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

<style scoped>
#barGraph {
  text-align: center;
}

.no-data-message {
    text-align: center;
    font-size: 25px;
    margin: 0 auto;
    padding: 25px;
}

.top-bar-graph, .middle-bar-graph, .bottom-bar-graph, .bar-graph-scale, .scale-label, .scale-label-max, .bargraph-bars, .bar-graph-scale-item-container {
  display: flex;
}

.top-bar-graph-item, .bar-graph-scale-item, .bar-graph-bar-container, .bar-graph-label, .bar-graph-scale-background {
  flex: 1;
}

.scale-label-max, .bar-graph-scale-item, .bar-graph-label-spacer, .bar-graph-scale {
  flex: .1;
}

.middle-bar-graph {
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
}

.bargraph-bars, .bar-graph-scale {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bargraph-bars {
  align-items: flex-end;
}

.bar-graph-scale {
  align-self: stretch;
  display: flex;
  flex-direction: column-reverse;
}

.bar-graph-scale-item-container {
  height: 100%;
}

.bar-graph-scale-item {
  align-items: flex-end;
  height: 100%;
}

.bar-graph-bar {
  height: 100%; /* Do NOT adjust the height, it will distort the data */
  margin: 0 auto; /* Center the bar in the middle */
  max-width: 15px;  
  border-radius: 0 0 0 0 ;
}

.bar-graph-scale-item-container, .top-bar-graph {
  border-bottom: #2c3e50 solid 1px;
}

/* .bar-graph-scale-background {
  border-bottom: #2c3e50 solid 1px;
}

.scale-label {
  margin-top: .5rem;
  text-align: right;
} */
</style>