/* global Highcharts */

/*
var pieChart = null
var columnChart = null
var scatterChart = null

$(function () {













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
