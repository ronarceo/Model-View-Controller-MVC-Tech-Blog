const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
require('dotenv').config()
const bcrypt = require('bcrypt');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(
    connect.session.Store
  );