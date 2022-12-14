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
var platform_browser_1 = require("@angular/platform-browser");
var PlayerComponent = (function () {
    function PlayerComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    PlayerComponent.prototype.ngOnInit = function () {
        // this.player = new YT.Player('player', {
        //   height: '130',
        //   width: '230',
        //   events: {
        //     'onReady': onPlayerReady,
        //     'onStateChange': onPlayerStateChange
        //   }
        // });
    };
    return PlayerComponent;
}());
PlayerComponent = __decorate([
    core_1.Component({
        selector: 'player',
        templateUrl: './player.template.html',
        styleUrls: ['./player.style.css']
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], PlayerComponent);
exports.PlayerComponent = PlayerComponent;
//# sourceMappingURL=player.component.js.map