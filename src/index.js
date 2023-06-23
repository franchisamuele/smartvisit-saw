import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(serviceWorker => {
      console.log("Service Worker registered: ", serviceWorker);
    })
    .catch(error => {
      console.error("Error registering the Service Worker: ", error);
    })
}

Notification.requestPermission();

export async function sendNotification(message, description, image, location, navigate) {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        const notification = new Notification(message, {
          lang: "it",
          body: description,
          icon: "/images/manifest-icon-512.png",
          vibrate: [200, 100, 200],
          image
        });

        notification.onclick = () => navigate(location);
      }
    });
  } else {
    alert("This browser does not support notifications");
  }
}