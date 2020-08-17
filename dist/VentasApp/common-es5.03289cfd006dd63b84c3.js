function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,o){return e&&_defineProperties(t.prototype,e),o&&_defineProperties(t,o),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{ESM5:function(t,e,o){"use strict";o.d(e,"a",(function(){return a}));var n=o("tk/3"),r=o("fXoL"),a=function(){var t=function(){function t(e){_classCallCheck(this,t),this.http=e,this.url="http://u3schoolapp.herokuapp.com/",this.httpOptions={headers:new n.c({"Content-Type":"application/json",token:localStorage.getItem("token")})}}return _createClass(t,[{key:"getUsuarios",value:function(){return this.http.get(this.url+"/usuario",this.httpOptions)}},{key:"newUsuario",value:function(t){return new n.c({"Content-Type":"application/json",token:localStorage.getItem("token")}),this.http.post(this.url+"/usuario",{nombre:t.nombre,email:t.email,password:t.password,role:t.role},this.httpOptions)}},{key:"updateUsuario",value:function(t){return new n.c({"Content-Type":"application/json",token:localStorage.getItem("token")}),this.http.put("".concat(this.url,"/usuarios/").concat(t._id),{nombre:t.nombre,email:t.email,password:t.password,role:t.role},this.httpOptions)}},{key:"deleteUsuario",value:function(t){return new n.c({"Content-Type":"application/json",token:localStorage.getItem("token")}),this.http.delete("".concat(this.url,"/usuario/").concat(t),this.httpOptions)}},{key:"updateSelfUsuario",value:function(t){return this.http.put("".concat(this.url,"/usuario/self/").concat(t.idUsuario),{nombreUsuario:t.nombreUsuario,emailUsuario:t.emailUsuario,telefonoUsuario:t.telefonoUsuario,passwordUsuario:t.passwordUsuario},this.httpOptions)}},{key:"getSelfUsuario",value:function(t){return this.http.get("".concat(this.url,"/usuario/self/").concat(t),this.httpOptions)}},{key:"uploadProfilePic",value:function(t){var e=new FormData;e.append("profilePicture",t.imagen),e.append("id",t.idUsuario);var o={headers:new n.c({token:localStorage.getItem("token")})};return this.http.post(this.url+"/usuario/self/photo",e,o)}}]),t}();return t.\u0275fac=function(e){return new(e||t)(r.Pb(n.a))},t.\u0275prov=r.Db({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}]);