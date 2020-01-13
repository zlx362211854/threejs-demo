var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('mainCanvas')
});
renderer.setSize(width, height);
// 相机
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 10;
camera.position.x = 10;
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// 光照
var pointLight = new THREE.PointLight(0XFFFFFF); 
pointLight.position.y = 200;
pointLight.position.z = 150;
scene.add(pointLight);
// 物体
var list = []
for (let i = 0; i < 3; i++) {
  var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF * Math.random()});
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 36, 36), sphereMaterial)
  sphere.position.x = (i + 1)
  sphere.position.z = Math.cos(Math.PI*60.0*(i+1)/180.0) * sphere.position.z + Math.sin(Math.PI*60.0*(i+1)/180.0) * sphere.position.x
  list.push(sphere)
}
list.forEach(i => {
  scene.add(i);
})
// var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF*Math.random()});
// var sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 36, 36), sphereMaterial)
// scene.add(sphere);

var render = function() {
  requestAnimationFrame(render);
  list.forEach(i => {
    var eangle = 1/36 
    console.log(i.position, 'i')
    // var ex = i.position.x
    // var ez = i.position.z
    // ex1 = Math.cos(eangle) * ex - Math.sin(eangle) * ez;
    // ez1 = Math.cos(eangle) * ez + Math.sin(eangle) * ex;
    // i.position.set(ex1, 0, ez1);
  })
 
  renderer.render(scene, camera)
};
render();