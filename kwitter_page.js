var firebaseConfig = {
      apiKey: "AIzaSyAtfRPxjRe2vwVi0jgI_3GI8wDo1jNIS-E",
      authDomain: "kwitter-b4202.firebaseapp.com",
      databaseURL: "https://kwitter-b4202-default-rtdb.firebaseio.com",
      projectId: "kwitter-b4202",
      storageBucket: "kwitter-b4202.appspot.com",
      messagingSenderId: "920717109256",
      appId: "1:920717109256:web:de5eb39500a985ce10c9bd"
    };
   
    firebase.initializeApp(firebaseConfig);
  username= localStorage.getItem("username");
  roomname= localStorage.getItem("room_name");

  function Send(){
        console.log(roomname);
        msg_input= document.getElementById("mesageinput").value;
        firebase.database().ref(roomname).push({
              name:username,
              message:msg_input,
              likes:0
        });
        document.getElementById("mesageinput").value="";
  }
function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name= message_data["name"];
         message=message_data["message"];
         likes=message_data["likes"];
         name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
         likes_with_tag="<button class='btn btn-warning' id="+ firebase_message_id+" value="+likes+" onclick='update_likes(this.id)'>";
         span_with_tag="<span class='glyphicon glyphican-thumbs-up'>Like: "+likes+ "</span> </button> <hr>";
         row=name_with_tag+message_with_tag+likes_with_tag+span_with_tag;
         document.getElementById("output").innerHTML+=row;
      } });  }); }
getData();

function updated_likes(message_id){
console.log(message_id);
button_id=message_id;
likes=document.getElementById(button_id).value;
updated_likes=Number(likes)+1;
firebase.database().ref(roomname).child(message_id).update({
      like : updated_likes
});
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");

}
