import 'package:http/http.dart' as http;
import 'dart:convert';

class Student {
  String name;
  int year;
  String faculty;
  String department;
  String email;
  String phoneNumber;

  List<SemesterGrades> gradesBySemester = [];
  List<Request> requests = [];

  Student(this.name, this.year, this.faculty, this.department,
      this.email, this.phoneNumber);

  List<SemesterGrades> getGradesBySemester() {
    return gradesBySemester;
  }

  List<Request> getRequests() {
    return requests;
  }

  void setGrades(List<SemesterGrades> newGrades) {
    gradesBySemester = newGrades;
  }

  void addRequest(String title, String description) {
    requests.add(Request(title, description, false));
  }

  void setRequests(List<Request> req) {
    requests = req;
  }

  double getAverageGrade() {
    double sum = 0;
    int numberOfGrades = 0;

    for (SemesterGrades semester in gradesBySemester) {
      for (Grade g in semester.grades) {
        sum = sum + g.grade.toDouble();
        numberOfGrades += 1;
      }
    }

    return sum / numberOfGrades.toDouble();
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

class SemesterGrades {
  int year;

  List<Grade> grades;

  SemesterGrades(this.year, this.grades);
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
      3,
      'Automatica si Calculatoare',
      'CTI',
      'alex.kullman@gmail.com',
      '+40743876451');

  static void addData() async {
    final response = await http
      .get(Uri.parse('http://localhost:8080/getPersonalDataByCNP/5010518410033'));

    Map<String, dynamic> data = jsonDecode(response.body);
    currentStudent = Student(
        data['firstName'],
        data['year'],
        data['school'],
        data['department'],
        data['email'],
        data['phoneNumber']);

    final response2 = await http.get(Uri.parse('http://localhost:8080/getGradesByCNP/5010518410033'));

    List<dynamic> grades = jsonDecode(response2.body);
    Map<String, dynamic> gradeRegister = grades[0];
    List<dynamic> semesters = gradeRegister['history'];
    for (Map<String, dynamic> semester in semesters) {
      Map<String, dynamic> grades = semester['subjects'];
      List<Grade> gradesList = [];
      for (var grade in grades.entries) {
        gradesList.add(Grade(grade.key, grade.value));
      }
      currentStudent.gradesBySemester.add(SemesterGrades(semester['year'], gradesList));
    }


    // List<SemesterGrades> allGrades = [];

    // List<Grade> grades = [];
    // grades.add(Grade('Fizica', 8));
    // grades.add(Grade('Analiza matematica', 9));
    // grades.add(Grade('Algebra', 6));
    // grades.add(Grade('Proiectarea algoritmilor', 10));
    // grades.add(Grade('Proiectare logica', 9));
    // grades.add(Grade('Ingineria programelor', 10));

    // SemesterGrades semester1 = SemesterGrades(3, 1, grades);
    // allGrades.add(semester1);

    // List<Grade> grades2 = [];
    // grades2.add(Grade('Fizica2', 8));
    // grades2.add(Grade('Analiza matematica2', 9));
    // grades2.add(Grade('Algebra2', 6));
    // grades2.add(Grade('Proiectarea algoritmilor2', 10));
    // grades2.add(Grade('Proiectare logica2', 9));
    // grades2.add(Grade('Ingineria programelor2', 10));

    // SemesterGrades semester2 = SemesterGrades(3, 2, grades2);
    // allGrades.add(semester2);

    // List<Grade> grades3 = [];
    // grades3.add(Grade('Fizica3', 8));
    // grades3.add(Grade('Analiza matematica3', 9));
    // grades3.add(Grade('Algebra3', 6));
    // grades3.add(Grade('Proiectarea algoritmilor3', 10));
    // grades3.add(Grade('Proiectare logica3', 9));
    // grades3.add(Grade('Ingineria programelor3', 10));

    // SemesterGrades semester3 = SemesterGrades(2, 1, grades3);
    // allGrades.add(semester3);

    // currentStudent.setGrades(allGrades);

    List<Request> requests = [];
    requests.add(Request('Request1', 'some description here', false));
    requests.add(Request('Request2', 'some other description here', true));

    currentStudent.setRequests(requests);
  }
}
