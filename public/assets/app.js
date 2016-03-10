angular.module("app",["ngRoute","ui.router"]),angular.module("app").controller("errorCtrl",["$scope","$rootScope",function(e,t){e.hello="this is from the controller hello",console.log(e.hello)}]),angular.module("app").controller("homeCtrl",["$scope","$http",function(e,t){e.setup=function(){t.get("/api/vehicle").then(function(t){e.model=t.data},function(e){})},e.setup()}]),angular.module("app").controller("loginCtrl",["$scope","auth","$location","$timeout",function(e,t,o,n){e.authFail=!1,e.login=function(o,l){t.login(o,l).then(function(e){t.storeToken(e.data,function(){t.getUser().then(function(e){t.postLoginOps(e.data,function(){t.postLoginRouteHandler()})})})})["catch"](function(t){console.error("Gists error",t.status,t.data),401==t.status&&(e.authFail=!0,n(function(){e.authFail=!1},3e3))})["finally"](function(){console.log("finally finished gists")})}}]),angular.module("app").controller("masterCtrl",["$scope","$rootScope","$route",function(e,t,o){console.log("masterCtrl"),localStorage.getItem("logged_user")&&(t.currentUser=localStorage.getItem("logged_user")),e.$on("login",function(o,n){console.log("Logged In"),e.currentUser=n,t.currentUser=n,localStorage.setItem("logged_user",t.currentUser.username)})}]),angular.module("app").controller("navCtrl",["$scope","auth","$location",function(e,t,o){e.logout=function(){t.logout()}}]),angular.module("app").controller("PostsCtrl",["$scope","PostsSvc",function(e,t){t.fetch().success(function(t){e.posts=t}),e.addPost=function(){e.postBody&&t.create({body:e.postBody}).success(function(t){e.postBody=null})},e.$on("ws:new_post",function(t,o){e.$apply(function(){e.posts.unshift(o)})})}]),angular.module("app").service("PostsSvc",["$http",function(e){this.fetch=function(){return e.get("/api/posts")},this.create=function(t){return e.post("/api/posts",t)}}]),angular.module("app").controller("registerCtrl",["$scope","auth","$location",function(e,t,o){e.register=function(n,l,r){t.register(n,l,r).then(function(t){e.$emit("login",t.data),o.path("/home")})["catch"](function(e){console.log(e)})}}]),angular.module("app").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,o){t.otherwise("/"),e.state("app",{url:"/",views:{header:{templateUrl:"/nav.html",controller:"navCtrl"},content:{templateUrl:"/login.html",controller:"loginCtrl"}}}).state("app.login",{url:"/login",views:{header:{templateUrl:"/nav.html",controller:"navCtrl"},content:{templateUrl:"/login.html",controller:"loginCtrl"}}}).state("app.register",{url:"register",views:{"content@":{templateUrl:"register.html",controller:"registerCtrl"}}}).state("app.home",{url:"home",views:{"content@":{templateUrl:"users/home.html",controller:"homeCtrl"}}}).state("app.home.vehicles",{url:"/vehicles/new",views:{"content@":{templateUrl:"vehicles/newVehicle.html",controller:"VehiclesNewInfoCtrl"}}}).state("app.home.details",{url:"/vehicles/:id",views:{"content@":{templateUrl:"vehicles/editVehicle.html",controller:"VehiclesEditInfoCtrl"}}}).state("app.home.map",{url:"/vehicles/map/:id",views:{"content@":{templateUrl:"vehicles/mapVehicle.html",controller:"VehiclesEditMapCtrl"}}}),o.html5Mode(!0)}]),angular.module("app").service("auth",["$http","$window","$location","$rootScope",function(e,t,o,n){function l(){return e.get("api/users")}function r(t,o){return e.post("api/sessions",{username:t,password:o})}function s(){localStorage.removeItem("user_token"),localStorage.removeItem("logged_user"),delete e.defaults.headers.common["x-auth"],n.isLogged=!1,n.currentUser=null,o.path("/login")}function a(o,n){t.sessionStorage.user_token=o,localStorage.setItem("user_token",o),e.defaults.headers.common["x-auth"]=t.sessionStorage.user_token,n&&"function"==typeof n&&n()}function i(){}function c(e,t){n.currentUser=e.name,localStorage.setItem("logged_user",n.currentUser),n.isLogged=!0,t&&"function"==typeof t&&t()}function u(){n.intendedRoute?o.path(n.intendedRoute):o.path("/home")}return{getUser:l,login:r,logout:s,storeToken:a,isLogged:i,postLoginOps:c,postLoginRouteHandler:u}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2Vycm9yQ3RybC5qcyIsImNvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwiY29udHJvbGxlcnMvbWFzdGVyQ3RybC5qcyIsImNvbnRyb2xsZXJzL25hdkN0cmwuanMiLCJjb250cm9sbGVycy9wb3N0cy5jdHJsLmpzIiwiY29udHJvbGxlcnMvcG9zdHMuc3ZjLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcm91dGVzLmpzIiwic2VydmljZXMvYXV0aC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29udHJvbGxlciIsIiRzY29wZSIsIiRyb290U2NvcGUiLCJoZWxsbyIsImNvbnNvbGUiLCJsb2ciLCIkaHR0cCIsInNldHVwIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwibW9kZWwiLCJkYXRhIiwiYXV0aCIsIiRsb2NhdGlvbiIsIiR0aW1lb3V0IiwiYXV0aEZhaWwiLCJsb2dpbiIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJyZXMiLCJzdG9yZVRva2VuIiwiZ2V0VXNlciIsInBvc3RMb2dpbk9wcyIsInBvc3RMb2dpblJvdXRlSGFuZGxlciIsImVycm9yIiwic3RhdHVzIiwiJHJvdXRlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImN1cnJlbnRVc2VyIiwiJG9uIiwiXyIsInVzZXIiLCJzZXRJdGVtIiwibG9nb3V0IiwiUG9zdHNTdmMiLCJmZXRjaCIsInN1Y2Nlc3MiLCJwb3N0cyIsImFkZFBvc3QiLCJwb3N0Qm9keSIsImNyZWF0ZSIsImJvZHkiLCJwb3N0IiwiJGFwcGx5IiwidW5zaGlmdCIsInNlcnZpY2UiLCJ0aGlzIiwicmVnaXN0ZXIiLCJuYW1lIiwiJGVtaXQiLCJwYXRoIiwiZXJyIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCIkbG9jYXRpb25Qcm92aWRlciIsIm90aGVyd2lzZSIsInN0YXRlIiwidXJsIiwidmlld3MiLCJoZWFkZXIiLCJ0ZW1wbGF0ZVVybCIsImNvbnRlbnQiLCJjb250ZW50QCIsImh0bWw1TW9kZSIsIiR3aW5kb3ciLCJyZW1vdmVJdGVtIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwiaXNMb2dnZWQiLCJjYiIsInNlc3Npb25TdG9yYWdlIiwidXNlcl90b2tlbiIsImludGVuZGVkUm91dGUiXSwibWFwcGluZ3MiOiJBQUFBQSxRQUFBQyxPQUFBLE9BQ0EsVUFBQSxjQ0RBRCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsYUFBQSxTQUFBLGFBQUEsU0FBQUMsRUFBQUMsR0FDQUQsRUFBQUUsTUFBQSxvQ0FDQUMsUUFBQUMsSUFBQUosRUFBQUUsVUNIQUwsUUFBQUMsT0FBQSxPQUNBQyxXQUFBLFlBQUEsU0FBQSxRQUFBLFNBQUFDLEVBQUFLLEdBR0FMLEVBQUFNLE1BQUEsV0FFQUQsRUFBQUUsSUFBQSxnQkFDQUMsS0FBQSxTQUFBQyxHQUNBVCxFQUFBVSxNQUFBRCxFQUFBRSxNQUVBLFNBQUFGLE9BT0FULEVBQUFNLFdDakJBVCxRQUFBQyxPQUFBLE9BQ0FDLFdBQUEsYUFBQSxTQUFBLE9BQUEsWUFBQSxXQUFBLFNBQUFDLEVBQUFZLEVBQUFDLEVBQUFDLEdBQ0FkLEVBQUFlLFVBQUEsRUFDQWYsRUFBQWdCLE1BQUEsU0FBQUMsRUFBQUMsR0FDQU4sRUFBQUksTUFBQUMsRUFBQUMsR0FDQVYsS0FBQSxTQUFBVyxHQUNBUCxFQUFBUSxXQUFBRCxFQUFBUixLQUFBLFdBQ0FDLEVBQUFTLFVBQ0FiLEtBQUEsU0FBQVcsR0FDQVAsRUFBQVUsYUFBQUgsRUFBQVIsS0FBQSxXQUNBQyxFQUFBVyxnQ0FOQVgsU0FZQSxTQUFBSCxHQUNBTixRQUFBcUIsTUFBQSxjQUFBZixFQUFBZ0IsT0FBQWhCLEVBQUFFLE1BQ0EsS0FBQUYsRUFBQWdCLFNBQ0F6QixFQUFBZSxVQUFBLEVBQ0FELEVBQUEsV0FBQWQsRUFBQWUsVUFBQSxHQUFBLFFBaEJB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LE1BQUFiLEdBQUFzQyxLQUFBLGdCQUNBMUIsU0FBQUEsRUFDQUMsU0FBQUEsSUFLQSxRQUFBZ0IsS0FDQVAsYUFBQXdDLFdBQUEsY0FDQXhDLGFBQUF3QyxXQUFBLHFCQUNBOUQsR0FBQStELFNBQUFDLFFBQUFDLE9BQUEsVUFDQXJFLEVBQUFzRSxVQUFBLEVBQ0F0RSxFQUFBNEIsWUFBQSxLQUNBaEIsRUFBQXNDLEtBQUEsVUFNQSxRQUFBL0IsR0FBQUQsRUFBQXFELEdBQ0FOLEVBQUFPLGVBQUEsV0FBQXRELEVBQ0FRLGFBQUFNLFFBQUEsYUFBQWQsR0FDQWQsRUFBQStELFNBQUFDLFFBQUFDLE9BQUEsVUFBQUosRUFBQU8sZUFBQUMsV0FDQUYsR0FBQSxrQkFBQUEsSUFDQUEsSUFJQSxRQUFBRCxNQUlBLFFBQUFqRCxHQUFBSCxFQUFBcUQsR0FHQXZFLEVBQUE0QixZQUFBVixFQUFBOEIsS0FDQXRCLGFBQUFNLFFBQUEsY0FBQWhDLEVBQUE0QixhQUNBNUIsRUFBQXNFLFVBQUEsRUFDQUMsR0FBQSxrQkFBQUEsSUFDQUEsSUFLQSxRQUFBakQsS0FDQXRCLEVBQUEwRSxjQUNBOUQsRUFBQXNDLEtBQUFsRCxFQUFBMEUsZUFFQTlELEVBQUFzQyxLQUFBLFNBakVBLE9BQ0E5QixRQUFBQSxFQUNBTCxNQUFBQSxFQUNBa0IsT0FBQUEsRUFDQWQsV0FBQUEsRUFDQW1ELFNBQUFBLEVBQ0FqRCxhQUFBQSxFQUNBQyxzQkFBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcsW1xuJ25nUm91dGUnLCd1aS5yb3V0ZXInXG5dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdlcnJvckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmhlbGxvID0gXCJ0aGlzIGlzIGZyb20gdGhlIGNvbnRyb2xsZXIgaGVsbG9cIlxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuaGVsbG8pXG5cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcblxuXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdmVoaWNsZScpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcbiAgICAgICAgICAgICAgICAgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoLCAkbG9jYXRpb24sICR0aW1lb3V0KSB7XG4gICAgICAgICRzY29wZS5hdXRoRmFpbCA9IGZhbHNlO1xuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGF1dGgubG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBhdXRoLnN0b3JlVG9rZW4ocmVzLmRhdGEsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0aC5nZXRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aC5wb3N0TG9naW5PcHMocmVzLmRhdGEsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0aC5wb3N0TG9naW5Sb3V0ZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdHaXN0cyBlcnJvcicsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYXV0aEZhaWwgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgJHNjb3BlLmF1dGhGYWlsID0gZmFsc2U7IH0sIDMwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaW5hbGx5IGZpbmlzaGVkIGdpc3RzXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbWFzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHJvdXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFzdGVyQ3RybFwiKTtcblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJykpIHsgICAgICAgIFx0XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJylcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuJG9uKCdsb2dpbicsIGZ1bmN0aW9uKF8sIHVzZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIEluXCIpO1xuICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlclxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IHVzZXJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRfdXNlcicsICRyb290U2NvcGUuY3VycmVudFVzZXIudXNlcm5hbWUpXG4gICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCduYXZDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBhdXRoLCAkbG9jYXRpb24pIHsgICAgICAgIFxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBhdXRoLmxvZ291dCgpICAgICAgICAgICAgICAgIFxuXG4gICAgICAgIH1cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcignUG9zdHNDdHJsJyxmdW5jdGlvbigkc2NvcGUsUG9zdHNTdmMpeyBcbiAgUG9zdHNTdmMuZmV0Y2goKVxuIFx0LnN1Y2Nlc3MoZnVuY3Rpb24gKHBvc3RzKXtcbiBcdFx0JHNjb3BlLnBvc3RzID0gcG9zdHNcblxuIFx0fSlcblx0XG4gXHQgJHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCRzY29wZS5wb3N0Qm9keSkge1xuICAgICAgICAgICAgUG9zdHNTdmMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgLyp1c2VybmFtZTogJ3Zpc2hhbFJhbmphbicsKi9cbiAgICAgICAgICAgICAgYm9keTogICAgICRzY29wZS5wb3N0Qm9keSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgICAgICAgIC8vJHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdClcbiAgICAgICAgICAgICAgJHNjb3BlLnBvc3RCb2R5ID0gbnVsbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICRzY29wZS4kb24oJ3dzOm5ld19wb3N0JyxmdW5jdGlvbihfLHBvc3Qpe1xuICAgICRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcbiAgICAgICRzY29wZS5wb3N0cy51bnNoaWZ0KHBvc3QpXG4gICAgfSlcbiAgfSlcbiBcbn0pXG5cbiAiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5zZXJ2aWNlKCdQb3N0c1N2YycsIGZ1bmN0aW9uKCRodHRwKXtcbiAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbiAoKSB7ICAgXHRcbiAgICAgcmV0dXJuICRodHRwLmdldCgnL2FwaS9wb3N0cycpXG4gICB9XG4gICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uIChwb3N0KXtcbiAgIFx0XG4gICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9wb3N0cycscG9zdClcbiAgIH1cbiB9KSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyQ3RybCcsZnVuY3Rpb24oJHNjb3BlLGF1dGggLCRsb2NhdGlvbil7XG5cdCRzY29wZS5yZWdpc3RlciA9IGZ1bmN0aW9uKG5hbWUsdXNlcm5hbWUscGFzc3dvcmQpe1xuXHRcdGF1dGgucmVnaXN0ZXIobmFtZSx1c2VybmFtZSxwYXNzd29yZClcblx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHRcdFx0XG5cdFx0XHQkc2NvcGUuJGVtaXQoJ2xvZ2luJyxyZXNwb25zZS5kYXRhKVxuXHRcdFx0JGxvY2F0aW9uLnBhdGgoJy9ob21lJylcblx0XHR9KVxuXHRcdC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcblx0XHRcdGNvbnNvbGUubG9nKGVycilcblx0XHR9KVxuXHR9XG5cbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwkbG9jYXRpb25Qcm92aWRlcil7XG4gXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuIFxuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdhcHAnLHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnaGVhZGVyJzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL25hdi5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbmF2Q3RybCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9sb2dpbi5odG1sJyAsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ3RybCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5sb2dpbicse1xuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2hlYWRlcic6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9uYXYuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ25hdkN0cmwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ3RybCdcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiBcbiAgICAuc3RhdGUoJ2FwcC5yZWdpc3RlcicsIHtcbiAgICAgICAgdXJsOiAncmVnaXN0ZXInLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVnaXN0ZXIuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3JlZ2lzdGVyQ3RybCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuIFxuICAgIH0pXG4gXG4gICAgLnN0YXRlKCdhcHAuaG9tZScsIHtcbiAgICAgICAgdXJsOiAnaG9tZScsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd1c2Vycy9ob21lLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuIFxuICAgIH0pXG5cbiAgICAgLnN0YXRlKCdhcHAuaG9tZS52ZWhpY2xlcycsIHtcbiAgICAgICAgdXJsOiAnL3ZlaGljbGVzL25ldycsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2ZWhpY2xlcy9uZXdWZWhpY2xlLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdWZWhpY2xlc05ld0luZm9DdHJsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gXG4gICAgfSlcblxuICAgICAuc3RhdGUoJ2FwcC5ob21lLmRldGFpbHMnLCB7XG4gICAgICAgIHVybDogJy92ZWhpY2xlcy86aWQnLCAgICAgICAgXG4gXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2ZWhpY2xlcy9lZGl0VmVoaWNsZS5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVmVoaWNsZXNFZGl0SW5mb0N0cmwnICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuIFxuICAgIH0pXG5cbiAgICAgLnN0YXRlKCdhcHAuaG9tZS5tYXAnLCB7XG4gICAgICAgIHVybDogJy92ZWhpY2xlcy9tYXAvOmlkJywgICAgICAgIFxuIFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmVoaWNsZXMvbWFwVmVoaWNsZS5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnVmVoaWNsZXNFZGl0TWFwQ3RybCcgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gXG4gICAgfSlcblxuXG4gICAgXG4gXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpXG4gXG59KTtcblxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLnNlcnZpY2UoJ2F1dGgnLCBmdW5jdGlvbigkaHR0cCwgJHdpbmRvdywgJGxvY2F0aW9uLCAkcm9vdFNjb3BlKSB7XG5cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0VXNlcjogZ2V0VXNlcixcbiAgICAgICAgICAgIGxvZ2luOiBsb2dpbixcbiAgICAgICAgICAgIGxvZ291dDogbG9nb3V0LFxuICAgICAgICAgICAgc3RvcmVUb2tlbjogc3RvcmVUb2tlbixcbiAgICAgICAgICAgIGlzTG9nZ2VkOiBpc0xvZ2dlZCxcbiAgICAgICAgICAgIHBvc3RMb2dpbk9wczogcG9zdExvZ2luT3BzLFxuICAgICAgICAgICAgcG9zdExvZ2luUm91dGVIYW5kbGVyOiBwb3N0TG9naW5Sb3V0ZUhhbmRsZXJcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0VXNlcigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2FwaS91c2VycycpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBsb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2FwaS9zZXNzaW9ucycsIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcl90b2tlbicpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2xvZ2dlZF91c2VyJyk7XG4gICAgICAgICAgICBkZWxldGUgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2xvZ2luXCIpXG5cblxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdG9yZVRva2VuKHJlcywgY2IpIHtcbiAgICAgICAgICAgICR3aW5kb3cuc2Vzc2lvblN0b3JhZ2VbXCJ1c2VyX3Rva2VuXCJdID0gcmVzXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl90b2tlbicsIHJlcyk7XG4gICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsneC1hdXRoJ10gPSAkd2luZG93LnNlc3Npb25TdG9yYWdlLnVzZXJfdG9rZW5cbiAgICAgICAgICAgIGlmIChjYiAmJiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0xvZ2dlZCgpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9zdExvZ2luT3BzKHJlcywgY2IpIHtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gcmVzLm5hbWVcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRfdXNlcicsICRyb290U2NvcGUuY3VycmVudFVzZXIpXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmlzTG9nZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChjYiAmJiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3RMb2dpblJvdXRlSGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmICgkcm9vdFNjb3BlLmludGVuZGVkUm91dGUpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgkcm9vdFNjb3BlLmludGVuZGVkUm91dGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2hvbWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=