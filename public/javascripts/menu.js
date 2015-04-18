/**
 * Created by carol on 2015/4/8.
 * 页面菜单部分，共有三个菜单区域
 */
define(function(require, exports, module) {
    var shareParams = require('../javascripts/shareParams');

    var htmlMatrix = '<div class="matrix-chart" data-chart-type="matrix">' +
                        '<div class="matrix-chart-list"><\/div>' +
                    '<\/div>';
    var htmlPie = '<div class="pie-chart" data-chart-type="pie">' +
                        '<div class="pie-chart-list"><\/div>' +
                    '<\/div>';

    var htmlColumn = '<div class="column-chart" data-chart-type="column">' +
                        '<div class="column-chart-list"><\/div>' +
                    '<\/div>';

    exports.menu = function() {

        var plus = $('#plus');
        var minus = $('#minus');
        var singleDrag = $('#single-point-drag');
        var setDrag = $('#set-points-drag');
        var allDrag = $('#all-points-drag');

        plus.click(function() {
            minus.removeClass('chosen');
            singleDrag.removeClass('chosen');
            setDrag.removeClass('chosen');
            allDrag.removeClass('chosen');
            plus.addClass('chosen');
            shareParams.shareParams._pm._flag = 1;     //表示放大
            shareParams.shareParams._current_menu_choice = shareParams.shareParams._main_menu_choice['plus'];
        })

        minus.click(function() {
            plus.removeClass('chosen');
            singleDrag.removeClass('chosen');
            setDrag.removeClass('chosen');
            allDrag.removeClass('chosen');
            minus.addClass('chosen');
            shareParams.shareParams._pm._flag = -1;    //表示缩小
            shareParams.shareParams._current_menu_choice = shareParams.shareParams._main_menu_choice['minus'];
        })

        singleDrag.click(function() {
            plus.removeClass('chosen');
            minus.removeClass('chosen');
            setDrag.removeClass('chosen');
            allDrag.removeClass('chosen');
            singleDrag.addClass('chosen');
            shareParams.shareParams._pm._flag = 0;    //表示放缩失效
            shareParams.shareParams._current_menu_choice = shareParams.shareParams._main_menu_choice['single_point_drag'];
        })

        setDrag.click(function() {
            plus.removeClass('chosen');
            minus.removeClass('chosen');
            singleDrag.removeClass('chosen');
            allDrag.removeClass('chosen');
            setDrag.addClass('chosen');
            shareParams.shareParams._pm._flag = 0;    //表示放缩失效
            shareParams.shareParams._current_menu_choice = shareParams.shareParams._main_menu_choice['set_point_drag'];
        })

        allDrag.click(function() {
            plus.removeClass('chosen');
            minus.removeClass('chosen');
            singleDrag.removeClass('chosen');
            setDrag.removeClass('chosen');
            allDrag.addClass('chosen');
            shareParams.shareParams._pm._flag = 0;    //表示放缩失效
            shareParams.shareParams._current_menu_choice = shareParams.shareParams._main_menu_choice['all_point_drag'];
        })

        $('#matrix-1').change(function() {
            if(this.checked) {
                $('#left-charts-top')[0].innerHTML = htmlMatrix;
            }
        })
        $('#pie-1').change(function() {
            if(this.checked) {
                $('#left-charts-top')[0].innerHTML = htmlPie;
            }
        })
        $('#column-1').change(function() {
            if(this.checked) {
                $('#left-charts-top')[0].innerHTML = htmlColumn;
            }
        })
        $('#matrix-2').change(function() {
            if(this.checked) {
                $('#left-charts-bottom')[0].innerHTML = htmlMatrix;
            }
        })
        $('#pie-2').change(function() {
            if(this.checked) {
                $('#left-charts-bottom')[0].innerHTML = htmlPie;
            }
        })
        $('#column-2').change(function() {
            if(this.checked) {
                $('#left-charts-bottom')[0].innerHTML = htmlColumn;
            }
        })
    }
})
