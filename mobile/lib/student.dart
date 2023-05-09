class Student {
  String name;
  String group;
  int year;
  String faculty;

  List<Grade> grades = [];
  List<Request> requests = [];

  Student(this.name, this.group, this.year, this.faculty);

  List<Grade> getGrades() {
    return grades;
  }

  List<Request> getRequests() {
    return requests;
  }

  void setGrades(List<Grade> newGrades) {
    grades = newGrades;
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
  String date;

  Grade(this.subject, this.grade, this.date);

  void setGrade(int newGrade) {
    grade = newGrade;
  }
}

class Request {
  int? requestID;
  String? text;
  int? requestType;

  Request(this.requestID, this.text, this.requestType);
}

class CurrentData {
  static Student dummyStudent =
      Student('Alexandru Kullman', '333CA', 3, 'Automatica');
  static void addData() {
    List<Grade> grades = [];
    grades.add(Grade('Fizica', 8, '2.03.2023'));
    grades.add(Grade('Analiza matematica', 9, '3.03.2023'));
    grades.add(Grade('Algebra', 6, '2.03.2023'));
    grades.add(Grade('Proiectarea algoritmilor', 10, '4.03.2023'));
    grades.add(Grade('Proiectare logica', 9, '5.03.2023'));
    grades.add(Grade('Ingingeria programelor', 10, '2.03.2023'));

    dummyStudent.setGrades(grades);
  }
}
