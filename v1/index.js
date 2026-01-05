let task = "";
let completedTaskCount = 0;

function showTask() {
  if (task && task.length > 0) {
    console.log(`Текущая задача: ${task}`);
  } else {
    console.log("Задача отсутствует");
  }
}

function setTask() {
  if (task && task.length > 0) {
    console.log("Не могу добавить задачу, завершите или удалите прыдущую");
    return false;
  }

  const taskDescription = prompt("Что нужно сделать?", "");

  if (taskDescription && taskDescription.trim().length > 0) {
    task = taskDescription.trim();
    console.log(`Назначено: ${task}`);
    return true;
  } else {
    console.log("Задача не добавлена");
    return false;
  }
}

function completeTask() {
  if (task && task.length > 0) {
    console.log(`Задача: ${task} - выполнена`);
    task = "";
    completedTaskCount++;
    console.log(`Выполнено задач: ${completedTaskCount}`);
    return true;
  } else {
    console.log("Задачи нет");
    return false;
  }
}

function deleteTask() {
  if (task && task.length > 0) {
    console.log(`Задача: ${task} - удалена`);
    task = "";
    return true;
  } else {
    console.log("Задачи нет");
    return false;
  }
}

// setTask();
// setTask();
// showTask();
// completeTask();
// deleteTask();
