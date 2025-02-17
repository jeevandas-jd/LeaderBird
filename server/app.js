require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet=require('helmet')
const cors=require('cors')

const cookieParser=require("cookie-parser")
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(morgan('dev'));
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({ origin: '*' }));
// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const authRouter = require('./routes/authRouter');
app.use('/api/auth',authRouter);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

//mongopass PLLb9nwh4hhRTwtK

//mongodb+srv://jeevandasms2004:<db_password>@cluster0.xk5ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
