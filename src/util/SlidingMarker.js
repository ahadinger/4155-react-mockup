export class SlidingMarker {

    constructor(data) {
        this.animationIterations = 0;
        this.maxFrames = 200;
        // eslint-disable-next-line no-undef
        this.marker = new google.maps.Marker(data)
        this.position = data.position;
        this.cancelled = {}
        this.animationIds = 0
        this.currentInterval = null
    }
    updateMarkerPosition(data) {
        this.animationIterations = 0;
        this.dLat = (data.position.lat-this.position.lat) / this.maxFrames;
        this.dLng = (data.position.lng-this.position.lng) / this.maxFrames;
        if (this.currentInterval) {
            clearInterval(this.currentInterval)
        }
        const move = ()=> {
            this.position.lat += this.dLat;
            this.position.lng += this.dLng;
            this.marker.setIcon(data.icon)
            this.marker.setPosition({ lat: this.position.lat, lng: this.position.lng })
            if (this.animationIterations != this.maxFrames) {
                this.animationIterations++;
                this.currentInterval = setTimeout(move, 10);
            } else {
                clearInterval(this.currentInterval)
                this.animationIterations = 0;

            }
        }
        move()
    }
}