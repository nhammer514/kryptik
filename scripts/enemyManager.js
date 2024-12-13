import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import * as level from './level.js';
import * as main from './main.js';
import * as player from './player.js';
import * as movement from './aStarAlg.js';


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

class enemyBase {
    constructor(_type, _position) {
        this.texture = new THREE.TextureLoader().load(_type.sprite);
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.NearestFilter;
        this.material = new THREE.MeshStandardMaterial({ map: this.texture, transparent: true });
        this.geometry = new THREE.PlaneGeometry(16, 16);
        this.object = new THREE.Mesh(this.geometry, this.material);
        this.levelPosition = _position;
        this.toPosition = new THREE.Vector3();
        this.path = []; // Store the path to the target

        this.destroy = function () {
            this.material.map.dispose();
            this.material.dispose();
            this.geometry.dispose();
            level.levelMatrix[this.levelPosition[0]][this.levelPosition[1]] = 0;
            main.scene.remove(this.object);
        };

        this.updatePosition = function (_newPosition) {
            level.levelMatrix[this.levelPosition[0]][this.levelPosition[1]] = 0;
            this.levelPosition[0] = _newPosition[0];
            this.levelPosition[1] = _newPosition[1];
            level.levelMatrix[_newPosition[0]][_newPosition[1]] = this;
            this.toPosition.x = this.levelPosition[0] * 16;
            this.toPosition.z = this.levelPosition[1] * 16;
        };

        this.findPath = function (targetPosition) {
            // Integrate A* or similar pathfinding algorithm here
            const start = { x: this.levelPosition[0], y: this.levelPosition[1] };
            const target = { x: targetPosition[0], y: targetPosition[1] };
            //const target = { x: player.playerPosition[0], y: player.playerPosition[1] };

            const path = movement.aStar(level.levelMatrix, start, target)

            this.path = path.map(node => [node.x, node.y]); // Convert to [x, y] format
        };

        this.followPath = function () {
            if (this.path.length > 0) {
                const nextStep = this.path.shift(); // Get the next position in the path
                this.updatePosition(nextStep); // Move to the next position
            }
        };

        this.animate = () => {
            this.object.lookAt(player.object.position);
            // Smooth movement
            this.object.position.x += (this.toPosition.x - this.object.position.x) / 10;
            this.object.position.z += (this.toPosition.z - this.object.position.z) / 10;

            // Follow the path if it exists
            if (this.path.length > 0 && Math.abs(this.object.position.x - this.toPosition.x) < 0.1 && Math.abs(this.object.position.z - this.toPosition.z) < 0.1) {
                this.followPath();
            };
        };
    }
}


function spawnEnemy(_scene, _type, _position)
{
    level.levelMatrix[_position[0]][_position[1]] = new enemyBase(_type, _position);
    
    let enemy = level.levelMatrix[_position[0]][_position[1]];
    enemy.object.position.setY(6);
    _scene.add(enemy.object)
    enemy.updatePosition(enemy.levelPosition)
};

export {spawnEnemy, enemyData}