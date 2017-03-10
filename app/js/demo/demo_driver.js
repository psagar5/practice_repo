(function () {
    var d3Array1 =[];
    var d3Array2 =[];
    var d3Array3 =[];
    var d3Array4 =[];
    var packetArray1 = [];
    var packetArray2 = [];
    var packetArray3 = [];
    var packetArray4 = [];
    function DataFetcher(urlFactory, delay) {
        var self = this;

        self.repeat = false;
        self.delay = delay;
        self.timer = null;
        self.requestObj = null;


        function getNext() {
            self.requestObj = $.ajax({
                    url: urlFactory()
                }).done(function(response) {
                    $(self).trigger("stateFetchingSuccess", {
                        result: response
                    });
                    $(self).trigger("drawChart1", {
                    result: response
                    });$(self).trigger("drawChart2", {
                    result: response
                    });$(self).trigger("drawChart3", {
                    result: response
                    });$(self).trigger("drawChart4", {
                    result: response
                    });$(self).trigger("drawChart5", {
                    result: response
                    });$(self).trigger("drawChart6", {
                    result: response
                    });$(self).trigger("drawChart7", {
                    result: response
                    });$(self).trigger("drawChart8", {
                    result: response
                    });
                    
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    $(self).trigger("stateFetchingFailure", {
                        error: textStatus
                    });
                }).always(function() {
                    if (self.repeat && _.isNumber(self.delay)) {
                        self.timer = setTimeout(getNext, self.delay);
                    }
                });
        }

        self.start = function(shouldRepeat) {
            self.repeat = shouldRepeat;
            getNext();
        };

        self.stop = function() {
            self.repeat = false;
            clearTimeout(self.timer);
        };

        self.repeatOnce = function() {
            getNext();
        };

        self.setDelay = function(newDelay) {
            this.delay = newDelay;
        };
    }

    function addNewEntry($container, contentHTML) {
        if(contentHTML.srcType=="type1"){
            d3Array1.push(contentHTML.traffic/500);
            packetArray1.push(contentHTML.packets/10);
        }
        if(contentHTML.srcType=="type2") {
            d3Array2.push(contentHTML.traffic / 500);
            packetArray2.push(contentHTML.packets / 10);
        }
        if(contentHTML.srcType=="type3") {
            d3Array3.push(contentHTML.traffic / 500);
            packetArray3.push(contentHTML.packets / 10);
        }
        if(contentHTML.srcType=="type4"){
            d3Array4.push(contentHTML.traffic/500);
            packetArray4.push(contentHTML.packets / 10);
        }
        var $innerSpan = $("<p/>").text(contentHTML),
            $newEntry = $("<li/>").append($innerSpan);

        $container.append($newEntry);
    }

    var $trafficStatusList = $("#mockTrafficStat"),
        df2 = new DataFetcher(function() {
            return "/traffic_status/frozen";
        });

    $(df2).on({
        "stateFetchingSuccess": function(event, data) {
            data.result.data.forEach(function(dataEntry) {
                addNewEntry($trafficStatusList,dataEntry);
            });
        },
        "stateFetchingFailure": function(event, data) {
            addNewEntry($trafficStatusList, data.error);
            addNewEntry($trafficStatusList, "Hit a snag. Retry after 1 sec...");
            setTimeout(function() {
                $trafficStatusList.html("");
                df2.repeatOnce();
            }, 1000);
        },
        "drawChart1":function () {
            d3.select('#chart')
                .selectAll("div")
                .data(d3Array1)
                .enter()
                .append("span")
                .style("height", (d)=> d + "px")
        },
        "drawChart5":function () {
            d3.select('#chart5')
                .selectAll("div")
                .data(packetArray1)
                .enter()
                .append("span")
                .style("height", (d)=> d + "px")
        },
        "drawChart2":function () {
            d3.select('#chart2')
                .selectAll("div")
                .data(d3Array2)
                .enter()
                .append("span")
                .style("height", (d)=> d + "px")
        },
        "drawChart3":function () {
            d3.select('#chart3')
                .selectAll("div")
                .data(d3Array3)
                .enter()
                .append("span")
                .style("height", (d)=> d + "px")
        },
        "drawChart4":function () {
            d3.select('#chart4')
                .selectAll("div")
                .data(d3Array4)
                .enter()
                .append("span")
                .style("height", (d)=> d + "px")
        },
        "drawChart6":function () {
            d3.select('#chart6')
                .selectAll("div")
                .data(packetArray2)
                .enter()
                .append("span")
                .style("height", (d)=> d + "px")
        },
        "drawChart7":function () {
            d3.select('#chart7')
                .selectAll("div")
                .data(packetArray3)
                .enter()
                .append("span")
                .style("height", (d)=> d + "px")
        },
        "drawChart8":function () {
            d3.select('#chart8')
                .selectAll("div")
                .data(packetArray4)
                .enter()
                .append("span")
                .style("height", (d)=> d + "px")
        },
    });

    df2.start();
})();