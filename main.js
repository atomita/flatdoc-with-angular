var angular, conf, first_view, flatdoc, flatdoc_run, script, _i, _len, _ref;

require("jquery");

require("angular");

require("angular-route");

require("flatdoc/legacy");

require("flatdoc");

angular = (typeof global !== "undefined" && global !== null ? global.angular : void 0) || (typeof window !== "undefined" && window !== null ? window.angular : void 0);

flatdoc = (typeof global !== "undefined" && global !== null ? global.Flatdoc : void 0) || (typeof window !== "undefined" && window !== null ? window.Flatdoc : void 0);

if (!angular.isDefined("ngRoute")) {
  alert("no ngRoute");
}

conf = angular.extend(require("./bower.json"), require("./docs.json"));

if ((conf != null ? conf.themeScripts : void 0) != null) {
  _ref = conf.themeScripts;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    script = _ref[_i];
    require(script);
  }
}

first_view = (conf != null ? conf.firstView : void 0) != null ? conf.firstView : "README.md";

flatdoc_run = function(view, base) {
  var $$, runner;
  runner = new flatdoc.runner({
    fetcher: flatdoc.file(view)
  });
  runner.run();
  $$ = angular.element;
  return $$(runner.root).one("flatdoc:ready", function() {
    var reg;
    reg = /^#!/;
    return $$("a", runner.el("menu")).each(function() {
      var href;
      href = $$(this).attr("href");
      if (!reg.test(href)) {
        return $$(this).attr("href", "#!" + base + href);
      }
    });
  });
};

angular.module("app", ["ngRoute"]).config([
  "$routeProvider", function($routeProvider) {
    return $routeProvider.when("/", {
      templateUrl: first_view,
      controller: function($scope, $routeParams) {
        return flatdoc_run(first_view, "/");
      }
    }).when("/:doc*", {
      templateUrl: function($routeParams) {
        return "docs/" + $routeParams.doc;
      },
      controller: function($scope, $routeParams) {
        return flatdoc_run("docs/" + $routeParams.doc, "/" + $routeParams.doc);
      }
    }).otherwise({
      redirectTo: "/"
    });
  }
]).config([
  "$locationProvider", function($locationProvider) {
    return $locationProvider.html5Mode(false).hashPrefix('!');
  }
]).run([
  "$rootScope", function($rootScope) {
    $rootScope.documentName = (conf != null ? conf.name : void 0) || "mddoc";
    $rootScope.pages = (conf != null ? conf.pages : void 0) || {};
  }
]);

angular.bootstrap(document, ['app']);
