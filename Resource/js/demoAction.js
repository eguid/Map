//实例演示
//用于演示车辆定位和电子围栏功能

//创建一个小车操作对象
var car1 = new carEntity();
//创建小车实例
car1.newCarAndSetLabel(myIcon, 118.806833, 32.063154, "苏A1234", "苏A1234", 0, -15);
//把小车添加到地图
//map.addOverlay(car1.newCarAndSetLabel(myIcon, 118.806833, 32.063154, "苏A1234", 0, -15));//可以这样做
map.addOverlay(car1.getCar());
car1.getCar().hide();
//显示小车
function showCar() {
    car1.getCar().show();
}
//隐藏小车
function hideCar() {
    car1.getCar().hide();
}
//测试小车跑起来
function testRun() {
    showCar();
    //1秒后修改小车坐标
    setTimeout(function() {
        car1.changePosition(118.816833, 32.063154, -90);
    }, 1000);
    //每隔200毫秒修改小车坐标
    setTimeout(function() {
        car1.changePosition(118.816833, 32.069154, -120);
    }, 1200);
    setTimeout(function() {
        car1.changePosition(118.816833, 32.073154, -60);
    }, 1400);
    setTimeout(function() {
        car1.changePosition(118.816833, 32.079154, -90);
    }, 1600);
    setTimeout(function() {
        car1.changePosition(118.816833, 32.086154, -30);
    }, 1800);
    setTimeout(function() {
        car1.changePosition(118.818233, 32.088154, 10);
    }, 2000);
    setTimeout(function() {
        car1.changePosition(118.822833, 32.090154, -10);
    }, 2200);
    setTimeout(function() {
        car1.changePosition(118.826833, 32.093154, 10);
    }, 2400);
    setTimeout(function() {
        car1.changePosition(118.832833, 32.094154, -5);
    }, 2600);
    setTimeout(function() {
        car1.changePosition(118.838833, 32.095154, 5);
    }, 2800);
    setTimeout(function() {
        car1.changePosition(118.844833, 32.096154, -5);
    }, 3000);
    setTimeout(function() {
        car1.changePosition(118.848833, 32.096554, 5);
    }, 3200);
    setTimeout(function() {
        car1.changePosition(118.854833, 32.096954, -5);
    }, 3400);
    setTimeout(function() {
        car1.changePosition(118.859833, 32.097354, 5);
    }, 3600);
    setTimeout(function() {
        car1.changePosition(118.865833, 32.097754, -5);
    }, 3800);
    setTimeout(function() {
        car1.changePosition(118.870833, 32.097954, 5);
    }, 4000);
    setTimeout(function() {
        car1.changePosition(118.877833, 32.098254, -5);
    }, 4200);
    setTimeout(function() {
        car1.changePosition(118.806833, 32.063154);
    }, 6000);
};

//车辆公共弹出信息窗
var publicInfoWindow = new publicInfoWindowEntity();
//给车辆增加一个点击事件
car1.addEvent("click", function() {
    //获取车辆信息放到弹出窗口中
    publicInfoWindow.changeInfo(car1);
    this.openInfoWindow(publicInfoWindow.getInfoWindow());
});
//添加鼠标放在小车上时显示窗口
// car1.addEvent("mouseover", function() {
//     //获取车辆信息放到弹出窗口中
//     var infoWin1 = addInfo(car1.getLabel().getTitle(), car1.getPosition());
//     this.openInfoWindow(infoWin1);
// });
//鼠标移出小车上隐藏窗口
// car1.addEvent("mouseout", function() {
//     this.closeInfoWindow();
// });
//创建电子围栏工具类实例
var e_fence = new eFence();
//绘制完成后触发的事件
var overlaycomplete1 = function(e) {
    var cache1 = e.overlay;
    //是否多边形
    if (cache1 instanceof BMap.Polygon) {
        if (istrue()) {
            timeOut1(4, cache1);
        }
        //是否圆形
    } else if (cache1 instanceof BMap.Circle) {
        if (istrue()) {
            timeOut1(3, cache1);
        }
    }
};
//添加鼠标绘制工具监听事件，用于获取绘制结果
publicDrawingManager.getDrawManager().addEventListener('overlaycomplete', overlaycomplete1);

var timeOut1 = function(num, efence_Overlay) {
    var isTimeOut = true;
    var t1 = setInterval(function() {
        if (isTimeOut) {
            //获取当前小车坐标
            var carPoint1 = car1.getCar().getPosition();
            //判断小车是否越界
            if (!e_fence.isInOverlay(carPoint1, efence_Overlay)) {
                alert("车牌号：" + car1.getCar().getLabel().getTitle() + "的车辆越出电子围栏!");
                isTimeOut = false;
            };
        } else {
            return;
        }
    }, 100);
}

function istrue() {
    return confirm("是否使用该覆盖物作为电子围栏进行测试？");
}