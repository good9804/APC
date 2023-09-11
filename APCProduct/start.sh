#!/bin/bash

cd front
npm i
npm run build
cd ..
cd back
npm install date-fns
npm i
npm start