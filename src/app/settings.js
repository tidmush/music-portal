"use strict";
var Settings = (function () {
    function Settings() {
        this.lastfm = {
            // root:"http://ws.audioscrobbler.com/2.0/",
            root: "/app/api/",
            authUrl: "https://www.last.fm/api/auth",
            apiKey: "3b799a393f8611309aab2318a8ed6c8e",
            secret: "b6d41fb219e2c5b608b45ebb745d179c",
            isMock: true
        };
    }
    return Settings;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
//# sourceMappingURL=settings.js.map