import MeanChart from 'mean-chart';

//
var script = {
    name: "BarGraph",
    props: ["data", "config"],
    data: function data() {
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
    created: function created() {
        this.dataPoints = this.data;

        if(this.config.height) {
            this.options.height = this.config.height;
        }

        if(this.config.width) {
            this.options.width = this.config.width;
        }

        if(this.dataPoints.length > 0) {
            var chart = MeanChart(this.dataPoints);            
            this.scale = chart.scale;
            this.dataPoints = chart.data;
            this.options.maxVal = chart.max;
            this.options.interval = chart.interval;
        }
    },
    methods: {
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: "barGraph" } }, [
    _c(
      "div",
      { staticClass: "top-bar-graph" },
      [
        _c("div", { staticClass: "scale-label-max" }, [
          _c("span", { staticClass: "bar-graph-scale-item scale-label" }, [
            _vm._v(_vm._s(_vm.options.maxVal))
          ])
        ]),
        _vm._v(" "),
        _vm._l(_vm.dataPoints, function(d, index) {
          return _c("div", {
            key: index,
            staticClass: "bar-graph-scale-background"
          })
        })
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "middle-bar-graph",
        style: { height: _vm.options.height }
      },
      [
        _c(
          "div",
          { staticClass: "bar-graph-scale" },
          _vm._l(_vm.scale, function(i, index) {
            return _c(
              "div",
              { key: index, staticClass: "bar-graph-scale-item-container" },
              [
                _c(
                  "span",
                  { staticClass: "bar-graph-scale-item scale-label" },
                  [_vm._v(_vm._s(i))]
                ),
                _vm._v(" "),
                _vm._l(_vm.dataPoints, function(d, index) {
                  return _c("div", {
                    key: index,
                    staticClass: "bar-graph-scale-background"
                  })
                })
              ],
              2
            )
          }),
          0
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "bargraph-bars" },
          [
            _c("div", { staticClass: "bar-graph-label-spacer" }),
            _vm._v(" "),
            _vm._l(_vm.dataPoints, function(d, index) {
              return _c(
                "div",
                {
                  key: index,
                  staticClass: "bar-graph-bar-container",
                  style: { height: d.percentage + "%" }
                },
                [
                  _c("div", {
                    staticClass: "bar-graph-bar",
                    style: { backgroundColor: d.color }
                  })
                ]
              )
            })
          ],
          2
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "bottom-bar-graph" },
      [
        _c("div", { staticClass: "bar-graph-label-spacer" }),
        _vm._v(" "),
        _vm._l(_vm.dataPoints, function(d, index) {
          return _c("div", { key: index, staticClass: "bar-graph-label" }, [
            _vm._v(_vm._s(d.label))
          ])
        })
      ],
      2
    ),
    _vm._v(" "),
    !_vm.dataPoints.length > 0
      ? _c("div", { staticClass: "no-data-message" }, [_vm._v("No data")])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-328bb8ca_0", { source: "\n#barGraph[data-v-328bb8ca] {\n  text-align: center;\n}\n.no-data-message[data-v-328bb8ca] {\n    text-align: center;\n    font-size: 25px;\n    margin: 0 auto;\n    padding: 25px;\n}\n.top-bar-graph[data-v-328bb8ca], .middle-bar-graph[data-v-328bb8ca], .bottom-bar-graph[data-v-328bb8ca], .bar-graph-scale[data-v-328bb8ca], .scale-label[data-v-328bb8ca], .scale-label-max[data-v-328bb8ca], .bargraph-bars[data-v-328bb8ca], .bar-graph-scale-item-container[data-v-328bb8ca] {\n  display: flex;\n}\n.top-bar-graph-item[data-v-328bb8ca], .bar-graph-scale-item[data-v-328bb8ca], .bar-graph-bar-container[data-v-328bb8ca], .bar-graph-label[data-v-328bb8ca], .bar-graph-scale-background[data-v-328bb8ca] {\n  flex: 1;\n}\n.scale-label-max[data-v-328bb8ca], .bar-graph-scale-item[data-v-328bb8ca], .bar-graph-label-spacer[data-v-328bb8ca], .bar-graph-scale[data-v-328bb8ca] {\n  flex: .1;\n}\n.middle-bar-graph[data-v-328bb8ca] {\n  align-items: flex-end;\n  justify-content: space-between;\n  position: relative;\n}\n.bargraph-bars[data-v-328bb8ca], .bar-graph-scale[data-v-328bb8ca] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.bargraph-bars[data-v-328bb8ca] {\n  align-items: flex-end;\n}\n.bar-graph-scale[data-v-328bb8ca] {\n  align-self: stretch;\n  display: flex;\n  flex-direction: column-reverse;\n}\n.bar-graph-scale-item-container[data-v-328bb8ca] {\n  height: 100%;\n}\n.bar-graph-scale-item[data-v-328bb8ca] {\n  align-items: flex-end;\n  height: 100%;\n}\n.bar-graph-bar[data-v-328bb8ca] {\n  height: 100%; /* Do NOT adjust the height, it will distort the data */\n  margin: 0 auto; /* Center the bar in the middle */\n  max-width: 15px;  \n  border-radius: 0 0 0 0 ;\n}\n.bar-graph-scale-item-container[data-v-328bb8ca], .top-bar-graph[data-v-328bb8ca] {\n  border-bottom: #2c3e50 solid 1px;\n}\n\n/* .bar-graph-scale-background {\n  border-bottom: #2c3e50 solid 1px;\n}\n\n.scale-label {\n  margin-top: .5rem;\n  text-align: right;\n} */\n", map: {"version":3,"sources":["/home/ankerpeet/ankerpeet-opensource/mean-chart-vue/src/bar-graph.vue"],"names":[],"mappings":";AA4EA;EACA,kBAAA;AACA;AAEA;IACA,kBAAA;IACA,eAAA;IACA,cAAA;IACA,aAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,OAAA;AACA;AAEA;EACA,QAAA;AACA;AAEA;EACA,qBAAA;EACA,8BAAA;EACA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;EACA,mBAAA;EACA,aAAA;EACA,8BAAA;AACA;AAEA;EACA,YAAA;AACA;AAEA;EACA,qBAAA;EACA,YAAA;AACA;AAEA;EACA,YAAA,EAAA,uDAAA;EACA,cAAA,EAAA,iCAAA;EACA,eAAA;EACA,uBAAA;AACA;AAEA;EACA,gCAAA;AACA;;AAEA;;;;;;;GAOA","file":"bar-graph.vue","sourcesContent":["<template>\n    <div id=\"barGraph\">\n        <div class=\"top-bar-graph\">\n            <div class=\"scale-label-max\">\n            <span class=\"bar-graph-scale-item scale-label\">{{options.maxVal}}</span>        \n            </div>\n            <div class=\"bar-graph-scale-background\" v-for=\"(d, index) in dataPoints\" :key=\"index\"></div>\n        </div>\n        \n        <div class=\"middle-bar-graph\" :style=\"{height:options.height}\">\n            <div class=\"bar-graph-scale\">          \n            <div class=\"bar-graph-scale-item-container\" v-for=\"(i, index) in scale\" :key=\"index\">\n                <span class=\"bar-graph-scale-item scale-label\">{{i}}</span>\n                <div class=\"bar-graph-scale-background\" v-for=\"(d, index) in dataPoints\" :key=\"index\"></div>\n            </div>\n            </div>\n            <div class=\"bargraph-bars\">  \n            <div class=\"bar-graph-label-spacer\"></div>\n            <div class=\"bar-graph-bar-container\" v-for=\"(d, index) in dataPoints\" :key=\"index\" :style=\"{ height: d.percentage + '%'}\">\n                <div class=\"bar-graph-bar\" :style=\"{ backgroundColor: d.color }\"></div>\n            </div>\n            </div>\n        </div>\n        <div class=\"bottom-bar-graph\">\n            <div class=\"bar-graph-label-spacer\"></div>\n            <div class=\"bar-graph-label\" v-for=\"(d, index) in dataPoints\" :key=\"index\">{{d.label}}</div>\n        </div>\n        <div v-if=\"!dataPoints.length > 0\" class=\"no-data-message\">No data</div>\n    </div>\n</template>\n\n<script>\nimport MeanChart from \"mean-chart\";\nexport default {\n    name: \"BarGraph\",\n    props: [\"data\", \"config\"],\n    data() {\n        return {\n            dataPoints: [],\n            options: {\n                height: \"300px\",\n                width: \"100%\",\n                minVal: 0,\n                maxVal: 100,\n                interval: 10\n            },\n            scale: []\n        }\n    },\n    computed: {\n    },\n    created() {\n        this.dataPoints = this.data;\n\n        if(this.config.height) {\n            this.options.height = this.config.height;\n        }\n\n        if(this.config.width) {\n            this.options.width = this.config.width;\n        }\n\n        if(this.dataPoints.length > 0) {\n            let chart = MeanChart(this.dataPoints);            \n            this.scale = chart.scale;\n            this.dataPoints = chart.data;\n            this.options.maxVal = chart.max;\n            this.options.interval = chart.interval;\n        }\n    },\n    methods: {\n    }\n}\n</script>\n\n<style scoped>\n#barGraph {\n  text-align: center;\n}\n\n.no-data-message {\n    text-align: center;\n    font-size: 25px;\n    margin: 0 auto;\n    padding: 25px;\n}\n\n.top-bar-graph, .middle-bar-graph, .bottom-bar-graph, .bar-graph-scale, .scale-label, .scale-label-max, .bargraph-bars, .bar-graph-scale-item-container {\n  display: flex;\n}\n\n.top-bar-graph-item, .bar-graph-scale-item, .bar-graph-bar-container, .bar-graph-label, .bar-graph-scale-background {\n  flex: 1;\n}\n\n.scale-label-max, .bar-graph-scale-item, .bar-graph-label-spacer, .bar-graph-scale {\n  flex: .1;\n}\n\n.middle-bar-graph {\n  align-items: flex-end;\n  justify-content: space-between;\n  position: relative;\n}\n\n.bargraph-bars, .bar-graph-scale {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.bargraph-bars {\n  align-items: flex-end;\n}\n\n.bar-graph-scale {\n  align-self: stretch;\n  display: flex;\n  flex-direction: column-reverse;\n}\n\n.bar-graph-scale-item-container {\n  height: 100%;\n}\n\n.bar-graph-scale-item {\n  align-items: flex-end;\n  height: 100%;\n}\n\n.bar-graph-bar {\n  height: 100%; /* Do NOT adjust the height, it will distort the data */\n  margin: 0 auto; /* Center the bar in the middle */\n  max-width: 15px;  \n  border-radius: 0 0 0 0 ;\n}\n\n.bar-graph-scale-item-container, .top-bar-graph {\n  border-bottom: #2c3e50 solid 1px;\n}\n\n/* .bar-graph-scale-background {\n  border-bottom: #2c3e50 solid 1px;\n}\n\n.scale-label {\n  margin-top: .5rem;\n  text-align: right;\n} */\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-328bb8ca";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('BarGraph', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };
