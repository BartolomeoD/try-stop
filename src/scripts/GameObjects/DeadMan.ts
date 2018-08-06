import MapCoordinates from "../Engine/MapCoordinates";
import GameObject from "./GameObject";

class DeadMan implements GameObject {
    color: string = "blueviolet";
    coordinates: MapCoordinates;
    public isImpenetrable: boolean = false;

    constructor(coords: MapCoordinates) {
        this.coordinates = coords;
    }
}

export default DeadMan;