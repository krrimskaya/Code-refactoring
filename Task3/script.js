// Class Student for describing a student
// Code smell: Unused function
// The `getAverage` method in the `Student` class called `calculateAverage`, which was redundant and violated the DRY principle. 
// Now, `calculateAverage` is used directly where needed.
class Student {
  constructor(lastName, firstName, grades) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.grades = grades;
  }

  // Method to calculate average grade
  calculateAverage() {
    const gradesArray = Object.values(this.grades);
    const total = gradesArray.reduce((sum, grade) => sum + grade, 0);
    return (total / gradesArray.length).toFixed(2);
  }
}

// Class ListOfStudents for managing student data
// Code smell: Unused parameters in methods
// The `subjects` parameter was redundant in `generateTableHeaders` and `generateStudentRows` methods. 
// We can derive it directly from the `grades` of the first student, so the parameter has been removed.
class ListOfStudents {
  constructor(students) {
    this.students = students;
  }

  // Method for generating table headers
  generateTableHeaders() {
    const subjects = Object.keys(this.students[0].grades); // Get subjects from first student's grades
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

  // Method for generating student rows
  generateStudentRows() {
    const subjects = Object.keys(this.students[0].grades); // Get subjects from first student's grades
    return this.students.map(student => {
      return `
        <tr>
          <td>${student.firstName}</td>
          <td>${student.lastName}</td>
          ${subjects.map(subject => `<td>${student.grades[subject]}</td>`).join('')}
          <td>${student.calculateAverage()}</td>
        </tr>
      `;
    }).join('');
  }

  // Method for creating the full table
  getTableList() {
    let table = `
      <table border="1" cellspacing="0" cellpadding="5">
        ${this.generateTableHeaders()}
        <tbody>
          ${this.generateStudentRows()}
        </tbody>
      </table>
    `;
    return table;
  }
}

// Class StylesTable inherited from ListOfStudents
// Code smell: Too many responsibilities in classes
// The `ListOfStudents` class had multiple responsibilities (managing student data and creating HTML content).
// This was refactored to have `ListOfStudents` focus on the data and a new class (StylesTable) handle the HTML styling and additional formatting responsibilities.
class StylesTable extends ListOfStudents {
  // Method to create styles for the table
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

  // Overridden method to create table with styles
  getTableList() {
    const table = super.getTableList(); // Parent class method
    return this.getStyles() + table;
  }

  // Method for calculating total average grade for the group
  getTotalAvg() {
    const totalAvg = this.students.reduce((sum, student) => sum + parseFloat(student.calculateAverage()), 0) / this.students.length;
    return totalAvg.toFixed(2);
  }
}

// Array of students
const students = [
  new Student("Федорко", "Петро", { Math: 3, History: 4, JS: 5 }),
  new Student("Остапенко", "Сергій", { Math: 4, History: 5, JS: 5 }),
  new Student("Колос", "Олеся", { Math: 4, History: 3, JS: 3 }),
];

const styledTable = new StylesTable(students);
document.body.innerHTML = styledTable.getTableList() + `<p>Середній бал по групі = ${styledTable.getTotalAvg()}</p>`;
