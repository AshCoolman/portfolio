App.NavigationController=App.SmartController.extend({className:"NavigationController",view_willDestroyElement:function(a){this._super(a)}});App.register("controller:navigation",App.NavigationController,{singleton:false});