const path = require("path");
const express = require("express");
const hbs = require("hbs");
const axios = require("axios");
const app = express();
const port = 5000;

const staticfile = path.join(__dirname, "../public");
app.use(express.static(staticfile));
app.set("view engine", "hbs");

const viewspath = path.join(__dirname, "../template");
app.set("views", viewspath)
// regester partial template to render it 
const partialPath = path.join(__dirname, "../template/partials");
hbs.registerPartials(partialPath);

app.get('/', (req, res) => {
    axios.get("http://localhost:5000/weather")
        .then(function (response) {
            // handle success
            console.log(response.data);
            res.render("index")
        });
});
app.get("/testing", (req, res) => {
//  console.log(req.params,);
 
 if(req.query.search){
  axios.get(`https://jsonplaceholder.typicode.com/todos/${req.query.search}`).then((data)=>{
       res.send(data.data)
     });
 }else{
    res.send({})
 }

})
app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "contact us page", people: [
            "Yehuda Katz",
            "Alan Johnson",
            "Charles Jolley"
        ]
    })
})

app.get("/about", (req, res) => {
    res.render("about", { title: "about us" })
})
app.get("/weather", (req, res) => {
    const data = [
        {
            name: "azher",
            language: "javascript"
        },
    ]
    res.send(data)
})

app.get("/about/*", (req, res) => {
    res.render("404", { title: "no data found in after the url of the about" })
})
app.get("*", (req, res) => {
    res.render("404", { title: "page  is not found in the server" })
})
app.listen(port, () => {
    console.log(`app is listing on the port ${port}`)
})
