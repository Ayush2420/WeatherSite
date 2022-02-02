//https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=770139eba389feee34b0a139981b5f4b
const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (realData, orgval) => {
    let Allvalue = realData.replace("{%tempval%}", orgval.main.temp);
    Allvalue = Allvalue.replace("{%tempmin%}", orgval.main.temp_min);
    Allvalue = Allvalue.replace("{%tempmax%}", orgval.main.temp_max);
    Allvalue = Allvalue.replace("{%country%}", orgval.sys.country);
    Allvalue = Allvalue.replace("{%location%}", orgval.name);
    Allvalue = Allvalue.replace("{%tempStatus%}", orgval.weather[0].main);
    return Allvalue;
}
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=metric&appid=770139eba389feee34b0a139981b5f4b'
        )
            .on('data', (chunk) => {
                const data = JSON.parse(chunk);
                const arraydata = [data];
               // console.log(arraydata[0].main.temp);
                // const realTimedata = arraydata.map((val) => {
                //    replaceVal(homeFile, val);
                //    // console.log(realTimedata);
                // })
                // console.log(realTimedata);
                // or one line
                const realTimedata = arraydata.map((val)=> replaceVal(homeFile, val)).join("");
                 res.write(realTimedata);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
                //console.log('end');
            });
    }
    else {
        res.end("<h1> File 404 NOT FOUND</h1>")
    }
});
server.listen(80, "127.0.0.1")