const BusImage = new Image(20, 20);
BusImage.src = "/ic_bus_2019_white.png"
const CircleImage = new Image(60, 60)
CircleImage.src = "/circle_big_w_arrow_white.png"


export const getCorrectedBusStyle = (busLocation) => {
    const busCanvas = document.querySelector("#busCanvas")
    const rotCanvas = document.querySelector("#rotCanvas")

    const busCtx = busCanvas.getContext('2d')
    const rotCtx = rotCanvas.getContext('2d')
    busCtx.clearRect(0, 0, busCanvas.width, busCanvas.height);
    rotCtx.clearRect(0, 0, rotCanvas.width, rotCanvas.height);

    rotCtx.save()
    rotCtx.translate(rotCanvas.width / 2, rotCanvas.height / 2)

    const rotation = (busLocation.calculatedCourse - 180) * 2 * Math.PI / 365
    rotCtx.rotate(rotation)
    rotCtx.fillStyle = busLocation.color
    rotCtx.fillRect(-rotCanvas.width / 2, -rotCanvas.height / 2, rotCanvas.width, rotCanvas.height);
    rotCtx.globalCompositeOperation = "destination-atop";
    rotCtx.drawImage(CircleImage,-rotCanvas.width/2,-rotCanvas.height/2,rotCanvas.width,rotCanvas.height)
    rotCtx.globalCompositeOperation = "source-over";
    rotCtx.restore()
    busCtx.drawImage(rotCanvas, 0, 0)


    const r = busCanvas.width * (0.3 - (0 / 1000));
    const arcX = busCanvas.width / 2;
    const arcY = busCanvas.height / 2;
    busCtx.beginPath();
    busCtx.arc(arcX, arcY, r, 0, 2 * Math.PI, false);
    busCtx.fillStyle = 'white';
    busCtx.fill();




    rotCtx.clearRect(0, 0, rotCanvas.width, rotCanvas.height);
    rotCtx.fillStyle=busLocation.color
    rotCtx.fillRect(0, 0, rotCanvas.width, rotCanvas.height);
    rotCtx.globalCompositeOperation = "destination-atop";
    rotCtx.drawImage(BusImage, 0, 0, BusImage.width, BusImage.height);
    rotCtx.globalCompositeOperation = "source-over";
    busCtx.drawImage(rotCanvas, (busCanvas.width-BusImage.width)/2,(busCanvas.height-BusImage.height)/2)
    

    return { url: busCanvas.toDataURL('image/png'), width: busCanvas.width/2, height: busCanvas.height/2 }
    // console.log(rotCanvas)
}


export const getBusMarkerData = (locations) => {
    //todo: fetch from api, then update state somehow???????
  
    return Object.values(locations).map((bus) => {
      const busIcon = getCorrectedBusStyle(bus);
  
          return {
            id:bus.busId,
            zIndex:200,
            shape:{
              type: "rect",
              coords: [0, 0, 60, 60],
            },
            optimized: false,
            icon: {
              url: busIcon.url,
              size: { width: 60, height: 60 },
              scaledSize: { width: 60, height: 60 },
              anchor: { x: busIcon.width, y: busIcon.height }
  
            },
            anchorPoint: {
              lat: parseFloat(bus.latitude),
              lng: parseFloat(bus.longitude),
            },
            position: {
              lat: parseFloat(bus.latitude),
              lng: parseFloat(bus.longitude),
            },
          }
        });
  };
  