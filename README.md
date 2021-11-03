# glog-project
## install dependencies
check if you have those library otherwise install them:  
npm `npm --v`  
node `node --version`  

## setup the app
```
cd app
touch .env
echo "FILE_PATH='PATH_TO_PROJECT_DIRECTORY/glog-project/app/views/index.html'" >> .env
source .env
```  

## run the app
`cd app` (if needed)  
`npm run dev`  

## see the app
go on http://localhost:8000/ to see Deva's message  
go on http://localhost:8000/index to see a testing web page
