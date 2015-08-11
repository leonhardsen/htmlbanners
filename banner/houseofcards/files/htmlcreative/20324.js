// Admotion HTMLCreative version 20310

/**
 * @name AdmBase
 * @public
 * @namespace Agrupa funcionalidad necesaria para el funcionamiento del HTMLCreative
 */
window.AdmBase = new function() {

	var ValueType = {
		Number: 1,
		Object: 2,
		Function: 4,
		Array: 8,
		String: 16,
		Boolean: 32,
		Null: 64,
		Undefined: 128,
		Arguments: 256,
		Unknown: 512
	};

	/**
	 * Define metodos para determinar el tipo de un dato.
	 * @class
	 * @property {function} isNumber devuelve verdadero si el dato pasado como argumento es un numero
	 * @property {function} isObject devuelve verdadero si el dato pasado como argumento es un objeto
	 * @property {function} isFunction devuelve verdadero si el dato pasado como argumento es una funcion
	 * @property {function} isString devuelve verdadero si el dato pasado como argumento es un string
	 * @property {function} isBoolean devuelve verdadero si el dato pasado como argumento es un booleano
	 * @property {function} isUndefined devuelve verdadero si el dato pasado como argumento no esta definido
	 */

	this.Lang = new function() {
		var _this = this;

		/**
		 * Obtiene el tipo de un dato
		 * @static
		 * @param {Number|Object|Function|String|Boolean|Undefined} o
		 */
		var getType = this.getType = function(o) {
			var type, _typeof;
			var types = ["Number", "Object", "Function", "String", "Boolean", "Undefined"];
			try {
				_typeof = typeof o.valueOf();
			}
			catch(_) {
				_typeof = typeof o;
			}
			if(Object.prototype.toString.call(o).indexOf("Array") != -1) {
				type = ValueType.Array;
			}
			for(var i = 0; !type && i < types.length; i++) {
				type = _typeof == types[i].toLowerCase() ? ValueType[types[i]] : null;
			}
			switch(type) {
				case ValueType.Number:
					type = !isFinite(o) ? ValueType.Unknown : type;
					break;
				case ValueType.Object:
					type = !o ? ValueType.Null : _this.isNumber(o.length) ?
						ValueType.Arguments | type : type;
					break;
				default:
					break;
			}
			return type;
		};

		/**
		 * @static
		 */

		this.testValueType = function(value, types) {
			return !!(getType(value) & types);
		};

		for(var type in ValueType) {
			if(ValueType.hasOwnProperty(type)) {
				new function() {
					var _type = type;
					_this["is" + _type] = function(value) {
						return _this.testValueType(value, ValueType[_type]);
					};
				};
			}
		}
	};

	/**
	 * Elimina elementos de un array, se le puede proporcionar una funcion de comparacion para que elimine los elementos den true en la misma
	 * si esta funcion no es proporcionada eliminara los elementos que sean iguales al proporcionado
	 * @inner
	 */

	var removeArrayItem = function(array, item, comparisonFunction) {
		for(var i = 0; i < array.length; i++) {
			if(comparisonFunction ? comparisonFunction(array[i], item) : array[i] == item) {
				return array.splice(i, 1);
			}
		}
		return null;
	};

	/**
	 Convierte el actual objeto arguments en un array, incluyendo los elementos desde el indice _i hasta _f.
	 */
	var argumentsToArray = function(_i, _f, args) {
		var ret = [], i = _i || 0;
		args = (args || arguments.callee.caller.arguments);
		var f = _f || args.length;
		for(; i < f; i++) {
			ret.push(args[i]);
		}
		return ret;
	};

	/**
	 Mapea los miembros del source en el destino.
	 @memberOf AdmBase
	 */
	var map = function(dest, src, notOverwrite, callbackOrIgnoreUndefined) {
		for(var prop in src) {
			if(src.hasOwnProperty(prop)) {
				var value = src[prop];
				var shouldCopy = true;
				if(callbackOrIgnoreUndefined && value === undefined) {
					shouldCopy = AdmBase.Lang.isFunction(callbackOrIgnoreUndefined) && callbackOrIgnoreUndefined(prop, value);
				}
				if(shouldCopy && (!notOverwrite || !(prop in dest))) {
					dest[prop] = value;
				}
			}
		}
		return dest;
	};
	this.foreach = function(obj, callback) {
		if(AdmBase.Lang.isFunction(callback)) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop) && !(prop in AdmBase.foreach.ExcludeList)) {
					if(callback(prop, obj[prop]) === AdmBase.foreach.Break) {
						break;
					}
				}
			}
		}
	};

	this.foreach.Break = {};
	this.foreach.ExcludeList = {};
	/**
	 * Stringifies obj to JSON. Does not support Function objects
	 * @memberOf  AdmBase
	 */
	this.toJSON = function(obj) {
		var json = "";
		var type = AdmBase.Lang.getType(obj);
		if(type & ValueType.Arguments) {
			type = ValueType.Array;
		}
		var first = true;
		switch(type) {
			case ValueType.Object:
				json += "{";
				AdmBase.foreach(obj, function(name, value) {
					json += (first ? "" : ",") + "\"" + name + "\"" + ": " + AdmBase.toJSON(value);
					first = false;
				});
				json += "}";
				break;
			case ValueType.Array:
				json += "[";
				for(var i = 0; i < obj.length; i++) {
					json += (first ? "" : ",") + AdmBase.toJSON(obj[i]);
					first = false;
				}
				json += "]";
				break;
			case ValueType.String:
				json += "\"" + obj + "\"";
				break;
			case ValueType.Number:
			case ValueType.Boolean:
				json += obj;
				break;
			case ValueType.Null:
			case ValueType.Undefined:
				json += null;
				break;

			default:
				break;
		}
		return json;
	};

	/**
	 * Converts a json to an object
	 * @memberOf AdmCore
	 */
	this.fromJSON = function(json) {
		var obj = {};
		if(json && json.substring && json.substring(0, 1) == "{") {
			try {
				obj = eval("(" + json + ")");
			}
			catch(e) {
			}
		}
		return obj;
	};
	/**
	 @class
	 @static
	 @memberOf AdmBase
	 */
	this.DOMEvent = new function() {

		this.add = function(obj, evnt, func) {
			if(obj.attachEvent) {
				obj.attachEvent('on' + evnt, func);
			}
			else if(obj.addEventListener) {
				obj.addEventListener(evnt, func, true);
			}
			else {
				obj['on' + evnt] = func;
			}
		};

		this.remove = function(obj, evnt, func) {
			if(obj.detachEvent) {
				obj.detachEvent('on' + evnt, func);
			}
			else if(obj.removeEventListener) {
				obj.removeEventListener(evnt, func, true);
			}
			else if(obj['on' + evnt] == func) {
				obj['on' + evnt] = null;
			}
		};
	};

	/**
	 * @name EventManager
	 * @class
	 */
	this.EventManager = function(obj) {
		var _callback = {};
		var _this = this;
		/**@inner*/
		var getOrCreateEvent = function(eventName, consume, args) {
			if(!_callback[eventName]) {
				_callback[eventName] = [];
			}
			var event = _callback[eventName];
			if(consume) {
				(_callback[eventName] = []).consumed = true;
				_callback[eventName].args = args;
			}
			return event;
		};
		/**@inner*/
		var fire = function(callbacks, args) {
			var ret = true;
			for(var i = 0; i < callbacks.length; i++) {
				if(AdmBase.Lang.isFunction(callbacks[i])) {
					var retValue = callbacks[i].apply(this, args || []) || {};
					if(retValue.cancel) {
						ret = false;
					}
					if(retValue.stopPropagation) {
						break;
					}
				}
			}
			return ret;
		};

		/**
		 * Agrega un event listener
		 * @param {String} eventName
		 * @param {Function} callback
		 */
		this.add = function(eventName, callback) {
			var event = getOrCreateEvent(eventName);
			if(event.consumed) {
				fire([callback], event.args);
			}
			else {
				event.push(callback);
			}
		};
		/**
		 * Quita un event listener
		 * @param {String} eventName
		 * @param {Function} callback
		 */
		this.remove = function(eventName, callback) {
			return !!removeArrayItem(getOrCreateEvent(eventName), callback);
		};
		/**
		 * Dispara un evento. Todos los parametros luego de consumed son pasados a los listeners
		 * @param {String} eventName
		 * @param {Boolean} consume Si vale true, el evento se disparara automaticamente en el futuro al llamar a EventManager#add y se borran los listenrs que ya estaban registrados
		 */
		this.fire = function(eventName, consume /* [, ...] */) {
			var args = argumentsToArray(2);
			var event = getOrCreateEvent(eventName, consume, args);
			event.consumed = event.consumed || !!consume;
			event.args = args;
			var ret = fire(event, args);
			if(eventName !== null) {
				arguments.callee.apply(_this, [null, false].concat(argumentsToArray()));
			}
			return ret;
		};
		/**
		 * Devuelve si un evento fue consumido
		 * @param {String} eventName
		 */
		this.wasFired = function(eventName) {
			return getOrCreateEvent(eventName).consumed;
		};
		if(obj) {
			map(obj, {addEvent: _this.add, removeEvent: _this.remove, fireEvent: _this.fire, wasFired: _this.wasFired});
		}
	};
};

window.VideoTracker = function(video) {
	var _videoEventSession = [];
	var _eventMan = new AdmBase.EventManager(this);
	HTMLCreative.setVideo(video);

	var videoEnd = function(e) {
		if(!_videoEventSession[4]) {
			_videoEventSession[4] = true;
			HTMLCreative.videoFullyPlayed();
			_eventMan.fire("videoEnded", true, video);
		}
	};

	var videoPlay = function(e) {
		HTMLCreative.setVideoPlaying(true);
		if(!_videoEventSession[5]) {
			_videoEventSession[5] = true;
			HTMLCreative.videoPlayButton();
			_eventMan.fire("videoPlay");
		}
	};

	var videoPause = function(e) {
		HTMLCreative.setVideoPlaying(false);
		if(!_videoEventSession[5]) {
			_videoEventSession[5] = true;
			HTMLCreative.videoPauseButton();
			_eventMan.fire("videoPause");
		}
	};
	var timeUpdateHandler = function(e) {
		var videoProgress = video.currentTime / video.duration;
		if(videoProgress >= 0.75) {
			if(!_videoEventSession[3]) {
				_videoEventSession[3] = true;
				HTMLCreative.video75Played();
				_eventMan.fire("video75Played", true, video);
			}
		}
		else if(videoProgress >= 0.5) {
			if(!_videoEventSession[2]) {
				_videoEventSession[2] = true;
				HTMLCreative.video50Played();
				_eventMan.fire("video50Played", true, video);
			}
		}
		else if(videoProgress >= 0.25) {
			if(!_videoEventSession[1]) {
				_videoEventSession[1] = true;
				HTMLCreative.video25Played();
				_eventMan.fire("video25Played", true, video);
			}
		}
		else if(!_videoEventSession[0]) {
			_videoEventSession[0] = true;
			HTMLCreative.videoStarted();
			_eventMan.fire("videoStarted", true, video);
		}
	};

	this.clearVideoEventSession = function() {
		for(var i = 0; i < _videoEventSession.length; i++) {
			_videoEventSession[i] = false;
		}
	};

	AdmBase.DOMEvent.add(video, "timeupdate", timeUpdateHandler);
	AdmBase.DOMEvent.add(video, "ended", videoEnd);
	AdmBase.DOMEvent.add(video, "play", videoPlay);
	AdmBase.DOMEvent.add(video, "pause", videoPause);

};

var Command = {
	ReportEvent: "reportEvent",
	Remove: "remove",
	Expand: "expand",
	Collapse: "collapse",
	Crop: "crop",
	OpenWindow: "openWindow",
	HidePiece: "hidePiece",
	ShowPiece: "showPiece",
	SetPanelTracker: "setPanelTracker"
};

var PieceEvent = {
	SDKReady: "SDKReady",
	Load: "load",
	Ready: "ready",
	Initialize: "initialize",
	MouseMoveOverPiece: "mouseMoveOverPiece"
};

var EventType = {
	Automatic: "Automatic",
	Interaction: "Interaction",
	Click: "Click",
	Timer: "Timer"
};

var EventAction = {
	Start: "start",
	Stop: "stop"
};

/**
 * @class
 * @name ExternalEvent
 */
var ExternalEvent = function(type, identifier, action) {
	this.Type = type;
	this.Identifier = identifier;
	this.Action = action;
};

var PostingDataType = {
	Event: 'Event',
	Command: 'Command'
};

/**
 * @public
 * @namespace
 */
window.HTMLCreative = new function() {

	var PostingData = function(type, message, args) {
		this.type = type;
		this.message = message;
		this.args = args;
	};

	var _this = this;
	var _eventManager = new AdmBase.EventManager(this);
	var _adVars = {cookieCount:0,instanceCount:0};
	var _closeTimeout;
	var _cleareableCloseTimeout;
	var _isVideoPlaying;
	var _video;
	var _orientationChangeHandler = function(args) {
	};
	var _isVideoPlayingInterval;

	var defaultOrientationChangeHandler = function(data) {
		if(data.args === 0 || !data.args) {
			_orientationChangeHandler(data.args);
			postMessage(new PostingData(PostingDataType.Command, Command.ShowPiece, null));
			clearInterval(_isVideoPlayingInterval);
		}
		else {
			if(!_isVideoPlaying) {
				postMessage(new PostingData(PostingDataType.Command, Command.HidePiece, null));
			}
			else {
				_isVideoPlayingInterval = setInterval(function() {
					if(!_isVideoPlaying) {
						_orientationChangeHandler(data.args);
						postMessage(new PostingData(PostingDataType.Command, Command.HidePiece, null));
						if(_video) {
							_video.pause();
						}
						clearInterval(_isVideoPlayingInterval);
					}
				}, 0);
			}
		}
		_eventManager.fire("orientationchange", false, data.args);
	};

	var postMessage = function(postingData) {
		var messageTarget = parent;
		messageTarget.postMessage(AdmBase.toJSON(postingData), "*");
	};

	var reportEvent = function(externalEvent) {
		postMessage(new PostingData(PostingDataType.Command, Command.ReportEvent, externalEvent));
	};

	var handleCommands = function(data) {
		switch(data.message) {
			case "setVars":
				handleVars(data.args);
				break;
			default:
				break;
		}
	};

	var handleEvents = function(data) {
		switch(data.message) {
			case "orientationchange":
				if(_adVars.hideOnOrientationChange) {
					defaultOrientationChangeHandler(data);
				}
				break;
			default:
				break;
		}
	};

	var postMessageHandler = function(event) {
		var data = AdmBase.fromJSON(event.data);
		switch(data.type) {
			case PostingDataType.Command:
				handleCommands(data);
				break;
			case PostingDataType.Event:
				handleEvents(data);
				break;
			default:
				break;
		}
	};

	this.getCreativeSize = function() {
		return {
			width: _adVars.width,
			height: _adVars.height
		};
	};

	this.getAdVars = function() {
		return _adVars;
	};

	this.setOnLoad = function(callback) {
		AdmBase.DOMEvent.add(window, "load", callback);
	};

	this.setVideoPlaying = function(playing) {
		_isVideoPlaying = playing;
	};

	this.setVideo = function(videoElem) {
		_video = videoElem;
	};

	this.setOrientationChangeHandler = function(callback) {
		_orientationChangeHandler = callback;
	};

	this.timerStop = function (EventId) {
		reportEvent(new ExternalEvent(EventType.Timer, EventId, EventAction.Start));
	};

	this.timerStop = function (EventId) {
		reportEvent(new ExternalEvent(EventType.Timer, EventId, EventAction.Stop));
	};

	this.automatic = function (EventId) {
		reportEvent(new ExternalEvent(EventType.Automatic, EventId));
	};

	this.reportAutomaticExpand = function() {
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_Expand", null));
	};

	this.reportExpandOnUserInitiated = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_ExpandUserInitiated", null));
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_Expand", null));
	};
	this.reportAutomaticCollapse = function() {
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_Collapse", null));
	};

	this.reportCollapseOnUserInitiated = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_ManualCollapse", null));
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_Collapse", null));
	};

	this.reportAutomaticClose = function() {
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_Close", null));
	};

	this.reportCloseOnUserInitiated = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_ManualClose", null));
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_Close", null));
	};

	this.sendPieceCommand = function(command, args) {
		postMessage(new PostingData(PostingDataType.Command, command, args || null));
	};

	this.expand = function() {
		clearTimeout(_closeTimeout);
		_closeTimeout = 0;
		postMessage(new PostingData(PostingDataType.Command, Command.Expand, null));
	};

	this.collapse = function() {
		clearTimeout(_closeTimeout);
		_closeTimeout = 0;
		postMessage(new PostingData(PostingDataType.Command, Command.Collapse, null));
	};

	this.remove = function() {
		clearTimeout(_closeTimeout);
		clearTimeout(_cleareableCloseTimeout);
		postMessage(new PostingData(PostingDataType.Command, Command.Remove, null));
		setTimeout(function() {
			AdmBase.DOMEvent.remove(window, 'message', postMessageHandler);
		}, 0);
	};

	this.resize = function(width, height, _top, left) {
		var args = {
			"width": width,
			"height": height,
			"top": _top,
			"left": left
		};
		postMessage(new PostingData(PostingDataType.Command, Command.Crop, args));
	};

	this.clickThrough = function(id) {
		var url = id ? decodeURIComponent(AdmBase.fromJSON(_adVars.eventValues)[id]) : _adVars.clickTAG;
		reportEvent(new ExternalEvent(EventType.Click, id || null));
		window.open(url);
	};

	this.trySet = function (behaviorGroup, panelGroup) {
		behaviorGroup = undefined == behaviorGroup ? "layer"       : behaviorGroup;
		panelGroup    = undefined == panelGroup    ? "secondLayer" : panelGroup;
		HTMLCreative.sendPieceCommand("trySet[" + behaviorGroup + ":" + panelGroup + "]")
	}

	this.videoStarted = function() {
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_VideoStarted"));
	};

	this.videoUserInitiated = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_VideoUserInitiated"));
	};

	/**@inner*/
	var videoPercentPlayed = function(percent) {
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_Video" + percent + "Played"));
	};

	this.video25Played = function() {
		videoPercentPlayed(25);
	};

	this.video50Played = function() {
		videoPercentPlayed(50);
	};

	this.video75Played = function() {
		videoPercentPlayed(75);
	};

	this.videoFullyPlayed = function() {
		reportEvent(new ExternalEvent(EventType.Automatic, "ADM_VideoFullyPlayed"));
	};

	this.videoPlayButton = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_VideoPlayButton"));
	};

	this.videoPauseButton = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_VideoPauseButton"));
	};

	this.videoReplayButton = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_VideoReplayButton"));
	};

	this.videoMute = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_VideoMute"));
	};

	this.videoUnMute = function() {
		reportEvent(new ExternalEvent(EventType.Interaction, "ADM_VideoUnMute"));
	};

	this.videoPlaybackTimerStart = function() {
		reportEvent(new ExternalEvent(EventType.Timer, "ADM_VideoPlayback", EventAction.Start));
	};

	this.videoPlaybackTimerStop = function() {
		reportEvent(new ExternalEvent(EventType.Timer, "ADM_VideoPlayback", EventAction.Stop));
	};

	this.videoUnmutedPlaybackTimerStart = function() {
		reportEvent(new ExternalEvent(EventType.Timer, "ADM_VideoUnmutedPlayback", EventAction.Start));
	};

	this.videoUnmutedPlaybackTimerStop = function() {
		reportEvent(new ExternalEvent(EventType.Timer, "ADM_VideoUnmutedPlayback", EventAction.Stop));
	};

	this.interaction = function(id) {
		reportEvent(new ExternalEvent(EventType.Interaction, id));
	};

	/**@inner*/
	var handleVars = function(vars) {
		for(var i in vars) {
			if(vars.hasOwnProperty(i)) {
				_adVars[i] = typeof(vars[i]) == "string" ? decodeURIComponent(vars[i]) : vars[i];
			}
		}
		_adVars.eventValues = _adVars.eventValues ? eval('(' + decodeURIComponent(_adVars.eventValues) + ')') : "";
		_adVars.assets = _adVars.assets ? eval('(' + decodeURIComponent(_adVars.assets) + ')') : "";
		_eventManager.fire(PieceEvent.Initialize, true);
	};

	this.setToReady = function() {
		postMessage(new PostingData(PostingDataType.Event, PieceEvent.SDKReady, null));
	};

	this.reportEvent = reportEvent;

	this.addEventListener = function(event, listener) {
		_eventManager.add(event, listener);
	};

	this.removeEventListener = function(event, listener) {
		_eventManager.remove(event, listener);
	};

	this.setCloseTimeout = function(timeout) {
		if(!_closeTimeout) {
			_closeTimeout = setTimeout(function() {
				HTMLCreative.reportAutomaticClose();
				HTMLCreative.remove();
			}, timeout);
		}
	};

	this.setCleareableCloseTimeout = function(timeout) {
		if(!_cleareableCloseTimeout) {
			_cleareableCloseTimeout = setTimeout(function() {
				HTMLCreative.reportAutomaticClose();
				HTMLCreative.remove();
			}, timeout);
		}
	};

	this.clearCloseTimeout = function() {
		clearTimeout(_cleareableCloseTimeout);
	};

	this.setPanelTracker = function(value) {
		postMessage(new PostingData(PostingDataType.Command, Command.SetPanelTracker, "{Identifier: '" + value + "'}"));
	};

	AdmBase.DOMEvent.add(window, 'message', postMessageHandler);
	AdmBase.DOMEvent.add(window.document, 'mousemove', function(e) {
		postMessage(new PostingData(PostingDataType.Event, PieceEvent.MouseMoveOverPiece, {layerX: e.layerX, layerY: e.layerY, offsetX: e.offsetX, offsetY: e.offsetY}));
	});
	this.setOnLoad(function() {
		postMessage(new PostingData(PostingDataType.Event, 'load', true));
	});
};

/**
 * ORMMA, MRAID namespaces
 * @public
 * @namespace
 */
window.mraid = window.ormma = new function() {

	var _eventManager = new AdmBase.EventManager();
	var _orientation;

	var AdState = {
		Loading: "loading",
		Default: "default",
		Resized: "resized",
		Expanded: "expanded",
		Hidden: "hidden"
	};

	HTMLCreative.addEventListener("orientationchange", function(orientation) {
		_orientation = orientation;
		_eventManager.fire("orientationChange", false, orientation);
	});

	var AdEvent = {
		Ready: "ready",
		StateChange: "stateChange",
		SizeChange: "sizeChange"
	};

	var expand = function() {
		HTMLCreative.expand();
		currentState = AdState.Expanded;
		_eventManager.fire(AdEvent.StateChange);
		_eventManager.fire(AdEvent.SizeChange);
	};

	var collapse = function() {
		HTMLCreative.collapse();
		currentState = AdState.Default;
		_eventManager.fire(AdEvent.StateChange);
	};

	var remove = function() {
		HTMLCreative.remove();
		currentState = AdState.Hidden;
		_eventManager.fire(AdEvent.StateChange);
	};

	HTMLCreative.addEventListener(PieceEvent.Initialize, function() {
		currentState = AdState.Default;
		if(typeof window.admReady !== "undefined") {
			window.admReady();
		}
	});

	var currentState = AdState.Loading;

	this.getOrientation = function() {
		return _orientation;
	};

	this.getState = function() {
		return currentState;
	};

	this.expand = function(url) {
		if(currentState == AdState.Default || currentState == AdState.Resized) {
			expand();
		}
	};

	this.resize = function(width, height) {
		if(currentState == AdState.Default || currentState == AdState.Expanded) {
			HTMLCreative.resize(width, height, 0, 0);
			currentState = AdState.Resized;
			_eventManager.fire(AdEvent.SizeChange);
			_eventManager.fire(AdEvent.StateChange);
		}
	};

	this.close = function() {
		if(currentState == AdState.Resized || currentState == AdState.Expanded) {
			collapse();
		}
		else if(currentState == AdState.Default) {
			remove();
		}
	};

	this.open = function(url) {
		window.open(url);
		HTMLCreative.reportEvent(new ExternalEvent(EventType.Click, null));
	};

	this.getMaxSize = function() {
		return HTMLCreative.getCreativeSize();
	};

	this.addEventListener = function(event, listener) {
		_eventManager.add(event, listener);
	};

	this.removeEventListener = function(event, listener) {
		_eventManager.remove(event, listener);
	};

	this.useCustomClose = function(custom) {
		HTMLCreative.sendPieceCommand("callAPIMethod", {
			method: "useCustomClose",
			args: [custom]
		});
	};

	this.setExpandProperties = function(props) {
		HTMLCreative.sendPieceCommand("callAPIMethod", {
			method: "setExpandProperties",
			args: [props]
		});
	};

	this.AdState = AdState;
	this.AdEvent = AdEvent;
};

HTMLCreative.setToReady();

var isLocal = window.location.protocol == 'file:';
var hasCallback = typeof window.admReady !== "undefined";

if(isLocal && hasCallback) {
	var queryString = new function(){
		this.checkLoader = 0;
		var query = location.search.substring(1);
		var pairs = query.split("&");
		for (var i=0; i<pairs.length; i++) {
			var pos = pairs[i].indexOf("=");
			if (pos != -1) {
				var name = pairs[i].substring(0, pos);
				var value = pairs[i].substring(pos + 1);
				this[name] = unescape(value);
			}else{
				this[pairs[i]] = undefined;
			}
		}
		
		var delay = this.checkLoader;
		if(!isNaN(delay)) {
			setTimeout(function(){window.admReady()}, delay*1000);
		}
	}
}
