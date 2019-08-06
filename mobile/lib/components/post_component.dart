import 'package:flutter/material.dart';
import 'package:mobile_flutter/controllers/posts_controller.dart';
import 'package:mobile_flutter/models/photo.dart';

class PostComponent extends StatelessWidget {
  final Photo photo;
  final PostsController controller = PostsController();

  PostComponent({this.photo});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          border:
              Border(bottom: BorderSide(color: Colors.black12, width: 0.5))),
      padding: EdgeInsets.only(bottom: 15, top: 5),
      child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              SizedBox(
                width: 10,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    photo.author,
                    style: TextStyle(fontWeight: FontWeight.w600),
                  ),
                  Text(
                    photo.place,
                    style: TextStyle(fontSize: 12, color: Colors.black54),
                  )
                ],
              ),
              Expanded(
                child: Container(),
              ),
              IconButton(
                icon: Icon(Icons.more_horiz),
                onPressed: () {},
              )
            ],
          ),
          Container(
            color: Colors.black,
            child: Image.network(
                'https://omni-be.apps.us-west-2.online-starter.openshift.com/files/${photo.img}',
                height: 350,
                width: MediaQuery.of(context).size.width,
                fit: BoxFit.fitHeight),
          ),
          Row(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(left: 10.0, top: 7),
                child: InkWell(
                  child: Image.asset('assets/like@3x.png', width: 25),
                  onTap: () async {
                    controller.like(photo.id);
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 10.0, top: 7),
                child: InkWell(
                  child: Image.asset('assets/comment@3x.png', width: 25),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 10.0, top: 7),
                child: InkWell(
                  child: Image.asset(
                    'assets/send@3x.png',
                    width: 25,
                  ),
                ),
              ),
            ],
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            padding: EdgeInsets.only(left: 8, top: 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  "${photo.likes} Likes",
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
                ),
                SizedBox(
                  height: 2,
                ),
                Text(photo.description),
                SizedBox(
                  height: 2,
                ),
                Text(photo.hashtags ?? ''),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
