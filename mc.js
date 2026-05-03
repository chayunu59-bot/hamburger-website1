
// 1. 라이브러리 가져오기 (importmap에서 정의한 별칭 사용)
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// 2. 씬 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f); // 배경색을 어둡게 설정

// 3. 카메라 생성
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 8; //카메라의 수직 위치
camera.position.z = 20; // 모델이 크므로 카메라를 조금 더 뒤로 뺌

// 4. 렌더러 생성
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// HTML의 #container에 연결 (없으면 body에 추가)
const container = document.getElementById('container');
if (container) {
    container.appendChild(renderer.domElement);
} else {
    document.body.appendChild(renderer.domElement);
}

// 5. 조명 추가 (오타 수정 완료: ambientLight)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // 주변광을 밝게
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 방향 조명
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 6. GLTFLoader로 모델 로드
const loader = new GLTFLoader();
let model; 

loader.load(
    './mc11.glb', 
    (gltf) => {
        console.log('모델 로드 성공!', gltf);
        model = gltf.scene;
        model.position.set(0, 0, 0); 
        model.scale.set(5, 5, 5); // 5배 확대
        scene.add(model); 
    },
    undefined,
    (error) => {
        console.error('모델 로딩 중 에러 발생:', error);
    }
);

// 7. 윈도우 크기 조정 이벤트
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 8. 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);

    // 모델이 로드된 경우 회전
    if (model) {
        model.rotation.y += 0.01; // 자연스럽게 좌우로 회전
    }

    renderer.render(scene, camera);
}
animate();