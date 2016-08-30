 //创建一个名为map的地图（后面都基于这个地图进行操作）
 var map = new BMap.Map("map", {
     enableMapClick: false
 });
 //设置地图中心点（经纬度/城市名）和缩放等级（1-19）
 map.centerAndZoom(new BMap.Point(118.8331, 32.0816), 10);
 //禁止拖拽
 map.disableDragging();
 //地图初始化两秒后（地图加载有延迟，所以推迟加载功能）
 setTimeout(function() {
     map.setZoom(13); //地图缩放至13
     map.enableScrollWheelZoom(true); //允许鼠标滚轮缩放
     map.enableDragging(); //开启拖拽
     // map.enableInertialDragging(); //开启惯性拖拽
 }, 1500);

 //2D地图/混合地图切换控件
 var mapTypeControl1 = new BMap.MapTypeControl({
     mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
     anchor: BMAP_ANCHOR_TOP_LEFT //默认放在左上角
 });
 //比例尺控件
 var top_right_scaleControl = new BMap.ScaleControl({
     anchor: BMAP_ANCHOR_TOP_RIGHT // 放在右上角
 });
 // 带有定位的导航缩放控件
 var navigationControl = new BMap.NavigationControl({
     // 靠右上角位置
     anchor: BMAP_ANCHOR_TOP_RIGHT,
     // LARGE类型
     type: BMAP_NAVIGATION_CONTROL_LARGE,
     // 启用显示定位
     enableGeolocation: true
 });
 //是否显示控件
 function viewControl(viewOrNo) {
     if (viewOrNo) {
         map.addControl(mapTypeControl1);
         map.addControl(top_right_scaleControl);
         map.addControl(navigationControl);
     } else {
         map.removeControl(top_right_scaleControl);
         map.removeControl(navigationControl);
         map.removeControl(mapTypeControl1);
     }
 };
 //显示控件
 viewControl(true);

 //-------------地图定位相关--------------
 //根据经纬度定位
 function thellLocation(map, pointCen) {
     map.setCenter(pointCen);
 }
 //城市定位
 function theCityLocation() {
     var city = document.getElementById("cityName").value;
     if (city != "") {
         cityLocation(city);
     }
 }
 //根据城市名定位
 function cityLocation(city) {
     map.centerAndZoom(city, 11); // 用城市名设置地图中心点
     setTimeout(function() {
         map.setZoom(13); //两秒后缩放至14
     }, 1500);
 }
 //路况信息控件
 var trafficControl1 = new BMapLib.TrafficControl({
     showPanel: false //是否显示路况提示面板
 });
 map.addControl(trafficControl1); //添加路况信息控件到的地图
 trafficControl1.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT); //放在地图右下角

 //----------鼠标测距-----------
 var myDistanceTool1 = new BMapLib.DistanceTool(map);

 function openDis() {
     myDistanceTool1.open(); //开启鼠标测距，在地图中点击右键关闭
 }
 var myDrag = new BMapLib.RectangleZoom(map, {
     followText: "拖拽鼠标进行操作"
 });

 function openRectangleZoom() {
     myDrag.open(); //开启拉框放大
 };

 function closeRectangleZoom() {
     myDrag.close(); //关闭拉框放大
 };

 function search(num) {
     var serachParam = document.getElementById("searchName").value;
     searchMap(num, serachParam);
 }
 //num 1:本地搜索 2:可视地图范围内搜索
 function searchMap(num, mykey) {
     var local = new BMap.LocalSearch(map, {
         renderOptions: {
             map: map,
             panel: "r-result"
         },
         pageCapacity: 5
     });
     if (num == '1') {
         local.search(mykey);
     } else {
         local.searchInBounds(mykey, map.getBounds());
     }

 }