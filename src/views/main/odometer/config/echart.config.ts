import { IProps } from '@/components/page-echarts/src/type'

// 网站流量统计图表配置
export const echartPvConfig: IProps = {
  legendData: [
    {
      name: '流量访问量'
    },
    {
      name: '访客数量'
    }
  ],
  xAxisData: [
    '2022-05-01',
    '2022-06-01',
    '2022-07-01',
    '2022-08-01',
    '2022-09-01'
  ],
  series: [
    {
      name: '流量访问量',
      type: 'line',
      data: [
        {
          name: '2022-05-01',
          value: 10
        },
        {
          name: '2022-06-01',
          value: 8
        },
        {
          name: '2020-07-01',
          value: 15
        },
        {
          name: '2020-08-01',
          value: 19
        },
        {
          name: '2020-09-01',
          value: 11
        }
      ]
    },
    {
      name: '访客数量',
      type: 'line',
      data: [
        {
          name: '2022-05-01',
          value: 3
        },
        {
          name: '2022-06-01',
          value: 18
        },
        {
          name: '2020-07-01',
          value: 5
        },
        {
          name: '2020-08-01',
          value: 7
        },
        {
          name: '2020-09-01',
          value: 10
        }
      ]
    }
  ]
}

// 网站数据统计图表配置
export const echartDataConfig: IProps = {
  isShowXAxis: false,
  legendData: [
    {
      name: '文章总数'
    },
    {
      name: '留言总数'
    },
    {
      name: '用户总数'
    },
    {
      name: '友链总数'
    },
    {
      name: '标签总数'
    }
  ],
  series: {
    type: 'pie',
    radius: '50%',
    data: [
      {
        name: '文章总数',
        value: 10
      },
      {
        name: '留言总数',
        value: 15
      },
      {
        name: '用户总数',
        value: 22
      },
      {
        name: '友链总数',
        value: 26
      },
      {
        name: '标签总数',
        value: 9
      }
    ]
  },
  tooltipTrigger: 'item'
}
