import Field from './Environment/Field';
import Game from './Engine/Game';
import MapCoordinates from "./Engine/MapCoordinates";
import PathFinder from "./Engine/PathFinder";
import StopWatch from "./Helpers/StopWatch";
let size = 50;
let field = new Field(size);
field.randomize();
let game = new Game(field);
game.start();
game.field.cells[0][0] = 0;
game.field.cells[49][49] = 0;
let pathFinder = new PathFinder(game.field, game);
let stopWatch = new StopWatch();
stopWatch.Start();
let path = pathFinder.findPath(new MapCoordinates(0, 0), new MapCoordinates(size - 1, size - 1));
stopWatch.end();
console.log("bench result: " + stopWatch.getResult());
console.log("path length: " + path.length);
// console.log(pathFinder.getCheckedNodes());
game.field.showNodes(pathFinder.getCheckedNodes());
game.field.addPath(path);
// import BinaryTree from "./Engine/BinaryTree";
// class Test {
//     public value: number;
//     public constructor(asd:number) {
//         this.value = asd;
//     }
// }
// let binaryTree = new BinaryTree(new Test(8));
// binaryTree.setComparableValue((test) => {return test.value;});
// binaryTree.add(new Test(4));
// binaryTree.add(new Test(12));
// binaryTree.add(new Test(2));
// binaryTree.add(new Test(6));
// binaryTree.add(new Test(10));
// binaryTree.add(new Test(14));
//
// binaryTree.print();
//# sourceMappingURL=EntryPoint.js.map