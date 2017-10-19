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
require("rxjs/add/operator/toPromise");
var settings_1 = require("../settings");
var md5_1 = require("ts-md5/dist/md5");
var GeneralService = (function () {
    function GeneralService(settings) {
        this.settings = settings;
    }
    GeneralService.prototype.generateApiUrl = function (request, additionalParams) {
        var sig = this.generateSignature(request, additionalParams);
        var url = this.settings.lastfm.root + (this.settings.lastfm.isMock ? request["method"] + ".json?" : '?');
        var requestParams = Object.keys(request);
        for (var i = 0; i < requestParams.length; i++) {
            url += requestParams[i] + '=' + request[requestParams[i]] + '&';
        }
        url += 'api_sig=' + sig + '&format=json';
        console.info('generated url: ', url);
        return url;
    };
    GeneralService.prototype.generateSignature = function (request, additionalParams) {
        var keys = Object.keys(request);
        keys = keys.sort();
        var presig = '';
        for (var i = 0; i < keys.length; i++) {
            presig += keys[i] + request[keys[i]];
        }
        if (additionalParams) {
            for (var i = 0; i < additionalParams.length; i++) {
                presig += additionalParams[i];
            }
        }
        presig += this.settings.lastfm.secret;
        console.log('before md5', presig);
        var sig = md5_1.Md5.hashStr(presig);
        return sig;
    };
    return GeneralService;
}());
GeneralService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [settings_1.default])
], GeneralService);
exports.GeneralService = GeneralService;
//# sourceMappingURL=general.service.js.map