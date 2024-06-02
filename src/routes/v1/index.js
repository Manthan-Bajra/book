const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const headerRoute = require('./header.route');
const bookRoute = require('./book.route');
const chapterRoute = require('./chapter.route');
const sthanRoute = require('./sthan.route');
const shlokRoute = require('./shlok.route');
const pageRoute = require('./page.route');
const planRoute = require('./plan.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/header',
    route: headerRoute,
  },
  
  {
    path: '/book',
    route: bookRoute,
  },
  
  {
    path: '/chapter',
    route: chapterRoute,
  },
  {
    path: '/sthan',
    route: sthanRoute,
  },
  {
    path: '/shlok',
    route: shlokRoute,
  },
  {
    path: '/page',
    route: pageRoute,
  },
  {
    path: '/plan',
    route: planRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
