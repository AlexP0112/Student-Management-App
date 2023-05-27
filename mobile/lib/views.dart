import 'package:flutter/material.dart';
import 'package:ip_project/request_form.dart';
import 'package:ip_project/data.dart';

class GradesView extends StatefulWidget {
  const GradesView({super.key});

  @override
  State<StatefulWidget> createState() => _GradesViewState();
}

class _GradesViewState extends State<GradesView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.all(10),
        children: _getAllGradesListView(),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _refreshGrades,
        child: const Icon(Icons.refresh),
      ),
    );
  }

  List<Widget> _getAllGradesListView() {
    List<Widget> result = [];

    result.add(const Center(
        heightFactor: 4.0,
        child: Text(
          'Your grades',
          style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
        )));

    int index = 0;
    for (SemesterGrades semester
        in CurrentData.currentStudent.gradesBySemester) {
      result.add(Center(
          heightFactor: 1.0,
          child: Text(
            'Year ${semester.year.toString()}, Semester ${semester.semester.toString()}',
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
          )));

      result.add(DataTable(columns: const [
        DataColumn(
            label: Text('Subject',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
        DataColumn(
            numeric: true,
            label: Text('Grade',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
      ], rows: _getGradesTableInfo(index)));
      index++;
    }

    return result;
  }

  void _refreshGrades() {
    // TODO: Stefan
  }

  List<DataRow> _getGradesTableInfo(int index) {
    List<DataRow> result = [];

    for (Grade g
        in CurrentData.currentStudent.getGradesBySemester()[index].grades) {
      result.add(DataRow(cells: [
        DataCell(Text(g.subject)),
        DataCell(Text(g.grade.toString())),
      ]));
    }

    return result;
  }
}

class RequestsView extends StatefulWidget {
  const RequestsView({super.key});

  @override
  State<StatefulWidget> createState() => _RequestsViewState();
}

class _RequestsViewState extends State<RequestsView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: ListView(padding: const EdgeInsets.all(10), children: <Widget>[
          const Center(
              heightFactor: 4.0,
              child: Text(
                'Office requests status',
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
              )),
          DataTable(columns: const [
            DataColumn(
                label: Text('Title',
                    style:
                        TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
            DataColumn(
                label: Text('Description',
                    style:
                        TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
            DataColumn(
                label: Text('Status',
                    style:
                        TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
            DataColumn(label: Text(''))
          ], rows: _getRequestsTableInfo()),
        ]),
        floatingActionButton: FloatingActionButton(
          onPressed: _refreshRequests,
          child: const Icon(Icons.refresh),
        ));
  }

  void _refreshRequests() {
    // TODO: Stefan
  }

  List<DataRow> _getRequestsTableInfo() {
    List<DataRow> result = [];

    for (Request req in CurrentData.currentStudent.getRequests()) {
      result.add(DataRow(cells: [
        DataCell(Text(req.title)),
        DataCell(Text(req.description)),
        DataCell(Text(req.solved ? "Solved" : "Pending...")),
        DataCell(
            req.solved ? const Icon(Icons.done) : const Icon(Icons.pending))
      ]));
    }

    return result;
  }
}

class ViewProvider {
  static List<Widget> getViews() {
    return <Widget>[
      getHomeView(), // stateless view
      const GradesView(), // stateful view
      const RequestsView(), // stateful view
      const RequestForm() // stateful view
    ];
  }

  static Widget getHomeView() {
    return ListView(
      padding: const EdgeInsets.all(10),
      children: <Widget>[
        const Center(
            heightFactor: 4.0,
            child: Text(
              'Your profile',
              style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
            )),
        Align(
          heightFactor: 2.0,
          widthFactor: 1.0,
          alignment: Alignment.centerLeft,
          child: Text(
            '   Name:                   ${CurrentData.currentStudent.name}',
            style: const TextStyle(fontSize: 22),
          ),
        ),
        Align(
          heightFactor: 2.0,
          widthFactor: 10.0,
          alignment: Alignment.centerLeft,
          child: Text(
            '   Email:                   ${CurrentData.currentStudent.email}',
            style: const TextStyle(fontSize: 22),
          ),
        ),
        Align(
          heightFactor: 2.0,
          widthFactor: 1.0,
          alignment: Alignment.centerLeft,
          child: Text(
            '   Phone number:   ${CurrentData.currentStudent.phoneNumber}',
            style: const TextStyle(fontSize: 22),
          ),
        ),
        Align(
          heightFactor: 2.0,
          widthFactor: 1.0,
          alignment: Alignment.centerLeft,
          child: Text(
            '   Group:                  ${CurrentData.currentStudent.group}',
            style: const TextStyle(fontSize: 22),
          ),
        ),
        Align(
          heightFactor: 2.0,
          widthFactor: 1.0,
          alignment: Alignment.centerLeft,
          child: Text(
            '   Faculty:                ${CurrentData.currentStudent.faculty}',
            style: const TextStyle(fontSize: 22),
          ),
        ),
        Align(
          heightFactor: 2.0,
          widthFactor: 1.0,
          alignment: Alignment.centerLeft,
          child: Text(
            '   Department:       ${CurrentData.currentStudent.department}',
            style: const TextStyle(fontSize: 22),
          ),
        ),
        Align(
          heightFactor: 2.0,
          widthFactor: 1.0,
          alignment: Alignment.centerLeft,
          child: Text(
            '   Average grade:   ${CurrentData.currentStudent.getAverageGrade().toStringAsFixed(2)}',
            style: const TextStyle(fontSize: 22),
          ),
        )
      ],
    );
  }
}
