App.PreloaderContentController = App.SmartController.extend({
	isLoaded: false,
	templateName: 'preloader-content',
	isLoadedList: [],
	queue: {},
	view_didInsertElement: function(aview) {
		App.PRELOADER = this;
		this._super(aview);
		this.queue = new createjs.LoadQueue();
		this.queue.installPlugin(createjs.Sound);
		this.queue.addEventListener("complete", (function(me) {
			return function (a, b, c, d) {
				me.isLoadedList.push('All done.');
				me.set('infoHtml', me.isLoadedList.join(' loaded<br/>'));
				me.isLoaded = true;
				App.eventMapper.trigger('preloaderIsLoaded', {target:me.queue});
			}
		}(this)) );
		
		this.queue.addEventListener("fileload", (function(me) {
			return function (event) {
			     var item = event.item;
			     var type = item.type;
				me.isLoadedList.push(item.src);
				me.set('infoHtml', me.isLoadedList.join(' loaded<br/>'));			
			     if (type == createjs.LoadQueue.IMAGE) { }
		
				App.preloadedImages[item.id] = event.result;
			}
		}(this)) );
		//queue.loadFile({id:"sound", src:"http://path/to/sound.mp3"});
		this.queue.loadManifest([
		  	{id: "copy", src:"txt/copy.txt"+(App.DEBUG ? '?'+Math.random() : '')},
			{id: "face-ash-pixel", src:'img//face-ash-pixel.png'},
			{id: "face-ash", src:'img//face-ash.png'},
			{id: "face-user-pixel", src:'img//face-user-pixel.png'},
			{id: "face-user-pixel-change01", src:'img//face-user-pixel-change01.png'},
			{id: "face-user-pixel-change02", src:'img//face-user-pixel-change02.png'},
			{id: "face-user-pixel-change03", src:'img//face-user-pixel-change03.png'},
			{id: "face-user-pixel", src:'img//face-user-pixel.png'},
			{id: "question-pixel", src:'img//question-pixel.png'},
			{id: "question", src:'img//question.png'},
			{id: "machine-pixel", src:'img//machine-pixel.png'},
			{id: "cog", src:'img/cog.png'}
		]);
	},
	infoHtml: '1st',
	isLoadedListObserved: function () {
		console.log('infoHtmlSet')
		infoHtml = this.isLoadedList.join(', ');
	}.observes('isLoadedList')

})