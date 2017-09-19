ai.prototype.storage = function() {
	$this = ai.storage.prototype;
	$this.config = this.main._data.config;
	$this.main = this;
	$this.config.request = $this.config.host
	return ai.storage.prototype;
};
ai.prototype.storage.prototype =
{
	dynamicVariable:{
		fetch_params : {}
	},
	config: {},
	ref: function(folder)
	{
		folder = folder||'';
		var childSplit = folder.split('/')
		childSplitLast = childSplit.pop();
		this.dynamicVariable.fetch_params.relatedWith = childSplitLast||0;
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
	}
}