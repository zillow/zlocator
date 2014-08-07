"use strict";

global.sinon = require("sinon");
global.chai = require("chai");
// global.should = global.chai.should();
global.expect = global.chai.expect;

var sinonChai = require("sinon-chai");
global.chai.use(sinonChai);
