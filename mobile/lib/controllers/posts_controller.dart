import 'package:adhara_socket_io/adhara_socket_io.dart';
import 'package:mobile_flutter/models/photo.dart';
import 'package:mobile_flutter/services/api.dart';
import 'dart:async';

class PostsController {
  SocketIO socket;
  List<Photo> _photos;
  Api _api;

  static PostsController _postsController;

  factory PostsController() {
    if (_postsController == null) {
      _postsController = PostsController._();
    }
    return _postsController;
  }

  PostsController._() {
    _api = Api();
    init();
  }

  StreamController _posts = StreamController<List<Photo>>();
  Stream get getPhotos => _posts.stream;

  void init() async {
    _photos = await _api.fetchPosts();
    _posts.add(_photos);

    await registerToSocket();
  }

  void like(String id) async {
    await _api.likePost(id);
  }

  updatePost(Photo newPost) {
    int index = _photos.lastIndexWhere((p) => p.id == newPost.id);
    _photos.removeAt(index);
    _photos.insert(index, newPost);

    _posts.add(_photos);
  }

  addPost(Photo post) {
    _photos = _photos.reversed.toList();
    _photos.add(post);
    _photos = _photos.reversed.toList();
    _posts.add(_photos);
  }

  Future<void> registerToSocket() async {

    print("Register socket function called");

    socket = await SocketIOManager().createInstance('https://omni-be.apps.us-west-2.online-starter.openshift.com');

    socket.onConnect((data) {
      print("Socket connected");
    });

    socket.onDisconnect((reason) {
      print("Socket disconnected: $reason ");
    });

    socket.on("post", (data) {
      print("Socket received 'post' event");
      addPost(Photo.fromJSON(data));
    });

    socket.on("like", (data) {
      print("Socket received 'like' event");
      updatePost(Photo.fromJSON(data));
    });

    socket.connect();
  }
}
