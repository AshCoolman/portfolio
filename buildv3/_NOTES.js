Pomodoro 9
Ember guides and API do not categorically state how to remove views

From API: http://emberjs.com/api/classes/Ember.ContainerView.html

I first I tried setting the property childViews to [];
But this didn't work


Then I tried manually calling containerViews to [] (its a Mutable Array)
But this didn't work either

Then I tried manually calling containerViews.popObject();
This DID work

So then I tried to set a while condition to popObject() until the containerViews.length == 0
But containerViews.length was undefined.

Confused I looked back at the guides and API,
They indicated it should of worked.

So I inspected the object,
childViews was undefined, as was length, but _childViews was popuplated.

I spied the Em.MutableArray.clear() and tried it. 
It worked.

But it is worrying that length and childViews doesn't seem to populate properly.

I will try setting containerViews = [] again, because I just can't believe this doesn't work
*tries*
Nope. Maybe I misunderstand what Ember.MutableArray is...
*reads*
API still suggests assigning a mutable array to [] should clear it.
http://emberjs.com/api/classes/Ember.MutableArray.html#property_firstObject

var arr = ["a", "b", "c"];
arr.firstObject();  // "a"

var arr = [];
arr.firstObject();  // undefined


Then I will try one of the different ways to instantiate the ContainerView. 
Possibly the .create({childViews: App.ViewClassName}) doesn't properly engage the facilities.
That would kinda make sense...as I'm not explicity calling pushObject.
Large bug if this is the case.
*tries*
No, it <i>seems</i> that some properties of the ContainerView are not instantiated, and its not entirely behaving like a Mutable Array. I have no idea why clear() works...
This probably warrants some more exploration, notably:
Getting a plain MutableArray to work
Having a peek into MutableArray.clear() and looking at what assets it is using to clear

But for now I'll just be happy I have reasonably elegant view cleanup code.

Small aside 

Interestingly the guides state this is the syntax:

var container = Ember.ContainerView.extend({
  childViews: [App.FirstView, App.SecondView]
};

While the API states the syntax as follows

aContainer = Ember.ContainerView.create({
  childViews: [Ember.View.create(), Ember.View.create()]
});

Note the inclusion of .create() on the view class

Ok, I'm going to have to investigate *that*
*reads*
Well, I'm not up with prototype manipulation, so by looking at the object in Chrome console for a few minutes I couldn't work out what was going on. 
I'm got bigger fish to fry, but I may look into this at a later stage.

Ok so basically...I guess i like ContainerView.

But now I am going to check out using templates

*starts*

Ok I don't need to do this to tell, templates are only are only going to be useful TO ME for data subsitution.

Actually, fuck that, it will be much easier to do css...

Burning quesion: Is a resource a "noun"? And is route always a "verb"?

Burning question: Target bubbling assumes that I will have a controller, then a series of route controllers, until finally an applicaiton route controller
http://emberjs.com/guides/templates/actions/#toc_target-bubbling
But surely I could have multliple view controllers first? Is this the CMS-y-voice again?

Templates might fit well
I instantiate through code my models, THEN my controllers & views. I think I would feel comfortable replacing my controllers & views with templates
BUT...I need someway to do binding and so on...
I'll do it in parent controller...I think. Oh god how do I reference views in a template in a sensible way. Class names? 
Hm. ok...

So if you have a template, view and controller (with a model setup), 
then if the template refrences a varaible, the controller will first look in itself,
or if it doesn't find it, it will look to the model.

This could be a pretty decent pattern. It would force a strict heirachy between models and controllers, again good.

Note on docs: They assume you know the API, or at least will reference it. Even when it is not obvious.
http://emberjs.com/guides/controllers/representing-a-single-model-with-objectcontroller/#toc_representing-a-single-model
setupController(controller, song) {
Wait, WTF is song? I read this guide three times over before going to the API just to see what setupController actually did.
Which actually orientated me. But it was not obvious that setupController was non-trivial.
And really, the doc is crying out for a note on setupController
But anyway, once I looked at Route.setupController() I had to look at Route.model(), 
which didn't have an example. 
So I went back to the guides because I vaugely remember an actual example here
http://emberjs.com/guides/routing/specifying-a-routes-model/#toc_singleton-models
It's no wonder I found Ember opaque my first few days.

Ok I don't care about assigning models to Routes yet.
I really wish the god damn docs wouldn't just focus on fucking templates and routes

Burning Quesiton: what is the difference between Em.ObjectController and Em.Controller?


So I want to reference the views in a template, from the View/Route controller:
Route doesnt seem to have anything
shit.
router.router._activeViews seems to be something related to the views, but they are not Em.Views

Hm, Route.view should exist right? then I could get the children
*looks*
Well I made the children views send an event when they were added, which bubbled past their controller to the RouterController.
The Router controller then did the dynamic aka out-of-class binding as per usual.

Actually, surely there is already a "childAdded" function
*looks*
Well there is a childViews property (which didn't seem to be working with my ContainerView experiements), I'll try observing that
*tries*
Well...observing childViews worked
Which is surprising as get('childViews') is the only way to access it. I wonder if ContainerView.get('length') will work...
*tries*
Oh shit. How weird. ContainerView.get('length') is actually the correct syntax. OK
Lesson learned.
Holy shit.

ok well what next.
I guess I simplify ... wow. seriously simply dynamic binding so the view doesn't need any extra code - thiank goodness.
*tries*
Well, though it reduced the places where the code would be, observing childViews didn't give tell me a child view was added, just changed
Maybe controllers can get('view')







