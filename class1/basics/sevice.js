console.log("Service js file ");

function owner(){
	funitureShop('diningtable','teak wood',function(status, ){
		console.log(status);
	})
}

function furnitureShop(item, type, callback){
	carpenter(item,type, function(status,err){

	})

}
function carpenter(item,type, callback){
	
	callback('completed', false)
}