"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var PlayerService = (function () {
    function PlayerService() {
    }
    PlayerService.prototype.enqueue = function (url) {
        this.queue.push(url);
    };
    PlayerService.prototype.dequeue = function () {
        return this.queue.shift();
    };
    PlayerService.prototype.getUrl = function (query) {
        return "";
    };
    return PlayerService;
}());
PlayerService = __decorate([
    core_1.Injectable()
], PlayerService);
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map