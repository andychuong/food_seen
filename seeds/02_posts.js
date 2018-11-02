exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([{
          id: 1,
          eventName: 'Free Food',
          foodName: 'Pizza',
          user_id: 1,
          address: '1023 Walnut St',
          city: 'Boulder',
          state: 'CO',
          zipcode: '80302',
          startTime: "2018-11-02T13:59:00.000Z",
          endTime: "2018-11-02T00:59:00.000Z",
          imageUrl: 'https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png',
          promoted: true,
          date: '2017-01-13'
        },
        {
          id: 2,
          eventName: 'Breakfast on Walnut',
          foodName: 'Bagels',
          user_id: 3,
          address: '1023 Walnut St',
          city: 'Boulder',
          state: 'CO',
          zipcode: '80302',
          startTime: "2018-11-02T00:59:00.000Z",
          endTime: "2018-11-02T00:59:00.000Z",
          imageUrl: 'https://prods3.imgix.net/images/articles/2017_09/non-feat-best-bagels-online-yom-kippur.jpg?auto=format%2Ccompress&ixjsv=2.2.3&w=670',
          promoted: false,
          date: '2018-02-03'
        },
        {
          id: 3,
          eventName: 'Cooking Classes and Pancakes',
          foodName: 'Pancakes',
          user_id: 4,
          address: '1023 Walnut St',
          city: 'Boulder',
          state: 'CO',
          zipcode: '80302',
          startTime: "2018-11-02T00:59:00.000Z",
          endTime: "2018-11-02T00:59:00.000Z",
          imageUrl: 'https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg',
          promoted: false,
          date: '2018-10-31'
        },
        {
          id: 4,
          eventName: 'Burgers and Networking',
          foodName: 'Burgers',
          user_id: 1,
          address: '1023 Walnut St',
          city: 'Boulder',
          state: 'CO',
          startTime: "2018-11-02T00:59:00.000Z",
          endTime: "2018-11-02T00:59:00.000Z",
          zipcode: '80302',
          imageUrl: 'https://images.unsplash.com/photo-1496930666207-e76e8253a950?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0dbe41f5791a28be62d57a39e09a5f54&auto=format&fit=crop&w=1950&q=80',
          promoted: true,
          date: '2017-01-13'
        },
        {
          id: 5,
          eventName: 'Kombucha Wednesdays',
          foodName: 'Kombucha',
          user_id: 3,
          address: '1023 Walnut St',
          city: 'Boulder',
          state: 'CO',
          startTime: "2018-11-02T00:59:00.000Z",
          endTime: "2018-11-02T00:59:00.000Z",
          zipcode: '80304',
          imageUrl: 'https://images.unsplash.com/photo-1479064578521-1eebbb96eca1?ixlib=rb-0.3.5&s=b7ffce20a46612303a480d42db6d6cf5&auto=format&fit=crop&w=1500&q=80',
          promoted: false,
          date: '2018-11-12'
        },
        {
          id: 6,
          eventName: 'Candy! 🧛🏼‍',
          foodName: 'Blood',
          user_id: 4,
          address: '1023 Walnut St',
          city: 'Pittsburgh',
          state: 'TV',
          startTime: "2018-11-02T00:59:00.000Z",
          endTime: "2018-11-02T00:59:00.000Z",
          zipcode: '80302',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRra7xdrL4LP_v4tJgNtcRZa4AQ7drciJKz2KvxlfH6Qb-nph0qLg',
          promoted: false,
          date: '2018-10-31'
        },
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));`)
    })
};