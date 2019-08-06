import 'package:flutter/material.dart';
import 'package:mobile_flutter/components/post_component.dart';
import 'package:mobile_flutter/controllers/posts_controller.dart';
import 'package:mobile_flutter/models/photo.dart';
import 'package:mobile_flutter/pages/new_page.dart';

class FeedPage extends StatefulWidget {
  @override
  _FeedPageState createState() => _FeedPageState();
}

class _FeedPageState extends State<FeedPage> {
  PostsController _postsController;

  @override
  void initState() {
    super.initState();
    _postsController = PostsController();
  }

  List<Widget> buildList(List<Photo> posts) {
    return posts.map((e) => PostComponent(photo: e)).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Container(
          child: Image.asset(
            'assets/logo@3x.png',
            width: 105,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 0.5,
        centerTitle: true,
        actions: <Widget>[
          InkWell(
            child: Container(
                padding: EdgeInsets.only(right: 16),
                child: Image.asset(
                  'assets/camera@3x.png',
                  width: 24,
                )),
            onTap: () {
              Navigator.push(
                  context, MaterialPageRoute(builder: (context) => NewPage()));
            },
          )
        ],
      ),
      body: SingleChildScrollView(
          child: StreamBuilder(
        stream: _postsController.getPhotos,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Column(children: buildList(snapshot.data));
          } else {
            return Container();
          }
        },
      )),
    );
  }
}
