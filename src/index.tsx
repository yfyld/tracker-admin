import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, message } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'antd/dist/antd.css';
import '@/styles/style.less';

import configureStore from '@/store/configureStore';
import echarts from 'echarts';
echarts.registerTheme('ts', 
{
    "color": [
        "#1890ff",
        "#6be6c1",
        "#626c91",
        "#a0a7e6",
        "#c4ebad",
        "#96dee8"
    ],
    "backgroundColor": "rgba(252,252,252,0)",
    "textStyle": {},
    "title": {
        "textStyle": {
            "color": "#666666"
        },
        "subtextStyle": {
            "color": "#999999"
        }
    },
    "line": {
        "itemStyle": {
            "normal": {
                "borderWidth": "2"
            }
        },
        "lineStyle": {
            "normal": {
                "width": "3"
            }
        },
        "symbolSize": "8",
        "symbol": "emptyCircle",
        "smooth": false
    },
    "radar": {
        "itemStyle": {
            "normal": {
                "borderWidth": "2"
            }
        },
        "lineStyle": {
            "normal": {
                "width": "3"
            }
        },
        "symbolSize": "8",
        "symbol": "emptyCircle",
        "smooth": false
    },
    "bar": {
        "itemStyle": {
            "normal": {
                "barBorderWidth": 0,
                "barBorderColor": "#cccccc"
            },
            "emphasis": {
                "barBorderWidth": 0,
                "barBorderColor": "#cccccc"
            }
        }
    },
    "pie": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            }
        }
    },
    "scatter": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            }
        }
    },
    "boxplot": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            }
        }
    },
    "parallel": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            }
        }
    },
    "sankey": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            }
        }
    },
    "funnel": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            }
        }
    },
    "gauge": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            },
            "emphasis": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            }
        }
    },
    "candlestick": {
        "itemStyle": {
            "normal": {
                "color": "#e6a0d2",
                "color0": "transparent",
                "borderColor": "#e6a0d2",
                "borderColor0": "#3fb1e3",
                "borderWidth": "2"
            }
        }
    },
    "graph": {
        "itemStyle": {
            "normal": {
                "borderWidth": 0,
                "borderColor": "#cccccc"
            }
        },
        "lineStyle": {
            "normal": {
                "width": "1",
                "color": "#cccccc"
            }
        },
        "symbolSize": "8",
        "symbol": "emptyCircle",
        "smooth": false,
        "color": [
            "#1890ff",
            "#6be6c1",
            "#626c91",
            "#a0a7e6",
            "#c4ebad",
            "#96dee8"
        ],
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            }
        }
    },
    "map": {
        "itemStyle": {
            "normal": {
                "areaColor": "#eeeeee",
                "borderColor": "#aaaaaa",
                "borderWidth": 0.5
            },
            "emphasis": {
                "areaColor": "rgba(63,177,227,0.25)",
                "borderColor": "#3fb1e3",
                "borderWidth": 1
            }
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "rgb(63,177,227)"
                }
            }
        }
    },
    "geo": {
        "itemStyle": {
            "normal": {
                "areaColor": "#eeeeee",
                "borderColor": "#aaaaaa",
                "borderWidth": 0.5
            },
            "emphasis": {
                "areaColor": "rgba(63,177,227,0.25)",
                "borderColor": "#3fb1e3",
                "borderWidth": 1
            }
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "rgb(63,177,227)"
                }
            }
        }
    },
    "categoryAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#cccccc"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#cccccc"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999"
            }
        },
        "splitLine": {
            "show": false,
            "lineStyle": {
                "color": [
                    "#eeeeee"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            }
        }
    },
    "valueAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#cccccc"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#cccccc"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999"
            }
        },
        "splitLine": {
            "show": false,
            "lineStyle": {
                "color": [
                    "#eeeeee"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            }
        }
    },
    "logAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#cccccc"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#cccccc"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999"
            }
        },
        "splitLine": {
            "show": false,
            "lineStyle": {
                "color": [
                    "#eeeeee"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            }
        }
    },
    "timeAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "#cccccc"
            }
        },
        "axisTick": {
            "show": false,
            "lineStyle": {
                "color": "#cccccc"
            }
        },
        "axisLabel": {
            "show": true,
            "textStyle": {
                "color": "#999999"
            }
        },
        "splitLine": {
            "show": false,
            "lineStyle": {
                "color": [
                    "#eeeeee"
                ]
            }
        },
        "splitArea": {
            "show": false,
            "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.05)",
                    "rgba(200,200,200,0.02)"
                ]
            }
        }
    },
    "toolbox": {
        "iconStyle": {
            "normal": {
                "borderColor": "#999999"
            },
            "emphasis": {
                "borderColor": "#666666"
            }
        }
    },
    "legend": {
        "textStyle": {
            "color": "#999999"
        }
    },
    "tooltip": {
        "axisPointer": {
            "lineStyle": {
                "color": "#cccccc",
                "width": 1
            },
            "crossStyle": {
                "color": "#cccccc",
                "width": 1
            }
        }
    },
    "timeline": {
        "lineStyle": {
            "color": "#626c91",
            "width": 1
        },
        "itemStyle": {
            "normal": {
                "color": "#626c91",
                "borderWidth": 1
            },
            "emphasis": {
                "color": "#626c91"
            }
        },
        "controlStyle": {
            "normal": {
                "color": "#626c91",
                "borderColor": "#626c91",
                "borderWidth": 0.5
            },
            "emphasis": {
                "color": "#626c91",
                "borderColor": "#626c91",
                "borderWidth": 0.5
            }
        },
        "checkpointStyle": {
            "color": "#3fb1e3",
            "borderColor": "rgba(63,177,227,0.15)"
        },
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#626c91"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#626c91"
                }
            }
        }
    },
    "visualMap": {
        "color": [
            "#2a99c9",
            "#afe8ff"
        ]
    },
    "dataZoom": {
        "backgroundColor": "rgba(255,255,255,0)",
        "dataBackgroundColor": "rgba(222,222,222,1)",
        "fillerColor": "rgba(114,230,212,0.25)",
        "handleColor": "#cccccc",
        "handleSize": "100%",
        "textStyle": {
            "color": "#999999"
        }
    },
    "markPoint": {
        "label": {
            "normal": {
                "textStyle": {
                    "color": "#ffffff"
                }
            },
            "emphasis": {
                "textStyle": {
                    "color": "#ffffff"
                }
            }
        }
    }
}
);

const isIframe = window.top !== window.self;
if (isIframe) {
  document.domain = 'yfyld.online';
  const div = document.createElement('div');
  window.parent.document.body.appendChild(div);
  message.config({
    getContainer: () => div
  });
}

export const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </Provider>
  </Router>,
  document.getElementById('app') as HTMLElement
);

registerServiceWorker();
