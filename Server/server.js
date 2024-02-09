const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const JWT_SECRET = process.env.JWT_SECRET;
require('./config/passport-setup'); // Ensures Passport is configured
const nodefetch = require('node-fetch');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

dotenv.config();
// Set up middleware for parsing JSON and handling file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [process.env.COOKIE_KEY],
  })
);

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

//authenticate with Google
const {
  authenticateToken,
  isAdmin,
  generateToken,
  isLoggedIn,
} = require('./middleware/authMiddleware');

//Models
const CollectedItem = require('./models/CollectedItem');
const FoundItem = require('./models/FoundItem');
const LostItem = require('./models/LostItem');
const User = require('./models/User');

//Routes
const userRoute = require('./routes/userRoutes');
const foundItemRoute = require('./routes/foundRoutes');
const lostItemRoute = require('./routes/lostRoutes');
const collectedItemRoute = require('./routes/collectedRoutes');
const adminFoundRoute = require('./routes/adminFoundRoutes');
const adminLostRoute = require('./routes/adminLostRoutes');
const adminCollectedRoute = require('./routes/adminCollectedRoutes');

//Set up MongoDB connection
const MONGODB_URI =
  'mongodb+srv://manasramesh24:xf3Yq8PfBJr3BG8b@trinityretrieve.tnckcq7.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up multer storage configuration for found items
const foundItemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './foundItemImages');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  },
});

// // Set up multer storage configuration for lost items
// const lostItemStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './lostItemImages');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const extname = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + extname);
//   },
// });

// Set up multer upload configuration for found items
const foundItemUpload = multer({ storage: foundItemStorage });

// // Set up multer upload configuration for lost items
// const lostItemUpload = multer({ storage: lostItemStorage });

//GoogleAuth20
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if the user already exists in the database
//         const existingUser = await User.findOne({ googleId: profile.id });

//         if (existingUser) {
//           // User already exists, return the user
//           return done(null, existingUser);
//         }

//         // User doesn't exist, create a new user
//         const newUser = new User.create({
//           googleId: profile.id,
//           displayName: profile.displayName,
//           email: profile.emails[0].value,
//           // Add any other fields you want to save
//         });

//         //  Save the new user to the database
//         //await newUser.save();

//         // Return the new user
//         return done(null, newUser);
//       } catch (error) {
//         // Handle error
//         console.error('Error saving user data:', error);
//         return done(error, null);
//       }
//     }
//   )
// );

// Set up express session
app.use(
  session({
    secret: process.env.SECRET_KEY, // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  })
);

//basic route
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'You are not logged in' });
});

//verify if the token is a
// async function verify(client_id, token) {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: client_id, // Specify the CLIENT_ID of the app that accesses the backend
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub']; // User's Google ID
//   // You can also access basic profile information from the payload
//   return { userid, name: payload['name'], email: payload['email'] };
// }

//google authenticated routes
// Route to handle login
// app.post('/auth/google', async (req, res) => {
//   try {
//     const { token } = req.body;
//     console.log(req.body);
//     const client_id = process.env.GOOGLE_CLIENT_ID;
//     const { googleId, name, email } = await verify(client_id, token);

//     // Check if the user exists in your database
//     let user = await User.findByGoogleId(googleId);

//     // If the user doesn't exist, create a new one
//     if (!user) {
//       user = await User.create({ googleId, name, email });
//     }
//     console.log(user);
//     // Now that you have a user, generate a JWT for them
//     const jwtToken = generateToken({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//     });
//     res.json({ jwtToken });
//   } catch (error) {
//     console.error('Error verifying Google token: ', error);
//     res.status(401).json({ error: 'Failed to authenticate with Google' });
//   }
// });

//Exchanging the Authorization Code for Tokens
app.post('/auth/google', (req, res) => {
  const { code } = req.body;
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;
  const redirect_uri = 'http://localhost:3010/google/callback';
  const grant_type = 'authorization_code';
  console.log(
    new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type,
    })
  );
  fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type,
    }),
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((tokens) => {
      // Send the tokens back to the frontend, or store them securely and create a session
      console.log(tokens);
      res.json(tokens);
    })
    .catch((error) => {
      // Handle errors in the token exchange
      console.error('Token exchange error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  // const data = new URLSearchParams({
  //   code,
  //   client_id,
  //   client_secret,
  //   redirect_uri,
  //   grant_type,
  // });
  // console.log(data);

  // axios
  //   .post('https://oauth2.googleapis.com/token', data, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
});

app.get('/failed', (req, res) => {
  res.send('Failed');
});
app.get('/success', isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.email}`);
});

app.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
);

app.get(
  '/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect with token.
    res.redirect(`/profile?token=${req.authInfo.token}`);
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout(); // Passport provides this method to log out the user
  res.redirect('/');
  // const authToken = req.headers.authorization.split(' ')[1]; // Assuming "Bearer TOKEN"
  // Verify the token and extract its payload (omitted for brevity)
  // Invalidate the token, for example, by adding its signature or jti to a blacklist
  // res.status(200).send({ message: 'Token invalidated' });
});

// Protected route example: User profile
app.get('/profile', (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  } else {
    res.send(`Welcome, ${req.user.displayName}!`);
  }
});

//
app.use('/feedback', require('./routes/feedback'));
app.use('/found', authenticateToken, foundItemRoute);
app.use('/lost', authenticateToken, lostItemRoute);
app.use('/collected', authenticateToken, collectedItemRoute);
app.use('/admin/users', authenticateToken, isAdmin, userRoute);
app.use('/admin/found-items', authenticateToken, isAdmin, adminFoundRoute);
app.use('/admin/lost-items', authenticateToken, isAdmin, adminLostRoute);
app.use(
  '/admin/collected-items',
  authenticateToken,
  isAdmin,
  adminCollectedRoute
);

// for fetching the images
app.use(
  '/foundItemImages',
  express.static(path.join(__dirname, 'foundItemImages'))
);
app.use(
  '/lostItemImages',
  express.static(path.join(__dirname, 'lostItemImages'))
);

// Error handling middleware for unrecognized routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Start the server
const port = process.env.PORT || 3010; // Choose the desired port for your server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Admin routes
// app.get('/admin/dashboard', isAuthenticated, isAdmin, (req, res) => {
//   // Admin dashboard code here
//   res.send('Welcome to the Admin Dashboard');
// });

//Adminroutes to create
// app.post('/api/admin/create', isAuthenticated, isAdmin, (req, res) => {
//   // Admin-only create operation
// });

//protected routes
// app.get('/protected', checkAuthenticated, (req, res) => {
//   res.json({ message: 'This is a protected route' });
// });

// // Define the route to handle found item form submission with image upload
// app.post(
//   '/found/submitFoundItem',
//  authenticateToken,
//   foundItemUpload.single('itemImage'),
//   async (req, res) => {
//     console.log('req=', req.body);
//     try {
//       let reqitemImage = null;

//       if (req.file) {
//         reqitemImage = req.file.filename;
//       }

//       const newFoundItem = {
//         description: req.bodydescription,
//         date: req.body.date,
//         category: req.body.category,
//         subcategory: req.body.subcategory,
//         itemName: req.body.itemName,
//         place: req.body.place,
//         ownerName: req.body.ownerName,
//         details: req.body.details,
//         isIdentifiable: req.body.isIdentifiable,
//         itemImage: reqitemImage,
//       };
//       const foundItem = await FoundItem.create(newFoundItem);

//       return res.sendStatus(200);
//     } catch (error) {
//       console.error('Error submitting found item form:', error);
//       res.sendStatus(500).send({ messsage: error.messsage });
//     }
//   }
// );

// Define the route to handle lost item form submission with image upload
// app.post(
//   '/lost/submitLostItem',
//   authenticateToken,
//   lostItemUpload.single('itemImage'),
//   async (req, res) => {
//     try {
//       let reqitemImage = null;

//       if (req.file) {
//         reqitemImage = req.file.filename;
//       }

//       const newLostItem = {
//         description: req.body.description,
//         date: req.body.date,
//         phone: req.body.phone,
//         name: req.body.name,
//         sapId: req.body.sapId,
//         category: req.body.category,
//         subcategory: req.body.subcategory,
//         itemName: req.body.itemName,
//         itemImage: reqitemImage,
//         place: req.body.place,
//       };
//       const lostItem = await LostItem.create(newLostItem);
//       res.sendStatus(200);
//     } catch (error) {
//       console.error('Error submitting lost item form:', error);
//       res.sendStatus(500).send({ message: error.message });
//     }
//   }
// );

// // fetch all found items
// app.get('/found/getFoundItems', isAuthenticated, async (req, res) => {
//   try {
//     let items = await FoundItem.find();
//     res.json(items);
//   } catch (error) {
//     console.log('error', error);
//   }
// });

// // fetch lost items
// app.get('/api/getLostItems', isAuthenticated, async (req, res) => {
//   try {
//     let items = await LostItem.find();
//     res.json(items);
//   } catch (error) {
//     console.log('error', error);
//   }
// });

// //claiming id(cannot do a  post ,has to be a  get request if you are using id)
// app.get('/api/claimItem/:id', isAuthenticated, async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     const item = await FoundItem.findById(itemId);

//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }
//     return res.status(200).json(item);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// app.post(
//   '/collected/collectedItem',
//   authenticateToken,
//   foundItemUpload.single('itemImage'),
//   async (req, res) => {
//     console.log('req=', req.body);
//     try {
//       if (req.file) {
//         const reqitemImage = req.file.filename;
//       }

//       const userCollectedItem = {
//         description: req.body.description,
//         date: req.body.date,
//         category: req.body.category,
//         subcategory: req.body.subcategory,
//         itemName: req.body.itemName,
//         place: req.body.place,
//         ownerName: req.body.ownerName,
//         details: req.body.details,
//         isIdentifiable: req.body.isIdentifiable,
//         itemImage: req.body.itemImage,
//         details: req.body.details,
//         name: req.body.name,
//         email: req.body.email,
//         sapId: req.body.sapId,
//         branch: req.body.branch,
//         year: req.body.year,
//         contactNumber: req.body.contactNumber,
//       };
//       const receivedItem = await CollectedItem.create(userCollectedItem);

//       return res.sendStatus(200);
//     } catch (error) {
//       console.error('Error submitting found item form:', error);
//       res.sendStatus(500);
//     }
//   }
// );

// //delete
// app.delete('/api/delete/:id', isAuthenticated, async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     const item = await FoundItem.findByIdAndDelete(itemId);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     return res.status(200);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500);
//   }
// });

// app.delete('/api/deleteLost/:id', isAuthenticated, async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     const item = await LostItem.findByIdAndDelete(itemId);
//     if (!item) {
//       return res.status(404).json({ message: 'Item not found' });
//     }

//     return res.status(200);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500);
//   }
// });
