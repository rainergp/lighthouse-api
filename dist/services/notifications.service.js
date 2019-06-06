"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webPush = require("web-push");
var NotificationsService = /** @class */ (function () {
    function NotificationsService() {
    }
    NotificationsService.sendNotifications = function (subscriptions) {
        return new Promise(function (resolve, reject) {
            var notificationPayload = {
                notification: {
                    title: 'New Data',
                    body: 'Your application data has been updated.',
                    icon: 'assets/icons/icon-512x512.png',
                },
            };
            var promises = [];
            subscriptions.forEach(function (subscription) {
                promises.push(webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
                    .then(function (result) {
                    resolve(result);
                })
                    .catch(function (error) {
                    reject(error);
                }));
            });
        });
    };
    return NotificationsService;
}());
exports.default = NotificationsService;
//# sourceMappingURL=notifications.service.js.map