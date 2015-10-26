define("text!templates/login.html",[],function(){return'<div id="middle">\r\n    <div class="wrapper">\r\n\r\n\r\n\r\n        <div id="middle_full">\r\n\r\n Login page\r\n <button id="logMeIn">Log In</button>\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>\r\n'}),define("views/LoginView",["app","text!templates/login.html","models/UserModel"],function(e,t,n){var r=Backbone.View.extend({template:_.template(t),initialize:function(){_.bindAll(this)},events:{"click #logMeIn":"ShowPropSearchView"},render:function(){return this.$el.html(this.template({logged_in:e.session.get("logged_in")})),this},ShowPropSearchView:function(){e.navigater("propSearch")}});return r}),define("models/SessionModel",["app","models/UserModel"],function(e,t){var n=Backbone.Model.extend({defaults:{logged_in:!1,user_id:""},initialize:function(){_.bindAll(this),this.user=new t({})},url:function(){return e.API+"/login"},updateSessionUser:function(e){this.user.set(_.pick(e,_.keys(this.user.defaults)))},checkAuth:function(e,t){var n=this;this.fetch({cache:!1,success:function(t,r){!r.error&&r.user&&r.user.authenticated?(n.updateSessionUser(r.user),n.set({logged_in:!0}),"success"in e&&e.success(t,r)):(console.log("Setting logged in to false1. Else"),n.set({logged_in:!1}),"error"in e&&e.error(t,r))},error:function(t,r){console.log("Setting logged in to false. Error"),n.set({logged_in:!1}),"error"in e&&e.error(t,r)}}).complete(function(){"complete"in e&&e.complete()})},postAuth:function(e,t,n){var r=this,i=navigator.appName+" "+navigator.appCodeName+" "+navigator.appVersion,s=navigator.platform;_.extend(e,{browser_type:i,device_type:s});var o=_.omit(e,"method");$.ajax({url:this.url(),contentType:"application/json",dataType:"json",type:"POST",beforeSend:function(e){},data:JSON.stringify(e),success:function(n){!n.error&&n.user.authenticated===!0?(_.indexOf(["login","signup"],e.method)!==-1?(r.updateSessionUser(n.user||{}),r.set({user_id:n.user.id,logged_in:!0})):(console.log("Setting logged in to false"),r.set({logged_in:!1})),t&&"success"in t&&t.success(n)):!n.error&&!n.user.authenticated?(_.indexOf(["logout"],e.method)!==-1&&(r.set({user_id:null,logged_in:!1}),t&&"success"in t&&t.success(n)),t&&"error"in t&&t.error(n)):t&&"error"in t&&t.error(n)},error:function(e,n){t&&"error"in t&&t.error(n)}}).complete(function(){t&&"complete"in t&&t.complete(res)})},login:function(e,t,n){this.postAuth(_.extend(e,{method:"login"}),t)},logout:function(e,t,n){this.postAuth(_.extend(e,{method:"logout"}),t)}});return n}),define("routers/AppRouter",["app","routers/BaseRouter","views/LoginView","models/SessionModel"],function(e,t,n,r){var i=t.extend({routes:{"":"login",login:"login"},login:function(){this.show(new n({}),{requiresAuth:!1})}});return i}),require(["build-dest/login-loader"],function(){require(["app","routers/SubRouter"],function(e,t){e.subrouter=e.subrouter||new t})}),define("build-dest/app-loader",function(){}),require(["build-dest/lib-loader"],function(){require(["app","routers/AppRouter","models/SessionModel"],function(e,t,n){e.router=new t,e.session=new n({});var r=location.hash.replace("#","");e.navigater=function(t){if(!e.router.routes[t]){var n=t.split("/")[0];switch(n){case"propDetail":require(["build-dest/app-loader","routers/SubRouter"],function(n,r){e.subrouter=e.subrouter||new r,Backbone.History.started||Backbone.history.start(),e.subrouter.navigate(t,!0)});break;case"propSearch":require(["build-dest/app-loader","routers/SubRouter"],function(n,r){e.subrouter=e.subrouter||new r,Backbone.History.started||Backbone.history.start(),e.subrouter.navigate(t,!0)})}}else Backbone.History.started||Backbone.history.start()},e.navigater(r)})}),define("build-dest/login-loader",function(){});