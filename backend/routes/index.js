// backend/routes/index.js
const express = require('express');
const router = express.Router();


//TEST ROUTE
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });


//In this route, you are setting a cookie on the response with the name of 
//XSRF-TOKEN to the value of the req.csrfToken method's return. Then, send 
//the token as the response for easy retrieval.
//This route should not be available in production, but it will not be 
//exclusive to the production application until you implement the frontend 
//of the application later.
router.get("/api/csrf/restore", (req, res)=> {
  const csrfToken = req.csrfToken()
  res.cookie("XSRF-TOKEN", csrfToken)
  res.status(200).json({
    'XSRF-TOKEN': csrfToken
  })
})

const apiRouter = require('./api');
router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

   // Serve the static assets in the frontend's build folder
   router.use(express.static(path.resolve("../frontend/build")));

   // Serve the frontend's index.html file at all other routes NOT starting with /api
   router.get(/^(?!\/?api).*/, (req, res) => {
     res.cookie('XSRF-TOKEN', req.csrfToken());
     return res.sendFile(
       path.resolve(__dirname, '../../frontend', 'build', 'index.html')
     );
   });
 }

 // Add a XSRF-TOKEN cookie in development
 if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

module.exports = router;
