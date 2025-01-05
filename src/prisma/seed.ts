import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// NOTE: When you seed the database, query on an Postgres Querying tool
// (ie. pgAdmin) by wrapping the table name in "" ie `SELECT * FROM "Answer";`
// instead of `SELECT * FROM Answer;`
async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      full_name: 'John Doe',
      display_name: 'johndoe',
      email: 'john.doe@example.com',
      password_digest: 'hashedpassword',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      full_name: 'Jane Smith',
      display_name: 'janesmith',
      email: 'jane.smith@example.com',
      password_digest: 'hashedpassword',
    },
  });

  // Create Events
  const event1 = await prisma.event.create({
    data: {
      title: 'Hackathon 2023',
      description: 'An exciting hackathon event.',
      start_date: new Date('2023-11-01'),
      end_date: new Date('2023-11-03'),
    },
  });

  // Create Projects
  await prisma.project.create({
    data: {
      event_id: event1.event_id,
      user_id: user1.user_id,
      title: 'Project Alpha',
      description: 'A project for the hackathon.',
      status: 'Open',
      level: 'Beginner',
      tech_stack: ['JavaScript', 'Node.js'],
    },
  });

  // Create Forms
  const form1 = await prisma.form.create({
    data: {
      title: 'Registration Form',
      owner_id: user1.user_id,
    },
  });

  // Create Screening Questions
  const question1 = await prisma.screeningQuestion.create({
    data: {
      form_id: form1.form_id,
      question_text: 'Why do you want to join?',
      question_type: 1,
      question_order: 1,
    },
  });

  // Create Responses
  const response1 = await prisma.response.create({
    data: {
      form_id: form1.form_id,
      respondent_id: user2.user_id,
    },
  });

  // Create Answers
  await prisma.answer.create({
    data: {
      response_id: response1.response_id,
      question_id: question1.question_id,
      answer_value: 'I am passionate about this project.',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
