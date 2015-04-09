/**
 * Created by carol on 2015/4/8.
 */
define(function(require, exports, module) {
    var pos1 = {
        left: '226px',
        top: '32px'
        },
        pos2 = {
            left: '125px',
            top: '152px'
        },
        pos3 = {
            left: '327px',
            top: '152px'
        };
    var topAnimation = null;
    var bottomAnimation = null;

    var htmlLine = '<div class="line-chart" data-chart-type="line">' +
                        '<div class="line-chart-list"><\/div>' +
                    '<\/div>';
    var htmlPie = '<div class="pie-chart" data-chart-type="pie">' +
                        '<div class="pie-chart-list"><\/div>' +
                    '<\/div>';

    var htmlColumn = '<div class="column-chart" data-chart-type="column">' +
                        '<div class="column-chart-list"><\/div>' +
                    '<\/div>';

    exports.menu = function() {
        $('#top-menu-button').click(function() {
            if($('#top-menu-list').css('display') != 'none') {
                clearInterval(topAnimation);
                $('#top-menu-list').css('visibility', 'none');
            } else {
                topAnimation = setInterval(function() {
                    return (function() {
                        $('#top-menu-list .line').animate(pos2, 5000);
                        $('#top-menu-list .line').animate(pos3, 5000);
                        $('#top-menu-list .line').animate(pos1, 5000);
                        $('#top-menu-list .pie').animate(pos3, 5000);
                        $('#top-menu-list .pie').animate(pos1, 5000);
                        $('#top-menu-list .pie').animate(pos2, 5000);
                        $('#top-menu-list .column').animate(pos1, 5000);
                        $('#top-menu-list .column').animate(pos2, 5000);
                        $('#top-menu-list .column').animate(pos3, 5000);
                    })
                }(),1000);
                $('#top-menu-list').css('display', 'block');
            }
        });

        $('#bottom-menu-button').click(function() {
            if($('#bottom-menu-list').css('display') != 'none') {
                clearInterval(bottomAnimation);
                $('#bottom-menu-list').css('display', 'none');
            } else {
                bottomAnimation = setInterval(function() {
                        $('#bottom-menu-list .line').animate(pos2, 5000);
                        $('#bottom-menu-list .line').animate(pos3, 5000);
                        $('#bottom-menu-list .line').animate(pos1, 5000);
                        $('#bottom-menu-list .pie').animate(pos3, 5000);
                        $('#bottom-menu-list .pie').animate(pos1, 5000);
                        $('#bottom-menu-list .pie').animate(pos2, 5000);
                        $('#bottom-menu-list .column').animate(pos1, 5000);
                        $('#bottom-menu-list .column').animate(pos2, 5000);
                        $('#bottom-menu-list .column').animate(pos3, 5000);
                }(),1000);
              $('#bottom-menu-list').css('display', 'block');
            }
        });

        $('#top-menu-list .line').click(function() {
            clearInterval(topAnimation);
            $('#top-menu-list').css('display', 'none');
            $('#left-charts-top')[0].innerHTML = htmlLine;
        });

        $('#top-menu-list .pie').click(function() {
            clearInterval(topAnimation);
            $('#top-menu-list').css('display', 'none');
            $('#left-charts-top')[0].innerHTML = htmlPie;
        });

        $('#top-menu-list .column').click(function() {
            clearInterval(topAnimation);
            $('#top-menu-list').css('display', 'none');
            $('#left-charts-top')[0].innerHTML = htmlColumn;
        });

        $('#bottom-menu-list .line').click(function() {
            clearInterval(bottomAnimation);
            $('#bottom-menu-list').css('display', 'none');
            $('#left-charts-bottom')[0].innerHTML = htmlLine;
        });

        $('#bottom-menu-list .pie').click(function() {
            clearInterval(bottomAnimation);
            $('#bottom-menu-list').css('display', 'none');
            $('#left-charts-bottom')[0].innerHTML = htmlPie;
        });

        $('#bottom-menu-list .column').click(function() {
            clearInterval(bottomAnimation);
            $('#bottom-menu-list').css('display', 'none');
            $('#left-charts-bottom')[0].innerHTML = htmlColumn;
        });

    }
})
