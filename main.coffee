require("jquery")
require("angular")
require("angular-route")

require("flatdoc/legacy")
require("flatdoc")

angular = (global?.angular) or (window?.angular)
flatdoc = (global?.Flatdoc) or (window?.Flatdoc)

if not angular.isDefined("ngRoute")
	alert("no ngRoute")

conf = angular.extend(require("./bower.json"), require("./docs.json"))
if conf?.themeScripts?
	for script in conf.themeScripts
		require(script)

first_view = if conf?.firstView? then conf.firstView else "README.md"


flatdoc_run = (view, base)->
	runner = new flatdoc.runner(
		fetcher: flatdoc.file(view)
	)
	runner.run()
	$$ = angular.element
	$$(runner.root).one("flatdoc:ready", ()->
		reg = /^#!/
		$$("a", runner.el("menu")).each ()->
			href = $$(this).attr("href")
			if not reg.test href
				$$(this).attr("href", "#!#{base}#{href}")
	)


angular.module("app", ["ngRoute"]).config([
	"$routeProvider"
	($routeProvider)->
		$routeProvider
		.when("/",
			templateUrl: first_view
			controller: ($scope, $routeParams)->
				#flatdoc.run(
				#	fetcher: flatdoc.file(first_view)
				#)

				flatdoc_run(first_view, "/") 
		)
		.when("/:doc*",
			templateUrl: ($routeParams)->
				"docs/#{$routeParams.doc}"
			controller: ($scope, $routeParams)->
				flatdoc_run("docs/#{$routeParams.doc}", "/#{$routeParams.doc}") 
		)
		.otherwise(
			redirectTo: "/"
		)
])
.config(["$locationProvider", ($locationProvider)->
	$locationProvider.html5Mode(false).hashPrefix('!')
])
.run(["$rootScope", ($rootScope)->
	$rootScope.documentName = conf?.name or "mddoc"
	$rootScope.pages = conf?.pages or {}
	return
])

angular.bootstrap(document, ['app']);

