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

  user=localStorage.getItem("username");
  document.getElementById("user_name").innerHTML="Welcome"+ user+"!!";

  function addRoom(){
      room_name=document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        pupose:"added the room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location= "kwitter_page.html";
  }

  function get_data(){
    firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; 
    Room_names = childKey;
    console.log(Room_names);
    row="<div class='room_name' id="+Room_names+" onclick='redirect_to_room_name(this.id)'>#"+Room_names+"</div><hr>";
    document.getElementById("output").innerHTML+=row;
});
    });
  }
  get_data();

  function redirect_to_room_name(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location="kwitter_page.html";
  }

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";

  }