// ตั้งค่า Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBFWbfWHee1QS9wCfm4xeaxxLdvNc6BJ5Q",
  authDomain: "dka-8a634.firebaseapp.com",
  projectId: "idka-8a634",
  storageBucket: "idka-8a634.firebasestorage.app",
  messagingSenderId: "927881248346",
  appId: "1:927881248346:web:923ef1916ff3427286a263"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// เพิ่ม task
addBtn.onclick = () => {
  let task = taskInput.value.trim();
  if(task){
    db.collection("tasks").add({ text: task });
    taskInput.value = "";
  }
};

// ฟังการเปลี่ยนแปลง real-time
db.collection("tasks").onSnapshot(snapshot => {
  taskList.innerHTML = "";
  snapshot.forEach(doc => {
    let li = document.createElement('li');
    li.textContent = doc.data().text;

    let delBtn = document.createElement('button');
    delBtn.textContent = "❌";
    delBtn.onclick = () => db.collection("tasks").doc(doc.id).delete();

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
});



document.addEventListener("keypress" , (e) => {
  if(e.key == "Enter") addBtn.click()
 })
