import * as webPush from "web-push";

export default class NotificationsService {

    public static sendNotifications(subscriptions: any) {
        return new Promise((resolve, reject) => {

            const notificationPayload = {
                notification: {
                    title: 'New Data',
                    body: 'Your application data has been updated.',
                    icon: 'assets/icons/icon-512x512.png',
                    vibrate: [100, 50, 100],
                     // data: ,
                    // actions: [{
                    //     action: 'explore',
                    //     title: 'Go to the site'
                    // }]
                },
            };

            const promises = [];

            subscriptions.forEach((subscription: any) => {
                promises.push(
                    webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            reject(error);
                        })
                )
            });
        })
    }
}
