
var lastrecieved = -1;
var idoflast = 1;

function getupdate(since){
	var url = "/update";
	if(since != ""){
        url = url + "?since="+ escape(since);
	}
	
	$.getJSON(url,
			  function(data){
				  var itemstoadd = _.map(data.reverse(), function(item){
				     return domainmarkup(item['value']);
				     lastrecieved = item["offset"]; 
				  });
				  
				  //new
				  var uc = $("#updatedcontent");
				  _.map(itemstoadd, function(item){
				     uc.prepend(item); 
				  });
				  
				  //old
				  //$("#updatedcontent").prepend(itemstoadd.join(''));
				  
				  removeoutofframeboxes();
				  setTimeout('getupdate(lastrecieved)', 1000);
			  });
}

function domainmarkup(domain){
    return "<div class='item' style='display:none;'><img src='http://"+domain+"/favicon.ico' onload='$(this).parent().addClass(\"visible\").show(\"slow\");' onerror='$(this).parent().remove();' /></div>"; 
}

function removeoutofframeboxes(){
    toremove = $("#updatedcontent .item").toArray().slice(805);
    while( $("#updatedcontent .visible").toArray().length > 780) {
        $("#updatedcontent .visible").last().remove();
    }
}

// 765