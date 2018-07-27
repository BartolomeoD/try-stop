import MapCoordinates from "../Engine/MapCoordinates";

abstract class GameObject {
    coordinates: MapCoordinates;
    color: string;
}

export default GameObject;