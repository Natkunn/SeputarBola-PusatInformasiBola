let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOeeSKoGLjmMvXVLrs3kNO9VossgDXhuXRJ_7ozT2XGpv1qWZ_IwqUFqlqsM3HKCibnSkLgXvElh6I_S4GoXPlE",
    "privateKey": "-qm7QYz2TuLQ5CCQ8p0YXmBSxdh1wZkwrEfLoF85UH4"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dW_5DiyzKG4:APA91bHF5a4Hm79hA9-gq6oLr84GTpPE5xN-7Gxtfc_PEq-Xg6JJUDityRbF8tcEWTECQqHdHsx_34z2Ignpo25nSOMVtHGWSaaxVyke6HaGD-vnPBK63e_34ljA7vtZJKAVagbLx7bm",
    "keys": {
        "p256dh": "BFQufpmFBiSWlujRRlEp6MKaShaqG50fiSuYpQc6dyIE5deFOFsEdk3I+hK+0vWkg4tHL6sPgIoAoSqMR3Wy6Ek=",
        "auth": "aj/qXoOMzcmjHScM/Pe7cQ=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '81448864963',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);