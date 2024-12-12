import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import * as level from './level.js';
import * as main from './main.js';
import * as player from './player.js';

class enemyType
{
    constructor(_name, _sprite){
        this.name = _name;
        this.sprite = _sprite
    }
};

const enemyData =
{
    rat : new enemyType("Rat", "images/rat.png")
};

class enemyBase
{
    constructor(_type, _position){
        this.texture = new THREE.TextureLoader().load(_type.sprite);
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.NearestFilter;
        this.material = new THREE.MeshStandardMaterial({map: this.texture, transparent: true});
        this.geometry = new THREE.PlaneGeometry(16,16);
        this.object = new THREE.Mesh(this.geometry, this.material);
        this.levelPosition = _position;
        this.toPosition = new THREE.Vector3();

        this.destroy = function(){
            this.material.map.dispose();
            this.material.dispose();
            this.geometry.dispose();
            level.levelMatrix[this.levelPosition[0]][this.levelPosition[1]] = 0
            main.scene.remove(this.object);
        };

        this.updatePosition = function(_newPosition){
            level.levelMatrix[this.levelPosition[0]][this.levelPosition[1]] = 0
            this.levelPosition[0] = _newPosition[0]
            this.levelPosition[1] = _newPosition[1]
            level.levelMatrix[_newPosition[0]][_newPosition[1]] = this;
            this.toPosition.x = this.levelPosition[0]*16
            this.toPosition.z = this.levelPosition[1]*16
        }

        this.animate = () => { 
            this.object.lookAt(player.object.position)
            this.object.position.x += (this.toPosition.x - this.object.position.x) / 10;
            this.object.position.z += (this.toPosition.z - this.object.position.z) / 10;
        };
    }
};


function spawnEnemy(_scene, _type, _position)
{
    level.levelMatrix[_position[0]][_position[1]] = new enemyBase(_type, _position);
    
    let enemy = level.levelMatrix[_position[0]][_position[1]];
    enemy.object.position.setY(6);
    _scene.add(enemy.object)
    enemy.updatePosition(enemy.levelPosition)
};

export {spawnEnemy, enemyData}