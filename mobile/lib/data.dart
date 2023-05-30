import 'package:http/http.dart' as http;
import 'dart:convert';

class Student {
  String name = "";
  int year = 0;
  String faculty = "";
  String department = "";
  String email = "";
  String phoneNumber = "";

  List<SemesterGrades> gradesBySemester = [];
  List<Request> requests = [];

  Student(this.name, this.year, this.faculty, this.department,
      this.email, this.phoneNumber);


  List<SemesterGrades> getGradesBySemester() {
    return gradesBySemester;
  }

  String getName() {
    return name;
  }

  List<Request> getRequests() {
    return requests;
  }

  void setGrades(List<SemesterGrades> newGrades) {
    gradesBySemester = newGrades;
  }

  void addRequest(String title, String description) async {
    final response = await http.post(Uri.parse('http://localhost:8080/addSecretaryRequest'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<dynamic, dynamic>{
          'fromCNP': "5010518410033",
          'subject': title,
          'message': description,
          'status': 'pending'
        }));
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
        int.parse(data['yearOfStudy']),
        data['school'],
        data['department'],
        data['email'],
        data['phone']);

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

    final response3 = await http.get(Uri.parse('http://localhost:8080/getSecretaryRequestsByCNP/5010518410033'));

    Map<String, dynamic> requestsMap = jsonDecode(response3.body);
    Map<String, dynamic> requestsMap2 = requestsMap['data'];
    List<dynamic> requests = requestsMap2['secretaryRequests'];
    for (Map<String, dynamic> request in requests) {
      bool status = request['status'] == 'solved' ? true : false;
      currentStudent.requests.add(Request(request['subject'], request['message'], status));
    }
  }
}
