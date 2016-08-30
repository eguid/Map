//电子围栏实例
var eFence = (function() {
    //是否在矩形内（true:在内部，false:在外部）
    var _isInRect = function(pt, bds) {
        return BMapLib.GeoUtils.isPointInRect(pt, bds);
    };
    //是否在多边形内（true:在内部，false:在外部）
    var _isInPolygon = function(pt, ply) {
        return BMapLib.GeoUtils.isPointInPolygon(pt, ply);
    };
    //是否在圆内（true:在内部，false:在外部）
    var _isInCircle = function(pt, circle) {
        return BMapLib.GeoUtils.isPointInCircle(pt, circle);
    };
    //是否在折线上（true:在线上，false:不在线上）
    var _isOnPolyline = function(pt, ply) {
        return BMapLib.GeoUtils.isPointOnPolyline(pt, ply);
    };
    var _isInOverlay = function(pt, bds, num) {
        return num == 1 ? _isInRect(pt, bds) : (num == 2 ? _isOnPolyline(pt, bds) : (num == 3 ? _isInCircle(pt, bds) : _isInPolygon(pt, bds)));
    };
    //对外接口
    return {
        isInRect: _isInRect,
        isInPolygon: _isInPolygon,
        isInCircle: _isInCircle,
        isOnPolyline: _isOnPolyline,
        isInOverlay: _isInOverlay
    }
});
//用于实例化电子围栏
var createEntity = (function() {
    //实例化圆形(圆心点和半径)
    var createCircleByPoint = function(circleCenter, circleRadius) {
        return new BMap.Circle(circleCenter, circleRadius);
    };
    //实例化圆形(圆心点经、纬度和半径)
    var createCircle = function(lng, lat, circleRadius) {
        return createCircleByPoint(new BMap.Point(lng, lat), circleRadius);
    };
    //实例化折线(point数组)
    var createPolyline = function(pts) {
        return new BMap.Polyline(pts);
    };
    //实例化矩形(西北角point，东南角point)
    var createRectByPoint = function(pt1, pt2) {
        return new BMap.Bounds(pt1, pt2)
    };
    //实例化矩形（四个坐标）
    var createRect = function(lng1, lat1, lng2, lat2) {
        return createRectByPoint(new BMap.Point(lng1, lat1), new BMap.Point(lng2, lat2));
    };
    //实例化多边形（point数组）
    var createPolygon = function(pts) {
        return new BMap.Polygon(pts);
    }
    return {
        newCircle: createCircle,
        newCircleByPoint: createCircleByPoin,
        newLine: createPolyline,
        newRect: createRect,
        newRectByPoint: createCircleByPoin,
        newPolygon: createPolygon
    }
});

//示例
// var pts = [];
// var pt1 = new BMap.Point(116.395, 39.910);
// var pt2 = new BMap.Point(116.405, 39.920);
// var pt3 = new BMap.Point(116.410, 39.920);
// pts.push(pt1);
// pts.push(pt2);
// pts.push(pt3);
// var ply = new BMap.Polyline(pts);
// var ply = new BMap.Polygon(pts);
// var ply = new BMap.Polygon(pts);   
// map.clearOverlays();
// var mkr = new BMap.Marker(pt);
// map.addOverlay(mkr);
// map.addOverlay(ply);