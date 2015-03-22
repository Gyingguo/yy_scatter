/* global Highcharts */

/*
var pieChart = null
var columnChart = null
var scatterChart = null

$(function () {
  pieChart = new Highcharts.Chart({
    chart: {
      renderTo: 'pie-chart',
      type: 'pie',
      events: {
        drilldown: function (event) {
          var id = event.point.drilldown
          location.hash = '#!/' + id
        }
      }
    },
    title: {
      text: '聚类分布'
    },
    tooltip: {
      headerFormat: '话题：{point.key} <br>',
      pointFormat: '百分比：{point.percentage:.1f}%，数量：{point.y}'
    },
    credits: {
      enabled: false
    },
    drilldown: {
      activeDataLabelStyle: {
        textDecoration: 'none'
      }
    }
  })

  columnChart = new Highcharts.Chart({
    chart: {
      renderTo: 'column-chart',
      type: 'column'
    },
    title: {
      text: '排名前10关键词'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {text: '权重'}
    },
    legend: {
      enabled: false
    },
    tooltip: {
      headerFormat: '关键词：{point.key} <br>',
      pointFormat: '权重：{point.y:.3f}'
    },
    credits: {
      enabled: false
    }
  })

  scatterChart = new Highcharts.Chart({
    chart: {
      renderTo: 'scatter-chart',
      type: 'scatter',
      height: 700,
      spacingLeft:  300,
      spacingRight: 300,
      options3d: {
        enabled: true,
        alpha: 5,
        beta: 16,
        depth: 400,
        viewDistance: 5,
        frame: {
          bottom: { size: 1, color: 'rgba(0,0,0,0.05)' },
          back:   { size: 1, color: 'rgba(0,0,0,0.05)' },
          side:   { size: 1, color: 'rgba(0,0,0,0.05)' }
        }
      }
    },
    plotOptions: {
      scatter: {
        marker: {
          symbol: 'circle'
        }
      }
    },
    title: {
      text: '专利分布'
    },
    xAxis: {
      min: -1,
      max: 1,
      title: {text: 'x'}
    },
    yAxis: {
      min: -1,
      max: 1,
      title: {text: 'y'}
    },
    zAxis: {
      min: -1,
      max: 1,
      title: {text: 'z'}
    },
    tooltip: {
      useHTML: true
    },
    credits: {
      enabled: false
    }
  })

  function randomColors(numberOfColors) {
    var colors = []
    var step = Math.floor(360 / numberOfColors)
    for (var i = 0; i < numberOfColors; i++) {
      colors.push('hsla(' + i * step + ', 100%, 50%, 0.7)')
    }
    return colors
  }

  function updatePieChart(group, colors) {
    var series = {
      name: group.topic,
      data: $.map(group.children, function (group, i) {
        return {
          name: group.topic,
          y: group.size,
          drilldown: group.id,
          color: colors[i]
        }
      })
    }

    if (pieChart.series.length === 0) {
      pieChart.addSeries(series)
    } else {
      pieChart.series[0].update(series)
    }
  }

  function updateColumnChart(group, colors) {
    var series = {
      colorByPoint: true,
      data: $.map(group.keywords, function (keyword, i) {
        return {
          name: keyword.name,
          y: keyword.weight,
          color: colors[i]
        }
      })
    }

    if (columnChart.series.length === 0) {
      columnChart.addSeries(series)
    } else {
      columnChart.series[0].update(series)
    }
  }

  function updateScatterChart(group, colors) {
    while (scatterChart.series.length > 0) {
      scatterChart.series[0].remove(false)
    }

    group.patents.forEach(function (patent, i) {
      if (!scatterChart.get(patent.group_id)) {
        var topic = $.grep(group.children, function (group) {
          return group.id === patent.group_id
        })[0].topic

        scatterChart.addSeries({
          id: patent.group_id,
          name: topic,
          color: colors[i],
          tooltip: {
            headerFormat: '话题：{series.name} <br>',
            pointFormat: '标题：{point.title} <br> 关键词：{point.keywords} <br> 摘要：{point.abstract}'
          }
        }, false)
      }

      var x = patent.x
      patent.x = patent.z
      patent.z = x

      scatterChart.get(patent.group_id).addPoint(patent, false)
    })

    scatterChart.redraw()
  }

  function render(group) {
    var colors = randomColors(Math.max(group.children.length, 10))

    if (!group.topic) group.topic = '专利聚类'
    pieChart.setTitle({text: group.topic})

    updatePieChart(group, colors)
    pieChart.hideLoading()

    updateColumnChart(group, colors)
    columnChart.hideLoading()

    updateScatterChart(group, colors)
    scatterChart.hideLoading()
  }

  var cachedGroups = {}
  function reload() {
    var groupId = location.hash.replace(/^#!\//, '') || '0'

    $('.go-back').prop('disabled', groupId === '0')

    var cache = cachedGroups[groupId]
    if (cache) return render(cache)

    pieChart.showLoading('loading...')
    columnChart.showLoading('loading...')
    scatterChart.showLoading('loading...')

    $.get('/api/groups/' + groupId, render)
  }

  reload()
  $(window).on('hashchange', reload)

  $('.go-back').on('click', function (event) {
    event.preventDefault()
    history.back()
  })

  $(scatterChart.container).on('mousedown.hc touchstart.hc', function (event) {
    event = scatterChart.pointer.normalize(event)

    var sensitivity = 5
    var oldPageX = event.pageX
    var oldPageY = event.pageY
    var oldAlpha = scatterChart.options.chart.options3d.alpha
    var oldBeta = scatterChart.options.chart.options3d.beta

    $(document).on({
      'mousemove.hc touchdrag.hc': function (event) {
        var newBeta = oldBeta + (oldPageX - event.pageX) / sensitivity
        scatterChart.options.chart.options3d.beta = newBeta

        var newAlpha = oldAlpha + (event.pageY - oldPageY) / sensitivity
        scatterChart.options.chart.options3d.alpha = newAlpha

        scatterChart.redraw(false)
      },
      'mouseup touchend': function () {
        $(document).off('.hc')
      }
    })
  })
})*/
