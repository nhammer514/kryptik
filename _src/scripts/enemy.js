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
        this.type = _type;
        this.texture = new THREE.TextureLoader().load(this.type.sprite);
        this.material = new THREE.MeshStandardMaterial({map: this.texture, transparent: true});
        this.geometry = new THREE.PlaneGeometry(16,16);
        this.object = new THREE.Mesh(this.geometry, this.material);
        this.levelPosition = _position;
        this.destroy = function(){
            this.material.map.dispose();
            this.material.dispose();
            this.geometry.dispose();
            level.levelMatrix[this.levelPosition[0]][this.levelPosition[1]] = 0
            main.scene.remove(this.object);
        };
        this.animate = () => { this.object.lookAt(player.object.position) };
    }
};


function spawnEnemy(_scene, _type, _position)
{
    level.levelMatrix[_position[0]][_position[1]] = new enemyBase(_type, _position);
    
    let enemy = level.levelMatrix[_position[0]][_position[1]];

    enemy.object.position.setX(_position[0]*16)
    enemy.object.position.setZ(_position[1]*16)
    enemy.object.position.setY(6);
    _scene.add(enemy.object)
};

export {spawnEnemy, enemyData}