/**
 * Created by i.sungurov on 10.10.13.
 */
personalPanel.service('settings', function (localStorageService) {

    "use strict";

    var
        DEFAULT_LOGIN = "admin",
        DEFAULT_PASSWORD = "1",

        prefix = "panel.",

        settings = {
            wampServerUrl: {
                value: "",
                defaultValue: "ws://localhost:81"
            },
            clientId: {
                value: "",
                defaultValue: "android1"
            },
            refreshTimeOut: {
                value: null,
                defaultValue: 10
            },
            showAdvertisement: {
                value: null,
                defaultValue: false
            }
        },

        setDefaults = function () {
            _.each(settings, function (obj, key) {
                settings[key].value = settings[key].defaultValue;
            });
        },

        loadFromStorage = function () {
            var value;
            _.each(settings, function (obj, key) {

                value = localStorageService.get(prefix + key);

                try {
                    settings[key].value = eval(value);
                } catch (e) {
                    settings[key].value = value;
                }

                if (!settings[key].value) {
                    settings[key].value = settings[key].defaultValue;
                }
            });
        },

        applyNewSettings = function (newSettings) {
            _.each(newSettings, function (obj, key) {
                settings[key].value = newSettings[key].value;
                localStorageService.set(prefix + key, settings[key].value);
            });
        };

    loadFromStorage();

    return {
        makeDefault: setDefaults,
        applyNewSettings: applyNewSettings,
        settings: settings,
        login: DEFAULT_LOGIN,
        password: DEFAULT_PASSWORD
    };
});