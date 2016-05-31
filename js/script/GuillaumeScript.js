var GuillaumeScript = {

	init : function( tw )
	{
        var size = 10;
        var step = 1;

        var gridHelper = new THREE.GridHelper( size, step );
        tw.scenes.main.add( gridHelper );
                
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.tw = tw;
        
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 5
        });
        
        // 100 = nombre max de points
        for (i = 0; i < 100; i++){
            geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        }
        
        this.line = new THREE.Line(geometry, material);
        // pourquoi ?
        this.line.geometry.dynamic = true;

        tw.scenes.main.add(this.line);  
        
        var geometryPlane = new THREE.PlaneGeometry( 20, 20, 32 );
        var materialPlane = new THREE.MeshBasicMaterial( {color: 0x777777, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometryPlane, materialPlane );
        //plane.rotation.x = 2;
        plane.rotation.x = Math.PI / 2;
        plane.position.y = - 0.1;
        this.plane = plane;   
        tw.scenes.main.add( plane );
        
        tw.container[0].addEventListener( 'mousedown', GuillaumeScript.onMouseDown, false );
        
        this.points = [];
        
       /* this.curves = [[new THREE.Vector3(-10, 0, -10), ], 
                       [], 
                       [], 
                       []
                      ];*/
        
        var geometryRepere = new THREE.BoxGeometry( 4, 0.2, 0.2 );
        var materialRed = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        var materialGreen = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var materialBlue = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
        
        var cubeX = new THREE.Mesh( geometryRepere, materialRed );
        cubeX.position.x = 2;
        tw.scenes.main.add( cubeX );
               
        var cubeZ = new THREE.Mesh( geometryRepere, materialGreen );
        cubeZ.position.z = 2;
        cubeZ.rotation.y = 90 * Math.PI / 180;
        tw.scenes.main.add( cubeZ );
                
        var cubeY = new THREE.Mesh( geometryRepere, materialBlue );
        cubeY.position.y = 2;
        cubeY.rotation.z = 90 * Math.PI / 180;
        tw.scenes.main.add( cubeY );
    },

	update : function ( tw , deltaTime )
	{

    },
    
    inputs : {
		'p' : function (me, tw)
		{
			this.points = [];
            console.log(this);
		}
	},
    
    onMouseDown : function(event) 
    {
    	// calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        
        GuillaumeScript.mouse.x = ( event.layerX / GuillaumeScript.tw.size.width ) * 2 - 1;
        GuillaumeScript.mouse.y = - ( event.layerY / GuillaumeScript.tw.size.height ) * 2 + 1;	
        
        // update the picking ray with the camera and mouse position	
        GuillaumeScript.raycaster.setFromCamera( GuillaumeScript.mouse, GuillaumeScript.tw.cameras.main );	

        // calculate objects intersecting the picking ray
        var intersects = GuillaumeScript.raycaster.intersectObjects( GuillaumeScript.tw.scenes.main.children );

        for ( var i = 0; i < intersects.length; i++ ) {
            if(intersects[ i ].object == GuillaumeScript.plane) {
                //console.log(intersects[ i ]);
                
                //this.GuillaumeScript.line.geometry.vertices.push(new THREE.Vector3(intersects[ i ].point.x, intersects[ i ].point.y, intersects[ i ].point.z));
                
                GuillaumeScript.line.geometry.vertices.push(GuillaumeScript.line.geometry.vertices.shift()); //shift the array
                GuillaumeScript.line.geometry.vertices[100 - 1] = new THREE.Vector3(intersects[ i ].point.x, 0, intersects[ i ].point.z); //add the point to the end of the array
                GuillaumeScript.line.geometry.verticesNeedUpdate = true;

                /*
                var geometry = new THREE.BoxGeometry(1,1,1);
                var material = new THREE.MeshBasicMaterial({color:0x00ff20});
                var cube = new THREE.Mesh(geometry,material);
                cube.position.x = intersects[ i ].point.x;
                cube.position.y = intersects[ i ].point.y;
                cube.position.z = intersects[ i ].point.z;
                this.GuillaumeScript.tw.scenes.main.add(cube); 
                */
                
                GuillaumeScript.points.push(new THREE.Vector3(intersects[ i ].point.x, 0, intersects[ i ].point.z));
                console.log(GuillaumeScript.points);
                
                break;
            }
        }
    }
}

console.log(window);
//window.addEventListener( 'mousedown', GuillaumeScript.onMouseDown, false );