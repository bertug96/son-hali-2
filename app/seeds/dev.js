exports.seed = async function(knex) {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "person" CASCADE');
  await knex.raw('TRUNCATE TABLE "title" CASCADE');

  await knex('person').insert([
    {
      id: 1,
      name: "personName1",
      password: "password1",
      email: "email1@email.com"
    },
    {
      id: 2,
      name: "personName2",
      password: "password2",
      email: "email2@email.com"
    }
  ]);

  await knex('title').insert([
    {
      id: 1,
      title: "title1",
      person_id: 2
    },
    {
      id: 2,
      title: "title2",
      person_id: 1
    }
  ])
};
