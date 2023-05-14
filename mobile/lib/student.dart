class Student {
  String name;
  String group;
  int year;
  String faculty;
  String department;
  String email;
  String phoneNumber;

  List<Grade> grades = [];
  List<Request> requests = [];

  Student(this.name, this.group, this.year, this.faculty, this.department,
      this.email, this.phoneNumber);

  List<Grade> getGrades() {
    return grades;
  }

  List<Request> getRequests() {
    return requests;
  }

  void setGrades(List<Grade> newGrades) {
    grades = newGrades;
  }

  void addRequest(String title, String description) {
    requests.add(Request(title, description, false));
  }

  void setRequests(List<Request> req) {
    requests = req;
  }

  void setNewGradeForSubject(String subject, int newGrade) {
    for (Grade g in grades) {
      if (g.subject == subject) {
        g.setGrade(newGrade);
        break;
      }
    }
  }

  double getAverageGrade() {
    double sum = 0;
    for (Grade g in grades) {
      sum = sum + g.grade.toDouble();
    }

    return sum / grades.length.toDouble();
  }
}

class Grade {
  String subject;
  int grade;

  Grade(this.subject, this.grade);

  void setGrade(int newGrade) {
    grade = newGrade;
  }
}

class Request {
  String title;
  String description;
  bool solved;

  Request(this.title, this.description, this.solved);
}

class CurrentData {
  static Student currentStudent = Student(
      'Alexandru Kullman',
      '333CA',
      3,
      'Automatica si Calculatoare',
      'CTI',
      'alex.kullman@gmail.com',
      '+40743876451');

  static void addData() {
    List<Grade> grades = [];
    grades.add(Grade('Fizica', 8));
    grades.add(Grade('Analiza matematica', 9));
    grades.add(Grade('Algebra', 6));
    grades.add(Grade('Proiectarea algoritmilor', 10));
    grades.add(Grade('Proiectare logica', 9));
    grades.add(Grade('Ingineria programelor', 10));

    currentStudent.setGrades(grades);

    List<Request> requests = [];
    requests.add(Request('Request1', 'some description here', false));
    requests.add(Request('Request2', 'some other description here', true));

    currentStudent.setRequests(requests);
  }
}
