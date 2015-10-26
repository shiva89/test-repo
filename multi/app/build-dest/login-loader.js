require(['build-dest/lib-loader'], function(){
	require(['app', 'routers/AppRouter', 'models/SessionModel'], function (app, AppRouter, SessionModel) {
		app.router = new AppRouter();
            //app.subrouter = new SubRouter();

            // Create a new session model and scope it to the app global
            // This will be a singleton, which other modules can access
            app.session = new SessionModel({ });
            
            var hash = location.hash.replace("#","");
            
            app.navigater = function(hash){            	
            	if(!app.router.routes[hash]){
               //load router by hash frag
               var arg1 = hash.split('/')[0];
               switch(arg1){
               	case 'propDetail':
                require(['build-dest/app-loader'], function(){
                  // require(['routers/SubRouter'], function(SubRouter){
                   app.subrouter = app.subrouter || new SubRouter();
                   if(!Backbone.History.started){Backbone.history.start();}
                   app.subrouter.navigate(hash, true);
                 // });
                });
                break;
                case 'propSearch':
                require(['build-dest/app-loader'], function(){
                  // require(['routers/SubRouter'], function(SubRouter){
                   app.subrouter = app.subrouter || new SubRouter();
                   if(!Backbone.History.started){Backbone.history.start();}
                   app.subrouter.navigate(hash, true);
                 // });
                });
                break;
              }

            }else{
              if(!Backbone.History.started){Backbone.history.start();}
            }

          };
          app.navigater(hash);
        });
});