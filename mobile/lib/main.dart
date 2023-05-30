import 'package:flutter/material.dart';
import 'package:ip_project/data.dart';
import 'package:ip_project/views.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // the root widget
  @override
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    setState(() {
      CurrentData.addData();
    });
    super.didChangeDependencies();
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Student App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Student App'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedViewIndex = 3;
  static final List<Widget> _views = ViewProvider.getViews();

  void _onItemInNavigationBarPressed(int index) {
    setState(() {
      _selectedViewIndex = index;
    });
  }

  Widget _buildBottomNavigationBar() {
    return BottomNavigationBar(
        showSelectedLabels: true,
        type: BottomNavigationBarType.fixed,
        showUnselectedLabels: true,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.grading), label: 'Grades'),
          BottomNavigationBarItem(
              icon: Icon(Icons.pending), label: 'Requests status'),
          BottomNavigationBarItem(
              icon: Icon(Icons.message), label: 'Create request'),
        ],
        selectedItemColor: Colors.amber[800],
        currentIndex: _selectedViewIndex,
        onTap: _onItemInNavigationBarPressed);
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called
    return Scaffold(
        appBar: AppBar(title: const Text("Student App")),
        body: _views.elementAt(_selectedViewIndex),
        bottomNavigationBar: _buildBottomNavigationBar());
  }
}
