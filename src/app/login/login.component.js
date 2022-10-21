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
var router_1 = require("@angular/router");
var settings_1 = require("../settings");
var login_service_1 = require("./login.service");
var LoginComponent = (function () {
    function LoginComponent(settings, loginService, router) {
        this.settings = settings;
        this.loginService = loginService;
        this.router = router;
        this.lastfmLoginUrl = this.settings.lastfm.authUrl;
        this.isLoggedIn = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        //check if login service has a token and a session key
        this.loginService.isAuthorized().then(function (isAuthorized) {
            if (isAuthorized) {
                _this.router.navigate(['/']);
            }
            else {
                //get token
                _this.loginService.getToken().then(function (token) {
                    //try get session from api
                    _this.loginService.getSession().then(function (sessionKey) {
                        if (sessionKey) {
                            _this.router.navigate(['/']);
                        }
                    }).catch(function (error) {
                        _this.token = token;
                        _this.lastfmLoginUrl += "/?api_key=" + _this.settings.lastfm.apiKey + "&token=" + token;
                    });
                });
            }
        });
    };
    LoginComponent.prototype.waitForSessionKey = function () {
        var _this = this;
        var loginCheck = setInterval(function () {
            _this.loginService.getSession()
                .then(function (session) {
                clearInterval(loginCheck);
                _this.router.navigate(['/']);
            }).catch(function (err) { return console.log('get ssesion mistake', err); });
        }, 1500);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './login.template.html',
    }),
    __metadata("design:paramtypes", [settings_1.default, login_service_1.LoginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map