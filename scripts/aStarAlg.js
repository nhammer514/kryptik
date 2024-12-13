import * as player from './player.js';

class Node {
    constructor(x, y, g, h, parent = null) {
        this.x = x; // X-coordinate
        this.y = y; // Y-coordinate
        this.g = g; // Cost from the start
        this.h = h; // Heuristic (estimated cost to target)
        this.f = g + h; // Total cost
        this.parent = parent; // Previous node in path
    }
}

function aStar(grid, start, target) {
    const openList = [];
    const closedList = [];
    const directions = [
        [0, 1],  [1, 0], [0, -1], [-1, 0], // Cardinal directions
    ];

    function heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan Distance
    }

    openList.push(new Node(start.x, start.y, 0, heuristic(start, target)));

    while (openList.length > 0) {
        // Sort by `f` and take the lowest
        openList.sort((a, b) => a.f - b.f);
        const currentNode = openList.shift();
        closedList.push(currentNode);

        const isAdjacentToTarget = Math.abs(currentNode.x - target.x) + Math.abs(currentNode.y - target.y) === 1;

        // Check if target is reached
        if (currentNode.x === target.x && currentNode.y === target.y || isAdjacentToTarget) {
            const path = [];
            let current = currentNode;
            while (current) {
                path.push({ x: current.x, y: current.y });
                current = current.parent;
            }
            return path.reverse(); // Reverse to get start-to-target path
        }

        // Process neighbors
        for (const [dx, dy] of directions) {
            const nx = currentNode.x + dx;
            const ny = currentNode.y + dy;

            // Check if within bounds and walkable
            if (
                nx >= 0 && ny >= 0 &&
                nx < grid.length && ny < grid[0].length &&
                (grid[nx][ny] == 0) &&
                !closedList.some(node => node.x === nx && node.y === ny)
            ) {
                const g = currentNode.g + 1; // Cost of moving to this neighbor
                const h = heuristic({ x: nx, y: ny }, target);
                const neighbor = new Node(nx, ny, g, h, currentNode);

                // Check if already in openList
                const openNode = openList.find(node => node.x === nx && node.y === ny);
                if (!openNode || neighbor.f < openNode.f) {
                    openList.push(neighbor);
                }
            }
        }
    }

    return []; // No path found
}

export { aStar }
