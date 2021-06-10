var vertexShader = `
				varying vec3 vPos;
				void main()	{
				vPos = position;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
				}
			`;
			var fragmentShader = `

				varying vec3 vPos;
				uniform vec3 size;
				uniform float thickness;
				uniform float smoothness;
			
				void main() {
						
				float a = smoothstep(thickness, thickness + smoothness, length(abs(vPos.xy) - size.xy));
				a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.yz) - size.yz));
				a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.xz) - size.xz));
				
				vec3 c = mix(vec3(1), vec3(0), a);
				
				gl_FragColor = vec4(c, 1.0);
				}
			`;
			const scene = new THREE.Scene();
			const camera =  new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
			camera.position.set(5, 8, 103);


			var renderer = new THREE.WebGLRenderer({
				antialias: true
			});

			
			var controls = new THREE.OrbitControls(camera, renderer.domElement);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setClearColor(0x404040);
			document.body.appendChild(renderer.domElement);


			var geometry = new THREE.BoxBufferGeometry( 5, 5, 5 );

			var geom = new THREE.BoxBufferGeometry( 4, 4, 4 );

			var material = new THREE.MeshBasicMaterial({ color: '#000000' });

			

			list_objects = []

			function animate_cube()
			{
				
				requestAnimationFrame(animate_cube);

				for (let item of list_objects)
				{

					item.rotation.x +=  0.01;
					item.rotation.y +=  0.01;
				}

				renderer.render( scene, camera );
			}
			
			
			let cube;
			const lmaterial = new THREE.LineBasicMaterial({
				color: 0x000000
			});



			


			let relx = -100;
			let rely = -100;

			for (let i = 0; i < adjmatrix.length; i++)
			{
				cube = new THREE.Mesh( geom, material );
				scene.add(cube);
				cube.position.x +=  4 * Math.random() * 60;
				cube.position.y +=  4 * Math.random() * 60;
				relx += 51.0;
				list_objects.push(cube);

			};
			
			for (let j = 0; j < adjmatrix.length; j++)
			{
				for (let k = 0; k < adjmatrix[j].length; k ++)
				{
					const points = [];
					if (adjmatrix[j][k] == 1)
					{
						points.push( new THREE.Vector3(list_objects[j].position.x, list_objects[j].position.y, list_objects[j].position.z) );
						points.push( new THREE.Vector3(list_objects[k].position.x, list_objects[k].position.y, list_objects[k].position.z) );
						const lgeometry = new THREE.BufferGeometry().setFromPoints( points );
						const line = new THREE.Line( lgeometry, lmaterial );
						scene.add( line );
					}
				}
				
			}

			
			animate_cube();

			var loader = new THREE.FontLoader();
			loader.load( 'https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
			geometryA = new THREE.TextGeometry( 'Breadth First Search', {
				font: font,
				size: 8,
				height: 8,
				width: 2
			} );
			 
			var material = new THREE.MeshBasicMaterial( { color: 0x990000 } );
			var textA = new THREE.Mesh( geometryA, material );
			var textABox = new THREE.Box3().setFromObject( textA );
			textA.position.set(1, 1, -15 );
			scene.add( textA );
			});
			
			
			var controls = new THREE.OrbitControls(camera, renderer.domElement);
			
			renderer.render( scene, camera );