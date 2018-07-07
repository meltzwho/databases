// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('X-Parse-Application-Id', '39715d2bec12f9dc1df3e125e13298f475e7e68f');
  jqXHR.setRequestHeader('X-Parse-REST-API-Key', 'ed8204bd6cf2d93788258e1804415212609d218f');
});
