"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var settings_1 = require("../settings");
var general_service_1 = require("../main/general.service");
var LoginService = (function () {
    function LoginService(http, settings, generalService) {
        this.http = http;
        this.settings = settings;
        this.generalService = generalService;
    }
    LoginService.prototype.isAuthorized = function () {
        return this.getSession()
            .then(function (key) { return Promise.resolve(true); })
            .catch(function (err) { return Promise.resolve(false); });
    };
    LoginService.prototype.getToken = function () {
        var _this = this;
        var url = this.generalService.generateApiUrl({ api_key: this.settings.lastfm.apiKey, method: 'auth.getToken' }, null);
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            _this.token = response.json().token;
            console.log('token:', _this.token);
            return _this.token;
        })
            .catch(function (error) {
            console.error("get token error: ", error);
            return Promise.reject(error.message || error);
        });
    };
    LoginService.prototype.getSession = function () {
        var loginDetails = JSON.parse(localStorage.getItem('lastfmlogindetails'));
        if (loginDetails && loginDetails.key)
            return Promise.resolve(loginDetails.key);
        if (!this.token)
            return Promise.reject(null);
        var url = this.generalService.generateApiUrl({ api_key: this.settings.lastfm.apiKey, token: this.token, method: 'auth.getSession' }, null);
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            loginDetails = response.json().session;
            localStorage.setItem('lastfmlogindetails', JSON.stringify(loginDetails));
            return loginDetails.key;
        })
            .catch(function (error) {
            console.error("get session error: ", error);
            return Promise.reject(error.message || error);
        });
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, settings_1.default, general_service_1.GeneralService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map