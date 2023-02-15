// Middleware for checking if a user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('public/authenticate');
    }
  };
  
  // Middleware for checking if a user has purchased a course
  const hasPurchased = (req, res, next) => {
    const courseId = req.params.id;
    const userId = req.session.user.id;
  
    // check if user has purchased course
    if (userHasPurchasedCourse(courseId, userId)) {
      next();
    } else {
      res.redirect('/course-not-purchased');
    }
  };
  
  // Routes accessible to all users
  app.get('/public', (req, res) => {
    res.render('home');
  });
  
  // Routes accessible to authenticated users
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
  });
  
  // Routes accessible to users who have purchased a course
  app.get('/course/:id', isLoggedIn, hasPurchased, (req, res) => {
    res.render('course');
  });
  
  // Routes accessible only to non-authenticated users
  app.get('/login', (req, res) => {
    res.render('login');
  });
  