const Listing = require("../models/listing");

// All Listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  return res.render("listings/index", { allListings });
};

// Render New Form
module.exports.renderNewForm = (req, res) => {
  return res.render("listings/new");
};

// Create Listing
module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id;

  if (req.file) {
    listing.image = { url: req.file.path, filename: req.file.filename };
  }

  await listing.save();

  req.flash("success", "New listing created");
  return res.redirect("/listings");
};

// Show Listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  return res.render("listings/show", { listing });
};

// Edit Form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");

  return res.render("listings/edit", { listing, originalImageUrl });
};

// Update Listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  req.flash("success", "Listing updated successfully");
  return res.redirect(`/listings/${id}`);
};

// Delete Listing
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing deleted successfully");
  return res.redirect("/listings");
};

// username test update
