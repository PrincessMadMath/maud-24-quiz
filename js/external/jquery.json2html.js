function json2html_events(t){for(var e=$(document.createElement("i")).html(t.html),n=0;n<t.events.length;n++){var o=t.events[n],a=$(e).find("[json2html-event-id-"+o.type+"='"+o.id+"']");if(0===a.length)throw"jquery.json2html was unable to attach event "+o.id+" to DOM";$(a).removeAttr("json2html-event-id-"+o.type),$(a).on(o.type,o.data,function(t){t.data.event=t,t.data.action.call($(this),t.data)})}return $(e).children()}!function(t){t.json2html=function(e,n,o){if("undefined"!=typeof json2html){var a={output:"json2html"};switch(void 0!==o&&t.extend(a,o),a.output){case"json2html":return a.events=!0,json2html.transform(e,n,a);case"html":return a.events=!1,json2html.transform(e,n,a);case"jquery":a.events=!1;var r=json2html_events(json2html.transform(e,n,a));return r}}},t.fn.json2html=function(e,n,o){if("undefined"!=typeof json2html){var a={append:!0,replace:!1,prepend:!1,eventData:{}};return void 0!==o&&t.extend(a,o),a.events=!0,this.each(function(){var o=json2html_events(json2html.transform(e,n,a));a.replace?t.fn.replaceWith.call(t(this),o):a.prepend?t.fn.prepend.call(t(this),o):t.fn.append.call(t(this),o)})}}}(jQuery);