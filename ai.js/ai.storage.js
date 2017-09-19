ai.prototype.storage = function() {
	$this = this.storage.prototype;
	$this.config = this.main._data.config;
	$this.main = this;
	$this.config.request = $this.config.host
	return $this;
};
ai.prototype.storage.prototype =
{
	dynamicVariable:{
		fetch_params : {where:{}}
	},
	config: {},
	ref: function(file_id)
	{
		this.dynamicVariable.fetch_params.where.relatedWith = file_id||0;
		return this;

	},

	fetch: function(params)
	{
		var fetch_params 	= this.dynamicVariable.fetch_params;
		var url 			= this.config.request+this.config.serverpath+'storage/get';
		params 				= $.extend(fetch_params, {}, params)

		return this.main.main._util.ajax({
			url: url,
			data: params,
			type: 'GET',
		})
	},

	upload: function(params)
	{
		var fetch_params 	= this.dynamicVariable.fetch_params;
		var url 			= this.config.request+this.config.serverpath+'storage/upload';
		params 				= $.extend(fetch_params, {}, params)
		return this.main.main._util.ajax({
			url: url,
			data: params,
			type: "POST",
			cache: false,
			contentType: false,
			processData: false
		})	
	},

	mkdir: function(params)
	{
		var fetch_params 	= this.dynamicVariable.fetch_params;
		var url 			= this.config.request+this.config.serverpath+'storage/mkdir';
		params 				= $.extend(fetch_params, {}, params)
		return this.main.main._util.ajax({
			url: url,
			data: params,
			type: "POST",
			cache: false,
			contentType: false,
			processData: false
		})	
	},

	rm: function(params)
	{
		var fetch_params 	= this.dynamicVariable.fetch_params;
		var url 			= this.config.request+this.config.serverpath+'storage/rm';
		params 				= $.extend(fetch_params, {}, params)
		return this.main.main._util.ajax({
			url: url,
			data: params,
			type: "POST",
			cache: false,
			contentType: false,
			processData: false
		})	
	}
}