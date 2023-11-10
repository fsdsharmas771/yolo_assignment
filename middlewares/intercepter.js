export const interceptor = (req, res, next) => {
  //we can do anything we want to do in request before going to controller action here I simply console the request method and request url this can be user for debuging purpose and also for montitoring purpose
  console.log(`Incoming Request - Method: ${req.method}, Path: ${req.path}`);
  next();
};
