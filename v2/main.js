//Обрабатывает "нормальный" порядок задач т.е с первой, а не нулевой.

function createTaskManager() {
  const tasks = [];
  let completedTasksCount = 0;

  const validateTaskIndex = (index, taskCount) => {
    if (
      typeof index !== "number" ||
      Number.isNaN(index) ||
      !Number.isInteger(index)
    ) {
      return {
        valid: false,
        message: "Номер задачи должен быть целым числом!",
      };
    }

    if (index < 1 || index > taskCount) {
      return {
        valid: false,
        message: `Задачи с номером ${index} не существует!`,
      };
    }

    return { valid: true, normalizedIndex: index - 1 };
  };
  const formatDate = (date) => {
    return date ? date.toLocaleString("ru-RU") : "не указана";
  };
  const showTaskDetails = (task, index) => {
    const status = task.isCompleted ? "Завершена" : "В работе";
    const completionInfo = task.isCompleted
      ? `\n Дата завершения: ${formatDate(task.completionDate)}`
      : "";

    console.log(`Задача №${index + 1}:
          Название: ${task.title}
          Описание: ${task.description}
          Статус: ${status}
          Дата создания: ${formatDate(task.creationDate)}${completionInfo}`);
  };

  return {
    showTask() {
      if (tasks.length === 0) {
        console.log("Задачи отсутствуют.");
        return null;
      }

      console.log(`\n Список задач (${tasks.length})`);
      tasks.forEach((task, index) => {
        showTaskDetails(task, index);
      });

      const inProgress = tasks.filter((task) => !task.isCompleted).length;
      console.log(
        `\n Статистика: ${inProgress} в работе, ${completedTasksCount} завершено.`
      );

      return true;
    },
    setTask() {
      const title = prompt("Название задачи:").trim();
      const description = prompt("Описание задачи:").trim();

      if (!title || !description) {
        console.log("Название и описание задачи обязательны!");
        return false;
      }

      const newTask = {
        title,
        description,
        isCompleted: false,
        creationDate: new Date(),
        completionDate: null,
      };

      tasks.push(newTask);

      console.log(`Добавлена задача №${tasks.length}:
        Название: ${newTask.title}
        Дата добавления: ${formatDate(newTask.creationDate)}`);

      return true;
    },
    completeTask() {
      if (tasks.length === 0) {
        console.log("Нет задач для завершения.");
        return false;
      }

      const input = prompt(
        `Введите номер задачи для завершения (1 - ${tasks.length}):`
      );
      const taskIndex = parseInt(input, 10);

      const validation = validateTaskIndex(taskIndex, tasks.length);
      if (!validation.valid) {
        console.log(`${validation.message}`);
        return false;
      }

      const { normalizedIndex } = validation;
      const task = tasks[normalizedIndex];

      if (task.isCompleted) {
        console.log(
          `Задача №${taskIndex} "${task.title}" уже завершена ${formatDate(
            task.completionDate
          )}`
        );
        return false;
      }

      task.isCompleted = true;
      task.completionDate = new Date();
      completedTasksCount++;

      console.log(`Задача №${taskIndex} "${task.title}" завершена!
        Дата завершения: ${formatDate(task.completionDate)}
        Всего выполнено задач: ${completedTasksCount}`);

      return true;
    },
    deleteTask() {
      if (tasks.length === 0) {
        console.log("Нет задач для удаления.");
        return false;
      }

      const input = prompt(
        `Введите номер задачи для удаления (1 - ${tasks.length}):`
      );
      const taskIndex = parseInt(input, 10);

      const validation = validateTaskIndex(taskIndex, tasks.length);
      if (!validation.valid) {
        console.log(`${validation.message}`);
        return false;
      }

      const { normalizedIndex } = validation;
      const task = tasks[normalizedIndex];

      if (!task.isCompleted) {
        const confirmDelete = confirm(
          `Задача №${taskIndex} "${task.title}" еще не выполнена.\nВсе равно удалить?`
        );

        if (!confirmDelete) {
          console.log(`Отмена удаления задачи №${taskIndex} "${task.title}"`);
          return false;
        }
      }

      tasks.splice(normalizedIndex, 1);
      if (task.isCompleted) completedTasksCount--;

      console.log(`Удалена задача №${taskIndex} "${task.title}"`);

      completedTasksCount = tasks.filter((ts) => ts.isCompleted).length;

      return true;
    },
    clearTasks() {
      if (tasks.length === 0) {
        console.log("Нет задач для очистки.");
        return false;
      }

      const confirmClear = confirm(
        `Вы уверены, что хотите удалить ВСЕ задачи (${tasks.length} шт.)?`
      );

      if (confirmClear) {
        const completedBefore = completedTasksCount;
        const lengthBefore = tasks.length;
        tasks.length = 0;
        completedTasksCount = 0;
        console.log(
          `Удалены все задачи (${completedBefore} завершенных, ${
            lengthBefore - completedBefore
          } незавершенных)`
        );
        return true;
      }
      console.log("Очистка задач отменена");
      return false;
    },
  };
}

let tm1 = createTaskManager();
// tm1.showTask();
// tm1.setTask();
// tm1.setTask();
// tm1.showTask();
// tm1.completeTask();
// tm1.showTask();
// tm1.deleteTask();
// tm1.clearTasks();
