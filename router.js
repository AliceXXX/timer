function route(handle, pathname, res, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, postData);
  } else {
    console.log("Throw request handler found for " + pathname);
    handle["/readstyle"](res,pathname);
  }
}

exports.route = route;
