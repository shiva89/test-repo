define("text!templates/login.html",[],function(){return'<div id="middle">\r\n    <div class="wrapper">\r\n\r\n\r\n\r\n        <div id="middle_full">\r\n\r\n Login page\r\n <<button id="logMeIn">Log In</button>\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>\r\n'}),define("text!templates/prop-details.html",[],function(){return'<div id="middle">\r\n    <div class="wrapper">\r\n\r\n\r\n\r\n        <div id="middle_full">\r\n\r\nProperty detail page\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>\r\n'}),define("views/PropertyDetailView",["app","text!templates/prop-details.html"],function(e,t){var n=Backbone.View.extend({template:_.template(t),initialize:function(){_.bindAll(this)},render:function(){var t=e.session.get("logged_in");return this.$el.html(this.template({logged_in:t})),this}});return n}),define("text!templates/prop-search.html",[],function(){return'<div id="middle">\r\n    <div class="wrapper">\r\n\r\n\r\n\r\n        <div id="middle_full">\r\n\r\nProperty search page\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>\r\n'}),define("views/PropertySearchView",["app","text!templates/prop-search.html"],function(e,t){var n=Backbone.View.extend({template:_.template(t),initialize:function(){_.bindAll(this)},render:function(){var t=e.session.get("logged_in");return this.$el.html(this.template({logged_in:t})),this}});return n}),define("models/PropertyDetailModel",["app"],function(e){var t=Backbone.Model.extend({initialize:function(){_.bindAll(this)},defaults:{property_id:null,address:null,sourceLevel:"Place",id:null,name:null,latitude:null,longitude:null,geom:null,schools:[],rent:null,price:null,crimeReport:null},getPropertyDetails:function(){$.ajax({url:"getproperty_details",contentType:"application/json",async:!1,type:"POST",success:function(e){console.log("Successful"),console.log(e)},error:function(e,t){}})}});return t}),define("models/PropertySearchModel",["app"],function(e){var t=Backbone.Model.extend({initialize:function(){_.bindAll(this)},defaults:{}});return t}),define("routers/SubRouter",["../app","routers/BaseRouter","views/PropertyDetailView","views/PropertySearchView","models/PropertyDetailModel","models/PropertySearchModel"],function(e,t,n,r,i,s){var o=t.extend({initialize:function(){_.bindAll(this);var e=this},routes:{"propDetail(/:property_id)":"showPropDetail",propSearch:"showPropSearch"},showPropDetail:function(t){e.PropertyDetailModel||(e.PropertyDetailModel=new i),this.show(new n({}),{requiresAuth:!1})},showPropSearch:function(t){e.PropertySearchModel||(e.PropertySearchModel=new s),this.show(new r({}),{requiresAuth:!1})}});return o}),require(["build-dest/lib-loader"],function(){require(["app","routers/SubRouter"],function(e,t){e.subrouter=new t})}),define("build-dest/app-loader",function(){}),define("views/LoginView",["app","text!templates/login.html","models/UserModel","utils"],function(e,t,n){var r=Backbone.View.extend({template:_.template(t),initialize:function(){_.bindAll(this)},events:{"click #logMeIn":"ShowPropDetailsView"},render:function(){return this.$el.html(this.template({logged_in:e.session.get("logged_in")})),this},ShowPropDetailsView:function(){require(["build-dest/app-loader"],function(){console.log("out ->"+e.subrouter),_.defer(function(){console.log("in ->"+e.subrouter),e.subrouter.navigate("propSearch",!0)})})}});return r}),define("models/SessionModel",["app","models/UserModel","utils"],function(e,t){var n=Backbone.Model.extend({defaults:{logged_in:!1,user_id:""},initialize:function(){_.bindAll(this),this.user=new t({})},url:function(){return e.API+"/login"},updateSessionUser:function(e){this.user.set(_.pick(e,_.keys(this.user.defaults)))},checkAuth:function(e,t){var n=this;this.fetch({cache:!1,success:function(t,r){!r.error&&r.user&&r.user.authenticated?(n.updateSessionUser(r.user),n.set({logged_in:!0}),"success"in e&&e.success(t,r)):(console.log("Setting logged in to false1. Else"),n.set({logged_in:!1}),"error"in e&&e.error(t,r))},error:function(t,r){console.log("Setting logged in to false. Error"),n.set({logged_in:!1}),"error"in e&&e.error(t,r)}}).complete(function(){"complete"in e&&e.complete()})},postAuth:function(e,t,n){var r=this,i=navigator.appName+" "+navigator.appCodeName+" "+navigator.appVersion,s=navigator.platform;_.extend(e,{browser_type:i,device_type:s});var o=_.omit(e,"method");$.ajax({url:this.url(),contentType:"application/json",dataType:"json",type:"POST",beforeSend:function(e){},data:JSON.stringify(e),success:function(n){!n.error&&n.user.authenticated===!0?(_.indexOf(["login","signup"],e.method)!==-1?(r.updateSessionUser(n.user||{}),r.set({user_id:n.user.id,logged_in:!0})):(console.log("Setting logged in to false"),r.set({logged_in:!1})),t&&"success"in t&&t.success(n)):!n.error&&!n.user.authenticated?(_.indexOf(["logout"],e.method)!==-1&&(r.set({user_id:null,logged_in:!1}),t&&"success"in t&&t.success(n)),t&&"error"in t&&t.error(n)):t&&"error"in t&&t.error(n)},error:function(e,n){t&&"error"in t&&t.error(n)}}).complete(function(){t&&"complete"in t&&t.complete(res)})},login:function(e,t,n){this.postAuth(_.extend(e,{method:"login"}),t)},logout:function(e,t,n){this.postAuth(_.extend(e,{method:"logout"}),t)}});return n}),define("routers/AppRouter",["app","routers/BaseRouter","views/LoginView","models/SessionModel"],function(e,t,n,r){var i=t.extend({initialize:function(){_.bindAll(this);var e=this},routes:{"":"login",login:"login"},login:function(){this.show(new n({}),{requiresAuth:!1})}});return i}),require(["build-dest/lib-loader"],function(){require(["app","routers/AppRouter","models/SessionModel"],function(e,t,n){e.router=new t,e.session=new n({}),Backbone.history.start()})}),define("build-dest/login-loader",function(){});