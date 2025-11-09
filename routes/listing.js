const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ✅ INDEX and CREATE (chained route for "/")
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"), // ✅ This stays the same for new listing
    validateListing,
    wrapAsync(listingController.createListing)
  );

// ✅ NEW (form to create listing)
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ✅ SHOW, UPDATE, DELETE (chained route for "/:id")
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"), // ✅ FIXED HERE to match edit.ejs
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

// ✅ EDIT (form to edit listing)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
