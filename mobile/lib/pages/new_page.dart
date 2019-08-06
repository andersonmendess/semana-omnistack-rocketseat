import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_flutter/services/api.dart';

class NewPage extends StatefulWidget {
  @override
  _NewPageState createState() => _NewPageState();
}

class _NewPageState extends State<NewPage> {
  File _image;
  Api api = Api();

  Future getImage() async {
    var image = await ImagePicker.pickImage(source: ImageSource.gallery);

    setState(() {
      _image = image;
    });
  }

  void handleSend() async {
    Map<String, dynamic> data = {
      "author": _authorController.text,
      "place": _placeController.text,
      "description": _descriptionController.text,
      "hashtags": _hashtagsController.text,
      "image": UploadFileInfo(
          _image, _image.path.split('/').last.replaceAll(' ', '-')),
    };
    api.send(data);
    Navigator.pop(context);
  }

  final _authorController = TextEditingController();
  final _placeController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _hashtagsController = TextEditingController();

  Widget textInput(String title, TextEditingController controller) {
    return Container(
      padding: EdgeInsets.all(6),
      child: TextField(
        controller: controller,
        style: TextStyle(fontSize: 16, color: Colors.black87),
        decoration: InputDecoration(
          hintText: title,
          hintStyle: TextStyle(
            fontSize: 16,
          ),
          fillColor: Color.fromARGB(50, 200, 200, 200),
          filled: true,
          border: OutlineInputBorder(
              borderSide: BorderSide.none,
              borderRadius: BorderRadius.all(Radius.circular(8))),
        ),
      ),
    );
  }

  Widget button(Color color, String text, Function action) {
    return InkWell(
      child: Container(
        margin: EdgeInsets.all(3),
        width: MediaQuery.of(context).size.width,
        height: 53.5,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(4)),
          color: color,
        ),
        child: Center(
          child: Text(
            text,
            style: TextStyle(
                color: Colors.white, fontSize: 17, fontWeight: FontWeight.w700),
          ),
        ),
      ),
      onTap: action,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "New Post",
          style: TextStyle(color: Colors.black),
        ),
        elevation: 0.5,
        centerTitle: true,
        backgroundColor: Colors.white,
        iconTheme: IconThemeData(color: Colors.black)
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            SizedBox(
              height: 15,
            ),
            Center(
              child: _image == null
                  ? button(Colors.blue, "Pick a image", getImage)
                  : InkWell(
                      child: Image.file(
                        _image,
                        width: 160,
                      ),
                      onDoubleTap: getImage,
                    ),
            ),
            SizedBox(
              height: 15,
            ),
            textInput("Author", _authorController),
            textInput("Place", _placeController),
            textInput("Description", _descriptionController),
            textInput("hashtags", _hashtagsController),
            SizedBox(
              height: 15,
            ),
            button(Colors.green, "Send", handleSend),
            button(Colors.red, "Cancel", () {
              Navigator.pop(context);
            }),
          ],
        ),
      ),
    );
  }
}
