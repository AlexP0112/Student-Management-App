import 'package:flutter/material.dart';
import 'package:ip_project/student.dart';

class RequestForm extends StatefulWidget {
  const RequestForm({super.key});

  @override
  State<StatefulWidget> createState() {
    return RequestFormState();
  }
}

class RequestFormState extends State<RequestForm> {
  final _formKey = GlobalKey<FormState>();

  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          TextFormField(
            controller: _titleController,
            decoration: const InputDecoration(
              icon: Icon(Icons.title_rounded),
              hintText: 'Enter a title',
              labelText: 'Title',
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a title for your request';
              }
              return null;
            },
          ),
          TextFormField(
            controller: _descriptionController,
            decoration: const InputDecoration(
              icon: Icon(Icons.description),
              hintText: 'Enter a description',
              labelText: 'Description',
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a description for your request';
              }
              return null;
            },
          ),
          Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.all(30),
              child: OutlinedButton(
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.black,
                  shape: const StadiumBorder(),
                  side: BorderSide(width: 2, color: Colors.blue.shade300),
                ),
                child: const Text(
                  'Submit request',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                        content: Text('Data is in processing.')));
                    CurrentData.currentStudent.addRequest(
                        _titleController.text, _descriptionController.text);
                  }
                },
              )),
        ],
      ),
    );
  }
}
