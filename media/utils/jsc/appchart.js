"use strict";
customMerge(cen$ver, {
    vi: {
        lan: 'lan - vi'
    },
    en: {
        lan: 'lan - en'
    }
    ,

    chart_youtube: (function () {

        var gidL = {}, colr, cHair = '#666';
        //


        function getGradient(ctx, chartArea, data, scales) {
            //debugger;
            const left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                width = chartArea.width, height = chartArea.height,
                x = scales.x || scales['x-axis-0'], y = scales.y || scales['y-axis-0'],
                gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
            //
            var shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
            //
            if (shift > 1) shift = 1;
            if (shift < 0) shift = 0;
            //
            gradientBorder.addColorStop(0, 'rgba(75, 192, 192, 1)');
            gradientBorder.addColorStop(shift, 'rgba(75, 192, 192, 1)');
            gradientBorder.addColorStop(shift, 'rgba(255, 26, 104, 1)');
            gradientBorder.addColorStop(1, 'rgba(255, 26, 104, 1)');

            return gradientBorder;
        }

        function belowGradient(ctx, chartArea, data, scales) {
            //debugger;
            const left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                width = chartArea.width, height = chartArea.height,
                x = scales.x || scales['x-axis-0'], y = scales.y || scales['y-axis-0'],

                gradientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0, bottom);

            gradientBackground.addColorStop(0, 'rgba(255, 26, 104, 0)');
            gradientBackground.addColorStop(1, 'rgba(255, 26, 104, 0.5)');

            return gradientBackground;
        }

        function aboveGradient(ctx, chartArea, data, scales) {
            //debugger;
            const left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                width = chartArea.width, height = chartArea.height,
                x = scales.x || scales['x-axis-0'], y = scales.y || scales['y-axis-0'],

                gradientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0, top);

            gradientBackground.addColorStop(0, 'rgba(75, 192, 192, 0)');
            gradientBackground.addColorStop(1, 'rgba(75, 192, 192, 0.5)');

            return gradientBackground;
        }


        const O = function (main, sub, dat) {

            //debugger;
            //
            if (cS$.c0lor == 'dark') {
                gidL = {
                    color: '#4d4d4d'
                };
                colr = '#dedede';
                cHair = '#BBBBBB';
            };

            //debugger;

            const dates = dat.a, numbers = dat.b, volume = dat.c;

            //console.log(dat);

            //for (var i = 0; i < 200; i++) {
            //    const date = new Date();
            //    date.setDate(date.getDate() + i);
            //    dates.push(date.setHours(0, 0, 0, 0));
            //    numbers.push(Math.random() * 10);
            //    volume.push(Math.random() * 100);
            //}

            //debugger;

            // setup 
            const data = {
                labels: dates,//['2024-03-24', '2024-03-25', '2024-03-26', '2024-03-27', '2024-03-28', '2024-03-29', '2024-03-30'],
                datasets: [{
                    label: 'Weekly Sales',
                    data: numbers,//[9.33, 12, 6, 9, 12, 3, 9],
                    //backgroundColor: [
                    //  'rgba(255, 26, 104, 0.2)',
                    //  'rgba(54, 162, 235, 0.2)',
                    //  'rgba(255, 206, 86, 0.2)',
                    //  'rgba(75, 192, 192, 0.2)',
                    //  'rgba(153, 102, 255, 0.2)',
                    //  'rgba(255, 159, 64, 0.2)',
                    //  'rgba(0, 0, 0, 0.2)'
                    //],
                    fill: {
                        target: {
                            value: numbers[0]
                        },
                        below: function (context) {
                            const chart = context.chart,
                                chartArea = chart.chartArea;
                            if (!chartArea) return null;
                            return belowGradient(chart.ctx, chartArea, chart.data, chart.scales);
                        },
                        above: function (context) {
                            const chart = context.chart,
                                chartArea = chart.chartArea;
                            if (!chartArea) return null;
                            return aboveGradient(chart.ctx, chartArea, chart.data, chart.scales);
                        }
                    },
                    //borderColor: [
                    //  'rgba(255, 26, 104, 1)',
                    //  'rgba(54, 162, 235, 1)',
                    //  'rgba(255, 206, 86, 1)',
                    //  'rgba(75, 192, 192, 1)',
                    //  'rgba(153, 102, 255, 1)',
                    //  'rgba(255, 159, 64, 1)',
                    //  'rgba(0, 0, 0, 1)'
                    //],

                    borderColor: function (context) {
                        const chart = context.chart,
                            chartArea = chart.chartArea;

                        if (!chartArea) return null;
                        return getGradient(chart.ctx, chartArea, chart.data, chart.scales);

                    },
                    tension: 0,
                    pointRadius: 0,
                    pointHitRadius: 0,
                    pointHoverRadius: 0,
                    borderWidth: 2
                }

                //, {
                //    backgroundColor:'blue',
                //    label: 'Stock volume',
                //    type: 'bar',
                //    data: volume,
                //    pointHitRadius: 0,
                //    pointHoverRadius: 0,
                //    yAxisID:'volume'
                //}

                ]
            };

            //dottedLine plugin block
            const dottedLine = {
                id: 'dottedLine',
                beforeDatasetsDraw: function (chart, args, pluginOptions) {
                    const startingPoint = data.datasets[0].data[0],
                        ctx = chart.ctx,
                        chartArea = chart.chartArea,
                        scales = chart.scales,
                        left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                        width = chartArea.width, height = chartArea.height,
                        x = scales.x || scales['x-axis-0'], y = scales.y || scales['y-axis-0'];

                    ctx.save();
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.setLineDash([1, 5]);
                    ctx.strokeStyle = 'rgba(102,102,102,1)';
                    ctx.moveTo(left, y.getPixelForValue(startingPoint));
                    ctx.lineTo(right, y.getPixelForValue(startingPoint));
                    ctx.stroke();
                    ctx.closePath();
                    ctx.setLineDash([]);

                    //draw startingPoint text part 2
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(102,102,102,1)';
                    ctx.fillRect(0, y.getPixelForValue(startingPoint) - 10, left, 20);
                    ctx.closePath();

                    ctx.font = '12px sans-serif';
                    ctx.fillStyle = 'white';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.fillText(startingPoint.toFixed(2), left / 2, y.getPixelForValue(startingPoint));
                }
            }

            // imageLogo plugin block
            const logo = new Image(),
                imageLogo = {
                    id: 'imageLogo',
                    beforeDatasetsDraw: function (chart, args, pluginOptions) {
                        const ctx = chart.ctx,
                            chartArea = chart.chartArea,
                            scales = chart.scales,
                            left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                            x = scales.x || scales['x-axis-0'], y = scales.y || scales['y-axis-0'],
                            imgWidth = 125, imgHeight = 80;


                        ctx.save();
                        if (logo.complete) {
                            ctx.drawImage(logo, right - imgWidth - 10, y.getPixelForValue(2), imgWidth, imgHeight);
                        } else {
                            logo.onload = function () {
                                chart.draw();
                            }
                        };
                        ctx.restore();
                    }
                };
            logo.src = "https://hrm.dnd.vn/media/images/hellologo.png";


            // config 
            const config = {
                type: 'line',
                data: data,
                options: {
                    layout: {
                        padding: {
                            left: 10,
                            right: 5
                        }
                    },
                    scales: {
                        x: {
                            grid: gidL,
                            ticks: {
                                color: colr
                            },
                            type: 'time',
                            time: {
                                unit: 'day'
                            },
                            min: dates[0],
                            max: dates[dates.length - 1]
                        },
                        y: {
                            grid: gidL,
                            ticks: {
                                color: colr
                            },
                            beginAtZero: true
                        },
                        volume: {
                            type: 'linear',
                            position: 'right',
                            min: 0,
                            max: 1000,
                            grid: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                },
                plugins: [dottedLine, imageLogo]
            };


            const myChart_yotube = new Chart(main, config);


            function crosshairLine(chart, mousemove) {
                //part 3
                const canvas = chart.canvas, ctx = chart.ctx, chartArea = chart.chartArea,
                    left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                    coorX = mousemove.offsetX, coorY = mousemove.offsetY;

                chart.update('none');
                ctx.restore();
                //
                if (coorX >= left && coorX <= right && coorY >= top && coorY <= bottom) {
                    canvas.style.cursor = 'crosshair';
                } else {
                    canvas.style.cursor = 'default';
                };


                ctx.strokeStyle = cHair; //'#666'
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);

                if (canvas.style.cursor == 'crosshair') {
                    //horizontal Line
                    ctx.beginPath();
                    ctx.moveTo(left, coorY);
                    ctx.lineTo(right, coorY);
                    ctx.stroke();
                    ctx.closePath();

                    //vertical Line
                    ctx.beginPath();
                    ctx.moveTo(coorX, top);
                    ctx.lineTo(coorX, bottom);
                    ctx.stroke();
                    ctx.closePath();

                    //part 5
                    crosshairLabel(chart, mousemove);
                    //part 7
                    crosshairPoint(chart, mousemove);
                }

            };

            function crosshairLabel(chart, mousemove) {
                //part 5
                const ctx = chart.ctx, chartArea = chart.chartArea,
                        scales = chart.scales,
                        left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                        x = scales.x || scales['x-axis-0'], y = scales.y || scales['y-axis-0'],
                        coorX = mousemove.offsetX, coorY = mousemove.offsetY,
                        textWidth = ctx.measureText(new Date(x.getValueForPixel(coorX)).toLocaleString()).width + 10;

                ctx.font = '12px sans-serif';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';

                // yLabel
                ctx.beginPath();
                ctx.fillStyle = 'rgba(132,132,132,1)';
                ctx.fillRect(0, coorY - 10, left, 20);
                ctx.closePath();

                ctx.fillStyle = 'white';
                ctx.fillText(y.getValueForPixel(coorY).toFixed(2), left / 2, coorY);

                // xLabel
                ctx.beginPath();
                ctx.fillStyle = 'rgba(132,132,132,1)';
                ctx.fillRect(coorX - (textWidth / 2), bottom, textWidth, 20);
                ctx.closePath();

                ctx.fillStyle = 'white';
                ctx.fillText(new Date(x.getValueForPixel(coorX)).toLocaleString(), coorX, bottom + 10);

            }

            function crosshairPoint(chart, mousemove) {
                //part 7
                const ctx = chart.ctx, chartArea = chart.chartArea,
                        scales = chart.scales,
                        left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                        width = chartArea.width, height = chartArea.height,
                        x = scales.x || scales['x-axis-0'], y = scales.y || scales['y-axis-0'],
                        coorX = mousemove.offsetX, coorY = mousemove.offsetY;

                ctx.beginPath();
                //ctx.fillStyle = 'rgba(255,26,104,1)';
                ctx.strokeStyle = cHair;//'#666';
                ctx.lineWidth = 3;
                ctx.setLineDash([]);
                //
                if (!x._gridLineItems) x._gridLineItems = x._ticks;//version 2 for ie...
                //
                const angle = Math.PI / 180,
                    //segments = x._gridLineItems.length - 1,
                    // segments=width/(dates.length -1),
                    segments = width / (dates.indexOf(x.max) - dates.indexOf(x.min)),
                    yOpening = y.getPixelForValue(data.datasets[0].data[0]),
                    index = Math.floor((coorX - left) / segments) + dates.indexOf(x.min);



                const yStart = y.getPixelForValue(data.datasets[0].data[index]),
                    yEnd = y.getPixelForValue(data.datasets[0].data[index + 1]),
                    yInterpolation = yStart + ((yEnd - yStart) / segments * (coorX - x.getPixelForValue(data.labels[index])));


                //console.log(yInterpolation);

                if (yOpening >= yInterpolation) {
                    ctx.fillStyle = 'rgba(75, 192, 192, 1)';
                } else {
                    ctx.fillStyle = 'rgba(255,26,104,1)';
                };

                //raw the circle
                ctx.arc(
                    coorX,
                    yInterpolation,
                    5,
                    angle * 0,
                    angle * 360,
                    false
                );
                ctx.fill();
                ctx.stroke();
            }


            //part 15 - zoom
            function zoom(chart, mousewheel) {

                const scales = chart.config.options.scales, min = scales.x.min, max = scales.x.max,

                    x = chart.scales.x || chart.scales['x-axis-0'],//note  chart.scales # scales = chart.config.options.scales

                    timestamp = x.getValueForPixel(mousewheel.offsetX),
                    dateTimestamp = new Date(timestamp).setHours(0, 0, 0, 0),
                    scrollPoint = dates.indexOf(dateTimestamp);

                //debugger;
                //console.log(new Date().getTime(),'hello');

                if (mousewheel.wheelDeltaY >= 0) {

                    chart.config.options.scales.x.min = dates[dates.indexOf(min) + 1];
                    chart.config.options.scales.x.max = dates[dates.indexOf(max) - 1];
                    //
                    if (dates[dates.indexOf(min)] <= 0) {
                        chart.config.options.scales.x.min = date[0];
                    };

                    if (dates.indexOf(min) >= scrollPoint - 4 && dates.indexOf(min) <= scrollPoint) {
                        chart.config.options.scales.x.min = min;
                    };

                    if (dates.indexOf(max) <= scrollPoint + 4 && dates.indexOf(max) >= scrollPoint) {
                        chart.config.options.scales.x.max = max;
                    }

                };;
                if (mousewheel.wheelDeltaY < 0) {
                    chart.config.options.scales.x.min = dates[dates.indexOf(min) - 1];
                    chart.config.options.scales.x.max = dates[dates.indexOf(max) + 1];
                    //
                    if (dates[dates.indexOf(max)] >= dates[dates.length - 1]) {
                        chart.config.options.scales.x.max = dates[dates.length - 1];
                    };

                    const weekms = 86400000 * 14,
                        range = max - min;
                    if (range >= weekms) {
                        if (dates.indexOf(min) >= scrollPoint - 4 && dates.indexOf(min) <= scrollPoint) {
                            chart.config.options.scales.x.min = min;
                        };
                        if (dates.indexOf(max) <= scrollPoint + 4 && dates.indexOf(max) >= scrollPoint) {
                            chart.config.options.scales.x.max = max;
                        };
                    };
                };
                //
                zoomBox(min, max);
                chart.update('none');
                //
            };



            myChart_yotube.canvas.addEventListener('mousemove', function (e) {
                //part 3
                crosshairLine(myChart_yotube, e);
            });


            myChart_yotube.canvas.addEventListener('wheel', function (e) {
                e.stopPropagation();
                e.preventDefault();
                zoom(myChart_yotube, e);
            });



            // setup 
            const data2 = {
                labels: dates,
                datasets: [{
                    label: 'Weekly Sales',
                    data: numbers,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    pointHitRadius: 0
                }]
            };

            // config 
            const config2 = {
                type: 'line',
                data: data2,
                options: {
                    animation: false,
                    layout: {
                        padding: {
                            left: myChart_yotube.chartArea.left - myChart_yotube.config.options.layout.padding.left,
                            right: myChart_yotube.width - myChart_yotube.chartArea.right
                        }
                    },
                    aspectRatio: 10,
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: {
                                color: colr
                            },
                            type: 'time',
                            time: {
                                unit: 'day'
                            },
                            min: dates[0],
                            max: dates[dates.length - 1]
                        },
                        y: {
                            grid: { display: false },
                            beginAtZero: true,
                            ticks: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            display: true
                        }
                    }
                }
            };

            // render init block
            const myChart_youtube2 = new Chart(sub, config2);

            const zoomBox = function (min, max) {

                myChart_youtube2.update('none');

                const chart = myChart_youtube2, ctx = chart.ctx, chartArea = chart.chartArea,
                        scales = chart.scales,
                        left = chartArea.left, right = chartArea.right, top = chartArea.top, bottom = chartArea.bottom,
                        width = chartArea.width, height = chartArea.height,
                        x = scales.x || scales['x-axis-0'], y = scales.y || scales['y-axis-0'];

                //
                if (!min) min = dates[0];
                //
                myChart_youtube2.__bkPARA = [min, max, x, y, height, width, left, right, top, bottom];
                //
                //
                if (!x._gridLineItems) x._gridLineItems = x._ticks;//version 2 for ie...
                //
                zoomBoxItem(max, min);
                //
            }
            , zoomBoxItem = function (max, min) {
                if (!myChart_youtube2.__bkPARA) return;
                const chart = myChart_youtube2, ctx = chart.ctx,
                    para = myChart_youtube2.__bkPARA,
                    x = para[2], y = para[3], height = para[4], width = para[5], left = para[6], right = para[7], top = para[8], bottom = para[9];

                //
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = 'rgba(54,162,235,0.5)';
                ctx.fillRect(x.getPixelForValue(min), top, x.getPixelForValue(max) - x.getPixelForValue(min), height);
                ctx.closePath()
                ctx.restore();
                //
                swiperButton(ctx, x.getPixelForValue(min), height);
                swiperButton(ctx, x.getPixelForValue(max), height);
            }
            , swiperButton = function (ctx, position, height) {
                const angle = Math.PI / 180;

                ctx.beginPath();
                ctx.fillStyle = 'rgba(54,162,235,1)';
                ctx.fillStyle = '#FFF';
                ctx.lineWidth = 2;
                ctx.arc(position, height / 2, 10, angle * 0, angle * 360, false);
                ctx.fill();
                ctx.stroke();
                ctx.closePath()
                ctx.restore();

                //part 23 draw drag handler icon
                ctx.fillStyle = 'rgba(54,162,235,1)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(position + 3, height / 2 - 5);
                ctx.lineTo(position + 3, height / 2 + 5);
                ctx.stroke();

                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(position - 3, height / 2 - 5);
                ctx.lineTo(position - 3, height / 2 + 5);
                ctx.stroke();

            }
            , mouseCursor = function (canvas, mousemove) {

                if (!myChart_youtube2.__bkPARA) return;

                const para = myChart_youtube2.__bkPARA,
                    confX = myChart_yotube.config.options.scales.x,
                    x = para[2], y = para[3];//, height=para[4], width, left, right, top, bottom];

                if (mousemove.offsetX >= x.getPixelForValue(confX.min) - 10 && mousemove.offsetX <= x.getPixelForValue(confX.min) + 10
                    || mousemove.offsetX >= x.getPixelForValue(confX.max) - 10 && mousemove.offsetX <= x.getPixelForValue(confX.max) + 10) {
                    canvas.style.cursor = 'ew-resize';
                } else if (mousemove.offsetX > x.getPixelForValue(confX.min) + 10 && mousemove.offsetX < x.getPixelForValue(confX.max) - 10) {
                    canvas.style.cursor = 'move';
                } else {
                    canvas.style.cursor = 'default';
                };
            }
            , dragStart = function (canvas, drag) {
                //debugger;
                //console.log('dragStart');
                if (!myChart_youtube2.__bkPARA) return;
                //
                const para = myChart_youtube2.__bkPARA,
                      confX = myChart_yotube.config.options.scales.x,
                      x = para[2], y = para[3], height = para[4], width = para[5], left = para[6], right = para[7], top = para[8], bottom = para[9];
                //
                if (drag.offsetX >= x.getPixelForValue(confX.min) - 10 && drag.offsetX <= x.getPixelForValue(confX.min) + 10) {
                    canvas.onmousemove = function (dragDelta) {
                        const timestamp = x.getValueForPixel(dragDelta.offsetX),
                            dayTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);

                        var scrollPoint = dates.indexOf(dayTimestamp);
                        //
                        if (dragDelta.offsetX < left && scrollPoint === -1) {
                            scrollPoint = 0;
                        };
                        if (dragDelta.offsetX > right && scrollPoint === -1) {
                            scrollPoint = dates.indexOf(confX.max) - 4;
                        };
                        if (scrollPoint > dates.indexOf(confX.max) - 4) {
                            scrollPoint = dates.indexOf(confX.max) - 4;
                        };
                        //
                        myChart_yotube.config.options.scales.x.min/*ko duoc doi confX */ = dates[scrollPoint];
                        myChart_yotube.update('none');
                        myChart_youtube2.update('none');
                        zoomBoxItem(dates[scrollPoint], confX.max);
                    };
                };

                if (drag.offsetX >= x.getPixelForValue(confX.max) - 10 && drag.offsetX <= x.getPixelForValue(confX.max) + 10) {
                    canvas.onmousemove = function (dragDelta) {
                        const timestamp = x.getValueForPixel(dragDelta.offsetX),
                           dayTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);

                        var scrollPoint = dates.indexOf(dayTimestamp);
                        //
                        if (dragDelta.offsetX > right && scrollPoint === -1) {
                            scrollPoint = dates.length - 1;
                        };
                        if (dragDelta.offsetX < left && scrollPoint === -1) {
                            scrollPoint = dates.indexOf(confX.min) + 4;
                        };
                        if (scrollPoint < dates.indexOf(confX.min) + 4) {
                            scrollPoint = dates.indexOf(confX.min) + 4;
                        };
                        //
                        myChart_yotube.config.options.scales.x.max/*ko duoc doi confX */ = dates[scrollPoint];
                        myChart_yotube.update('none');
                        myChart_youtube2.update('none');
                        zoomBoxItem(confX.min, dates[scrollPoint]);
                    }
                };
            };




            myChart_youtube2.canvas.addEventListener('mousemove', function (e) {
                mouseCursor(this, e);
            });
            myChart_youtube2.canvas.addEventListener('mousedown', function (e) {
                dragStart(this, e);
            });
            myChart_youtube2.canvas.addEventListener('mouseup', function (e) {
                this.onmousemove = null;
            });


            //window.onload
            zoomBox(dates[0], dates[dates.length - 1]);

            const destroy = function () {
                debugger;
                myChart_yotube.destroy();
                myChart_youtube2.destroy();
                //
                $(main).find('*').off().unbind().removeData();
                $(sub).find('*').off().unbind().removeData();
                //
            };

            return [myChart_yotube, myChart_youtube2, destroy];

        };

        return O;
    })()

});