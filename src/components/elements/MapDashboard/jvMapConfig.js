const jvMapConfig = {
    map: "world_mill",
    normalizeFunction: "polynomial",
    hoverOpacity: .7,
    hoverColor: false,
    regionStyle: {
        initial: {
            fill: "#e3eaef"
        }
    },
    markerStyle: {
        initial: {
            "r": 9,
            "fill": "#3B7DDD",
            "fill-opacity": .95,
            "stroke": "#fff",
            "stroke-width": 7,
            "stroke-opacity": .4
        },
        hover: {
            "stroke": "#fff",
            "fill-opacity": 1,
            "stroke-width": 1.5
        }
    },
    backgroundColor: "transparent",
    zoomOnScroll: false,
}

export { jvMapConfig }