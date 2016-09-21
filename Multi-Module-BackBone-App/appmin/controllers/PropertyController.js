define("text!templates/prop-details.html",[],function(){return'<div id="middle">\r\n    <div class="wrapper">\r\n\r\n\r\n\r\n        <div id="middle_full">\r\n\r\nProperty detail page\r\n\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>\r\n'}),define("views/PropertyDetailView",["app","text!templates/prop-details.html"],function(e,t){var n=Backbone.View.extend({template:_.template(t),initialize:function(){_.bindAll(this)},render:function(){var t=e.session.get("logged_in");return this.$el.html(this.template({logged_in:t})),this}});return n}),define("text!templates/prop-search.html",[],function(){return'<div id="middle">\r\n    <div class="wrapper">\r\n\r\n\r\n\r\n        <div id="middle_full">\r\n\r\nProperty search page\r\n\r\n        </div>\r\n\r\n\r\n    </div>\r\n</div>\r\n'}),define("views/PropertySearchView",["app","text!templates/prop-search.html"],function(e,t){var n=Backbone.View.extend({template:_.template(t),initialize:function(){_.bindAll(this)},events:{"click #prop-det":"ShowPropDetailsView"},render:function(){var t=e.session.get("logged_in");return this.$el.html(this.template({logged_in:t})),this},ShowPropDetailsView:function(){e.router.navigate("propDetail",!0)}});return n}),define("models/PropertyDetailModel",["app"],function(e){var t=Backbone.Model.extend({initialize:function(){_.bindAll(this)},defaults:{property_id:null},getPropertyDetails:function(){}});return t}),define("models/PropertySearchModel",["app"],function(e){var t=Backbone.Model.extend({initialize:function(){_.bindAll(this)},defaults:{}});return t}),define("controllers/PropertyController",["../app","controllers/BaseController","views/PropertyDetailView","views/PropertySearchView","models/PropertyDetailModel","models/PropertySearchModel"],function(e,t,n,r,i,s){var o=_.extend(t,{initialize:function(){_.bindAll(this)},showPropDetail:function(){e.propertyDetailModel=e.propertyDetailModel||new i,this.show(new n({}),{requiresAuth:!1})},showPropSearch:function(){e.propertySearchModel=e.propertySearchModel||new s,this.show(new r({}),{requiresAuth:!1})}});return o});