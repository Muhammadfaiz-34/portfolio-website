import './style.css'
import * as THREE from 'three'; 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(camera, scene);

const geometry = new  THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xff0000});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(7, 7, 7);
const ambiantlight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambiantlight);

const controls = new OrbitControls(camera, renderer.domElement);


function animate (){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
function movecamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  islamabad.rotation.y += 0.01;
  islamabad.rotation.z += 0.01;

  camera.position.x = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.0002;
}
document.body.onscroll = movecamera;
animate();
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0x333333});
  const star = new THREE.Mesh(geometry, material);

  const [x, y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('sky.png', () => {
  scene.background = spaceTexture;
});
const islamabadTexture = new THREE.TextureLoader().load('nice1.png');
const islamabad = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({map: islamabadTexture})
);
scene.add(islamabad);

const moonTexture = new THREE.TextureLoader().load('sun.png');
const normalTexture = new THREE.TextureLoader().load('sun1.png');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);


