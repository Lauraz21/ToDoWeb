document.getElementById("userName").textContent =
  localStorage.getItem("userName");

fetch(`https://localhost:7171/api/ToDo`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((responseJson) => {
    CreateTodoTasks(responseJson);
  });

function Add() {
  document.getElementById("addBox").style = "display:block";
}

function SubmitTask() {
  const type = document.getElementById("TypeBox").value;
  const content = document.getElementById("ContentBox").value;
  const endDate = document.getElementById("endDateBox").value;
  const data = {
    userId: localStorage.getItem("userId"),
    type: type,
    content: content,
    endDate: endDate,
  };
  fetch(`https://localhost:7171/api/ToDo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((result) => {
    if (result.ok) {
      alert("New task added");
      window.location.reload();
    }
  });
}

function CreateTodoTasks(data) {
  const userEntries = data.filter(FilterByUser);
  for (entry of userEntries) {
    CreateElement(entry);
  }
}

function FilterByUser(entry) {
  return entry.userId === localStorage.getItem("userId");
}

function CreateElement(taskData) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "todo";

  CreateField("Type:", taskData.type, taskDiv, "TypeInput" + taskData.id);
  CreateField("Content:", taskData.content, taskDiv, "ContentInput" + taskData.id);
  CreateField("EndDate:", taskData.endDate, taskDiv, "EndDateInput" + taskData.id);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.className = "buttons";
  saveButton.setAttribute("onclick", `saveTask(${taskData.id})`);
  taskDiv.appendChild(saveButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "buttons";
  deleteButton.setAttribute("onclick", `deleteTask(${taskData.id})`);
  taskDiv.appendChild(deleteButton);
}

function CreateField(labelText, value, taskDiv, inputId) {
  const todoTasksDiv = document.getElementById("todoTasks");
  const fieldDiv = document.createElement("div");
  const fieldLabel = document.createElement("label");
  fieldLabel.textContent = labelText;
  fieldDiv.appendChild(fieldLabel);
  const fieldInput = document.createElement("input");
  fieldInput.className = "tasksBtn";
  fieldInput.type = "text";
  fieldInput.value = value;
  fieldInput.id = inputId;
  fieldDiv.appendChild(fieldInput);
  taskDiv.appendChild(fieldDiv);
  todoTasksDiv.appendChild(taskDiv);
}

function saveTask(taskId) {
  const type = document.getElementById("TypeInput" + taskId).value;
  const content = document.getElementById("ContentInput" + taskId).value;
  const endDate = document.getElementById("EndDateInput" + taskId).value;


  const data = {
    userId: localStorage.getItem("userId"),
    type: type,
    content: content,
    endDate: endDate,
    id: taskId,
  };
  fetch(`https://localhost:7171/api/ToDo/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      alert("Item saved");
    }
  });
}
function deleteTask(taskId) {
  fetch(`https://localhost:7171/api/ToDo/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      alert("Item deleted");
      window.location.reload();
    }
  });
}
