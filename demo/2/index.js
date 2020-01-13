//设置场景的大小
var width = window.innerWidth;
var height = window.innerHeight;

//设置相机的一些参数。
var view_angle = 45;
aspect = width / height;
near = 0.1;
far = 10000;

//设置容器
var container = document.getElementById("container");

//新建一个WebGL 渲染，以及相机
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
var camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);

camera.position.z = 800;
camera.position.y = 150;
camera.position.x = 150;
//把相机添加到场景里面
scene.add(camera);


//附加DOM元素
container.append(renderer.domElement);

//设置球体的值
var radius = 0.001; // 模型整体比例
var segemnt = 32;
var rings = 32;
// 星球半径(千米)
var r = {
  sun: 696300 / 10,
  earth: 6378,
  mon: 1737
}
// 星球距离(万千米)
var f = {
  sun_earth: 15000 / 50,
  earth_mon: 38 / 4
}
var sunMaterial = new THREE.MeshLambertMaterial({color: '#c84524'});
var earthMaterial = new THREE.MeshLambertMaterial({color: '#357fbf'});
var monMaterial = new THREE.MeshLambertMaterial({color: '#fff'});

var sunSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * r.sun, segemnt, rings), sunMaterial);
var earthSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * r.earth, segemnt, rings), earthMaterial);
var monSphere = new THREE.Mesh(new THREE.SphereGeometry(radius * r.mon, segemnt, rings), monMaterial);

// 以地球坐标为基准建立一个3D对象
earthPoint = new THREE.Object3D();
earthSphere.add(earthPoint); // 地球关联该对象
earthPoint.add(monSphere); // 对象中加入月球

sunSphere.position.set(0, 0, 0); // 太阳坐标

earthSphere.position.set(f.sun_earth, 0, 0); // 地球坐标相对于太阳

monSphere.position.set(f.earth_mon, 0, 0); // 月球坐标相对于地球（万公里）

scene.add(sunSphere);
scene.add(earthSphere);

var pointLight = new THREE.PointLight(0XFFFFFF); // 光影

pointLight.position.y = 200;
pointLight.position.z = 150;

scene.add(pointLight);
var size = 5000;
var divisions = 200;
// 辅助网格
var gridHelper = new THREE.GridHelper(size, divisions, 'red', 0x808080);
scene.add(gridHelper);
// 第一人称控制器
controls = new THREE.FirstPersonControls(camera);
controls.lookSpeed = 0.1; //鼠标移动查看的速度
controls.movementSpeed = 10; //相机移动速度
controls.autoForward = true;
controls.lookVertical = false; // 水平视角
var clock = new THREE.Clock();
var render = function() {
  requestAnimationFrame(render);
  var ex = earthSphere.position.x
  var ez = earthSphere.position.z

  var mx = monSphere.position.x
  var mz = monSphere.position.z

  var eangle = 1 / 365 // 地球旋转递增的角度
  var mangle = 1 / (365 / 12) // 月球旋转递增的角度

  ex1 = Math.cos(eangle) * ex - Math.sin(eangle) * ez;
  ez1 = Math.cos(eangle) * ez + Math.sin(eangle) * ex;
  earthSphere.position.set(ex1, 0, ez1);

  mx1 = Math.cos(mangle) * mx - Math.sin(mangle) * mz;
  mz1 = Math.cos(mangle) * mz + Math.sin(mangle) * mx;
  monSphere.position.set(mx1, 0, mz1);
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
};

render();

container.addEventListener('mousewheel', mousewheel, false);
function mousewheel(e) {
  e.preventDefault();
  var delta = e.wheelDelta || e.detail
  if (delta) {
    if (delta > 0) {
      if (view_angle <= 10) return
      view_angle -= (near < view_angle ? 1 : 0);
    }
    if (delta < 0) {
      if (view_angle >= 100) return
      view_angle += (view_angle < far ? 1 : 0);
    }
  }
  camera.fov = view_angle;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}
