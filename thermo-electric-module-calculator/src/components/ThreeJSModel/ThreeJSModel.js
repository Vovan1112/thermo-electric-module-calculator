import React, { useRef, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Box } from '@mui/material';
import { FormDataContext } from '../../context/FormDataContext';

const ThreeJSModel = () => {
  const sceneRef = useRef();
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  const { formDataContext } = useContext(FormDataContext);

  console.log(formDataContext);

  const {
    ceramicPlateThickness,  
    branchSize,
    branchHeight,
    branchSpacing,
    branchCount
  } = formDataContext;

  useEffect(() => { 
    const scene = new THREE.Scene();

    const group = new THREE.Group(); 
    scene.add(group);
    
    const pGeometry = new THREE.BoxGeometry(branchSize, branchHeight, branchSize);
    const pMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pMesh = new THREE.Mesh(pGeometry, pMaterial);
    pMesh.position.set(-branchSpacing, 0 , 0);
    group.add(pMesh); // Добавляем блок P в группу
    
    const nGeometry = new THREE.BoxGeometry(branchSize, branchHeight, branchSize);
    const nMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const nMesh = new THREE.Mesh(nGeometry, nMaterial);
    nMesh.position.set(branchSpacing, 0, 0);
    group.add(nMesh); // Добавляем блок N в группу

    console.log(parseInt(branchHeight) / parseInt(branchSize) - 0.1)
    
    const conductorGeometryUpper = new THREE.BoxGeometry(branchSize, ceramicPlateThickness, parseInt(branchSize) + parseInt(branchSpacing) * 3); // Геометрия для проводника
    const conductorMaterialUpper = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Материал для проводника
    const conductorMeshUpper = new THREE.Mesh(conductorGeometryUpper, conductorMaterialUpper); // Создание меша для проводника\
    conductorMeshUpper.rotateY(Math.PI / 2); // Поворот проводника вокруг оси X на 90 градусов
    conductorMeshUpper.position.set(0, 0.75, 0);
    group.add(conductorMeshUpper); // Прикрепляем проводник к блоку P

    const solderGeometryUpper = new THREE.BoxGeometry(branchSize, 0.1, parseInt(branchSize) + parseInt(branchSpacing) * 2); // Геометрия для спая
    const solderMaterialUpper = new THREE.MeshBasicMaterial({ color: 0xB87333 }); // Материал для спая
    const solderMeshUpper = new THREE.Mesh(solderGeometryUpper, solderMaterialUpper); // Создание меша для спая\
    solderMeshUpper.rotateY(Math.PI / 2); // Поворот спая вокруг оси X на 90 градусов
    solderMeshUpper.position.set(0, 0.55, 0);
    group.add(solderMeshUpper); // Прикрепляем спай к блоку P N

    const conductorGeometryBottom = new THREE.BoxGeometry(branchSize, ceramicPlateThickness, parseInt(branchSize) + parseInt(branchSpacing) * 3); // Геометрия для проводника
    const conductorMaterialBottom = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Материал для проводника
    const conductorMeshBottom = new THREE.Mesh(conductorGeometryBottom, conductorMaterialBottom); // Создание меша для проводника\
    conductorMeshBottom.rotateY(Math.PI / 2); // Поворот проводника вокруг оси X на 90 градусов
    conductorMeshBottom.position.set(0, -0.75, 0);
    group.add(conductorMeshBottom); // Прикрепляем проводник к блоку P

    const solderGeometryBottomPBlock = new THREE.BoxGeometry(branchSize, 0.1, branchSize * 1.5); // Геометрия для спая
    const solderMaterialBottomPBlock = new THREE.MeshBasicMaterial({ color: 0xB87333 }); // Материал для спая
    const solderMeshBottomPBlock = new THREE.Mesh(solderGeometryBottomPBlock, solderMaterialBottomPBlock); // Создание меша для спая\
    solderMeshBottomPBlock.rotateY(Math.PI / 2); // Поворот спая вокруг оси X на 90 градусов
    solderMeshBottomPBlock.position.set(-branchSpacing * 1.25, -0.55, 0);
    group.add(solderMeshBottomPBlock); // Прикрепляем спай к блоку P N

    const solderGeometryBottomNBlock = new THREE.BoxGeometry(branchSize, 0.1, branchSize * 1.5); // Геометрия для спая
    const solderMaterialBottomNBlock = new THREE.MeshBasicMaterial({ color: 0xB87333 }); // Материал для спая
    const solderMeshBottomPNlock = new THREE.Mesh(solderGeometryBottomNBlock, solderMaterialBottomNBlock); // Создание меша для спая\
    solderMeshBottomPNlock.rotateY(Math.PI / 2); // Поворот спая вокруг оси X на 90 градусов
    solderMeshBottomPNlock.position.set(branchSpacing * 1.25, -0.55, 0);
    group.add(solderMeshBottomPNlock); // Прикрепляем спай к блоку P N
    
    group.position.set(0, 0, 0);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      controls.dispose();
      scene.remove(pMesh);
      scene.remove(nMesh);
      scene.remove(conductorMeshUpper);
      scene.remove(conductorMeshBottom);
      scene.remove(solderMeshUpper);
      scene.remove(solderMeshBottomPBlock);
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, [ceramicPlateThickness, branchSize, branchHeight, branchSpacing]);

  return <Box ref={sceneRef} />;
};

export default ThreeJSModel;
