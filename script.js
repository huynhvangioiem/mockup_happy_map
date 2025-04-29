am5.ready(function () {

    // Create root element
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create the map chart
    var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator()
    }));

    // Create main polygon series for countries
    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
        fill: am5.color(0xEEEEEE),
        stroke: am5.color(0xCCCCCC)
    }));

    // Create point series for markers
    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    // Define marker look
    pointSeries.bullets.push(function () {
        return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
                radius: 7,
                tooltipText: "{title}\n{subTitle}",
                tooltipY: 0,
                fill: am5.color(0xFFBA08),
                stroke: am5.color(0xFFFFFF),
                strokeWidth: 2
            })
        });
    });

    // Add data for happiness points
    var happinessData = [{
        geometry: { type: "Point", coordinates: [144.9631, -37.8136] },
        title: "Melbourne, VIC, Australia",
        subTitle: "User Happiness: Okay",
        status: "okay"
    }, {
        geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
        title: "New York, USA",
        subTitle: "User Happiness: Happy",
        status: "happy"
    }, {
        geometry: { type: "Point", coordinates: [2.3522, 48.8566] },
        title: "Paris, France",
        subTitle: "User Happiness: Unhappy",
        status: "unhappy"
    }, {
        geometry: { type: "Point", coordinates: [139.6917, 35.6895] },
        title: "Tokyo, Japan",
        subTitle: "User Happiness: Happy",
        status: "happy"
    }, {
        geometry: { type: "Point", coordinates: [55.2708, 25.2048] },
        title: "Dubai, UAE",
        subTitle: "User Happiness: Happy",
        status: "happy"
    }, {
        geometry: { type: "Point", coordinates: [28.0473, -26.2041] },
        title: "Johannesburg, South Africa",
        subTitle: "User Happiness: Okay",
        status: "okay"
    }, {
        geometry: { type: "Point", coordinates: [77.2090, 28.6139] },
        title: "New Delhi, India",
        subTitle: "User Happiness: Unhappy",
        status: "unhappy"
    }, {
        geometry: { type: "Point", coordinates: [-46.6333, -23.5505] },
        title: "São Paulo, Brazil",
        subTitle: "User Happiness: Okay",
        status: "okay"
    }, {
        geometry: { type: "Point", coordinates: [116.4074, 39.9042] },
        title: "Beijing, China",
        subTitle: "User Happiness: Happy",
        status: "happy"
    }, {
        geometry: { type: "Point", coordinates: [-0.1276, 51.5074] },
        title: "London, UK",
        subTitle: "User Happiness: Okay",
        status: "okay"
    }, {
        geometry: { type: "Point", coordinates: [37.6173, 55.7558] },
        title: "Moscow, Russia",
        subTitle: "User Happiness: Unhappy",
        status: "unhappy"
    }, {
        geometry: { type: "Point", coordinates: [101.6869, 3.1390] },
        title: "Kuala Lumpur, Malaysia",
        subTitle: "User Happiness: Happy",
        status: "happy"
    }, {
        geometry: { type: "Point", coordinates: [105.8542, 21.0285] },
        title: "Ha Noi, Vietnam",
        subTitle: "User Happiness: Happy",
        status: "happy"
    }, {
        geometry: { type: "Point", coordinates: [106.6297, 10.8231] },
        title: "Ho Chi Minh City, Vietnam",
        subTitle: "User Happiness: Happy",
        status: "happy"
    }, {
        geometry: { type: "Point", coordinates: [105.7794, 10.0452] },
        title: "Can Tho, Vietnam",
        subTitle: "User Happiness: Happy",
        status: "happy"
    }];

    // Add status colors
    var statusColors = {
        happy: 0x4CAF50,
        okay: 0xFFBA08,
        unhappy: 0xFF5252
    };

    // Update marker colors based on status
    pointSeries.bullets.push(function (root, series, dataItem) {
        return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
                radius: 7,
                tooltipText: "{title}\n{subTitle}",
                tooltipY: 0,
                fill: am5.color(statusColors[dataItem.dataContext.status]),
                stroke: am5.color(0xFFFFFF),
                strokeWidth: 2
            })
        });
    });

    // Configure point series
    pointSeries.data.setAll(happinessData);

    // Add legend
    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        y: 15,
        layout: root.horizontalLayout
    }));

    var legendData = [{
        name: "Happy Users",
        value: "24.7%",
        color: 0x4CAF50
    }, {
        name: "Okay Users",
        value: "12.2%",
        color: 0xFFBA08
    }, {
        name: "Unhappy Users",
        value: "75.1%",
        color: 0xFF5252
    }];

    legend.data.setAll(legendData.map(item => ({
        name: `${item.name} ${item.value}`,
        fill: am5.color(item.color)
    })));

    // Set up zooming
    chart.set("zoomLevel", 1);
    chart.set("maxZoomLevel", 5);

    // Enable zoom with mouse wheel
    chart.set("wheelZoom", true);

    // Make map load all the elements
    chart.appear(1000, 100);

});
