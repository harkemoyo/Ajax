"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// Ajax loading XML

// const getCountryDataAndNeibour = function (country) {

//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   // Country 1 load request
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//       // Country 1
//     requestData(data);

//     // Get neighbors countries
//     const [neighbour] = data.borders;

//     // Guard for neighbors
//     if (!neighbour) return

//     // Call neighbor load request

//     const request2 = new XMLHttpRequest()
//     request2.open('GET',`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     request2.send()
//     request2.addEventListener('load', function(){

//       const [data2] = JSON.parse(this.responseText)
//       console.log(data2);

//       requestData(data2, 'neighbour')
//     })

//   });
// };

// // getCountryData('portugal');
// // getCountryData('usa');
// getCountryDataAndNeibour('germany');

// Creat countries function data

const requestData = function (data, className = "") {
  // console.log(className);
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
      <p class="country__row"><span>💰</span>${data.currencies.EUR}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// Error handling function

const requestError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};

// Encapsulation of Helper function promises

const getJson = function (url, errorMsg = "Something went wrong") {
  console.log(url, errorMsg);
  return fetch(url).then((response) => {
    // console.log(response);
    // creating our own Error object if data doesn't exist
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

// // Promises and Fetch API

// // const request2 = fetch (`https://restcountries.com/v3.1/name/${country}`)
// const getCountry = function (country) {
//   getJson(`https://restcountries.com/v3.1/name/${country}`,'Country not found')

//   // OLD VERSION
//   //  fetch (`https://restcountries.com/v3.1/name/${country}`)

// //    .then( (response) => {

// //     console.log(response);
// // // creating our own Error object if data doesn't exist
// //     if(!response.ok)
// //     throw new Error(`Country not found(${response.status})`)
// //    return response.json()
// //   })

//    .then(data =>{
//     // console.log(data);
//     requestData(data[0]);

//   //  Neighbour countries
//   const neighbour = data[0].borders[0]
//   //  console.log(neighbour);
//    if(!neighbour) throw new Error(`Neighbour not found`)
//   //  nested fetch
//   return getJson(`https://restcountries.com/v3.1/alpha/${neighbour}`,'Country not found')
//    })
//    // Fulfilled value of fetch neighbours

//     //  fulfilled value of fetch neighbours is the data from the body
//   .then(data => requestData(data[0], 'neighbour'))
//   .then((response) =>response.json())
//   .catch(err => {
//          requestError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//         })
//         .finally(() => {
//                 countriesContainer.style.opacity = 1;
//               });

// }
// btn.addEventListener('click',function() {
//   getCountry('portugal');
// })

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, long) {
//   // console.log(long);
//   fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//   .then( (response) =>{
//     if(!response.ok)
//     throw new Error(`Place not fount ${response.status}`)
//    return response.json()
//    })
//    .then(data => {
//     console.log(data);
//     console.log(`You are in ${data.city}, ${data.country}`);

//     return fetch(`https://restcountries.com/v3.1/name/${data.country}`);

//   })
//   .then((response) =>{
//     if(!response.ok)
//     throw new Error(`Place not fount ${response.status}`)
//     return response.json()})
//   .then(data => requestData(data[0]))
//   .catch ( error => {
//     requestError(`Something went wrong 💥💥 ${error.message} Try again!`);
//   } )
// }
// // whereAmI(0,0)
// whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)

// The Event Loop in Practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');

// // Building a Simple Promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// Promisifying the Geolocation API

// const getLocation = function (){
//   return new Promise((resolve, reject) =>
//   navigator.geolocation.getCurrentPosition(resolve, reject)
//   )
// }
// // getLocation().then(x => console.log(x));

// const whereAmIt = function (lat, long) {
//   // console.log(long);
//   getLocation().then(resp =>{
//    const {lat , long} = resp.coords
//   });
//   return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//   .then( (response) =>{
//     if(!response.ok)
//     throw new Error(`Place not fount ${response.status}`)
//    return response.json()
//    })
//    .then(data => {
//     console.log(data);
//     console.log(`You are in ${data.city}, ${data.country}`);

//     return fetch(`https://restcountries.com/v3.1/name/${data.country}`);

//   })
//   .then((response) =>{
//     if(!response.ok)
//     throw new Error(`Place not fount ${response.status}`)
//     return response.json()})
//   .then(data => requestData(data[0]))
//   .catch ( error => {
//     requestError(`Something went wrong 💥💥 ${error.message} Try again!`);
//   } )
// }
// btn.addEventListener('click',whereAmIt)
// whereAmI(0,0)
// whereAmIt(52.508, 13.381)

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// // wait function
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath){
 return new Promise((resolve, reject) =>{
  const img = document.createElement('img')
  img.src = imgPath
  img.addEventListener('load', function(){
    imgContainer.append(img)
    resolve(img)
  })
  img.addEventListener('error', function(){
    reject(new Error(`Image not found`))
  })
 })
}


// // Variables for displaying  images
// let currentImg

// createImage('img-1.jpg').then(img => {
// currentImg = img
// console.log(`Image loaded successfully`);
// return wait(2)
// })
// .then(() => {
//   currentImg.style.display = 'none'
//   return createImage('img-2.jpg')
// })
//  .then(img => {
//     currentImg = img
//     console.log(`Image loaded successfully`);
//     return wait(3)
//   })
//   .then(() => {
//     currentImg.style.display = 'none'
//     return createImage('img-3.jpg')
//   })
//   .then(img => {
//     currentImg = img
//     console.log('Image loaded successfully');
//     return wait(4)
//   })
//   .then(() => {
//     currentImg.style.display = 'none'
//   })
// .catch(err => console.error(err))

// Async await
// const getLocation = function () {
//   return new Promise((resolve, reject) =>
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   );
// };
// const whereAmI = async function () {
//   //  Location Where you are
//   try {
//     const pos = await getLocation();

//     const { latitude: lat, longitude: long } = pos.coords;
//     // console.log(lat, long);
//     // Reverse geocoding API
//     const resp = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);

//     //  Create new Error Manually
//     if (!resp.ok) throw new Error(`Problem with geocoding ❤️‍🔥`);
//     const result = await resp.json();
//     // console.log("result", result);

//     //Country Data

//     const countryData = await fetch(
//       `https://restcountries.com/v3.1/name/${result.country}`
//     );
//     if (!countryData.ok) throw new Error(`Problem with country data  ❤️‍🔥`);
//     const country = await countryData.json();
//     // console.log("country", country);
//     requestData(country[0]);

//     // Return values from data in async function
//     return `I am in ${result.region} at ${result.staddress}`;
//   } catch (err) {
//     console.log(err);
//     requestError(`👹 ${err.message}`);

//     // Rethrowing the Error for return values catch the error
//     throw err;
//   }
// };
// console.log(`I am in Hark `);
// whereAmI()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(`${err.message} 👹`))
//   .finally(() => console.log(`See you tomorrow`));

// Using IIFE to get the return values in async await format

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (error) {
//     console.log(`👹${error.message} @`);
//   }
//   console.log(`Finshed last`);
// })();

// Running Promises in parallel

// const getCapitals = async function (c1, c2, c3) {
//   try {

//     // Finding the capital city of multiple countries without loading each country 1 by 1

//     //  const [data] =  await getJson(`https://restcountries.com/v3.1/name/${c1}`)
//     //  const [data1] =  await getJson(`https://restcountries.com/v3.1/name/${c2}`)
//     //  const [data2] =  await getJson(`https://restcountries.com/v3.1/name/${c3}`)
//     //  console.log(data,data1, data2,);
//     const data = await Promise.all([
//       getJson(`https://restcountries.com/v3.1/name/${c1}`),
//       getJson(`https://restcountries.com/v3.1/name/${c2}`),
//       getJson(`https://restcountries.com/v3.1/name/${c3}`)
//     ]);
//     console.log(data.map(captl => captl[0].capital[0]));
//   } catch (error) {
//     console.log(`ERROR: ${error.message}`);
//   }
// };
// getCapitals("Uganda", "kenya", "Tanzania");


// Promise . race method
// (async function () {
//   const data = await Promise.race([
//     getJson(`https://restcountries.com/v3.1/name/kenya`),
//     getJson(`https://restcountries.com/v3.1/name/tanzania`),
//     getJson(`https://restcountries.com/v3.1/name/uganda`),
//   ]);
//   console.log(data[0]);
// })();

// const timeout = function (sec) {
//  return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error(`Request timeout long`));
//     }, sec * 1000);
//   });
// };


// Promise.race([
//   getJson(`https://restcountries.com/v3.1/name/turkey`),
//   timeout(9)
// ])
//   .then((res) => console.log(res[0]))
//   .catch((err) => console.error(`Request timeout 👹 ${err.message}`));

  // Promise.allSettled([
  //   getJson(`https://restcountries.com/v3.1/name/kenya`),
  //   getJson(`https://restcountries.com/v3.1/name/tanzania`),
  //   getJson(`https://restcountries.com/v3.1/name/uganda`),
  // ]).then((res) => console.log(res));
  // Promise.all([
  //   getJson(`https://restcountries.com/v3.1/name/kenya`),
  //   getJson(`https://restcountries.com/v3.1/name/tanzania`),
  //   getJson(`https://restcountries.com/v3.1/name/uganda`),
  // ]).then((res) => console.log(res));

  // Promise.any([
 
  //     getJson(`https://restcountries.com/v3.1/name/kenya`),
  //     getJson(`https://restcountries.com/v3.1/name/tanzania`),
  //     getJson(`https://restcountries.com/v3.1/name/uganda`),
  //   ]).then((res) => console.log(res[0]));
 

  // Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const loadNPause = async function (){
  try {
    let img = await createImage('img-1.jpg')
    console.log('Image loaded')

    await wait(2)
 img.style.display = 'none'

// Image loading
 img = await createImage('img-2.jpg')
console.log('Image loaded')
await wait(3)

img.style.display = 'none'
    
  } catch (error) {
    console.error(error)
  }
}
// loadNPause()


const loadAll = async function(imgArr){
  try {
    const data = imgArr.map(async res => await createImage(res))
    // console.log(data);

    const imgEl = await Promise.all(data)
    // console.log(imgEl);
    imgEl.forEach(img => img.classList.add('parallel'))

  } catch (error) {
    
  }
  
}
loadAll(['img-1.jpg','img-2.jpg','img-3.jpg'])



