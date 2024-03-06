/**

 * shop items
 * fov on home screen
 */

//Imports
// import { OBJLoader } from './three.js-master/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from './three.js-master/examples/jsm/loaders/MTLLoader.js';
// import { RGBELoader } from './three.js-master/examples/jsm/loaders/RGBELoader.js';
// import { Water } from './three.js-master/examples/jsm/objects/Water.js'
// import { EffectComposer } from './three.js-master/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from './three.js-master/examples/jsm/postprocessing/RenderPass.js';
// import { UnrealBloomPass } from './three.js-master/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { ParallaxBarrierEffect } from './three.js-master/examples/jsm/effects/ParallaxBarrierEffect.js';
// import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js'
// import { TextGeometry } from './three.js-master/examples/jsm/geometries/TextGeometry.js';
// import { FontLoader } from './three.js-master/examples/jsm/loaders/FontLoader.js';
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';
import * as THREE from './three.js-master/build/three.module.js'
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './three.js-master/examples/jsm/loaders/DRACOLoader.js';
import { Sky } from './three.js-master/examples/jsm/objects/Sky.js';
import { GUI } from './three.js-master/examples/jsm/libs/lil-gui.module.min.js'
import { CSS3DRenderer, CSS3DObject } from './three.js-master/examples/jsm/renderers/CSS3DRenderer.js';

document.addEventListener("DOMContentLoaded", async function () {
  document.addEventListener('mousemove', onDocumentMouseMove);


  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let container;
  let tweenTo, tweenRotate, tweenFov;
  let view = "home";
  let mouseX = 0;
  let mouseY = 0;

  let spinnables = [];
  let camera, scene, WebGLrenderer, CSS3Drenderer, composer, mixer, clock, gui, INTERSECTED, phone, walls;
  var boom = new THREE.Group();

  let mouse
  const raycaster = new THREE.Raycaster(); // Raycaster
  let controls, sun, sky;
  let shop, room, light_point_up, light_point_down, contact, tv, dj, obj_s


  let ambientLight, frontRightLight, frontLeftLight, backLeftLight, backRightLight, centerLight



  // Scene & 
  scene = new THREE.Scene();

  clock = new THREE.Clock();

  // Init camera

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 6500);
  camera.position.set(-200, 900, 0);



  //debug
  window.camera = camera;

  // Obj Loading

  const progressBar = document.getElementById('progress-bar');
  const progressBarContainer = document.querySelector(".progress-bar-container");
  const loadingLabel = document.getElementById('loading-label');


  const loadingManager = new THREE.LoadingManager(() => {  // on load


    gltf_loader
      .parse(room, 'assets', function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.scale.set(350, 350, 350);
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.children[0].receiveShadow = true;
        gltf.scene.rotation.set(0, THREE.MathUtils.degToRad(-90), 0)
      })
    // gltf_loader
    //   .parse(walls, 'assets', function (gltf) {
    //     scene.add(gltf.scene);
    //     gltf.scene.scale.set(350, 350, 350);
    //     gltf.scene.position.set(0, 0, 0)
    //     gltf.scene.children[0].receiveShadow = true;
    //     gltf.scene.rotation.set(0, THREE.MathUtils.degToRad(-90), 0)
    //   })
    // gltf_loader
    //   .parse(light_point_up, 'assets', function (gltf) {
    //     scene.add(gltf.scene);
    //     gltf.scene.scale.set(7, 7, 7);
    //     gltf.scene.position.set(-1500, 0, 850)
    //     gltf.scene.rotation.set(0, THREE.MathUtils.degToRad(-50), 0)
    //   })
    // gltf_loader
    //   .parse(light_point_down, 'assets', function (gltf) {
    //     scene.add(gltf.scene);
    //     gltf.scene.scale.set(7, 7, 7);
    //     gltf.scene.position.set(-1600, 0, 600)
    //     gltf.scene.rotation.set(0, THREE.MathUtils.degToRad(0), 0)
    //   })

    gltf_loader
      .parse(contact, 'assets', function (gltf) {
        //replace with iphone gltf and make contact page zoom in on iphone and record 
        scene.add(gltf.scene);
        gltf.scene.scale.set(40, 40, 40);
        gltf.scene.position.set(400, 600, -800);
        gltf.scene.rotation.set(0, THREE.MathUtils.degToRad(0), 0)
        phone = gltf.scene;
      })
    gltf_loader
      .parse(tv, 'assets', function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.scale.set(35, 35, 35);
        gltf.scene.position.set(-400, 600, -800)
        gltf.scene.rotation.set(0, THREE.MathUtils.degToRad(-90), 0)

      })
    gltf_loader
      .parse(dj, 'assets', function (gltf) {
        scene.add(gltf.scene);
        scene.add(gltf.scene);
        gltf.scene.scale.set(35, 35, 35);
        gltf.scene.position.set(-800, 600, -800)


      })
    gltf_loader
      .parse(shop, 'assets', function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.children[0].receiveShadow = true;
        gltf.scene.scale.set(40, 40, 40);
        gltf.scene.position.set(0, 600, -800)
        gltf.scene.rotation.set(0, THREE.MathUtils.degToRad(90), 0)

      })


  },
    (url, loaded, total) => { // on progress
      progressBar.value = (loaded / total) * 100;
      loadingLabel.textContent = url
    },
    () => { // on error
      // console.log("Error during loading")
    });

  const dracoLoader_2 = new DRACOLoader();
  dracoLoader_2.setDecoderPath('./three.js-master/examples/jsm/libs/draco/');

  const parsingLoader = new THREE.LoadingManager(() => {
    // NOTE: prerender the scene
    // this prevents the scene from lagging when objects come into view for the first time.
    // from: https://stackoverflow.com/a/46972383
    function setAllCulled(obj, culled) {
      obj.frustumCulled = culled;
      obj.children.forEach(child => setAllCulled(child, culled));
    }
    setAllCulled(scene, false);
    WebGLrenderer.render(scene, camera);
    setAllCulled(scene, true);
    WebGLrenderer.compile(scene, camera);


    animate();
    gui_set();
    progressBarContainer.style.display = 'none';

    setTimeout(function () {
    video.play();

      scene.children.forEach(function (e) {
        e.children.forEach(function (a) {
          if (a.name === 'dj' || a.name === "video" || a.name === "contact" || a.name === "shop") {
            spinnables.push(a)
          }
        })
      })
    }, 1000);
    
  })

  const gltf_loader = new GLTFLoader(parsingLoader).setDRACOLoader(dracoLoader_2).setPath('assets/')

  const fileLoader = new THREE.FileLoader(loadingManager);




  fileLoader.load("assets/room_brick_com_2.gltf", function (buffer) {
    room = buffer
  })

  fileLoader.load("assets/contact_bcom2.gltf", function (buffer) {
    contact = buffer
  })
  fileLoader.load("assets/video_bcom2.gltf", function (buffer) {
    tv = buffer
  })
  fileLoader.load("assets/dj_bcom2.gltf", function (buffer) {
    dj = buffer
  })
  fileLoader.load("assets/shop_2_bcom.gltf", function (buffer) {
    shop = buffer
  })



  // Twitch Embed Screen Constructor
  var videoScreen = function (id, pos, Rpos) {
    var div = document.createElement('div');
    var iframe = document.createElement('iframe');
    div.setAttribute('id', 'twitch-stream')
    iframe.style.width = ((window.screen.width / 1.5)).toString() + 'px';
    iframe.style.height = ((window.screen.height / 1.5 )).toString() + 'px';

    iframe.src = `https://player.twitch.tv/?channel=tender_magic&parent=${window.location.hostname}`;
    div.appendChild(iframe);

    var object = new CSS3DObject(div);
    object.position.set(-150, 700, 3300);
    object.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
    return object;
  };


  // Main DOM Element

  container = document.getElementById('webgl-content');

  // CSS3DRenderer Setup

  CSS3Drenderer = new CSS3DRenderer();
  CSS3Drenderer.setSize(window.innerWidth, window.innerHeight);
  CSS3Drenderer.domElement.style.position = 'absolute';
  CSS3Drenderer.domElement.style.top = 0;
  // CSS3Drenderer.domElement.style.zIndex = -1;
  CSS3Drenderer.domElement.style.pointerEvents = 'none';
  container.appendChild(CSS3Drenderer.domElement);

  // WebGLrenderer Setup 

  WebGLrenderer = new THREE.WebGLRenderer({ antialias: true });
  WebGLrenderer.shadowMap.enabled = true;
  WebGLrenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  WebGLrenderer.setPixelRatio(window.devicePixelRatio);
  WebGLrenderer.setSize(window.innerWidth, window.innerHeight);
  WebGLrenderer.toneMapping = THREE.ACESFilmicToneMapping;
  WebGLrenderer.toneMappingExposure = 1;
  container.appendChild(WebGLrenderer.domElement);


  // Controls Setup

  // controls = new OrbitControls(camera, WebGLrenderer.domElement);
  // controls.minDistance = 20;
  // controls.maxDistance = 5000;
  // controls.maxPolarAngle = Math.PI / 2;
  // controls.target.set(1500, 2050, 1500);
  // controls.update();

  // controls
  //  controls = new OrbitControls( camera, WebGLrenderer.domElement );
  //  controls.touches.ONE = THREE.TOUCH.PAN;
  //  controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;

  //  controls.target.set(0, 900, 0);
  //  controls.update();

  // Axis Helper - Temp

  // const axesHelper = new THREE.AxesHelper(5);
  // axesHelper.scale.set(500, 500, 500, 500);
  // scene.add(axesHelper);

  var Texloader = new THREE.TextureLoader();


  var woodtexture = Texloader.load('assets/Planks021_1K_Color_2_op.png', function (texture) {

    woodtexture.wrapS = woodtexture.wrapT = THREE.RepeatWrapping;
    woodtexture.offset.set(0, 0);
    woodtexture.repeat.set(4, 6);

  });

  var woodmaterial = new THREE.MeshPhongMaterial({

    color: 0xffffff,
    specular: 0x111111,
    map: woodtexture,
    // opacity: 0.1

  });

  // FLOOR

  const geometry = new THREE.PlaneGeometry(680, 1000);
  // const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh(geometry, woodmaterial);
  plane.scale.set(5, 5, 5)
  plane.position.set(-180, 0, 1000)
  plane.rotation.set(THREE.MathUtils.degToRad(-90), 0, THREE.MathUtils.degToRad(-180))
  
  scene.add(plane);


  // Skybox

  sun = new THREE.Vector3();
  sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms['turbidity'].value = 1.9;
  skyUniforms['rayleigh'].value = 0.5;
  skyUniforms['mieCoefficient'].value = 0.005;
  skyUniforms['mieDirectionalG'].value = 0.8;
  

  const parameters = {
    elevation: 2,
    azimuth: 0
  };

  const pmremGenerator = new THREE.PMREMGenerator(WebGLrenderer);
  let renderTarget;

  function updateSun(a, b) {

    const phi = THREE.MathUtils.degToRad(parameters.elevation );
    const theta = THREE.MathUtils.degToRad(parameters.azimuth );

    sun.setFromSphericalCoords(1, a || phi , b || theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);

    if (renderTarget !== undefined) renderTarget.dispose();

    renderTarget = pmremGenerator.fromScene(sky);

    // scene.environment = renderTarget.texture;
    // Light from sky 

  }

  updateSun(1);

  /* Lights */

  ambientLight = new THREE.AmbientLight(0xffffff, 0.56);

  frontRightLight = new THREE.PointLight(0xffffff, .5, 1500);
  frontLeftLight = new THREE.PointLight(0xffffff, .5, 1500);

  backLeftLight = new THREE.PointLight(0xffffff, .5, 2500);
  backRightLight = new THREE.PointLight(0xffffff, .5, 2500);

  centerLight = new THREE.PointLight(0xffffff, 1, 2500);

  frontRightLight.castShadow = true;
  frontLeftLight.castShadow = true;

  backRightLight.castShadow = true;
  backLeftLight.castShadow = true;

  centerLight.castShadow = false;

  frontRightLight.shadow.camera.near = 0.5;
  frontRightLight.shadow.camera.far = 1000;
  frontLeftLight.shadow.camera.near = 0.5;
  frontLeftLight.shadow.camera.far = 1000;

  backRightLight.shadow.camera.near = 0.5;
  backRightLight.shadow.camera.far = 1000;
  backLeftLight.shadow.camera.near = 0.5;
  backLeftLight.shadow.camera.far = 1000;

  centerLight.shadow.camera.near = 0.5;
  centerLight.shadow.camera.far = 1000;


  frontRightLight.shadow.mapSize.width = 1024;
  frontRightLight.shadow.mapSize.height = 1024;
  frontLeftLight.shadow.mapSize.width = 1024;
  frontLeftLight.shadow.mapSize.height = 1024;

  backRightLight.shadow.mapSize.width = 1024;
  backRightLight.shadow.mapSize.height = 1024;
  backLeftLight.shadow.mapSize.width = 1024;
  backLeftLight.shadow.mapSize.height = 1024;

  centerLight.shadow.mapSize.width = 1024;
  centerLight.shadow.mapSize.height = 1024;

  frontRightLight.position.set(500, 550, -750);
  frontLeftLight.position.set(-800, 550, -750);

  backRightLight.position.set(500, 550, 2250);
  backLeftLight.position.set(-800, 550, 2250);

  centerLight.position.set(-100, 800, 800);

  backLeftLight.intensity = 1.3;
  backRightLight.intensity = 1.3;
  frontLeftLight.intensity = 1.3;
  frontRightLight.intensity = 1.3;
  ambientLight.intensity = 1.3;

  scene.add(frontRightLight);
  scene.add(frontLeftLight);

  scene.add(backRightLight);
  scene.add(backLeftLight);

  scene.add(centerLight);


  scene.add(ambientLight);

  // 
  //  DEBUG
  //  



  // const sphereSize = 100;
  // const BR = new THREE.PointLightHelper(backRightLight, sphereSize);
  // const BL = new THREE.PointLightHelper(backLeftLight, sphereSize);
  // const FR = new THREE.PointLightHelper(frontRightLight, sphereSize);
  // const FL = new THREE.PointLightHelper(frontLeftLight, sphereSize);

  // const CL = new THREE.PointLightHelper(centerLight, sphereSize);

  // scene.add(BR);
  // scene.add(BL);
  // scene.add(FR);
  // scene.add(FL);

  // scene.add(CL);

  // video

  const video = document.getElementById('video');
  const video_texture = new THREE.VideoTexture(video);

  const video_geometry = new THREE.PlaneBufferGeometry(12.2, 7, 1, 1)

  const video_material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: video_texture });

  const mesh = new THREE.Mesh(video_geometry, video_material);
  mesh.position.set(-180, 900, -1500)
  mesh.scale.set(275, 275, 275)
  scene.add(mesh)


  //  Tweens
  tweenTo = function (from, to, dur) {
    const newTween = new TWEEN.Tween(from)
      .to(to, dur)
      .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
      .start();
  };

  tweenRotate = function (to, dur, oobj) {
    const newTween = new TWEEN.Tween(camera.rotation)
      .to(to, dur)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
  };
  tweenFov = async function (to, dur) {
    try {
      camera.fov = Math.round(camera.fov)

      const timer = ms => new Promise(res => setTimeout(res, ms))
      while (camera.fov != to) {

        if (camera.fov > to) {
          console.log("fov small")
          camera.fov--;
        }

        if (camera.fov < to) {
          console.log("fov Big")
          camera.fov++;
        }
        camera.updateProjectionMatrix();
        await timer((dur / 100) / 4); // then the created Promise can be awaited
      }





    } catch (err) {
      console.log(err)
    }
  }


  // Renderer Click Event 

  // Raycast, Determine Intersects, Run Functionality 
  WebGLrenderer.domElement.addEventListener('click', (event) => {
    mouse = new THREE.Vector2(); // 2D Mouse Cords
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera); // Cast 

    const intersects = raycaster.intersectObjects(scene.children); // Intersects
    // console.log(intersects[0])

    const menuItem = intersects[0].object; // Select the first intersected item in the Raycast
    const modPos = menuItem.parent.position;


    // console.log(intersects[0].object.name)
    switch (intersects[0].object.name) {

      case "video":
        fadeToBlack().then(event => {
          tweenFov(90, 1000)
          tweenTo(camera.position, { x: -100, y: 600, z: 2500 }, 2000);
          tweenRotate({ x: 0, y: THREE.MathUtils.degToRad(-180), z: 0 }, 1500);
          // Twitch Screen Setup
          if (!document.getElementById('twitch-stream')) {
            var screen = new videoScreen('Twitch Stream');
            scene.add(screen);
          }
          console.log("Video")
          view = 'video';
          setTimeout((fadeToClear), 1000)
        })
          
        break;


      case 'dj':
        document.querySelector('canvas').style.pointerEvents= "none";
        fadeToBlack().then(event => {
          boom.add(camera);
          scene.add(boom);
          camera.position.set(0, 2500, 2000); // this sets the boom's length 
          camera.lookAt(0, 500, 0); // camera looks at the boom's zero
          // tweenRotate({ x: THREE.MathUtils.degToRad(-90), y: THREE.MathUtils.degToRad(40), z: THREE.MathUtils.degToRad(90) }, 1000)
          // tweenTo(camera.position, { x: 1365, y: 3082, z: 1800 }, 4773);
          // tweenFov(55, 3000)

        if (!document.getElementById('box')) {
          createMusicDj();
          // if (!document.getElementById('twitch-stream')) {
          //   var screen = new videoScreen('Twitch Stream');
          //   scene.add(screen);
          // }
        } else {
          document.getElementById('dj-booth').style.visibility = "visible"
        }
        view = 'dj';

        }).then(event => {
          fadeToClear();
        })
          

        break;

      case 'shop':
        if(view == 'shop'){
          switch (menuItem.name) {

            case 'Flower':
              // console.log('Flower')
              tweenTo(camera.position, { x: modPos.x - 450, y: modPos.y, z: modPos.z }, 2000);
              tweenRotate({ x: THREE.MathUtils.degToRad(0), y: THREE.MathUtils.degToRad(-90), z: THREE.MathUtils.degToRad(0) }, 1000);
              break;
            case 'Shirt':
              // console.log('Shirt')
              tweenTo(camera.position, { x: modPos.x - 450, y: modPos.y, z: modPos.z }, 2000);
              tweenRotate({ x: THREE.MathUtils.degToRad(0), y: THREE.MathUtils.degToRad(-90), z: THREE.MathUtils.degToRad(0) }, 1000);
              break;

            default:
              console.log('Nothing selected')
              tweenTo(camera.position, { x: -300, y: 800, z: -200 }, 3000);
              tweenRotate({ x: THREE.MathUtils.degToRad(35), y: THREE.MathUtils.degToRad(-110), z: THREE.MathUtils.degToRad(35) }, 1000);
              tweenFov(90, 3000)

          }
          break;
        }else{

        fadeToBlack().then(event => {
          

              tweenTo(camera.position, { x: -300, y: 800, z: -200 }, 3000);
              tweenRotate({ x: THREE.MathUtils.degToRad(35), y: THREE.MathUtils.degToRad(-110), z: THREE.MathUtils.degToRad(35) }, 1000);


        view = 'shop';
        setTimeout((fadeToClear), 1000);
      })
        break;
      }


      case 'contact':
        fadeToBlack().then(event => {
          tweenTo(camera.position, { x: modPos.x + 50, y: modPos.y + 80, z: modPos.z + 125 }, 500);
        tweenRotate({ x: THREE.MathUtils.degToRad(0), y: THREE.MathUtils.degToRad(0), z: THREE.MathUtils.degToRad(0) }, 1000);

        // self.location="attending.html";
        // console.log("Contact Page")
        if (!document.getElementById("contact-container")) {
          contactForm();
        }
       
        view = 'contact';
        setTimeout((fadeToClear), 1000);
      })
      break;

      default:
        break;
    }
  });

  document.getElementById('home').addEventListener('click', (event) => {
    video.play();

    document.getElementById('home').disabled = true;
    console.log(document.getElementById('home'))
    // fadeToBlack().then(event => {})
    // fadeToClear().then(event => {})
    if(view == "home"){
      return;
    }

    const goHome = new Promise((resolveOuter) => {
      fadeToBlack().then(event => {

      resolveOuter(new Promise((resolveInner) => {

        tweenTo(camera.position, { x: -200, y: 900, z: 0 }, 500);
        tweenRotate({ x: THREE.MathUtils.degToRad(0), y: 0, z: 0 }, 500);
        tweenFov(55, 9000)
        
        if (view == "contact") {
          document.getElementById('contact-container').style.visibility = 'hidden';
          document.getElementById("red-mic").setAttribute('class', '')
          document.getElementById("green-mic").setAttribute('class', '')
          console.log(1)
        }
        if (view == 'dj') {
          document.getElementById('dj-booth').style.visibility = "hidden"
          for (var i = boom.children.length - 1; i >= 0; i--) {
            boom.remove(boom.children[i]);
          }
          document.querySelector('canvas').style.pointerEvents = 'auto'
        }
        view = 'home';
        setTimeout(resolveInner, 500)
      }))
    })
        ;});
        goHome.then(fadeToClear)
   
  })


  // Window Resize Event Listener
  window.addEventListener('resize', onWindowResize);


  function onDocumentMouseMove(event) {
    // console.log(2)
    // console.log(mouse)
    mouse = new THREE.Vector2(event.x, event.y);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  }

  function createMusicDj() {

    // document.getElementById('audio-choice-2').style.visibility = 'visible'
    // document.getElementById('audio-choice-1').style.visibility = 'visible'

    //to append the html to an element simply write:
    //appendHTMLto(document.getElementById("parent"));

    document.querySelector('body').appendChild(appendHTMLto())

    // var object = new CSS3DObject(appendHTMLto());
    // object.scale.set(0.5, 0.5, 0.5)
    // object.rotation.set(-1.56, 0.6, 1.56)
    // object.position.set(camera.position.x - 300, camera.position.y -200, camera.position.z)
    // object.updateMatrixWorld()
    // scene.add(object)

    // var lcd = document.createElement('script');
    var bdj = document.createElement('script');


    // lcd.setAttribute('type', 'text/javascript')
    bdj.setAttribute('type', 'text/javascript')
    bdj.setAttribute('src', '/_secret-link/browserdj/public/javascripts/browserdj.js')
    // lcd.setAttribute('src', '/browserdj/public/javascripts/canvasLCD.js')
    // document.querySelector('head').appendChild(lcd)
    document.querySelector('head').appendChild(bdj)

    var tempoRange = 20;
    var jogSpeed = 5;
    var timeFactor = 0.1;

    var leftSong = null;
    var rightSong = null;
    var channel2load = '';

    var modVolumeLeft = 0;
    var modVolumeRight = 0;

    var rateLeft = 1;
    var rateRight = 1;

    $('#left .play').click(function () {
      if (leftSong != null) {
        diff = (((($('#left .volume').offset().top - 482) * -1) * 0.5) / 54);
        currentVolLeft = (0.5 + diff) - (modVolumeLeft * (0.5 + diff) / 100);
        leftSong.volume = currentVolLeft.toFixed(2);
        leftSong.playbackRate = rateLeft;
        if ($('#left .jog').hasClass('paused')) {
          $('#left .jog').removeClass('paused');
          $('#left .jog').addClass('running');
          marqueeLeft();
          leftSong.play();
        } else {
          $('#left .jog').removeClass('running');
          $('#left .jog').addClass('paused');
          marqueeLeftStop();
          leftSong.pause();
        }
      }
      else {
        requestSong();
      }
    });

    $('#right .play').click(function () {
      if (rightSong != null) {
        diff = (((($('#right .volume').offset().top - 482) * -1) * 0.5) / 54);
        currentVolRight = (0.5 + diff) - (modVolumeRight * (0.5 + diff) / 100);
        rightSong.volume = currentVolRight.toFixed(2);
        rightSong.playbackRate = rateRight;
        if ($('#right .jog').hasClass('paused')) {
          $('#right .jog').removeClass('paused');
          $('#right .jog').addClass('running');
          marqueeRight();
          rightSong.play();
        } else {
          $('#right .jog').removeClass('running');
          $('#right .jog').addClass('paused');
          marqueeRightStop();
          rightSong.pause();
        }
      }
      else {
        requestSong();
      }
    });

    $('#left .load').click(function () {
      if ($('#left .jog').hasClass('paused')) {
        toggleLoader('left');
      }
      else {
        askToPause();
      }
    });

    $('#right .load').click(function () {
      if ($('#right .jog').hasClass('paused')) {
        toggleLoader('right');
      }
      else {
        askToPause();
      }
    });

    $("#left .tempo").dblclick(function () {
      $('#left .tempo').animate({ 'top': 91 }, 500, 'easeOutQuad');
      $('#left .info-tempo > strong').html('±0.00<span> %</span>');
      rateLeft = 1;
    });

    $("#right .tempo").dblclick(function () {
      $('#right .tempo').animate({ 'top': 91 }, 500, 'easeOutQuad');
      $('#right .info-tempo > strong').html('±0.00<span> %</span>');
      rateRight = 1;
    });

    $("#left .tempo").draggable({
      drag: dragLeftTempo,
      axis: "y",
      containment: [35, 187, 35, 294]
    });

    $("#right .tempo").draggable({
      drag: dragRightTempo,
      axis: "y",
      containment: [818, 187, 818, 294]
    });

    $("#left .volume").draggable({
      drag: dragLeftVolume,
      axis: "y",
      containment: [389, 428, 389, 536]
    });

    $("#right .volume").draggable({
      drag: dragRightVolume,
      axis: "y",
      containment: [465, 428, 465, 536]
    });

    $("#crossfade").draggable({
      drag: crossFade,
      axis: "x",
      containment: 'parent'
    });

    function marqueeLeft() {
      $('#left .song').css('left', '100%');
      $('#left .song').animate({ 'left': (0 - $('#left .song').width()) }, 5000, 'linear', marqueeLeft);
    }

    function marqueeRight() {
      $('#right .song').css('left', '100%');
      $('#right .song').animate({ 'left': (0 - $('#right .song').width()) }, 5000, 'linear', marqueeRight);
    }

    function marqueeRightStop() {
      $('#right .song').stop();
      $('#right .song').animate({ 'left': '0' });
    }

    function marqueeLeftStop() {
      $('#left .song').stop();
      $('#left .song').animate({ 'left': '0' });
    }

    function dragLeftTempo() {
      dragTempo('#left');
    }

    function dragRightTempo() {
      dragTempo('#right');
    }

    function dragLeftVolume() {
      if (leftSong != null) {
        dragVolume('#left');
      }
    }

    function dragRightVolume() {
      if (rightSong != null) {
        dragVolume('#right');
      }
    }

    function dragTempo(side) {
      val = (($(side + ' .tempo').offset().top - 240.5) * tempoRange / 53.5).toFixed(2);
      $(side + ' .jog').css('animation-duration', jogSpeed - ((jogSpeed * (val) / 100)) + 's');
      if (val > 0) {
        val = '+' + val;
      }
      $(side + ' .info-tempo > strong').html(val + '<span> %</span>');
      switch (side) {
        case '#left':
          rateLeft = (1 + (val / 100)).toFixed(2);
          break;
        case '#right':
          rateRight = (1 + (val / 100)).toFixed(2);
          break;
      }
    }

    function dragVolume(side) {
      diff = ((($(side + ' .volume').offset().top - 482) * -1) * 0.5) / 54;
      switch (side) {
        case '#left':
          leftSong.volume = ((0.5 + diff) - (modVolumeLeft * (0.5 + diff) / 100)).toFixed(2);
          break;
        case '#right':
          rightSong.volume = ((0.5 + diff) - (modVolumeRight * (0.5 + diff) / 100)).toFixed(2);
          break;
      }
    }

    function crossFade() {
      currentVolLeft = (0.5 + ((($('#left .volume').offset().top - 482) * -1) * 0.5) / 54).toFixed(2);
      currentVolRight = (0.5 + ((($('#right .volume').offset().top - 482) * -1) * 0.5) / 54).toFixed(2);
      if ($('#crossfade').position().left - 57 < 0) {
        modVolumeLeft = 0;
        modVolumeRight = (($('#crossfade').position().left - 57) * 100 / -57).toFixed(2);
      }
      else if ($('#crossfade').position().left - 57 > 0) {
        modVolumeRight = 0;
        modVolumeLeft = (($('#crossfade').position().left - 57) * 100 / 57).toFixed(2);
      }
      else {
        modVolumeLeft = 0;
        modVolumeRight = 0;
      }
      if (leftSong != null) {
        leftSong.volume = currentVolLeft - (modVolumeLeft * currentVolLeft / 100).toFixed(2);
      }
      if (rightSong != null) {
        rightSong.volume = currentVolRight - (modVolumeRight * currentVolRight / 100).toFixed(2);
      }
    }

    $('#left .less').click(function () {
      if (leftSong != null) {
        leftSong.currentTime -= timeFactor;
      }
      else {
        requestSong();
      }
    });

    $('#left .more').click(function () {
      if (leftSong != null) {
        leftSong.currentTime += timeFactor;
      }
      else {
        requestSong();
      }
    });

    $('#right .less').click(function () {
      if (rightSong != null) {
        rightSong.currentTime -= timeFactor;
      }
      else {
        requestSong();
      }
    });

    $('#right .more').click(function () {
      if (rightSong != null) {
        rightSong.currentTime += timeFactor;
      }
      else {
        requestSong();
      }
    });

    function requestSong() {
      title = '¡No has cargado una canción!';
      options = {
        body: 'Carga una canción en este canal pulsando el botón "LOAD"',
        icon: 'http://www.michelacosta.com/yo.png',
      }
      Notification.requestPermission(function (status) {
        new Notification(title, options);
      }); dj
    }

    function askToPause() {
      title = '¡Tienes que parar la reproducción!';
      options = {
        body: 'Para la reproducción antes de cargar otro tema',
        icon: 'http://www.michelacosta.com/yo.png',
      }
      Notification.requestPermission(function (status) {
        new Notification(title, options);
      });
    }

    function dislike() {
      title = '¡Desprecio infinito!';
      options = {
        body: 'No nos gustan los DJs que usan el SYNC',
        icon: 'http://www.michelacosta.com/yo.png',
      }
      Notification.requestPermission(function (status) {
        new Notification(title, options);
      });
    }

    function toggleLoader(deck) {
      channel2load = deck;
      if ($('#songloader').position().top == 150) {
        $('#songloader').animate({ 'top': 20 }, 600, 'easeOutQuad');
        $('#' + deck + ' .info').css('background-color', '#000033');
      }
      else {
        $('#songloader').animate({ 'top': 150 }, 600, 'easeOutQuad');
        $('#' + deck + ' .info').css('background-color', '#000');
      }
    }

    function getTime(seconds) {
      var hr = Math.floor(seconds / 3600);
      var min = Math.floor((seconds - (hr * 3600)) / 60);
      var sec = Math.floor(seconds - (hr * 3600) - (min * 60));
      if (min < 10) { min = "0" + min; }
      if (sec < 10) { sec = "0" + sec; }
      return min + ':' + sec;
    }

    $('#left input').change(function () {
      if (leftSong != null) {
        leftSong.currentTime = $(this).val();
      }
    });

    $('#right input').change(function () {
      if (rightSong != null) {
        rightSong.currentTime = $(this).val();
      }
    });

    $('.sync').click(function () {
      dislike();
    });





    function appendHTMLto() {
      //Create Elements
      var element_1 = document.createElement("div");
      var element_1_1 = document.createElement("div");
      var element_1_1_1 = document.createElement("div");
      var element_1_1_1_1 = document.createElement("div");
      var element_1_1_1_1_1 = document.createElement("div");
      var element_1_1_1_1_1_1 = document.createElement("canvas");
      var element_1_1_1_1_2 = document.createElement("div");
      var element_1_1_1_1_2_1 = document.createElement("canvas");
      var element_1_1_1_2 = document.createElement("div");
      var element_1_1_1_2_1 = document.createElement("div");
      var element_1_1_1_2_1_1 = document.createElement("div");
      var element_1_1_1_2_2 = document.createElement("div");
      var element_1_1_1_2_2_1 = document.createElement("div");
      var element_1_1_2 = document.createElement("div");
      var element_1_1_2_1 = document.createElement("div");
      var element_1_1_2_1_1 = document.createElement("p");
      var element_1_1_2_1_2 = document.createElement("div");
      var element_1_1_2_1_3 = document.createElement("p");
      var element_1_1_2_1_4 = document.createElement("div");
      var element_1_1_2_1_5 = document.createElement("p");
      var element_1_1_2_2 = document.createElement("div");
      var element_1_1_2_2_1 = document.createElement("p");
      var element_1_1_2_2_2 = document.createElement("div");
      var element_1_1_2_2_3 = document.createElement("p");
      var element_1_1_2_3 = document.createElement("div");
      var element_1_1_2_3_1 = document.createElement("p");
      var element_1_1_2_3_2 = document.createElement("div");
      var element_1_1_2_3_3 = document.createElement("p");
      var element_1_1_2_4 = document.createElement("div");
      var element_1_1_2_4_1 = document.createElement("p");
      var element_1_1_2_4_2 = document.createElement("div");
      var element_1_1_2_4_3 = document.createElement("p");
      var element_1_1_2_5 = document.createElement("div");
      var element_1_1_2_5_1 = document.createElement("p");
      var element_1_1_2_5_2 = document.createElement("div");
      var element_1_1_2_5_3 = document.createElement("p");
      var element_1_1_2_6 = document.createElement("div");
      var element_1_1_2_6_1 = document.createElement("p");
      var element_1_1_2_6_2 = document.createElement("div");
      var element_1_1_2_6_3 = document.createElement("p");
      var element_1_1_2_7 = document.createElement("div");
      var element_1_1_2_7_1 = document.createElement("p");
      var element_1_1_2_7_2 = document.createElement("div");
      var element_1_1_2_7_3 = document.createElement("p");
      var element_1_1_2_8 = document.createElement("div");
      var element_1_1_2_8_1 = document.createElement("p");
      var element_1_1_2_8_2 = document.createElement("div");
      var element_1_1_2_8_3 = document.createElement("p");
      var element_1_1_2_9 = document.createElement("div");
      var element_1_1_2_9_1 = document.createElement("p");
      var element_1_1_2_9_2 = document.createElement("div");
      var element_1_1_2_9_3 = document.createElement("p");
      var element_1_1_2_10 = document.createElement("div");
      var element_1_1_2_10_1 = document.createElement("p");
      var element_1_1_2_10_2 = document.createElement("div");
      var element_1_1_2_10_3 = document.createElement("p");
      var element_1_1_2_10_4 = document.createElement("div");
      var element_1_1_2_10_5 = document.createElement("p");
      var element_1_1_3 = document.createElement("div");
      var element_1_1_3_1 = document.createElement("div");
      var element_1_1_3_1_1 = document.createElement("ul");
      var element_1_1_3_1_1_1 = document.createElement("li");
      var element_1_1_3_1_1_1_1 = document.createElement("input");
      var element_1_1_3_1_1_2 = document.createElement("li");
      var songs = document.createElement("div");
      // load button 1

      var element_1_1_3_1_1_2_1 = document.createElement("a");

      var element_1_1_3_1_1_3 = document.createElement("li");
      var element_1_1_3_1_1_3_1 = document.createElement("a");
      var element_1_1_3_1_1_4 = document.createElement("li");
      var element_1_1_3_1_1_4_1 = document.createElement("a");
      var element_1_1_3_2 = document.createElement("div");
      var element_1_1_3_2_1 = document.createElement("div");
      var element_1_1_3_2_1_1 = document.createElement("div");
      var element_1_1_3_2_2 = document.createElement("p");
      var element_1_1_3_3 = document.createElement("div");
      var element_1_1_3_3_1 = document.createElement("ul");
      var element_1_1_3_3_1_1 = document.createElement("li");
      var element_1_1_3_3_1_1_1 = document.createElement("a");
      var element_1_1_3_3_1_2 = document.createElement("li");
      var element_1_1_3_3_1_2_1 = document.createElement("a");
      var element_1_1_3_3_1_3 = document.createElement("li");
      //load button 2

      var element_1_1_3_3_1_3_1 = document.createElement("a");

      var element_1_1_3_3_1_4 = document.createElement("li");
      var element_1_1_3_3_1_4_1 = document.createElement("input");
      var textNode_1_1_2_1_1_1 = document.createTextNode("3D-PAN");
      var textNode_1_1_2_1_3_1 = document.createTextNode("0");
      var textNode_1_1_2_1_5_1 = document.createTextNode("0");
      var textNode_1_1_2_2_1_1 = document.createTextNode("SPD");
      var textNode_1_1_2_2_3_1 = document.createTextNode("1");
      var textNode_1_1_2_3_1_1 = document.createTextNode("HPF");
      var textNode_1_1_2_3_3_1 = document.createTextNode("0");
      var textNode_1_1_2_4_1_1 = document.createTextNode("LPF");
      var textNode_1_1_2_4_3_1 = document.createTextNode("30000");
      var textNode_1_1_2_5_1_1 = document.createTextNode("VOL");
      var textNode_1_1_2_5_3_1 = document.createTextNode("1");
      var textNode_1_1_2_6_1_1 = document.createTextNode("VOL");
      var textNode_1_1_2_6_3_1 = document.createTextNode("1");
      var textNode_1_1_2_7_1_1 = document.createTextNode("LPF");
      var textNode_1_1_2_7_3_1 = document.createTextNode("30000");
      var textNode_1_1_2_8_1_1 = document.createTextNode("HPF");
      var textNode_1_1_2_8_3_1 = document.createTextNode("0");
      var textNode_1_1_2_9_1_1 = document.createTextNode("SPD");
      var textNode_1_1_2_9_3_1 = document.createTextNode("1");
      var textNode_1_1_2_10_1_1 = document.createTextNode("3D-PAN");
      var textNode_1_1_2_10_3_1 = document.createTextNode("0");
      var textNode_1_1_2_10_5_1 = document.createTextNode("0");
      var textNode_1_1_3_1_1_2_1_1 = document.createTextNode("Load");
      var textNode_1_1_3_1_1_3_1_1 = document.createTextNode("Stop");
      var textNode_1_1_3_1_1_4_1_1 = document.createTextNode("Play");
      var textNode_1_1_3_2_2_1 = document.createTextNode("0");
      var textNode_1_1_3_3_1_1_1_1 = document.createTextNode("Play");
      var textNode_1_1_3_3_1_2_1_1 = document.createTextNode("Stop");
      var textNode_1_1_3_3_1_3_1_1 = document.createTextNode("Load");
      //Set Attributes
      element_1.setAttribute("class", "row-fluid");
      element_1.setAttribute("id", "dj-booth");
      element_1_1.setAttribute("id", "box");
      element_1_1.setAttribute("class", "span12");
      element_1_1_1.setAttribute("id", "box_disp");
      element_1_1_1.setAttribute("class", "row inbox");
      element_1_1_1_1.setAttribute("id", "box_lcd");
      element_1_1_1_1.setAttribute("class", "row inbox");
      element_1_1_1_1_1.setAttribute("class", "span6");
      element_1_1_1_1_1_1.setAttribute("id", "canvasLCD1");
      element_1_1_1_1_1_1.setAttribute("class", "lcd");
      element_1_1_1_1_2.setAttribute("class", "span6");
      element_1_1_1_1_2_1.setAttribute("id", "canvasLCD2");
      element_1_1_1_1_2_1.setAttribute("class", "lcd");
      element_1_1_1_2.setAttribute("id", "box_eq");
      element_1_1_1_2.setAttribute("class", "row inbox");
      element_1_1_1_2_1.setAttribute("class", "span6");
      element_1_1_1_2_1_1.setAttribute("id", "viz1");
      element_1_1_1_2_1_1.setAttribute("class", "viz");
      element_1_1_1_2_2.setAttribute("class", "span6");
      element_1_1_1_2_2_1.setAttribute("id", "viz2");
      element_1_1_1_2_2_1.setAttribute("class", "viz");
      element_1_1_2.setAttribute("id", "box_mixer");
      element_1_1_2.setAttribute("class", "row inbox");
      element_1_1_2_1.setAttribute("class", "span2");
      element_1_1_2_1_2.setAttribute("id", "panner1Y");
      element_1_1_2_1_2.setAttribute("class", "sl");
      element_1_1_2_1_3.setAttribute("id", "panner1Y_display");
      element_1_1_2_1_3.setAttribute("class", "disptext");
      element_1_1_2_1_4.setAttribute("id", "panner1X");
      element_1_1_2_1_4.setAttribute("class", "sl");
      element_1_1_2_1_5.setAttribute("id", "panner1X_display");
      element_1_1_2_1_5.setAttribute("class", "disptext");
      element_1_1_2_2.setAttribute("class", "span1");
      element_1_1_2_2_2.setAttribute("id", "playspeed_slider1");
      element_1_1_2_2_2.setAttribute("class", "sl");
      element_1_1_2_2_3.setAttribute("id", "playspeed_display1");
      element_1_1_2_2_3.setAttribute("class", "disptext");
      element_1_1_2_3.setAttribute("class", "span1");
      element_1_1_2_3_2.setAttribute("id", "highpass1");
      element_1_1_2_3_2.setAttribute("class", "sl");
      element_1_1_2_3_3.setAttribute("id", "highpass_display1");
      element_1_1_2_3_3.setAttribute("class", "disptext");
      element_1_1_2_4.setAttribute("class", "span1");
      element_1_1_2_4_2.setAttribute("id", "lowpass1");
      element_1_1_2_4_2.setAttribute("class", "sl");
      element_1_1_2_4_3.setAttribute("id", "lowpass_display1");
      element_1_1_2_4_3.setAttribute("class", "disptext");
      element_1_1_2_5.setAttribute("class", "span1");
      element_1_1_2_5_2.setAttribute("id", "playvolume_slider1");
      element_1_1_2_5_2.setAttribute("class", "sl");
      element_1_1_2_5_3.setAttribute("id", "playvolume_display1");
      element_1_1_2_5_3.setAttribute("class", "disptext");
      element_1_1_2_6.setAttribute("id", "volB");
      element_1_1_2_6.setAttribute("class", "span1");
      element_1_1_2_6_2.setAttribute("id", "playvolume_slider2");
      element_1_1_2_6_2.setAttribute("class", "sl");
      element_1_1_2_6_3.setAttribute("id", "playvolume_display2");
      element_1_1_2_6_3.setAttribute("class", "disptext");
      element_1_1_2_7.setAttribute("class", "span1");
      element_1_1_2_7_2.setAttribute("id", "lowpass2");
      element_1_1_2_7_2.setAttribute("class", "sl");
      element_1_1_2_7_3.setAttribute("id", "lowpass_display2");
      element_1_1_2_7_3.setAttribute("class", "disptext");
      element_1_1_2_8.setAttribute("class", "span1");
      element_1_1_2_8_2.setAttribute("id", "highpass2");
      element_1_1_2_8_2.setAttribute("class", "sl");
      element_1_1_2_8_3.setAttribute("id", "highpass_display2");
      element_1_1_2_8_3.setAttribute("class", "disptext");
      element_1_1_2_9.setAttribute("class", "span1");
      element_1_1_2_9_2.setAttribute("id", "playspeed_slider2");
      element_1_1_2_9_2.setAttribute("class", "sl");
      element_1_1_2_9_3.setAttribute("id", "playspeed_display2");
      element_1_1_2_9_3.setAttribute("class", "disptext");
      element_1_1_2_10.setAttribute("class", "span2");
      element_1_1_2_10_2.setAttribute("id", "panner2Y");
      element_1_1_2_10_2.setAttribute("class", "sl");
      element_1_1_2_10_3.setAttribute("id", "panner2Y_display");
      element_1_1_2_10_3.setAttribute("class", "disptext");
      element_1_1_2_10_4.setAttribute("id", "panner2X");
      element_1_1_2_10_4.setAttribute("class", "sl");
      element_1_1_2_10_5.setAttribute("id", "panner2X_display");
      element_1_1_2_10_5.setAttribute("class", "disptext");
      element_1_1_3.setAttribute("id", "box_play");
      songs.setAttribute("id", "box_play");
      element_1_1_3.setAttribute("class", "row inbox");
      songs.setAttribute("class", "row inbox");
      element_1_1_3_1.setAttribute("id", "box_play1");
      element_1_1_3_1.setAttribute("class", "span4");
      element_1_1_3_1_1.setAttribute("class", "navi");
      element_1_1_3_1_1_1.setAttribute("style", "display:none");
      element_1_1_3_1_1_1_1.setAttribute("id", "input_file_track1");
      element_1_1_3_1_1_1_1.setAttribute("type", "button");
      element_1_1_3_1_1_1_1.setAttribute("accept", "*");
      element_1_1_3_1_1_2.setAttribute("class", "navi_small");
      element_1_1_3_1_1_2.setAttribute("id", "load_button_1");

      // load button 1
      element_1_1_3_1_1_2_1.setAttribute("href", "#");
      element_1_1_3_1_1_2_1.setAttribute("id", "button_open_track1");
      element_1_1_3_1_1_2_1.setAttribute("class", "icon_home");

      element_1_1_3_1_1_3.setAttribute("class", "navi_small");
      element_1_1_3_1_1_3_1.setAttribute("href", "#");
      element_1_1_3_1_1_3_1.setAttribute("id", "stop1");
      element_1_1_3_1_1_3_1.setAttribute("class", "icon_location");
      element_1_1_3_1_1_4_1.setAttribute("href", "#");
      element_1_1_3_1_1_4_1.setAttribute("id", "play1");
      element_1_1_3_1_1_4_1.setAttribute("class", "icon_home");
      element_1_1_3_2.setAttribute("class", "span4");
      element_1_1_3_2_1.setAttribute("id", "box_crossfader");
      element_1_1_3_2_1.setAttribute("class", "inbox");
      element_1_1_3_2_1_1.setAttribute("id", "crossfader");
      element_1_1_3_2_1_1.setAttribute("class", "sl");
      element_1_1_3_2_2.setAttribute("id", "crossfader_display");
      element_1_1_3_3.setAttribute("id", "box_play2");
      element_1_1_3_3.setAttribute("class", "span4");
      element_1_1_3_3_1.setAttribute("class", "navi");
      element_1_1_3_3_1_1_1.setAttribute("id", "play2");
      element_1_1_3_3_1_1_1.setAttribute("href", "#");
      element_1_1_3_3_1_1_1.setAttribute("class", "icon_home");
      element_1_1_3_3_1_2.setAttribute("class", "navi_small");
      element_1_1_3_3_1_2_1.setAttribute("id", "stop2");
      element_1_1_3_3_1_2_1.setAttribute("href", "#");
      element_1_1_3_3_1_2_1.setAttribute("class", "icon_location");
      element_1_1_3_3_1_3.setAttribute("class", "navi_small");
      element_1_1_3_3_1_3.setAttribute("id", "load_button_1");
      //load button 2

      element_1_1_3_3_1_3_1.setAttribute("href", "#");
      element_1_1_3_3_1_3_1.setAttribute("id", "button_open_track2");
      element_1_1_3_3_1_3_1.setAttribute("class", "icon_home");

      element_1_1_3_3_1_4.setAttribute("style", "display:none");
      element_1_1_3_3_1_4_1.setAttribute("id", "input_file_track2");
      element_1_1_3_3_1_4_1.setAttribute("type", "button");
      element_1_1_3_3_1_4_1.setAttribute("accept", "*");
      //Append Children
      element_1.appendChild(element_1_1);
      element_1_1.appendChild(element_1_1_1);
      element_1_1_1.appendChild(element_1_1_1_1);
      element_1_1_1_1.appendChild(element_1_1_1_1_1);
      element_1_1_1_1_1.appendChild(element_1_1_1_1_1_1);
      element_1_1_1_1.appendChild(element_1_1_1_1_2);
      element_1_1_1_1_2.appendChild(element_1_1_1_1_2_1);
      element_1_1_1.appendChild(element_1_1_1_2);
      element_1_1_1_2.appendChild(element_1_1_1_2_1);
      element_1_1_1_2_1.appendChild(element_1_1_1_2_1_1);
      element_1_1_1_2.appendChild(element_1_1_1_2_2);
      element_1_1_1_2_2.appendChild(element_1_1_1_2_2_1);
      element_1_1.appendChild(element_1_1_2);
      element_1_1_2.appendChild(element_1_1_2_1);
      element_1_1_2_1.appendChild(element_1_1_2_1_1);
      element_1_1_2_1_1.appendChild(textNode_1_1_2_1_1_1);
      element_1_1_2_1.appendChild(element_1_1_2_1_2);
      element_1_1_2_1.appendChild(element_1_1_2_1_3);
      element_1_1_2_1_3.appendChild(textNode_1_1_2_1_3_1);
      element_1_1_2_1.appendChild(element_1_1_2_1_4);
      element_1_1_2_1.appendChild(element_1_1_2_1_5);
      element_1_1_2_1_5.appendChild(textNode_1_1_2_1_5_1);
      element_1_1_2.appendChild(element_1_1_2_2);
      element_1_1_2_2.appendChild(element_1_1_2_2_1);
      element_1_1_2_2_1.appendChild(textNode_1_1_2_2_1_1);
      element_1_1_2_2.appendChild(element_1_1_2_2_2);
      element_1_1_2_2.appendChild(element_1_1_2_2_3);
      element_1_1_2_2_3.appendChild(textNode_1_1_2_2_3_1);
      element_1_1_2.appendChild(element_1_1_2_3);
      element_1_1_2_3.appendChild(element_1_1_2_3_1);
      element_1_1_2_3_1.appendChild(textNode_1_1_2_3_1_1);
      element_1_1_2_3.appendChild(element_1_1_2_3_2);
      element_1_1_2_3.appendChild(element_1_1_2_3_3);
      element_1_1_2_3_3.appendChild(textNode_1_1_2_3_3_1);
      element_1_1_2.appendChild(element_1_1_2_4);
      element_1_1_2_4.appendChild(element_1_1_2_4_1);
      element_1_1_2_4_1.appendChild(textNode_1_1_2_4_1_1);
      element_1_1_2_4.appendChild(element_1_1_2_4_2);
      element_1_1_2_4.appendChild(element_1_1_2_4_3);
      element_1_1_2_4_3.appendChild(textNode_1_1_2_4_3_1);
      element_1_1_2.appendChild(element_1_1_2_5);
      element_1_1_2_5.appendChild(element_1_1_2_5_1);
      element_1_1_2_5_1.appendChild(textNode_1_1_2_5_1_1);
      element_1_1_2_5.appendChild(element_1_1_2_5_2);
      element_1_1_2_5.appendChild(element_1_1_2_5_3);
      element_1_1_2_5_3.appendChild(textNode_1_1_2_5_3_1);
      element_1_1_2.appendChild(element_1_1_2_6);
      element_1_1_2_6.appendChild(element_1_1_2_6_1);
      element_1_1_2_6_1.appendChild(textNode_1_1_2_6_1_1);
      element_1_1_2_6.appendChild(element_1_1_2_6_2);
      element_1_1_2_6.appendChild(element_1_1_2_6_3);
      element_1_1_2_6_3.appendChild(textNode_1_1_2_6_3_1);
      element_1_1_2.appendChild(element_1_1_2_7);
      element_1_1_2_7.appendChild(element_1_1_2_7_1);
      element_1_1_2_7_1.appendChild(textNode_1_1_2_7_1_1);
      element_1_1_2_7.appendChild(element_1_1_2_7_2);
      element_1_1_2_7.appendChild(element_1_1_2_7_3);
      element_1_1_2_7_3.appendChild(textNode_1_1_2_7_3_1);
      element_1_1_2.appendChild(element_1_1_2_8);
      element_1_1_2_8.appendChild(element_1_1_2_8_1);
      element_1_1_2_8_1.appendChild(textNode_1_1_2_8_1_1);
      element_1_1_2_8.appendChild(element_1_1_2_8_2);
      element_1_1_2_8.appendChild(element_1_1_2_8_3);
      element_1_1_2_8_3.appendChild(textNode_1_1_2_8_3_1);
      element_1_1_2.appendChild(element_1_1_2_9);
      element_1_1_2_9.appendChild(element_1_1_2_9_1);
      element_1_1_2_9_1.appendChild(textNode_1_1_2_9_1_1);
      element_1_1_2_9.appendChild(element_1_1_2_9_2);
      element_1_1_2_9.appendChild(element_1_1_2_9_3);
      element_1_1_2_9_3.appendChild(textNode_1_1_2_9_3_1);
      element_1_1_2.appendChild(element_1_1_2_10);
      element_1_1_2_10.appendChild(element_1_1_2_10_1);
      element_1_1_2_10_1.appendChild(textNode_1_1_2_10_1_1);
      element_1_1_2_10.appendChild(element_1_1_2_10_2);
      element_1_1_2_10.appendChild(element_1_1_2_10_3);
      element_1_1_2_10_3.appendChild(textNode_1_1_2_10_3_1);
      element_1_1_2_10.appendChild(element_1_1_2_10_4);
      element_1_1_2_10.appendChild(element_1_1_2_10_5);
      element_1_1_2_10_5.appendChild(textNode_1_1_2_10_5_1);
      element_1_1.appendChild(element_1_1_3);
      element_1_1.appendChild(songs);
      element_1_1_3.appendChild(element_1_1_3_1);
      element_1_1_3_1.appendChild(element_1_1_3_1_1);
      element_1_1_3_1_1.appendChild(element_1_1_3_1_1_1);
      element_1_1_3_1_1_1.appendChild(element_1_1_3_1_1_1_1);
      element_1_1_3_1_1.appendChild(element_1_1_3_1_1_2);
      element_1_1_3_1_1_2.appendChild(element_1_1_3_1_1_2_1);
      // load button 1

      element_1_1_3_1_1_2_1.appendChild(textNode_1_1_3_1_1_2_1_1);

      element_1_1_3_1_1.appendChild(element_1_1_3_1_1_3);
      element_1_1_3_1_1_3.appendChild(element_1_1_3_1_1_3_1);
      element_1_1_3_1_1_3_1.appendChild(textNode_1_1_3_1_1_3_1_1);
      element_1_1_3_1_1.appendChild(element_1_1_3_1_1_4);
      element_1_1_3_1_1_4.appendChild(element_1_1_3_1_1_4_1);
      element_1_1_3_1_1_4_1.appendChild(textNode_1_1_3_1_1_4_1_1);
      element_1_1_3.appendChild(element_1_1_3_2);
      element_1_1_3_2.appendChild(element_1_1_3_2_1);
      element_1_1_3_2_1.appendChild(element_1_1_3_2_1_1);
      element_1_1_3_2.appendChild(element_1_1_3_2_2);
      element_1_1_3_2_2.appendChild(textNode_1_1_3_2_2_1);
      element_1_1_3.appendChild(element_1_1_3_3);
      element_1_1_3_3.appendChild(element_1_1_3_3_1);
      element_1_1_3_3_1.appendChild(element_1_1_3_3_1_1);
      element_1_1_3_3_1_1.appendChild(element_1_1_3_3_1_1_1);
      element_1_1_3_3_1_1_1.appendChild(textNode_1_1_3_3_1_1_1_1);
      element_1_1_3_3_1.appendChild(element_1_1_3_3_1_2);
      element_1_1_3_3_1_2.appendChild(element_1_1_3_3_1_2_1);
      element_1_1_3_3_1_2_1.appendChild(textNode_1_1_3_3_1_2_1_1);
      element_1_1_3_3_1.appendChild(element_1_1_3_3_1_3);
      element_1_1_3_3_1_3.appendChild(element_1_1_3_3_1_3_1);
      //load button 2
      element_1_1_3_3_1_3_1.appendChild(textNode_1_1_3_3_1_3_1_1);

      element_1_1_3_3_1.appendChild(element_1_1_3_3_1_4);
      element_1_1_3_3_1_4.appendChild(element_1_1_3_3_1_4_1);

      // element_1_1.appendChild(document.getElementById('audio-choice-1'));


      // element_1_1.appendChild(document.getElementById('audio-choice-2'));

      //Create Elements
      var element_199 = document.createElement("form");
      var element_199_1 = document.createElement("select");
      var element_199_1_1 = document.createElement("option");
      var element_199_1_2 = document.createElement("option");
      var element_199_1_3 = document.createElement("option");
      var element_199_1_4 = document.createElement("option");
      var element_199_1_5 = document.createElement("option");
      var element_199_1_6 = document.createElement("option");
      var element_199_1_7 = document.createElement("option");
      var element_199_1_8 = document.createElement("option");
      var element_199_1_9 = document.createElement("option");
      var element_199_1_10 = document.createElement("option");
      var element_299 = document.createElement("form");
      var element_299_1 = document.createElement("select");
      var element_299_1_1 = document.createElement("option");
      var element_299_1_2 = document.createElement("option");
      var element_299_1_3 = document.createElement("option");
      var element_299_1_4 = document.createElement("option");
      var element_299_1_5 = document.createElement("option");
      var element_299_1_6 = document.createElement("option");
      var element_299_1_7 = document.createElement("option");
      var element_299_1_8 = document.createElement("option");
      var element_299_1_9 = document.createElement("option");
      var element_299_1_10 = document.createElement("option");
      //Create Text Nodes
      var textNode_99_1_1_1 = document.createTextNode("Timpa");
      var textNode_99_1_2_1 = document.createTextNode("Junglepussy");
      var textNode_99_1_3_1 = document.createTextNode("Magnolia");
      var textNode_99_1_4_1 = document.createTextNode("Tjay");
      var textNode_99_1_5_1 = document.createTextNode("Maidza");
      var textNode_99_1_6_1 = document.createTextNode("JID");
      var textNode_99_1_7_1 = document.createTextNode("Elujay");
      var textNode_99_1_8_1 = document.createTextNode("Tirzah");
      var textNode_99_1_9_1 = document.createTextNode("Banks");
      var textNode_99_1_10_1 = document.createTextNode("Jeshi");
      var textNode_29_1_1_1 = document.createTextNode("Timpa");
      var textNode_29_1_2_1 = document.createTextNode("Junglepussy");
      var textNode_29_1_3_1 = document.createTextNode("Magnolia");
      var textNode_29_1_4_1 = document.createTextNode("Tjay");
      var textNode_29_1_5_1 = document.createTextNode("Maidza");
      var textNode_29_1_6_1 = document.createTextNode("JID");
      var textNode_29_1_7_1 = document.createTextNode("Elujay");
      var textNode_29_1_8_1 = document.createTextNode("Tirzah");
      var textNode_29_1_9_1 = document.createTextNode("Banks");
      var textNode_29_1_10_1 = document.createTextNode("Jeshi");
      //Set Attributes
      element_199.setAttribute("id", "audio-choice-1");
      element_199.setAttribute("style", "z-index: 200;");
      element_199_1.setAttribute("name", "audio");
      element_199_1_1.setAttribute("value", "assets/audio/LA-Timpa.mp3");
      element_199_1_2.setAttribute("value", "assets/audio/2DEEP Suzi Analogue, Junglepussy.mp3");
      element_199_1_3.setAttribute("value", "assets/audio/3rd Ward Solja JUVENILE, Big Tymers, Magnolia Shorty.mp3");
      element_199_1_4.setAttribute("value", "assets/audio/20_20 Lil Tjay.mp3");
      element_199_1_4.setAttribute("selected", "");
      element_199_1_5.setAttribute("value", "assets/audio/24k Tkay Maidza.mp3");
      element_199_1_6.setAttribute("value", "assets/audio/151 Rum JID.mp3");
      element_199_1_7.setAttribute("value", "assets/audio/1080p Elujay, HXNS.mp3");
      element_199_1_8.setAttribute("value", "assets/audio/1471 Babyfather, Tirzah.mp3");
      element_199_1_9.setAttribute("value", "assets/audio/1991 Azealia Banks.mp3");
      element_199_1_10.setAttribute("value", "assets/audio/3210 Jeshi.mp3");
      element_299.setAttribute("id", "audio-choice-2");
      element_299.setAttribute("style", "z-index: 200;");
      element_299_1.setAttribute("name", "audio");
      element_299_1_1.setAttribute("value", "assets/audio/LA-Timpa.mp3");
      element_299_1_2.setAttribute("value", "assets/audio/2DEEP Suzi Analogue, Junglepussy.mp3");
      element_299_1_3.setAttribute("value", "assets/audio/3rd Ward Solja JUVENILE, Big Tymers, Magnolia Shorty.mp3");
      element_299_1_4.setAttribute("value", "assets/audio/20_20 Lil Tjay.mp3");
      element_299_1_5.setAttribute("value", "assets/audio/24k Tkay Maidza.mp3");
      element_299_1_6.setAttribute("value", "assets/audio/151 Rum JID.mp3");
      element_299_1_7.setAttribute("value", "assets/audio/1080p Elujay, HXNS.mp3");
      element_299_1_8.setAttribute("value", "assets/audio/1471 Babyfather, Tirzah.mp3");
      element_299_1_8.setAttribute("selected", "");
      element_299_1_9.setAttribute("value", "assets/audio/1991 Azealia Banks.mp3");
      element_299_1_10.setAttribute("value", "assets/audio/3210 Jeshi.mp3");
      //Append Children
      songs.appendChild(element_199);
      element_199.appendChild(element_199_1);
      element_199_1.appendChild(element_199_1_1);
      element_199_1_1.appendChild(textNode_99_1_1_1);
      element_199_1.appendChild(element_199_1_2);
      element_199_1_2.appendChild(textNode_99_1_2_1);
      element_199_1.appendChild(element_199_1_3);
      element_199_1_3.appendChild(textNode_99_1_3_1);
      element_199_1.appendChild(element_199_1_4);
      element_199_1_4.appendChild(textNode_99_1_4_1);
      element_199_1.appendChild(element_199_1_5);
      element_199_1_5.appendChild(textNode_99_1_5_1);
      element_199_1.appendChild(element_199_1_6);
      element_199_1_6.appendChild(textNode_99_1_6_1);
      element_199_1.appendChild(element_199_1_7);
      element_199_1_7.appendChild(textNode_99_1_7_1);
      element_199_1.appendChild(element_199_1_8);
      element_199_1_8.appendChild(textNode_99_1_8_1);
      element_199_1.appendChild(element_199_1_9);
      element_199_1_9.appendChild(textNode_99_1_9_1);
      element_199_1.appendChild(element_199_1_10);
      element_199_1_10.appendChild(textNode_99_1_10_1);
      songs.appendChild(element_299);
      element_299.appendChild(element_299_1);
      element_299_1.appendChild(element_299_1_1);
      element_299_1_1.appendChild(textNode_29_1_1_1);
      element_299_1.appendChild(element_299_1_2);
      element_299_1_2.appendChild(textNode_29_1_2_1);
      element_299_1.appendChild(element_299_1_3);
      element_299_1_3.appendChild(textNode_29_1_3_1);
      element_299_1.appendChild(element_299_1_4);
      element_299_1_4.appendChild(textNode_29_1_4_1);
      element_299_1.appendChild(element_299_1_5);
      element_299_1_5.appendChild(textNode_29_1_5_1);
      element_299_1.appendChild(element_299_1_6);
      element_299_1_6.appendChild(textNode_29_1_6_1);
      element_299_1.appendChild(element_299_1_7);
      element_299_1_7.appendChild(textNode_29_1_7_1);
      element_299_1.appendChild(element_299_1_8);
      element_299_1_8.appendChild(textNode_29_1_8_1);
      element_299_1.appendChild(element_299_1_9);
      element_299_1_9.appendChild(textNode_29_1_9_1);
      element_299_1.appendChild(element_299_1_10);
      element_299_1_10.appendChild(textNode_29_1_10_1);


      return element_1;
    }
  }




  function contactForm() {
    //to append the html to an element simply write:
    //appendHTMLto(document.getElementById("parent"));

    var element_1 = document.getElementById("content-wrap")
    // var element_1_1 = document.createElement("div");
    // var element_1_2 = document.createElement("div");
    var element_1_3 = document.createElement("div");
    var element_1_3_1 = document.createElement("h1");
    var element_1_3_2 = document.createElement("div");
    var element_1_3_2_1 = document.createElement("button");
    var element_1_3_2_2 = document.createElement("button");
    var element_1_3_2_3 = document.createElement("button");
    var element_1_3_3 = document.createElement("div");
    var element_1_3_4 = document.createElement("audio");
    var element_1_3_5 = document.createElement("div");
    var element_1_3_5_1 = document.createElement("img");
    var element_1_3_5_2 = document.createElement("img");
    //Create Text Nodes
    var textNode_1_3_1_1 = document.createTextNode("Contact Tender Magic");
    var textNode_1_3_2_1_1 = document.createTextNode("Record");
    var textNode_1_3_2_2_1 = document.createTextNode("Stop");
    var textNode_1_3_2_3_1 = document.createTextNode("Submit");
    //Set Attributes
    // element_1.setAttribute("id","content-wrap");
    // element_1_1.setAttribute("id","static-content");
    // element_1_2.setAttribute("id","webgl-content");
    element_1_3.setAttribute("id", "contact-container");
    element_1_3_1.setAttribute("id", "contact-label");
    element_1_3_2_1.setAttribute("id", "record");
    element_1_3_2_2.setAttribute("id", "stop");
    element_1_3_2_3.setAttribute("id", "send");
    element_1_3_4.setAttribute("id", "player");
    element_1_3_4.setAttribute("controls", "");
    element_1_3_5_1.setAttribute("id", "green-mic");
    element_1_3_5_1.setAttribute("src", "/_secret-link/assets/green_mic.png");
    element_1_3_5_2.setAttribute("id", "red-mic");
    element_1_3_5_2.setAttribute("src", "/_secret-link/assets/red_mic.png");
    //Append Children
    // element.appendChild(element_1);
    // element_1.appendChild(element_1_1);
    // element_1.appendChild(element_1_2);
    element_1.appendChild(element_1_3);
    element_1_3.appendChild(element_1_3_1);
    element_1_3_1.appendChild(textNode_1_3_1_1);
    element_1_3.appendChild(element_1_3_2);
    element_1_3_2.appendChild(element_1_3_2_1);
    element_1_3_2_1.appendChild(textNode_1_3_2_1_1);
    element_1_3_2.appendChild(element_1_3_2_2);
    element_1_3_2_2.appendChild(textNode_1_3_2_2_1);
    element_1_3_2.appendChild(element_1_3_2_3);
    element_1_3_2_3.appendChild(textNode_1_3_2_3_1);
    element_1_3.appendChild(element_1_3_3);
    element_1_3.appendChild(element_1_3_4);
    element_1_3.appendChild(element_1_3_5);
    element_1_3_5.appendChild(element_1_3_5_1);
    element_1_3_5.appendChild(element_1_3_5_2);


    document.getElementById('contact-container').style.visibility = 'visible';




    const recordButton = document.getElementById('record');
    const stopButton = document.getElementById('stop');
    const player = document.getElementById('player');
    const send = document.getElementById('send');
    let mediaRecorder;
    let chunks = [];
    // console.log("Contact form")


    recordButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
    send.addEventListener('click', submitToAPI);
    document.getElementById("red-mic").classList.add("fade-in");

    function startRecording() {

      document.getElementById("red-mic").setAttribute('class', '')
      document.getElementById("red-mic").classList.add("fade-out");
      document.getElementById("green-mic").setAttribute('class', '')
      document.getElementById("green-mic").classList.add("pulse");


      // console.log("recording")
      navigator.mediaDevices.getUserMedia({ audio: true })

        .then(function (stream) {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          mediaRecorder.addEventListener('dataavailable', function (e) {
            chunks.push(e.data);
          });

          mediaRecorder.addEventListener('stop', async function () {
            const audioBlob = new Blob(chunks, { type: 'wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            player.src = audioUrl;

          });
        });
    }




    function stopRecording() {
      document.getElementById("red-mic").setAttribute('class', '')
      document.getElementById("green-mic").setAttribute('class', '')
      document.getElementById("red-mic").classList.add("fade-in");
      document.getElementById("green-mic").classList.add("fade-out");

      mediaRecorder.stop();
      chunks = [];
    }
    var audio;

    function submitToAPI(e) {
      e.preventDefault();

      var URL = "https://9n43zxwvtk.execute-api.us-east-1.amazonaws.com/sendAudioFunction";
      if (chunks.length > 0) {
        const audioBlob = new Blob(chunks, { type: 'wav' });

        var reader = new window.FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = function () {
          var base64 = reader.result;
          base64 = base64.split(',')[1];
          console.log(base64);
          audio = base64;

          $.ajax({
            type: "POST",
            url: URL,
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ audio }),

            success: function () {
              // clear form and show a success message
              alert("Successfull");
            },
            error: function () {
              // show an error message
              alert("UnSuccessfull");
            }
          });
        }

      } else {
        console.log('No audio to upload.');
      }
    }

  }

  function gui_set() {

    gui = new GUI({ width: 400 });

    const folder1 = gui.addFolder('Front Lights');
    const folder2 = gui.addFolder('Back Lights');
    const folder3 = gui.addFolder('All Lights');
    const folder4 = gui.addFolder('Ambient Light');
    const folder5 = gui.addFolder('Center Light');
    const folder6 = gui.addFolder('Camera');


    const settings = {
      color: frontLeftLight.color.getHex(),
      intensity: frontLeftLight.intensity,
      distance: frontLeftLight.distance,
      decay: frontLeftLight.decay,
      power: frontLeftLight.power,
      x: centerLight.position.x,
      y: centerLight.position.y,
      z: centerLight.position.z,
      rX: camera.rotation.x,
      rY: camera.rotation.y,
      rZ: camera.rotation.z,
    };

    folder1.addColor(settings, 'color').onChange(function (val) {
      frontLeftLight.color.setHex(val);
      frontRightLight.color.setHex(val);
    });

    folder1.add(settings, 'intensity', 0, 10).onChange(function (val) {
      frontLeftLight.intensity = val;
      frontRightLight.intensity = val;
    });

    folder1.add(settings, 'distance', 500, 1500).onChange(function (val) {
      frontLeftLight.distance = val;
      frontRightLight.distance = val;
    });

    folder1.add(settings, 'decay', 0, 4).onChange(function (val) {
      frontLeftLight.decay = val;
      frontRightLight.decay = val;
    });

    folder2.addColor(settings, 'color').onChange(function (val) {
      backLeftLight.color.setHex(val);
      backRightLight.color.setHex(val);
    });

    folder2.add(settings, 'intensity', 0, 10).onChange(function (val) {
      backLeftLight.intensity = val;
      backRightLight.intensity = val;
    });

    folder2.add(settings, 'distance', 500, 1500).onChange(function (val) {
      backLeftLight.distance = val;
      backRightLight.distance = val;
    });

    folder2.add(settings, 'decay', 0, 4).onChange(function (val) {
      backLeftLight.decay = val;
      backRightLight.decay = val;
    });

    folder3.addColor(settings, 'color').onChange(function (val) {
      frontLeftLight.color.setHex(val);
      frontRightLight.color.setHex(val);
      backLeftLight.color.setHex(val);
      backRightLight.color.setHex(val);
    });

    folder3.add(settings, 'intensity', 0, 10).onChange(function (val) {
      frontLeftLight.intensity = val;
      frontRightLight.intensity = val;
      backLeftLight.intensity = val;
      backRightLight.intensity = val;
    });

    folder3.add(settings, 'distance', 500, 1500).onChange(function (val) {
      frontLeftLight.distance = val;
      frontRightLight.distance = val;
      backLeftLight.distance = val;
      backRightLight.distance = val;
    });

    folder3.add(settings, 'decay', 0, 4).onChange(function (val) {
      frontLeftLight.decay = val;
      frontRightLight.decay = val;
      backLeftLight.decay = val;
      backRightLight.decay = val;
    });
    folder3.add(settings, 'power', 0, 10).onChange(function (val) {
      frontLeftLight.decay = val;
      frontRightLight.decay = val;
      backLeftLight.decay = val;
      backRightLight.decay = val;
    });

    folder4.addColor(settings, 'color').onChange(function (val) {
      ambientLight.color.setHex(val);
    });

    folder4.add(settings, 'intensity', 0, 3).onChange(function (val) {
      ambientLight.intensity = val;
    });

    folder5.addColor(settings, 'color').onChange(function (val) {
      centerLight.color.setHex(val);
    });

    folder5.add(settings, 'intensity', 0, 10).onChange(function (val) {
      centerLight.intensity = val;
    });

    folder5.add(settings, 'distance', 500, 1500).onChange(function (val) {
      centerLight.distance = val;
    });

    folder5.add(settings, 'decay', 0, 4).onChange(function (val) {
      centerLight.decay = val;
    });
    folder5.add(settings, 'x', -1000, 1000).onChange(function (val) {
      centerLight.position.x = val;
    });
    folder5.add(settings, 'y', -1000, 1000).onChange(function (val) {
      centerLight.position.y = val;
    });
    folder5.add(settings, 'z', -1000, 1000).onChange(function (val) {
      centerLight.position.z = val;
    });

    folder6.add(settings, 'rX', -3, 3).onChange(function (val) {
      guiObj.rotation.x = val;
    });
    folder6.add(settings, 'rY', -3, 3).onChange(function (val) {
      guiObj.rotation.y = val;

    });
    folder6.add(settings, 'rZ', -3, 3).onChange(function (val) {
      guiObj.rotation.z = val;

    });

    gui.close();

  }

  // when the mouse moves, call the given function

  // Window Resize Event
  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    WebGLrenderer.setSize(window.innerWidth, window.innerHeight);

  }
  window.ss = scene

  var fc = 0;
  // Animate Function
  function animate() {
    requestAnimationFrame(animate);

    if (view == 'dj') {
      // boom.rotation.y += 0.0025;
    }

    if (fc < 5) {
      if (INTERSECTED) {
        INTERSECTED.rotation.y += 0.02;
      }
      fc += 1;
    } else {
      fc = 0;
      raycaster.setFromCamera(mouse || { x: 0, y: 0 }, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 3) {
        intersects.forEach(function (a) {
          spinnables.forEach(function (e) {
            if (a.object.name == e.name) {
              INTERSECTED = a.object

              INTERSECTED.rotation.y += 0.02;
            }
          })
        })
      } else {
        if (INTERSECTED) {
          // console.log("Working")
          // new TWEEN.Tween(INTERSECTED.rotation )
          // .to({ x:0, y:-1, z: 0 }, 900)
          // .easing(TWEEN.Easing.Quadratic.Out)
          // .start()
          // // INTERSECTED.rotation.set(0,0,0)
          INTERSECTED = null;
        }
      }
    }
    var delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    TWEEN.update();
    render();
  }

  // Render Function
  function render() {

    // camera.position.x += ( mouseX - camera.position.x ) * .05;
    // camera.position.y += ( - mouseY - camera.position.y ) * .05;

    // // camera.lookAt( scene.position );

    // const time = performance.now() * 0.001; // Time
    CSS3Drenderer.render(scene, camera); // Render CSS Scene
    // WebGLrenderer.clear();
    WebGLrenderer.render(scene, camera); // Render WebGL Scene


  }
});

