import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeJSModel = () => {
  const sceneRef = useRef();
  const renderer = new THREE.WebGLRenderer( { antialias: true } );

  useEffect(() => {
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);
    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );;

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 1;

    function animation( time ) {

        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;
    
        renderer.render( scene, camera );
    
    }
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( animation );
        document.body.appendChild( renderer.domElement );

  }, []);

  return <div ref={sceneRef} />;
};

export default ThreeJSModel;
