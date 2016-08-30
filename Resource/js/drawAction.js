 //绘制工具类
 var drawingManagerEntity = function() {
     var pointOverlays = []; //存放点覆盖物
     var lineOverlays = []; //存放折线
     var circleOverlays = []; //存放圆形覆盖物
     var polygonOverlays = []; //存放多边形
     var drawingManager;
     var styleOptions = {
         strokeColor: "red", //边线颜色。
         fillColor: "#green", //填充颜色。当参数为空时，圆形将没有填充效果。
         strokeWeight: 5, //边线的宽度，以像素为单位。
         strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
         fillOpacity: 0.3, //填充的透明度，取值范围0 - 1。
         strokeStyle: 'solid' //边线的样式，solid或dashed。
     };
     var createStyleOptions = function(strokeColor, fillColor, strokeWeight, strokeOpacity, fillOpacity, strokeStyle) {
         styleOptions = {
             strokeColor: strokeColor, //边线颜色。
             fillColor: fillColor, //填充颜色。当参数为空时，圆形将没有填充效果。
             strokeWeight: strokeWeight, //边线的宽度，以像素为单位。
             strokeOpacity: strokeOpacity, //边线透明度，取值范围0 - 1。
             fillOpacity: fillOpacity, //填充的透明度，取值范围0 - 1。
             strokeStyle: strokeStyle //边线的样式，solid或dashed。
         }
     };
     //实例化鼠标绘制工具
     var createDrawingManager = function(styleOption1) {
         if (styleOption1) {
             createStyleOptions = styleOption1;
         }
         drawingManager = new BMapLib.DrawingManager(map, {
             isOpen: false, //是否开启绘制模式
             enableCalculate: false, //绘制完成后是否计算面积
             enableDrawingTool: false, //是否显示工具栏
             drawingType: BMAP_DRAWING_MARKER,
             drawingToolOptions: {
                 anchor: BMAP_ANCHOR_TOP_LEFT,
                 offset: new BMap.Size(0, 200),
                 drawingTypes: [
                     BMAP_DRAWING_MARKER,
                     BMAP_DRAWING_CIRCLE,
                     BMAP_DRAWING_POLYLINE,
                     BMAP_DRAWING_POLYGON,
                     BMAP_DRAWING_RECTANGLE
                 ]
             },
             circleOptions: styleOptions, //圆的样式
             polylineOptions: styleOptions, //线的样式
             polygonOptions: styleOptions, //多边形的样式
             rectangleOptions: styleOptions //矩形的样式
         });
         return drawingManager;
     };
     //存放绘制物(自动判断绘制物类型)，并返回是哪种类型
     var _storeOverlay = function(whitchOverlay) {
         if (whitchOverlay instanceof BMap.Circle) {
             circleOverlays.push(whitchOverlay);
             return 3;
         } else if (whitchOverlay instanceof BMap.Polygon) {
             polygonOverlays.push(whitchOverlay);
             return 4;
         } else if (whitchOverlay instanceof BMap.Marker) {
             pointOverlays.push(whitchOverlay);
             return 1;
         } else if (whitchOverlay instanceof BMap.Polyline) {
             lineOverlays.push(whitchOverlay);
             return 2;
         } else {
             alert("非法操作");
         }
     };
     //清空数组
     var _clear = function(myArray) {
         myArray = [];
     };
     var _clearMap = function(myMap, witchOverlays) {
             if (witchOverlays) {
                 for (var i = 0; i < witchOverlays.length; i++) {
                     myMap.removeOverlay(witchOverlays[i]);
                 }
             }
         }
         //清空覆盖物数组
     var _clearStore = function() {
         _clear(pointOverlays);
         _clear(lineOverlays);
         _clear(circleOverlays);
         _clear(polygonOverlays);
     };
     //清空数组中在地图上的覆盖物
     var _clearOverlaysOnMap = function(myMap) {
         _clearMap(myMap, pointOverlays);
         _clearMap(myMap, lineOverlays);
         _clearMap(myMap, circleOverlays);
         _clearMap(myMap, polygonOverlays);

     };
     //清空所有地图上所有覆盖物和数组
     var _clearStoreAndMap = function(myMap) {
         _clearOverlaysOnMap(myMap);
         _clearStore();
     };
     //1:画点2:画线 3:画矩形4:画圆5:画多边形 
     var _openDraw = function(DrawingType) {
         _closeDraw();
         if (DrawingType == 1) {
             drawingManager.setDrawingMode(BMAP_DRAWING_MARKER);
         } else if (DrawingType == 2) {
             drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE);
         } else if (DrawingType == 3) {
             drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
         } else if (DrawingType == 4) {
             drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
         } else if (DrawingType == 5) {
             drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
         }
         drawingManager.open();
     };
     var _closeDraw = function() {
         drawingManager.close();
     };
     return {
         getDrawManager: function() {
             return drawingManager;
         },
         //改变绘制类型
         openDraw: _openDraw,
         closeDraw: _closeDraw,
         //打开面积计算
         openCalculate: function() {
             drawingManager.enableCalculate();
         },
         //关闭面积计算
         closeCalculate: function() {
             drawingManager.disableCalculate()
         },
         //创建样式
         createStyle: createStyleOptions,
         //创建地图绘制管理器
         createDraw: createDrawingManager,
         //存放绘制物
         storeOverlay: _storeOverlay,
         //获取一种覆盖物的数组(1：点,2：线,3：圆形,4：矩形)
         getOverlays: function(num) {
             return num == 1 ? pointOverlays : (num == 2 ? lineOverlays : (num == 3 ? circleOverlays : polygonOverlays));
         },
         //获取某一个覆盖物
         getOverlay: function(num, num2) {
             return num == 1 ? pointOverlays[num2 - 1] : (num == 2 ? lineOverlays[num2 - 1] : (num == 3 ? circleOverlays[num2 - 1] : polygonOverlays[num2 - 1]));
         },
         //获取某个覆盖物数组最后一个元素
         getLastOverlay: function(num) {
             return num == 1 ? pointOverlays[pointOverlays.length - 1] : (num == 2 ? lineOverlays[lineOverlays.length - 1] : (num == 3 ? circleOverlays[circleOverlays.length - 1] : polygonOverlays[polygonOverlays.length - 1]));
         },
         //如果为空则全部清空
         clearStore: _clearStore,
         //清空数组和地图上的覆盖物
         clearStoreAndMap: _clearStoreAndMap
     }
 };
 //新建一个绘制管理工具对象
 var publicDrawingManager = new drawingManagerEntity();

 //创建绘制管理工具
 publicDrawingManager.createDraw();
 publicDrawingManager.openCalculate();
 //绘制完成后事件(必须放在绑定监听事件之前)
 var overlaycomplete = function(e) {
     var cache1 = e.overlay;
     //存放绘制物
     var whitchOver = publicDrawingManager.storeOverlay(cache1);
     if (whitchOver == 3) {
         var circleRadius = publicDrawingManager.getLastOverlay(3).getRadius(); //半径
         var circlePositon = publicDrawingManager.getLastOverlay(3).getCenter(); //中心点
         var circleLng = circlePositon.lng;
         var circleLat = circlePositon.lat;
         viewDraw(3, circleRadius, circleLng, circleLat);
         return;
     } else if (whitchOver == 4) {
         var polygon1 = publicDrawingManager.getLastOverlay(4);
         var polygonArray = polygon1.getPath();
         viewDraw(4, polygonArray.length);
     }
 };
 //添加鼠标绘制工具监听事件，用于获取绘制结果
 publicDrawingManager.getDrawManager().addEventListener('overlaycomplete', overlaycomplete);

 //清空绘制存放的数组
 function clearAll() {
     //清空覆盖物数组与地图上的覆盖物
     publicDrawingManager.clearStoreAndMap(map);
     //清除绘制的覆盖物列表
     var drawlist = document.getElementById('drawlist');
     while (drawlist.lastChild) {
         drawlist.removeChild(drawlist.lastChild);
     }
 };
 //
 function openDraw(num) {
     publicDrawingManager.openDraw(num);
 }

 function closeDraw() {
     publicDrawingManager.closeDraw();
 }
 //显示绘制的覆盖物到图形列表（是否圆形（圆形0，多边形1），圆形坐标或多边形点数量，圆形中心点经、纬度）
 function viewDraw(isoverlays, positons, circleLng, circleLat) {
     //使用内存虚拟操作元素
     var fragment1 = document.createDocumentFragment();
     var li = document.createElement('li');
     var text = document.createTextNode(isoverlays == 3 ? "圆形覆盖物" : "多边形覆盖物");
     li.appendChild(text);
     if (isoverlays == 3) {
         var span1 = document.createElement('span');
         var span2 = document.createElement('span');
         span1.appendChild(document.createTextNode("圆半径：" + positons));
         span2.appendChild(document.createTextNode(",圆中心点：" + circleLng + "," + circleLat));
         li.appendChild(span1);
         li.appendChild(span2);
     } else {
         var span1 = document.createElement('span');
         span1.appendChild(document.createTextNode("多边形点：" + positons));
         li.appendChild(span1);
     }
     fragment1.appendChild(li);
     //将内存中的元素添加到网页中
     var drawList = document.getElementById("drawlist");
     drawList.appendChild(fragment1);
 };