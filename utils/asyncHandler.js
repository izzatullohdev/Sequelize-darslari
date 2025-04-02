const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = asyncHandler;

// hasan  
// olimjonga 

// olimjon hozir sen bilna mashina olgani boramiz agar afto salon ochiq bo'lsa senga mashina olib beraman aksi bo'lsa yo'q olib bermayman

// true  
// false 