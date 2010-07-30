var lastrecieved = -1;
var idoflast = 1;
var interrupt = false;

function getupdate(since){
  var url = "/update";
  if(since != ""){
    url = url + "?since="+ escape(since);
  }

  $.getJSON(url,
    function(data){
      var itemstoadd = _.map(data.reverse(), function(item){
        lastrecieved = item["offset"];
        return domainmarkup(item['value']); 
      });

      var uc = $("#updatedcontent");
      _.map(itemstoadd, function(item){
        if(!interrupt){
          uc.prepend(item);
        }
      });
      removeoutofframeboxes();
      setTimeout('getupdate(lastrecieved)', 1000);
    });
  }

  function domainmarkup(domain){
    return "<div class='item' style='display:none;'><img src='http://"+domain+"/favicon.ico' onload='$(this).parent().addClass(\"visible\").show(\"slow\");' onerror='$(this).parent().remove();' /></div>"; 
  }

  function removeoutofframeboxes(){
    while( $("#updatedcontent .visible").toArray().length > 800) {
      $("#updatedcontent .visible").last().remove();
    }
  }

  function stopstart(){
    if(interrupt){
      startit();
    }
    else{
      stopit();
    }
  }

  function stopit(){
    interrupt = true;
    $('#currentHeader #play-pause a').removeClass('pausebutt');
    $('#currentHeader #play-pause a').addClass('playbutt');
  }

  function startit(){
    interrupt = false;
    $('#currentHeader #play-pause a').removeClass('playbutt');
    $('#currentHeader #play-pause a').addClass('pausebutt');
  }

  // 765