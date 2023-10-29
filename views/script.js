let camera, scene, renderer, clock;
let uniforms;

function init() {
	const container = document.getElementById("shader");

	clock = new THREE.Clock() ; 
	camera = new THREE.Camera();
	camera.position.z = 1;

	scene = new THREE.Scene();

	const geometry = new THREE.PlaneBufferGeometry(2, 2);

	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_progress :{
    value: 0
  },
      uMouse: {
      value: {x: 0.5, y: 0.5}
    },
	};

	const material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader: document.getElementById("vertex").textContent,
		fragmentShader: document.getElementById("fragment").textContent
	});

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);

 let running = false 
 
 let finished = function(){
   running = false
 }
  
  window.addEventListener('click', function (e) {
   
 if(!running){ 
     material.uniforms.uMouse.value.x = ( event.clientX / window.innerWidth ) * 2 - 1
  material.uniforms.uMouse.value.y = - ( event.clientY / window.innerHeight ) * 2 + 1
   
   
   running = true 
   gsap.to(material.uniforms.u_progress, { duration: 6.5, value: material.uniforms.u_progress.value +10, delay: 0, onComplete: finished  })
             }
    
    
    
});
    
  
	container.appendChild(renderer.domElement);

	onWindowResize();
	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.u_resolution.value.x = renderer.domElement.width;
	uniforms.u_resolution.value.y = renderer.domElement.height;
}

function render() {
	uniforms.u_time.value = clock.getElapsedTime();
	renderer.render(scene, camera);
}

function animate() {
	render();
	requestAnimationFrame(animate);
}

init();
animate();