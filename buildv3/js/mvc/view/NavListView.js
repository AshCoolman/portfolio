App.NavListView = Em.View.extend({
       templateName: 'nav-list',
       selectedBinding: 'controller.selected',
       NavListItemView: Ember.View.extend({
           tagName: 'li',
           classNameBindings: 'isActive:active'.w(),
           isActive: function() {
               return this.get('item') === this.get('parentView.selected');
           }.property('item', 'parentView.selected').cacheable()
       }),
		didInsertElement: function () {
			this._super();
			Foundation.libs.topbar.init()
		}
   });