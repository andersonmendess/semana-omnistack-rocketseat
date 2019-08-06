class Photo {
  String id;
  String author;
  String description;
  String place;
  String img;
  int likes;
  String hashtags;

  Photo({
    this.id,
    this.author,
    this.description,
    this.place,
    this.img,
    this.likes,
    this.hashtags
  });

  factory Photo.fromJSON(Map <String, dynamic> json) {
    return Photo(
      id: json['_id'],
      author: json['author'],
      description: json['description'],
      place: json['place'],
      img: json['image'],
      likes: json['likes'] as int,
      hashtags: json['hashtags'],
      );
  }
}