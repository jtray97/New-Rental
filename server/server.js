// REQUIRE
const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
require('dotenv').config()
const massive = require('massive')
let ctrl = require('./server_controllers')
const axios = require('axios')
const profanity = require('profanity-middleware')
const curses = require('./curseWords')
const aws = require('aws-sdk')
const nodemailer = require ('nodemailer')

app.use(express.static(__dirname + '/../build'))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
// console.log(curses)
profanity.setOptions({
    mask:'*',
    blacklist:curses
})
app.use(profanity.init)

//DESTRUCTURING
let {
    SERVER_PORT,
    CONNECTION_STRING,
    S3_BUCKET,
} = process.env
//OTHER
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB connected')
}).catch(err => console.log(err))

aws.config.region = 'us-west-1'

// ENDPOINTS--ENDPOINTS--ENDPOINTS--ENDPOINTS--ENDPOINTS--ENDPOINTS--ENDPOINTS--

app.get('/api/units', ctrl.read)

app.get('/api/users', (req, res) => {

})
//AUTH 0 ENDPOINTS AND FUNCTIONS:
app.get('/callback', (req, res) => { //make sure TO CHECK THIS ONE HERE!=A-=F=-0DSHAKVJNOJN;LKVJA;SDLKAV;LSKDNC;LKSD;FLAKSD;FLKASJD;FALKASJ;DFLKJA;SDLK;ALKSJD;FLAKJS;DLKFJAS

    exchangeCodeForAccessToken()
        .then(exchangeAccessTokenForUserInfo)

        .catch(error => {
            console.log('Server error', error);
            res.status(500).send('An error occurred on the server. Check the terminal.');
        }
        );

    function exchangeCodeForAccessToken() {
        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.PROTOCALL}://${req.headers.host}/callback`
        };

        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    }

    async function exchangeAccessTokenForUserInfo(accessTokenResponse) {
        const accessToken = accessTokenResponse.data.access_token;
        await axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`)
            .then(result => {
                // console.log('user logged in')
                req.session.user = result.data
                // console.log(req.session.user)

            })


        const db = req.app.get('db')
        let temp = await db.checkUsers()
        var filtered = temp.filter((e) => { if (e.sub === req.session.user.sub) { return 'exists' } else { return null } })
        if (!filtered[0]) {
            // console.log('new user', filtered[0])
            db.addUser([req.session.user.name, req.session.user.email, req.session.user.picture, req.session.user.sub])
                .then(user => {
                    req.session.user = user
                })

        } else {
            // console.log('found matchin user: ', filtered[0])
            req.session.user = filtered[0]
        }

        // console.log(temp)

        res.redirect(`${process.env.FRONTEND_DOMAIN}/#/`)
    }
})
// S3 ENDPOINTS:
app.get('/sign-s3', (req, res) => { // MAKE SURE TO ASK ABOUT THIS BECAUSE THIS IS SUPER IMPORTANT THIS IS ONE OF THE ONLY ONES THAT DOESNT HAVE /API OR /AUTH
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

// NODEMAILER ENDPOINT:

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
app.get('/api/getOne/:id',(req, res)=>{
    unit_id = req.params.id
    const db = req.app.get('db')
db.emailInfo([unit_id]).then((response)=>{
    res.send(response[0])
    // console.log(response[0])
})}
)
app.post('/api/inquire', (req,res)=>{
    
let {body, subject, unit_id} = req.body
// console.log(body, subject, unit_id)
const db = req.app.get('db')
db.emailInfo([unit_id]).then((response)=>{
    console.log(response[0])
    let {email,name,unit_name, ppd} = response[0]
    console.log(email,name,unit_name,ppd)
    
    let HelperOptions = {
          from: '"Tyler" <tyler.ray.97@gmail.com>',
          to: email,
          subject: `Your listing got a message about: ${subject}`,
          text: `Dear ${name}, you have a message about your ${unit_name} listed for $${ppd}: ${body}`
};

  transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
      return console.log(error);
    }
    console.log("The message was sent!");
    console.log(info);
    res.sendStatus(200)
});
}).catch(err=>console.log(err))
  
})
//MY ENDPOINTS
app.get('/api/user-data', (req, res) => {
    // console.log(req.session)
    res.status(200).send(req.session.user)


})
app.get('/api/logout', (req, res) => {
    // res.redirect('http://localhost:3000/#/')
    console.log('user logged out')
    req.session.destroy()
    res.end();


})

app.put(`/api/update-unit/:unit_id`,(req, res)=>{
    const db = req.app.get('db')
    let {unit_id} = req.params
    let {unit_name, ppd, description, type, zip_code, img1, img2, img3, img4, subtype, contact_info, contact_info2} = req.body
    db.editUnit([
        unit_id, //1
        unit_name,  //2
        ppd, //3
        description, //4
        zip_code, //5
        type, //6
        img1, //7
        img2, //8
        img3, //9
        img4, //10
        subtype, // 11
        contact_info,
        contact_info2
    ])
    .then(()=>res.sendStatus(200))
})
//SET unit_name= $2, ppd=$3, description=$4, zip_code=$5, type=$6, img1=$7, img2=$8, img3=$9, img4=$10, type=$11

app.post('/api/newUnit', async (req, res) => {
    let {
        unit_name,
        ppd,
        description,
        type,
        zip_code,
        img1,
        img2,
        img3,
        img4,
        owner_id,
        subtype,
        contact_info,
        contact_info2
    } = req.body
    // console.log(req.body)
    const db = req.app.get('db')
    db.addUnit([type, unit_name, description, owner_id, ppd, zip_code, img1, img2, img3, img4, subtype, contact_info, contact_info2])
    // .then(()=>res.redirect('/profile'))
        .then(response => {
            res.send(response).status(200)
        })
    .catch(err => console.log(err))
})


app.get('/api/user_units/:id', async (req, res) => {
    // console.log(req.params)
    let num = Number(req.params.id)
    const db = await req.app.get('db')
    db.OwnerUnits([num]).then((response) => {
        // console.log(response)
        res.send(response).status(200)
    }
    ).catch(err => console.log(err))
})
app.delete('/api/deleteUnit/:unit_id', (req, res) => {
    // console.log(req.session.user)
    const db = req.app.get('db')
    db.deleteUnit([req.params.unit_id, req.session.user.id]).then((response) => {
        // console.log(response)
        // res.status(200).send(('Deleted',response))
        db.OwnerUnits([req.session.user.id]).then((result) => {
            // console.log(result)
            res.send((result)).status(200)
        })
    }).catch(err => console.log(err))
})

//LISTENING
app.listen(SERVER_PORT, () => { console.log(`$ ${SERVER_PORT} million dollars per day`) })