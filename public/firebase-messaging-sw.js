importScripts("https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {})
    .catch(function (err) {});
}

var firebaseConfig = {
  apiKey: "AIzaSyAjp5juy-NRdKQRWD11hAw66zEPJuFYzeM",
  authDomain: "telecoms-uk.firebaseapp.com",
  projectId: "telecoms-uk",
  storageBucket: "telecoms-uk.appspot.com",
  messagingSenderId: "939279495954",
  appId: "1:939279495954:web:1c871d46b596d3fd47f9cb",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.messaging();
  //background notifications will be received here
  firebase.messaging().setBackgroundMessageHandler((payload) => {
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
