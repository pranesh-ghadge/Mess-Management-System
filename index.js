var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();


const Notice = require('./models/notice');
const Complaints = require('./models/complaint');
const User = require('./models/user');
const Menu = require('./models/menu');
const methodOverride = require('method-override');

const MONGO_URL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/Mess";
mongoose.connect(MONGO_URL);
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("connection succeeded");
});


//Middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({ secret: 'notagoodsecret' }))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}


//Routes
app.get('/', async (req,res) => {
    res.redirect('/home');
});

app.get("/home", async (req,res) => {
    var dt = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    var d,k;

    var dy = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    if(dt.getDay() === 1){d = "Monday";}
    else if(dt.getDay() === 2){d = "Tuesday";}
    else if(dt.getDay() === 3){d = "Wednesday";}
    else if(dt.getDay() === 4){d = "Thursday";}
    else if(dt.getDay() === 5){d = "Friday";}
    else if(dt.getDay() === 6){d = "Saturday";}
    else if(dt.getDay() === 7){d = "Sunday";}

    if(dt.getHours() > 21 | dt.getHours() <= 8){k = "Breakfast";}
    else if(dt.getHours() > 8 & dt.getHours() <= 14){k = "Lunch";}
    else if(dt.getHours() > 14 & dt.getHours() <= 18){k = "Snacks";}
    else if(dt.getHours() > 18 & dt.getHours() <= 21){k = "Dinner";}
    const notice = await Notice.find({});

    if(dt.getHours() > 21 | dt.getHours() < 0){
        d = dy[dt.getDay()%7];
    }

    const menu = await Menu.find({day:d, mealType:k});
    res.render('pages/home',{
        noticeList: notice,
        menuList: menu
    });
})

app.get('/mess-committee', (req,res) => {
    res.render('pages/mess-committee');
});

app.get('/faq', (req,res) => {
    res.render('pages/faq');
})

app.get('/menu', (req,res) => {
    res.render('pages/menu');
})

app.get('/complaint', (req,res) => {
    res.redirect('/complaint/new');
})

app.post('/complaint', async (req,res) => {
    const newComplaint_Object = new Complaints(req.body);
    await newComplaint_Object.save();
    // res.send("bye");
    res.redirect(`/complaint/${newComplaint_Object.Enrollment_Number}`);
})

app.get('/complaint/new', (req,res) => {
    res.render('pages/new_complaint');
})


app.post('/complaint/track', async (req,res) => {
    const { Enrollment_Number} = req.body;
    res.redirect(`/complaint/${Enrollment_Number}`);
} )

app.get('/complaint/track', (req,res) => {
    res.render('pages/track');
})

app.get('/complaint/:id', async (req,res) => {
    const {id} = req.params;
    const complaints = await Complaints.find({Enrollment_Number: id})
    res.render('complaint/show', { complaints, id });
})




app.get('/admin',requireLogin, async (req,res) => {
    res.render('pages/admin');
});

app.get('/admin/notice/', async function(req, res) {
    

    const allNotice = await Notice.find({});
    res.render('notices/show',{
        noticeList: allNotice
    });
});

app.get('/admin/notice/new', (req,res) => {
    res.render('notices/new');
})

app.post('/admin/notice', (req,res) => {
    var heading = req.body.heading;
    var text = req.body.text;
    var date = new Date();

    var data = {
        "heading": heading,
        "text": text,
        "date": date
    }
    db.collection('notices').insertOne(data, function(err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });
    res.redirect('/admin/notice');
}) 

app.delete('/admin/notice/:id/delete', async (req,res) => {
    const {id} = req.params;
    const deletedNotice = await Notice.findByIdAndDelete(id);
    res.redirect("/admin/notice");
})

app.get('/admin/menu', async function(req, res) {

    const menu = await Menu.find({});
    const notice = await Notice.find({});
    res.render('menu/show',{
        menuList: menu,
        noticeList: notice
    });
});

app.put('/admin/menu/:id', async (req,res) => {
    const { id } = req.params;
    const updatedMenu = await Menu.findByIdAndUpdate(id, req.body, {runValidators: true, new:true});
    res.redirect('/admin/menu');
});

app.get('/admin/menu/:id/edit', async (req,res) => {
    const {id} = req.params;
    const menu = await Menu.findById(id);
    res.render('menu/edit', {menu});
});

app.get('/admin/complaint', async (req,res) => {
    const {category} = req.query;
    if (category) {
        const complaints = await Complaints.find({category});
        res.render('complaint/index', { complaints, category });
    } else {
        const complaints = await Complaints.find({});
        res.render('complaint/index', { complaints, category: "All" });
    }
})

app.get('/admin/complaint/:id/edit', async (req,res) => {
    const {id} = req.params;
    const complaint = await Complaints.findById(id);
    const status = ['Pending', 'Accepted', 'Rejected'];
    // Product.find({}).then(data => {
    //     data.map( p => {
    //         categories.push(p.category);
    //     })
    // })
    res.render('complaint/edit', {complaint, status});
}) 

app.put('/admin/complaint/:id/', async (req,res) => {
    const { id } = req.params;
    const updatedcomplaint = await Complaints.findByIdAndUpdate(id, req.body, {runValidators: true, new:true});
    res.redirect(`/admin/complaint/`);
})

app.delete('/admin/complaint/:id/', async (req,res) => {
    const {id} = req.params;
    const deletedComplaint = await Complaints.findByIdAndDelete(id);
    res.redirect("/admin/complaint");
})

app.get('/register', (req, res) => {
    res.render('pages/register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/admin')
})

app.get('/login', (req, res) => {
    res.render('pages/login')
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/admin');
    }
    else {
        res.redirect('/login');
    }
})

const port = process.env.PORT || 3000;

app.listen(port , function() {
    console.log(`server listening at port ${port} `);
});
