#!/bin/bash

PRJ="$(cd `dirname $0`; pwd)"

npm install
cd ${PRJ}/public
bower install
cd ${PRJ}
npm start