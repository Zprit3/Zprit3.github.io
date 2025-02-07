document.addEventListener('DOMContentLoaded', () => {
    const canvasContainer = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    renderer.setClearColor(0x0a0a0a); // Color de fondo

    canvasContainer.appendChild(renderer.domElement);

    // Geometrías de las figuras
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1, 10, 10, 10), // Cubo
        new THREE.TetrahedronGeometry(1), // Tetraedro
        new THREE.CylinderGeometry(0.5, 0.5, 1, 3), // Pirámide triangular
        new THREE.OctahedronGeometry(1), // Octaedro
        new THREE.DodecahedronGeometry(1), // Dodecaedro
        new THREE.IcosahedronGeometry(1), // Icosaedro
        new THREE.TorusGeometry(0.75, 0.25, 8, 16), // Toroide
        new THREE.ConeGeometry( 0.5, 1, 32 ), //Cono
        new THREE.SphereGeometry( 0.5, 32, 32 ) //Esfera
    ];

    let currentGeometry = geometries[0];
    let nextGeometry = geometries[1];
    let progress = 0;

    const material = new THREE.MeshBasicMaterial({
        color: 0xff0077, // Color del alambre
        wireframe: true, // Modo alambre
        opacity: 0.4, // Opacidad del alambre
        transparent: true, // Habilitar transparencia  
        wireframeLinewidth: 3,      
    });
    const mesh = new THREE.Mesh(currentGeometry, material);
    scene.add(mesh);

    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);

        progress += 0.005; // Velocidad de transición

        if (progress > 1) {
            progress = 0;
            currentGeometry = nextGeometry;
            nextGeometry = geometries[Math.floor(Math.random() * geometries.length)];

            const newGeometry = currentGeometry;

            // Actualizar la malla con la nueva geometría
            mesh.geometry.dispose(); // Limpiar la geometría anterior
            mesh.geometry = newGeometry;
        }

        // Interpolación de vértices
        const currentVertices = currentGeometry.attributes.position.array;
        const nextVertices = nextGeometry.attributes.position.array;
        const interpolatedVertices = mesh.geometry.attributes.position.array;

        for (let i = 0; i < currentVertices.length; i++) {
            interpolatedVertices[i] = THREE.MathUtils.lerp(
                currentVertices[i],
                nextVertices[i],
                progress
            );
        }

        mesh.geometry.attributes.position.needsUpdate = true;

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    });
});

