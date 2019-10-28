const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

const bot = {
  displayName: 'cleverbot',
  photoURL: 'https://i.pinimg.com/736x/f3/e0/df/f3e0df81ffe6933d4229872a978e5127.jpg',
  uid: 'cleverbot',
  status: {
    lastChanged: new Date(),
    state: 'online',
  },
  channels: { general: true },
};

db.collection(`users`)
  .doc(bot.uid)
  .set(bot, { merge: true });

module.exports = functions.firestore
  .document('channels/general/messages/{messageId}')
  .onCreate((doc, context) => {
    const message = doc.data();
    if (message.text.startsWith('@cleverbot')) {
      return db.collection('channels/general/messages').add({
        text: 'Hey, how are you?',
        user: db.collection('users').doc('cleverbot'),
        createdAt: new Date(),
      });
    }
  });
