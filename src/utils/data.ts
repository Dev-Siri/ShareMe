export const categories = [
  {
    name: "cars",
    image: "/categories/cars.avif",
  },
  {
    name: "fitness",
    image: "/categories/fitness.avif",
  },
  {
    name: "wallpaper",
    image: "/categories/wallpaper.avif",
  },
  {
    name: "websites",
    image: "/categories/websites.avif",
  },
  {
    name: "photo",
    image: "/categories/photo.avif",
  },
  {
    name: "food",
    image: "/categories/food.avif",
  },
  {
    name: "nature",
    image: "/categories/nature.avif",
  },
  {
    name: "art",
    image: "/categories/art.avif",
  },
  {
    name: "travel",
    image: "/categories/travel.avif",
  },
  {
    name: "quotes",
    image: "/categories/quotes.avif",
  },
  {
    name: "cats",
    image: "/categories/cats.avif",
  },
  {
    name: "dogs",
    image: "/categories/dogs.avif",
  },
  {
    name: "others",
    image: "/categories/others.avif",
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;

export const pinDetailQuery = (
  pinId: string
) => `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
}`;

export const pinDetailMorePinQuery = (pin: any) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const searchQuery = (
  searchTerm: string
) => `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;

export const userQuery = (userId: string) =>
  `*[_type == "user" && _id == '${userId}']`;

export const userCreatedPinsQuery = (
  userId: string
) => `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
  image{
    asset->{
      url
    }
  },
  _id,
  destination,
  postedBy->{
    _id,
    userName,
    image
  },
  save[]{
    postedBy->{
      _id,
      userName,
      image
    },
  },
}`;

export const userSavedPinsQuery = (userId: string) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user")!)
      : localStorage.clear();

  return userInfo;
};
