import 'package:flutter/material.dart';
import 'package:ip_project/student.dart';

class ViewCreator {
  static List<Widget> getViews() {
    return <Widget>[getHomeView(), getGradesView(), getRequestsView()];
  }

  static Widget getHomeView() {
    return ListView(
      children: <Widget>[
        const Center(
            child: Text(
          'Your profile',
          style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
        )),
        Center(
          child: Text(
            'Your name: ${CurrentData.dummyStudent.name}',
            style: const TextStyle(fontSize: 20),
          ),
        ),
        Center(
          child: Text(
            'Your group: ${CurrentData.dummyStudent.group}',
            style: const TextStyle(fontSize: 20),
          ),
        ),
        Center(
          child: Text(
            'Average grade: ${CurrentData.dummyStudent.getAverageGrade().toStringAsFixed(2)}',
            style: const TextStyle(fontSize: 20),
          ),
        )
      ],
    );
  }

  static Widget getGradesView() {
    return ListView(children: <Widget>[
      const Center(
          child: Text(
        'Your grades',
        style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
      )),
      DataTable(columns: const [
        DataColumn(
            label: Text('Subject',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
        DataColumn(
            label: Text('Grade',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
        DataColumn(
            label: Text('Date',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold))),
      ], rows: getGradesTableInfo()),
    ]);
  }

  static Widget getRequestsView() {
    return const Center(child: Text("requests"));
  }

  static List<DataRow> getGradesTableInfo() {
    List<DataRow> result = [];

    for (Grade g in CurrentData.dummyStudent.getGrades()) {
      result.add(DataRow(cells: [
        DataCell(Text(g.subject)),
        DataCell(Text(g.grade.toString())),
        DataCell(Text(g.date))
      ]));
    }

    return result;
  }
}
