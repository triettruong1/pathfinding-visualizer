import { Node } from '../Components/Board';

/*
1. Add Start Node
2. Add all unvisited neighbors to queue
3. Visit neighbors - newNode
4. Check all unvisited neighbors of newNode  
5. Repeat
*/
interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
}

class Queue<T> implements IQueue<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) { }

    enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }
    dequeue(): T | undefined {
        return this.storage.shift();
    }
    size(): number {
        return this.storage.length;
    }
}

export function BFS(grid: Node[][], startNode: Node, endNode: Node) {
    const nodeQueue = new Queue<Node>();
}