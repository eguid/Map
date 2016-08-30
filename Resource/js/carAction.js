 //车辆相关操作(必须放在地图初始化完成之后加载)
 //----------------小车实体类（用于封装小车常用操作）---------------------
 var carEntity = (function() {
     var lastTime;
     var carPosition; //小车位置
     var carLabel; //小车标注
     var car; //小车
     //创建小车（小车图标，小车初始化经、纬度）
     var createCar = function(carIcon, lng, lat) {
         carPosition = new BMap.Point(lng, lat);
         car = new BMap.Marker(carPosition, {
             icon: carIcon
         });
         car.setTop(true);
         car.disableMassClear()
         return car;
     };
     //创建标注(标注显示的信息(标题+标注内容)，标注相对小车偏移位置)
     var createLabel = function(carTitle, carContent, size1, size2) {
         carLabel = new BMap.Label(carContent, {
             offset: new BMap.Size(size1, size2)
         });
         carLabel.setTitle(carTitle);
         carLabel.disableMassClear();
         return carLabel;
     };
     //创建小车并设置标注
     var createCarAndSetLabel = function(carIcon, lng, lat, carTitle, carContent, size1, size2) {
         car = createCar(carIcon, lng, lat);
         car.setLabel(createLabel(carTitle, carContent, size1, size2));
         return car;
     };
     //更改小车坐标及方向
     var changeCarPostion = function(lng, lat, rot) {
         if (carPosition) {
             carPosition.lng = lng;
             carPosition.lat = lat;
             car.setPosition(carPosition); //更新坐标
             car.setRotation(rot); //修改方向
         }
     };
     //给小车绑定事件
     var addCarEvent = function(act, operation) {
         car.addEventListener(act, operation);
     };
     //删除小车某个绑定事件
     var removeCarEvent = function(act, operation) {
         car.addEventListener(act, operation);
     };
     //public接口（对外开放的调用方法）
     return {
         getCar: function() {
             return car
         },
         getPosition: function() {
             return carPosition;
         },
         getLabel: function() {
             return carLabel;
         },
         getTime: function() {
             return lastTime;
         },
         setTime: function(nowTime) {
             lastTime = nowTime;
         },
         //创建标注
         newLabel: createLabel,
         //创建小车
         newCar: createCar,
         //创建车辆和标注（合成上面两步）
         newCarAndSetLabel: createCarAndSetLabel,
         //改变车辆位置
         changePosition: changeCarPostion,
         //增加绑定事件
         addEvent: addCarEvent,
         //删除绑定事件
         delEvent: removeCarEvent
     }
 });
 //--------------------弹出窗口信息实体类-------------------
 var publicInfoWindowEntity = (function() {
     // 创建信息窗口对象
     var publicInfoWindow = new BMap.InfoWindow("<div style='width:100%;height:100%'><h4 style='margin:0 0 5px 0;padding:0.2em 0' id='publicInfoWindowTitle'>车辆信息</h4>" +
         "<img style='float:right;margin:1px' id='publicInfoWindowImg' src='http://developer.baidu.com/map/jsdemo/img/car.png' width='52' height='26' title='车辆信息'/>" +
         "<p>车牌号：<span id='publicInfoWindowCarNum'>" + 1 +
         "</span></p><p>位置：<span id='publicInfoWindowCarLng'>" + 2 +
         "</span>,<span id='publicInfoWindowCarLat'>" + 3 + "</span></p><p>定位时间:<span></span></p></div>");

     //改变公共弹出窗口
     function changePublicInfoWindow(witchCar, lastTime) {
         var carTitle = witchCar.getLabel().getTitle();
         var carPos = witchCar.getPosition();
         publicInfoWindow.setTitle(carTitle);
         publicInfoWindow.setContent("<div style='width:100%;height:100%'><h4 style='margin:0 0 5px 0;padding:0.2em 0' id='publicInfoWindowTitle'>车辆信息</h4>" +
             "<img style='float:right;margin:1px' id='publicInfoWindowImg' src='http://developer.baidu.com/map/jsdemo/img/car.png' width='52' height='26' title='车辆信息'/>" +
             "<p>车牌号：<span id='publicInfoWindowCarNum'>" + carTitle +
             "</span></p><p>位置：<span id='publicInfoWindowCarLng'>" + carPos.lng +
             "</span>,<span id='publicInfoWindowCarLat'>" + carPos.lat + "</span></p><p>定位时间:<span></span>" + lastTime + "</p></div>");
     }
     return {
         //获取当前窗口
         getInfoWindow: function() {
             return publicInfoWindow;
         },
         //改变窗口信息
         changeInfo: changePublicInfoWindow
     }
 });

 //创建车辆公共图标方法
 var createCarIcon = function(imgUrl, width, height, offset1, offset2) {
     return new BMap.Icon(imgUrl, new BMap.Size(width, height), { //小车图片
         //offset: new BMap.Size(0, -5),    //相当于CSS精灵
         imageOffset: new BMap.Size(offset1, offset2) //图片的偏移量。为了是图片底部中心对准坐标点。
     });
 };
 //创建公共的小车图标所有小车都可以使用
 var myIcon = createCarIcon("http://developer.baidu.com/map/jsdemo/img/car.png", 52, 26, 0, 0);

 //-----------------------以下为使用示例-----------------------

 //  //创建一个小车操作对象
 //  var car1 = new carEntity();
 //  //创建小车实例
 //  car1.newCarAndSetLabel(myIcon, 118.806833, 32.063154, "苏A1234", "苏A1234", 0, -15);
 //  //把小车添加到地图
 //  //map.addOverlay(car1.newCarAndSetLabel(myIcon, 118.806833, 32.063154, "苏A1234", 0, -15));//可以这样做
 //  map.addOverlay(car1.getCar());
 //  //测试小车跑起来
 //  function testRun() {
 //      //1秒后修改小车坐标
 //      setTimeout(function() {
 //          car1.changePosition(118.816833, 32.063154, -90);
 //      }, 1000);
 //      //每隔200毫秒修改小车坐标
 //      setTimeout(function() {
 //          car1.changePosition(118.816833, 32.069154, -120);
 //      }, 1200);
 //      setTimeout(function() {
 //          car1.changePosition(118.816833, 32.073154, -60);
 //      }, 1400);
 //      setTimeout(function() {
 //          car1.changePosition(118.816833, 32.079154, -90);
 //      }, 1600);
 //      setTimeout(function() {
 //          car1.changePosition(118.816833, 32.086154, -30);
 //      }, 1800);
 //      setTimeout(function() {
 //          car1.changePosition(118.818233, 32.088154, 10);
 //      }, 2000);
 //      setTimeout(function() {
 //          car1.changePosition(118.822833, 32.090154, -10);
 //      }, 2200);
 //      setTimeout(function() {
 //          car1.changePosition(118.826833, 32.093154, 10);
 //      }, 2400);
 //      setTimeout(function() {
 //          car1.changePosition(118.832833, 32.094154, -5);
 //      }, 2600);
 //      setTimeout(function() {
 //          car1.changePosition(118.838833, 32.095154, 5);
 //      }, 2800);
 //      setTimeout(function() {
 //          car1.changePosition(118.844833, 32.096154, -5);
 //      }, 3000);
 //      setTimeout(function() {
 //          car1.changePosition(118.848833, 32.096554, 5);
 //      }, 3200);
 //      setTimeout(function() {
 //          car1.changePosition(118.854833, 32.096954, -5);
 //      }, 3400);
 //      setTimeout(function() {
 //          car1.changePosition(118.859833, 32.097354, 5);
 //      }, 3600);
 //      setTimeout(function() {
 //          car1.changePosition(118.865833, 32.097754, -5);
 //      }, 3800);
 //      setTimeout(function() {
 //          car1.changePosition(118.870833, 32.097954, 5);
 //      }, 4000);
 //      setTimeout(function() {
 //          car1.changePosition(118.877833, 32.098254, -5);
 //      }, 4200);
 //  };

 //  //车辆公共弹出信息窗
 //  var publicInfoWindow = new publicInfoWindowEntity();
 //  //给车辆增加一个点击事件
 //  car1.addEvent("click", function() {
 //      //获取车辆信息放到弹出窗口中
 //      publicInfoWindow.changeInfo(car1);
 //      this.openInfoWindow(publicInfoWindow.getInfoWindow());
 //  });
 //  //添加鼠标放在小车上时显示窗口
 //  // car1.addEvent("mouseover", function() {
 //  //     //获取车辆信息放到弹出窗口中
 //  //     var infoWin1 = addInfo(car1.getLabel().getTitle(), car1.getPosition());
 //  //     this.openInfoWindow(infoWin1);
 //  // });
 //  //鼠标移出小车上隐藏窗口
 //  // car1.addEvent("mouseout", function() {
 //  //     this.closeInfoWindow();
 //  // });