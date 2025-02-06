// Клас Student для опису студента
class Student {
  constructor(lastName, firstName, grades) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.grades = grades; 
  }

  // Метод для підрахунку середнього бала студента
  getAverage() {
    return this.calculateAverage();
  }

  // Окрема функція для обчислення середнього бала
  calculateAverage() {
    const gradesArray = Object.values(this.grades);
    const total = gradesArray.reduce((sum, grade) => sum + grade, 0);
    return (total / gradesArray.length).toFixed(2);
  }
}

// Клас ListOfStudents для генерації таблиці студентів
class ListOfStudents {
  constructor(students) {
    this.students = students;
  }

  // Метод для отримання заголовків таблиці
  generateTableHeaders(subjects) {
    return `
      <thead>
        <tr>
          <th>Name</th>
          <th>LastName</th>
          ${subjects.map(subject => `<th>${subject}</th>`).join('')}
          <th>Avg</th>
        </tr>
      </thead>
    `;
  }

  // Метод для генерації рядків студентів
  generateStudentRows(subjects) {
    return this.students.map(student => {
      return `
        <tr>
          <td>${student.firstName}</td>
          <td>${student.lastName}</td>
          ${subjects.map(subject => `<td>${student.grades[subject]}</td>`).join('')}
          <td>${student.getAverage()}</td>
        </tr>
      `;
    }).join('');
  }

  // Метод для створення HTML таблиці
  getTableList() {
    const subjects = Object.keys(this.students[0].grades); // Отримуємо список предметів

    let table = `
      <table border="1" cellspacing="0" cellpadding="5">
        ${this.generateTableHeaders(subjects)}
        <tbody>
          ${this.generateStudentRows(subjects)}
        </tbody>
      </table>
    `;
    
    return table;
  }
}

// Клас StylesTable, що успадковується від ListOfStudents
class StylesTable extends ListOfStudents {
  // Метод для створення стилів таблиці
  getStyles() {
    return `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          text-align: center;
          padding: 8px;
        }
        th {
          background-color: #4CAF50;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        tr:nth-child(odd) {
          background-color: #eaf7ea;
        }
      </style>
    `;
  }

  // Перевизначений метод для створення таблиці зі стилями
  getTableList() {
    const table = super.getTableList(); // метод батьківського класу
    return this.getStyles() + table;
  }

  // Метод для підрахунку загального середнього бала групи
  getTotalAvg() {
    const totalAvg = this.students.reduce((sum, student) => sum + parseFloat(student.getAverage()), 0) / this.students.length;
    return totalAvg.toFixed(2);
  }
}

// Масив студентів
const students = [
  new Student("Федорко", "Петро", { Math: 3, History: 4, JS: 5 }),
  new Student("Остапенко", "Сергій", { Math: 4, History: 5, JS: 5 }),
  new Student("Колос", "Олеся", { Math: 4, History: 3, JS: 3 }),
];

const styledTable = new StylesTable(students);
document.body.innerHTML = styledTable.getTableList() + `<p>Середній бал по групі = ${styledTable.getTotalAvg()}</p>`;
