export const getBusLocations = async () =>{
    const res = await fetch("https://passio3.com/www/mapGetData.php?getBuses=1&deviceId=3367966&wTransloc=1", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "body": "json=%7B%22s0%22%3A%221053%22%2C%22sA%22%3A1%2C%22rA%22%3A1%2C%22r0%22%3A%223201%22%7D",
        "method": "POST",
        "mode": "cors",
      });
      return (await res.json()).buses
}