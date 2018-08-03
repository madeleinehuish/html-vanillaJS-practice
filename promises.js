// The promise constructor takes one argument, a callback with two parameters, resolve and reject.
// Do something within the callback, perhaps async, then call resolve if everything worked, otherwise call reject.
//
// Like throw in plain old JavaScript, it is customary, but not required, to reject with an Error object.
// The benefit of Error objects is they capture a stack trace, making debugging tools more helpful.

// let myPromise = new Promise((res, rej) => {
// 	if (/* everything turned out fine */) {
//     resolve("Stuff worked!");
//   }
//   else {
//     reject(Error("It broke"));
//   }
// })


// Here's how you use that promise:
// then() takes two arguments, a callback for a success case, and another for the failure case. Both are optional,
// so you can add a callback for the success or failure case only.

// promise.then(result => {
//   console.log(result); // "Stuff worked!"
// }, err => {
//   console.log(err); // Error: "It broke"
// });


function get(url) {
  // Return a new promise.
  return new Promise((resolve, reject) => {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

// get('story.json').then(response => {
get('https://jsonplaceholder.typicode.com/posts/1').then(response => {
  console.log("Success!", response);
}, error => {
  console.error("Failed!", error);
})
