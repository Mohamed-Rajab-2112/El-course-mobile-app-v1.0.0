"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import {Router} from '@angular/router'
var search_result_1 = require("../search-result/search-result");
var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.onInput = function (text) {
        console.log(text);
        console.log(this.myInput);
    };
    HomePage.prototype.onCancel = function (cancel) {
        console.log(cancel);
    };
    HomePage.prototype.routeToDetails = function () {
        // this.router.navigate(['/home/search']);
        this.navCtrl.push(search_result_1.SearchResultPage);
    };
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    })
], HomePage);
exports.HomePage = HomePage;
