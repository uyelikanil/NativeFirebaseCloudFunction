const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
initializeApp();

exports.contentusecase = onDocumentCreated(
    {
      region: "europe-west3",
      document: "/content/{documentId}",
    },
    (event) => {
      const snapshot = event.data;

      const data = snapshot.data();

      let newContent = data.content;
      // Trim spaces around and remove continuous spaces between words
      newContent = newContent.replace(/^\s+|\s+$/g, "");
      // Capitalize the first letter
      newContent = newContent.charAt(0).toUpperCase() + newContent.slice(1);

      return event.data.ref.set({content: newContent}, {merge: true});
    });

