// import Field from './Environment/Field';
// import Game from './Engine/Game';
// import MapCoordinates from "./Engine/MapCoordinates";
// import PathFinder from "./Engine/PathFinder";
// import StopWatch from "./Helpers/StopWatch";
// import Sleep from "./Helpers/Sleep";
//
//
// let size: number = 50;
//
// let field = new Field(size);
// field.randomize();
// let game = new Game(field);
// game.start();
//
// game.field.cells[0][0] = 0;
// game.field.cells[49][49] = 0;
//
// let pathFinder = new PathFinder(game.field, game);
// let stopWatch: StopWatch = new StopWatch();
// // Sleep.sleep(1000);
// stopWatch.Start();
// let path = pathFinder.findPath(new MapCoordinates(0, 0), new MapCoordinates(size - 1, size - 1));
// stopWatch.end();
// console.log("bench result: " + stopWatch.getResult());
//
// game.field.showNodes(pathFinder.getCheckedNodes());
// if (path != null) {
//     console.log("path length: " + path.length);
//     game.field.addPath(path);
// }
import BinaryTree from "./Engine/BinaryTree";
import Random from "./Helpers/Random";
class Test {
    constructor(asd) {
        this.value = asd;
        this.rValue = Random.next(0, 20);
    }
    set(number) {
        this.rValue = number;
    }
    toString() {
        return this.rValue.toString();
    }
}
let main1 = new Test(8);
main1.set(12);
let binaryTree = new BinaryTree(main1, (test) => {
    return test.value;
});
let willDelete1 = new Test(2);
willDelete1.set(1337);
let willDelete2 = new Test(4);
willDelete2.set(133);
binaryTree.add(willDelete2);
binaryTree.add(new Test(12));
binaryTree.add(new Test(2));
binaryTree.add(new Test(6));
binaryTree.add(new Test(10));
binaryTree.add(new Test(14));
binaryTree.add(new Test(2));
binaryTree.add(willDelete1);
binaryTree.add(new Test(2));
binaryTree.add(new Test(2));
binaryTree.add(new Test(6));
binaryTree.print();
binaryTree.removeNodeElement(main1);
binaryTree.print();
//# sourceMappingURL=EntryPoint.js.map