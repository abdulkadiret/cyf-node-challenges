(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,a){e.exports=a(41)},30:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(21),l=a.n(o),r=(a(29),a(3)),i=a(4),c=a(6),u=a(5),m=a(7),d=(a(30),a(31),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target.value;a.setState({input:t})},a.handleMessagePost=function(e){if(e.preventDefault(),a.state.input){var t=localStorage.getItem("userId");fetch("http://localhost:3002/api/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:t,message:a.state.input})}).then(function(){a.setState({input:""})}).catch(function(e){return console.log("Error","input a message")})}},a.state={input:""},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("form",{className:"input-form",onSubmit:this.handleMessagePost,type:"submit"},s.a.createElement("input",{scrolling:"no",className:"text-input scroll",type:"text",name:"chatText",value:this.state.input,placeholder:"Write your message... and hit ENTER",onChange:this.handleChange,autoComplete:"off"}))}}]),t}(n.Component)),h=(a(32),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).getUsers=function(){fetch("http://localhost:3002/api/users/signed-in").then(function(e){return e.json()}).then(function(e){var t=localStorage.getItem("signedInUserId"),n=e&&e.filter(function(e){return e.signed_in_user_id===JSON.parse(t)});n&&n.length||(localStorage.setItem("signedInUserId",""),window.location.href="/login"),a.setState({users:e})})},a.state={users:[]},setInterval(a.getUsers,500),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getUsers()}},{key:"render",value:function(){var e=this.state.users;return e?s.a.createElement("ul",null,e.map(function(e,t){return s.a.createElement("li",{key:t},e.name)})):s.a.createElement("p",null,"Loading... ")}}]),t}(n.Component)),p=(a(33),function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).handleOnSentMessage=function(){e.onLoadMessages()},e.onLoadMessages=function(){fetch("http://localhost:3002/api/messages").then(function(e){return e.json()}).then(function(t){var a=e.state.messages.length!==t.length;t=t.sort(function(e,t){return e.message_id-t.message_id}),e.setState({messages:t,doScroll:a})})},e.changeToEditMode=function(t,a){t.preventDefault(),console.log("chnageTOOOEDIT"),e.setState({isInEditMode:!0,editModeId:a})},e.cancelEditMode=function(){console.log("cancelEditMode"),e.setState({isInEditMode:!1})},e.changeEditMode=function(t,a){console.log("changeEditMode"),e.state.isInEditMode&&!e.state.input||(e.state.isInEditMode&&e.handleEditMessage(t,a),e.setState({isInEditMode:!e.state.isInEditMode,editModeId:a}))},e.handleDeleteMessage=function(t){var a="http://localhost:3002/api/messages/".concat(t);fetch(a,{method:"DELETE"}),e.onLoadMessages()},e.handleEditMessage=function(t,a){t.preventDefault();var n=e.state.input;console.log(n);var s="http://localhost:3002/api/messages/".concat(a);fetch(s,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:n})}).then(function(e){return e.json()}).then(function(e){return console.log(e)}).catch(function(e){return console.error(e)}),e.onLoadMessages()},e.handleEditMessageInputChanges=function(t){e.setState({input:t.target.value})},e.state={messages:[],doScroll:!0,isInEditMode:!1,editModeId:null},e.messagesEnd=s.a.createRef(),setInterval(e.onLoadMessages,500),e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.onLoadMessages()}},{key:"componentDidUpdate",value:function(){this.state.doScroll&&(this.scrollToEnd(),this.setState({doScroll:!1}))}},{key:"scrollToEnd",value:function(){null!==this.messagesEnd.current&&this.messagesEnd.current.scrollIntoView({behaviour:"smooth"})}},{key:"render",value:function(){var e=this,t=localStorage.getItem("userId"),a=this.state,n=a.isInEditMode,o=a.editModeId;return s.a.createElement("div",null,s.a.createElement("ul",{className:"messages"},this.state.messages.map(function(a,l){return s.a.createElement("li",{key:l},s.a.createElement("div",{className:"sender"},a.name),s.a.createElement("div",{className:"bubble"},n&&a.message_id===o?s.a.createElement("form",{className:"input-group"},s.a.createElement("textarea",{id:"editTextarea",className:"form-control",autoFocus:!0,onFocus:e.defaultValue=e.onChange,rows:"4",type:"text",spellCheck:"true",defaultValue:a.message,onChange:e.handleEditMessageInputChanges,autoComplete:"off"}),s.a.createElement("span",{style:{display:"block"}},s.a.createElement("button",{type:"button",onClick:e.cancelEditMode,className:"btn-outline-danger ml-1",style:{display:"inline-block",float:"right"}},s.a.createElement("i",{className:"fa fa-times"})),s.a.createElement("button",{type:"button",onClick:function(t){return e.changeEditMode(t,a.message_id)},className:"btn-outline-success ml-0",style:{display:"inline-block",float:"right",position:"relative"}},s.a.createElement("i",{className:"fa fa-check"})))):a.message,JSON.parse(t)===a.user_id?s.a.createElement("span",{style:{display:"block"}},s.a.createElement("button",{className:"btn btn-link p-0 ml-1 mr-1",style:{display:"inline-block",float:"right"},onClick:function(){return window.confirm("Are you sure you wish to delete this message?")&&e.handleDeleteMessage(a.message_id)}},s.a.createElement("i",{className:"fa fa-trash fa-lg"})),s.a.createElement("button",{className:"btn btn-link p-0 ml-0 mr-1",style:{display:"block",float:"right"},onClick:function(t){return e.changeToEditMode(t,a.message_id)}},n&&a.message_id===o?null:s.a.createElement("i",{className:"fa fa-pencil-square-o fa-lg"}))):null))})),s.a.createElement("div",{ref:this.messagesEnd}))}}]),t}(n.Component)),g=a(10),f=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).handleLogout=function(){var t=localStorage.getItem("signedInUserId"),a="http://localhost:3002/api/users/signed-in/".concat(t);fetch(a,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){localStorage.setItem("signedInUserId",""),window.location.href="/login"}).catch(function(t){e.setState({isError:!0})})},e.state={user:""},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=localStorage.getItem("user");return s.a.createElement("div",{className:"app"},s.a.createElement("div",{className:"app-header"},s.a.createElement("h1",{className:"app-title"},"WeeApp"),e?s.a.createElement("button",{className:"btn btn-primary",type:"button",onClick:this.handleLogout,style:{position:"absolute",top:"20px",right:"20px"}},"Logout"):null),e?s.a.createElement("div",{className:"chat-app"},s.a.createElement("div",{className:"users-display"},s.a.createElement("h4",null,"Users Display")),s.a.createElement("div",{className:"users-panel"},s.a.createElement(h,null)),s.a.createElement("div",{className:"messages-board"},s.a.createElement(p,null)),s.a.createElement("div",{className:"text-area"},s.a.createElement(d,{user:e}))):s.a.createElement(g.a,{to:"/login"}))}}]),t}(n.Component),E=a(11),b=a(14);a(38);var v=function(e){return s.a.createElement("button",{type:"submit",className:"btn btn-secondary m-2"},e.name)},y=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={name:"",email:"",password:""},a.handleChange=function(e){a.setState(Object(b.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),console.log(a.state);var t=a.state,n=t.name,s=t.email,o=t.password;if(n&&s&&o){fetch("http://localhost:3002/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,email:s,password:o})}).then(function(e){return e.json()}).then(function(e){console.log("data of signup",e),e&&e[0]&&e[0].user_id&&(window.location.href="/login")})}},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"app"},s.a.createElement("div",{className:"app-login"},s.a.createElement("label",null,"Create Account"),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",null,s.a.createElement("input",{className:"signup",name:"name",placeholder:"Full name",type:"text",required:!0,value:this.state.name,onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("input",{className:"signup",name:"email",placeholder:"email",type:"email",required:!0,value:this.state.email,onChange:this.handleChange})),s.a.createElement("div",null,s.a.createElement("input",{className:"signup",name:"password",placeholder:"password",type:"password",required:!0,value:this.state.password,onChange:this.handleChange})),s.a.createElement(v,{name:"Sign up"}),s.a.createElement("br",null),s.a.createElement("p",null,"If you have an account ",s.a.createElement(E.b,{to:"/login"},"click here")," to go to the login page"))))}}]),t}(n.Component),I=(a(39),function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={email:null,password:"",isError:!1},a.onLogin=function(e){e.preventDefault();var t=a.state,n=t.email,s=t.password;if(n&&s){fetch("http://localhost:3002/api/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:s})}).then(function(e){return e.json()}).then(function(e){e&&e.success?(localStorage.setItem("user",e.data.name),localStorage.setItem("signedInUserId",e.signedIn.signed_in_user_id),localStorage.setItem("userId",e.data.user_id),window.location.href="/"):a.setState({isError:!0,message:e.data.message})}).catch(function(e){a.setState({isError:!0,message:"There is an error occurred, Please try again!"})})}},a.handleInputChange=function(e){e.preventDefault(),a.setState(Object(b.a)({},e.target.name,e.target.value))},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"app"},s.a.createElement("div",{className:"app-login"},s.a.createElement("form",{onSubmit:this.onLogin},s.a.createElement("div",null,s.a.createElement("input",{className:"login",name:"email",placeholder:"email",type:"email",onChange:this.handleInputChange})),s.a.createElement("div",null,s.a.createElement("input",{className:"login",name:"password",placeholder:"password",type:"password",onChange:this.handleInputChange})),s.a.createElement(v,{name:"Login"}),s.a.createElement("br",null),s.a.createElement("p",null,"If you don't have an account ",s.a.createElement(E.b,{to:"/signup"},"click here")," ","to creat an account"))))}}]),t}(n.Component)),O=function(){return s.a.createElement(E.a,null,s.a.createElement(g.b,{path:"/",exact:!0,component:(e=f,function(){var t=localStorage.getItem("signedInUserId");return console.log(t),t?s.a.createElement(e,null):s.a.createElement(g.a,{to:"/login"})})}),s.a.createElement(g.b,{path:"/login",exact:!0,component:I}),s.a.createElement(g.b,{path:"/signup",exact:!0,component:y}));var e};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(40);l.a.render(s.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[24,1,2]]]);
//# sourceMappingURL=main.e932c2c6.chunk.js.map