let debug = process.env.NODE_ENV !== 'production';

const install = Vue => {
	let vk = Vue.prototype.vk;
	if (vk) {
		vk.log = console.log;
		console.log = function(...obj){
			if(debug){
				vk.log(...obj);
			}
		};
	}
}

export default {
	install
}

