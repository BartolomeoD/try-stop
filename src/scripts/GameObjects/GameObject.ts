import MapCoordinates from "../Engine/MapCoordinates";

abstract class GameObject {
    coordinates: MapCoordinates;
    color: string;
    isImpenetrable: boolean;
}

export default GameObject;