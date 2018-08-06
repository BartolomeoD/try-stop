import MapCoordinates from "../Engine/MapCoordinates";
import GameObject from "./GameObject";

class Box implements GameObject {
    public coordinates: MapCoordinates;
    public color: string = "black";
    public isImpenetrable: boolean = false;

    constructor(coordinates: MapCoordinates) {
        this.coordinates = coordinates;
    }
}

export default Box;