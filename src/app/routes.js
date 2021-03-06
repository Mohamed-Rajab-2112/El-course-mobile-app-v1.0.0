"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_result_1 = require("../pages/search-result/search-result.page");
var home_1 = require("../pages/home/home.page");
exports.appRoutes = [
    { path: 'home', component: home_1.HomePage },
    { path: 'home/search', component: search_result_1.SearchResultPage },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
