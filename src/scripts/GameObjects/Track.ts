import GameObject from "./GameObject";
import MapCoordinates from "../Engine/MapCoordinates";

class Track implements GameObject{
    public coordinates: MapCoordinates;
    public color: string = "blueviolet";

    constructor(coords: MapCoordinates) {
        this.coordinates = coords;
    }
}

export default Track;