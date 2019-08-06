import 'package:mobile_flutter/models/photo.dart';
import 'package:dio/dio.dart';

class Api {
  Dio dio = Dio(BaseOptions(
      baseUrl: "https://omni-be.apps.us-west-2.online-starter.openshift.com"));

  Future<List> fetchPosts() async {
    Response res = await dio.get('/posts');
    List<Photo> list = [];
    res.data.forEach((e) {
      list.add(Photo.fromJSON(e));
    });
    return list;
  }

  Future<void> likePost(id) async {
    dio.post("/posts/$id/like");
  }

  Future<void> send(Map data) async {
    await dio.post("/posts", data: FormData.from(data));
  }
}
