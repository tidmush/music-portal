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
var UserService = (function () {
    function UserService(http, settings, generalService) {
        this.http = http;
        this.settings = settings;
        this.generalService = generalService;
    }
    // getUserDetails(): Observable<User> {
    //     let url = this.generalService.generateApiUrl({ api_key: this.settings.lastfm.apiKey, method: 'user.getInfo' }, null);
    //     return this.http.get(url)
    //         .subscribe(
    //         response => response.json() as User,
    //         err => console.error(err)
    // }
    // getTopArtists(period: string, limit: number, page: number): Promise<Artist[]> {
    //     let loginDetails = JSON.parse(localStorage.getItem('lastfmlogindetails')) as LoginDetails
    //     if (!loginDetails)
    //         Promise.reject(null);
    //     let request = { api_key: this.settings.lastfm.apiKey, method: 'user.getTopArtists', user: loginDetails.name };
    //     let url = this.generalService.generateApiUrl(request, null);
    //     return this.http.get(url)
    //         .toPromise()
    //         .then(response => response.json() as Artist[])
    //         .catch(error => console.error("get top artists: ", error));
    // }
    UserService.prototype.getTracks = function (type, period, limit, page) {
        var loginDetails = JSON.parse(localStorage.getItem('lastfmlogindetails'));
        if (!loginDetails)
            Promise.reject(null);
        var request = { api_key: this.settings.lastfm.apiKey, method: 'user.get' + type, user: loginDetails.name };
        var url = this.generalService.generateApiUrl(request, null);
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) {
            console.error("get session error: ", error);
            return Promise.reject(error.message || error);
        });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, settings_1.default, general_service_1.GeneralService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map