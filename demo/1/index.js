var width = window.innerWidth;
var height = window.innerHeight;
var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('mainCanvas')
});
renderer.setClearColor(0x000000);
renderer.setSize(width, height);
var scene = new THREE.Scene();
/**
 * @description: 
 * @param {type} 
 * fov是视景体竖直方向上的张角（是角度制而非弧度制）
 * aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。
 * near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near
 * @return: 
 */
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
scene.add(camera);
camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  })
);
// var ball = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10),
// var ball = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10, Math.PI / 6, Math.PI / 3),
var ball = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10),
new THREE.MeshBasicMaterial({
  color: 'green',
  wireframe: true
}))

// scene.add(cube);
scene.add(ball);

var render = function() {
  requestAnimationFrame(render);
  ball.rotation.y = (ball.rotation.y + 0.01) % (Math.PI * 2);
  ball.rotation.x = (ball.rotation.x + 0.02) % (Math.PI * 2);
  ball.rotation.z = (ball.rotation.z + 0.01) % (Math.PI * 2);
  renderer.render(scene, camera)
};

render();