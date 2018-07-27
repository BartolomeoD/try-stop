import MapCoordinates from "../Engine/MapCoordinates";
import GameObject from "./GameObject";

class Box implements GameObject {
    public coordinates: MapCoordinates;
    public color: string = "black";

    constructor(coordinates: MapCoordinates) {
        this.coordinates = coordinates;
    }
}

export default Box;