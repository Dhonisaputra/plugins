/*if (!Object.prototype.listen)
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
    };*/

var ai = function(config)
{
	config = $.extend({
		host: window.location.origin,
		v: 1,
		serverpath: 'server/api/'+config.v+'/'
	}, config)
	config.host = config.host[config.host-1] == '/'? config.host : config.host+'/'
	this.main.init(config);
	return this;
}

ai.prototype.main = {
	init : function(config) {
		ai.prototype.main._data.config = config
	},
	_data : {
		connection : {},
		config:{}
	},
	_shadow : {
		connection : {}
	},
	_trigger : {
		connection : function(e)
		{
			ai.prototype.main._data.connection = e
			ai.prototype.main._shadow.connection = e
			ai.prototype.main.on.changeConnectionStatus.call()
		}
	},
	_util: {
		ajax: function(options)
		{
			var deff  = $.Deferred(),
		        fData = new FormData();  

		    options = $.extend({
		        upload_progress: function(event, percentage)
		        {

		        },
		        download_progress: function(event, percentage)
		        {

		        },
		        isFile 		: false,
		        cache   	: true,
		        contentType : 'application/x-www-form-urlencoded', // set false if want to upload file
		        processData : true, // set false if want to upload file
		        type        : 'POST',
		        data: {}
		    }, options);

		    if(!options.url)
		    {
		        alert('no url given');
		        return false;
		    }

		    if(options.type == 'POST')
		    {
		        if(options.data.constructor != FormData)
		        {
		            $.each(options.data, function(a,b){
		                // Jika b bukan sebuah object file, dan didalam b ada object, gunakan stringify // Object File tidak boleh di stringify
		                if(b.constructor != File)
		                {
		                    b = typeof b == 'object'? JSON.stringify(b) : b;
		                }
		                fData.append(a,b);
		            })
		            options.data = fData;
		        }
		    }

		    options.xhr = function() {
		        var xhr = new window.XMLHttpRequest();
		        xhr.upload.addEventListener("progress", function(evt) {
		            if (evt.lengthComputable) {
		                var percentComplete = (evt.loaded / evt.total)*100;
		                options.upload_progress(event, percentComplete)
		                //Do something with upload progress here
		            }
		       }, false);

		       xhr.addEventListener("progress", function(evt) {
		           if (evt.lengthComputable) {
		               var percentComplete = (evt.loaded / evt.total)*100;
		                options.download_progress(event, percentComplete)
		               //Do something with download progress
		           }
		       }, false);

		       return xhr;
		    }

		    options.success = function(data){
		        deff.resolve(data);
		    }
		    options.error = function(data)
		    {
		        deff.reject(data);
		    }
		    console.log(options)
		    return $.ajax(options);
		}
	}

}
ai.prototype.on = {
		changeConnectionStatus: function(fnParams)
		{
			window.addEventListener('offline', function(e) {
				var isOnline = e.type == 'online';
				fnParams(isOnline, e)
			});

			window.addEventListener('online', function(e) { 
				var isOnline = e.type == 'online';
				fnParams(isOnline, e)
			}); 
			return this;
		},
		connected: function(fnParams)
		{
			window.addEventListener('online', function(e) { 
				fnParams(e)
			}); 
			return this;
		},
		disconnected: function(fnParams)
		{
			window.addEventListener('offline', function(e) {
				fnParams(e)
			});
			return this;
		}
};


/*
|----------------------------------
| How To Use
|----------------------------------
*/
/*
//check connection
ai.on.changeConnectionStatus(function(isOnline, event){
}).connected(function(event){
}).disconnected(function(event){
})

//S T O R A G E
# get Storage
ai.storage().ref().fetch()
.done(function(res){
	console.log(res)
})
.fail(function(e){

	console.log(e)
})







*/