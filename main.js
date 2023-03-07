import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';
import gsap from 'gsap';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, .1, 1000 );
camera.position.set(-40,0,50);
camera.rotation.set(0,-6.9,0);
// camera::helper
// const helper = new THREE.CameraHelper( camera );
// scene.add( helper );

// light
var light1 = new THREE.PointLight(0xFFFFFF);
light1.position.set(20, 0, 15);
scene.add(light1);

var light2 = new THREE.PointLight(0xFFFFFF);
light2.position.set(20, 20, 15);
scene.add(light2);

// renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( sizes.width, sizes.height );
document.body.appendChild( renderer.domElement );


// loader
let currentPosition = 0;

const loader = new GLTFLoader();
// room location: ./public/assets/modern_dining_room/scene.gltf
// nimbus logo location: ./public/assets/nimbus-logo.glb
loader.load( './public/assets/modern_dining_room/scene.gltf', (gltf) => {
  gltf.scene.position.set(0,0,0);
  gltf.scene.scale.set(20,20,20);
	scene.add( gltf.scene );

  // adding scroll effect //
  window.addEventListener('mouseup', () => {

    const moveCamera = (x,y,z) => {
      gsap.to(camera.position, {
        x,y,z,
        duration: 3
      });
    };
    const rotateCamera = (x,y,z) => {
      gsap.to(camera.rotation,{
        x,y,z,
        duration: 3.2
      });
    };

  // coordinates for four corners //
    switch(currentPosition){
      case 0:
        moveCamera(-40,0,-50);
        rotateCamera(0,-2.3,0);
        currentPosition = 1;
        break;
      case 1:
        moveCamera(40,0,-50);
        rotateCamera(0,-4.2,0);
        currentPosition = 2;
        break;
      case 2:
        moveCamera(40,0,50);
        rotateCamera(0,-6.0,0);
        currentPosition = 3;
        break;
      case 3:
        moveCamera(-40,0,50);
        rotateCamera(0,-6.9,0);
        currentPosition = 0;
        break;
    }
  });
});

// orbital controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = true;

// animate function
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

// resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width,sizes.height)
})

// dat.gui
// const gui = new GUI();
// var cameraRotationFolder = gui.addFolder('Camera-Rotation');
// cameraRotationFolder.add(camera.rotation, 'x', -Math.PI, Math.PI).name('Rotation X');
// cameraRotationFolder.add(camera.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y');
// cameraRotationFolder.add(camera.rotation, 'z', -Math.PI, Math.PI).name('Rotation Z');

// var cameraPositionFolder = gui.addFolder('Camera-Position');
// cameraPositionFolder.add(camera.position, 'x', -100,100).name('Position X');
// cameraPositionFolder.add(camera.position, 'y', -100,100).name('Position Y');
// cameraPositionFolder.add(camera.position, 'z', -100,100).name('Position Z');