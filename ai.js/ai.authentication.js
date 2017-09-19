ai.authentication = function()
{

}
ai.authentication.prototype._data =  {
	config: {}
}; 
ai.authentication.prototype.init = function(config) {
	ai.authentication.__proto__._data.config = config;
};
ai.authentication.prototype.createUserWithEmailAndPassword = function(email, password) {
	
};