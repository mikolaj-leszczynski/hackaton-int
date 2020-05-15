import { Component, VERSION, OnInit } from '@angular/core';
import * as BABYLON from 'babylonjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    var canvas = document.getElementById('renderCanvas');
    // Load the 3D engine
    var engine = new BABYLON.Engine(canvas as any, true, {preserveDrawingBuffer: true, stencil: true});
    // CreateScene function that creates and return the scene
    // var createScene = function(){
    //     // Create a basic BJS Scene object
    //     var scene = new BABYLON.Scene(engine);
    //     scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.01);

    //     // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    //     var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    //     // Target the camera to scene origin
    //     camera.setTarget(BABYLON.Vector3.Zero());
    //     // Attach the camera to the canvas
    //     camera.attachControl(canvas, false);
    //     // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    //     var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    //     // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    //     var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
    //     // Move the sphere upward 1/2 of its height
    //     sphere.position.y = 1;
    //     // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    //     var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
    //     // Return the created scene
    //     return scene;
    // }

    var delayCreateScene = function () {
    // Create a scene.
    var scene = new BABYLON.Scene(engine);
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    // Target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attach the camera to the canvas
    camera.attachControl(canvas, false);
    // Create a default skybox with an environment.
    // var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
    // var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

    // Append glTF model to scene.
    BABYLON.SceneLoader.Append("/scenes/", "scene.gltf", scene, function (scene) {
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        // scene.activeCamera.alpha += Math.PI;
    });

    return scene;
};
    // call the createScene function
    var scene = delayCreateScene();
    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
  }
}
