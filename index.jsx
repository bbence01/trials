<root>
  <node
    position={{ x: 0.0, y: 0.0, z: -0.0 }}
    orientation={{ w: 1.0, x: 0.0, y: 0.0, z: -0.0 }}
    scale={{ x: 1.0, y: 1.0, z: 1.0 }}>
    <mesh
      {...{ url: 'Ground.mesh' }}
      physical={{ raycast: true, shapes: [{'shape': 'mesh', 'mass': 1, 'offset': {'x': 0, 'y': 0, 'z': 0}, 'rotation': {'w': 1, 'x': 0, 'y': 0, 'z': 0}, 'mesh': 'Ground_phy.obj'}] }}>
    </mesh>
  </node>
  <node
    position={{ x: -1007.2928466796875, y: 425.5755310058594, z: -207.21066284179688 }}
    orientation={{ w: 0.9538615942001343, x: -0.1180105060338974, y: 0.03389810398221016, z: 0.27399373054504395 }}>
    <light
      {...{ lighttype: 'directional' }}
      direction={{ x: 0, y: -1, z: 0 }}
      diffuse={{ r: 0.20105594396591187, g: 0.20105594396591187, b: 0.20105594396591187 }}
      specular={{ r: 0.20105594396591187, g: 0.20105594396591187, b: 0.20105594396591187 }}>
    </light>
  </node>
  <node
    position={{ x: 679.5106201171875, y: 425.5755310058594, z: 865.2589721679688 }}
    orientation={{ w: 0.16052302718162537, x: 0.2443179041147232, y: 0.9408684372901917, z: 0.17119523882865906 }}>
    <light
      {...{ lighttype: 'directional' }}
      direction={{ x: 0, y: -1, z: 0 }}
      diffuse={{ r: 0.270795077085495, g: 0.270795077085495, b: 0.270795077085495 }}
      specular={{ r: 0.270795077085495, g: 0.270795077085495, b: 0.270795077085495 }}>
    </light>
  </node>
  <mesh
      {...{ url: 'VSword.mesh' }}
      physical={{ raycast: true, shapes: [{'shape': 'mesh', 'mass': 1, 'offset': {'x': 0, 'y': 0, 'z': 0}, 'rotation': {'w': 1, 'x': 0, 'y': 0, 'z': 0}, 'mesh': 'VSword_phy.obj'}] }}
     position={{ x: 36.87318420410156, y: 401.15313720703125, z: -253.83172607421875 }}
    orientation={{ w: 1.0, x: 0.0, y: 0.0, z: -0.0 }}
    scale={{ x: 1.0, y: 1.0, z: 1.0 }}
    id="weapon" >
    </mesh>
    <mesh
      {...{ url: 'Cylinder.mesh' }}
      physical={{ raycast: true, shapes: [{'shape': 'mesh', 'mass': 1, 'offset': {'x': 0, 'y': 0, 'z': 0}, 'rotation': {'w': 1, 'x': 0, 'y': 0, 'z': 0}, 'mesh': 'Cylinder_phy.obj'}] }}
    position={{ x: 266.4689636230469, y: 0.0, z: -1622.3243408203125 }}
    orientation={{ w: 1.0, x: 0.0, y: 0.0, z: -0.0 }}
    scale={{ x: 1.0, y: 1.0, z: 1.0 }}
    id="target">
    </mesh>
</root>
