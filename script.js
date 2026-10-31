import * as THREE from "three";

// 1. Three.js 3D animated background

const canvas = document.querySelector("#three-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 5;

let renderer;

try {
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
} catch (error) {
    console.warn("3D animation is unavailable:", error);
}

if (renderer) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Glowing 3D wireframe sphere
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);

    const material = new THREE.MeshBasicMaterial({
        color: 0x9b5cff,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(2.4, 0.2, -2);
    scene.add(sphere);

    // Particle field
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 12;
    }

    const particleGeometry = new THREE.BufferGeometry();

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xc4a3ff,
        size: 0.018,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(
        particleGeometry,
        particleMaterial
    );

    scene.add(particles);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("pointermove", (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.003;

        particles.rotation.y += 0.0004;

        sphere.position.x = 2.4 + mouseX;
        sphere.position.y = 0.2 - mouseY;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive 3D canvas
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}


// 2. Scroll reveal animation

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
});


// 3. Mobile navigation

const menuButton = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


// 4. Automatic copyright year

document.querySelector("#year").textContent =
    new Date().getFullYear();


// 5. Loading screen

window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector("#loader").classList.add("hidden");
    }, 700);
});