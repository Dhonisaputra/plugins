if (!Object.prototype.listen)
    Object.prototype.listen = function (prop, handler) {
        var oldval = this[prop], newval = oldval,
        getter = function () {
            return newval;
        },
        setter = function (val) {
            oldval = newval;
            return newval = handler.call(this, prop, oldval, val);
        };
        if (delete this[prop]) { // can't listen constants
            if (Object.defineProperty) // ECMAScript 5
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter
                });
            else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
                Object.prototype.__defineGetter__.call(this, prop, getter);
                Object.prototype.__defineSetter__.call(this, prop, setter);
            }
        }
    };

// object.unlisten
if (!Object.prototype.unlisten)
    Object.prototype.unlisten = function (prop) {
        var val = this[prop];
        delete this[prop]; // remove accessors
        this[prop] = val;
    };

var ai = function()
{

}
ai.prototype._data = {
	connection : {}
}

ai.prototype._shadow = {
	connection : {}
}

ai.prototype._trigger = {
	connection : function(e)
	{
		ai.__proto__._data.connection = e
		ai.__proto__._shadow.connection = e
		if(e.type == 'offline')
		{
			// when offline
			ai.__proto__.on.disconnected.call()
		}else if(e.type == 'online')
		{
			// when online
			ai.__proto__.on.connected.call()
		}
		// when connection change
		ai.__proto__.on.changeConnectionStatus.call()
	}
}
ai.prototype.on = {
	disconnected: function(fnParams)
	{
		ai.__proto__._shadow.listen('connection', function(){
			if(ai.__proto__._data.connection.type == 'offline')
			{
				fnParams(ai.__proto__._data.connection)
			}
		})
	},
	connected: function(fnParams)
	{
		ai.__proto__._shadow.listen('connection', function(){
			if(ai.__proto__._data.connection.type == 'online')
			{
				fnParams(ai.__proto__._data.connection)
			}
		})
	},
	changeConnectionStatus: function(fnParams)
	{
		ai.__proto__._shadow.listen('connection', function(){
			var isOnline = ai.__proto__._data.connection.type == 'online';
			fnParams(isOnline, ai.__proto__._data.connection)
		})
	}
}

var ai = new ai();
window.addEventListener('offline', function(e) {
	ai._trigger.connection(e);
});

window.addEventListener('online', function(e) { 
	ai._trigger.connection(e);
});  


/*
|
| How To Use
|
*/
/*ai.on.changeConnectionStatus(function(isOnline, e){
	console.log(isOnline, event)
})*/

/*ai.on.connected(function(e){
	console.log(e)
})
*/

/*
ai.on.disconnected(function(e){
	console.log(e)
})*/
