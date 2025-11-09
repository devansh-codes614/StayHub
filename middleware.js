const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");

// -----------------------------------------------
// SAVE REDIRECT URL (Login ke baad redirect ke liye)
// -----------------------------------------------
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session && req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

// -----------------------------------------------
// CHECK USER LOGGED IN (Passport)
// -----------------------------------------------
module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  req.flash("error", "You must be signed in first!");
  return res.redirect("/login");
};

// -----------------------------------------------
// CHECK LISTING OWNER
// -----------------------------------------------
module.exports.isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "You do not have permission!");
      return res.redirect(`/listings/${id}`);
    }

    next();
  } catch (err) {
    next(err);
  }
};

// -----------------------------------------------
// VALIDATE LISTING (CREATE + UPDATE)
// -----------------------------------------------
module.exports.validateListing = (req, res, next) => {
  const { listing } = req.body;

  if (!listing || !listing.title || !listing.price || !listing.location) {
    req.flash("error", "Invalid listing data!");
    if (req.method === "PUT") {
      return res.redirect(`/listings/${req.params.id}/edit`);
    } else {
      return res.redirect("/listings/new");
    }
  }

  next();
};

// -----------------------------------------------
// VALIDATE REVIEW
// -----------------------------------------------
module.exports.validateReview = (req, res, next) => {
  const { review } = req.body;

  if (!review || !review.rating || !review.comment) {
    req.flash("error", "Invalid review!");
    return res.redirect("back");
  }

  next();
};

// -----------------------------------------------
// CHECK REVIEW AUTHOR
// -----------------------------------------------
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not authorized to delete this review!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
