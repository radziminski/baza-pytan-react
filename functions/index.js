const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    if (!context.auth || context.auth.token.admin !== true) {
        return {
            message: `Only admins can add other admins!`
        };
    }
    if (!data)
        return {
            messgae: 'Provide proper data!'
        };
    // get user and add custom claim
    return admin
        .auth()
        .getUserByEmail(data.email)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true,
                publisher: true
            });
        })
        .then(() => {
            return {
                message: `Success! ${data.email} has been made an admin`
            };
        })
        .catch(err => err);
});

exports.addPublisherRole = functions.https.onCall((data, context) => {
    if (!context.auth || context.auth.token.admin !== true) {
        return {
            message: `Only admins can add publishers!`
        };
    }
    if (!data)
        return {
            messgae: 'Provide proper data!'
        };
    // get user and add custom claim
    return admin
        .auth()
        .getUserByEmail(data.email)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                publisher: true
            });
        })
        .then(() => {
            return {
                message: `Success! ${data.email} has been made a publisher`
            };
        })
        .catch(err => err);
});

exports.removeAdminRole = functions.https.onCall((data, context) => {
    if (!context.auth || context.auth.token.admin !== true) {
        return {
            message: `Only admins can delete other admins!`
        };
    }
    if (!data)
        return {
            messgae: 'Provide proper data!'
        };
    // get user and add custom claim
    return admin
        .auth()
        .getUserByEmail(data.email)
        .then(user => {
            if (user.uid === '42OE4kEdAnZeD8bvlTwG1LMHJ613')
                throw new Error('You can not delete admin from that user');
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: false
            });
        })
        .then(() => {
            return {
                message: `Success! ${data.email} has been made NOT an admin`
            };
        })
        .catch(err => {
            return {
                message: `Error: ${err}`
            };
        });
});

exports.removePublisherRole = functions.https.onCall((data, context) => {
    if (!context.auth || context.auth.token.admin !== true) {
        return {
            message: `Only admins can delete publishers!`
        };
    }
    if (!data)
        return {
            messgae: 'Provide proper data!'
        };
    // get user and add custom claim
    return admin
        .auth()
        .getUserByEmail(data.email)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                publisher: false
            });
        })
        .then(() => {
            return {
                message: `Success! ${data.email} has been made NOT a publisher`
            };
        })
        .catch(err => {
            return {
                message: `Error: ${err}`
            };
        });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
