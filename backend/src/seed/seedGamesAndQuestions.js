
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Game from '../models/Game.js';
import Question from '../models/Question.js';

const GAME_DEFINITIONS = [
  {
    gameName: 'Picture Based MCQ',
    gameType: 'picture_mcq',
    description:
      'A picture is shown and the student picks the correct word from multiple options.',
    questions: [
      {
        questionText: 'Identify the animal shown.',
        imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46',
        options: ['elephant', 'tiger', 'lion', 'zebra'],
        correctAnswer: 'elephant',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/elephant--_gb_1.mp3'
      },
      {
        questionText: 'Identify the fruit shown.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg',
        options: ['apple', 'banana', 'mango', 'orange'],
        correctAnswer: 'banana',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/banana--_gb_1.mp3'
      },
      {
        questionText: 'Identify the animal shown.',
        imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
        options: ['dog', 'cat', 'rabbit', 'cow'],
        correctAnswer: 'dog',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dog--_gb_1.mp3'
      }
    ]
  },

  {
    gameName: 'Match the Column',
    gameType: 'match_column',
    description: 'Students match image cards with their correct words.',
    questions: [
      {
        questionText: 'Match the object to its correct name.',
        imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
        options: ['apple', 'ball', 'cat', 'dog'],
        correctAnswer: 'apple',
        audioUrl: null
      },
      {
        questionText: 'Match the correct vehicle.',
        imageUrl: 'https://images.unsplash.com/photo-1601758064226-1b8f1b61e3c0',
        options: ['car', 'bus', 'bike', 'train'],
        correctAnswer: 'car',
        audioUrl: null
      },
      {
        questionText: 'Match the correct nature object.',
        imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
        options: ['tree', 'flower', 'grass', 'leaf'],
        correctAnswer: 'tree',
        audioUrl: null
      }
    ]
  },

  {
    gameName: 'Correct Pronunciation Selection',
    gameType: 'pronunciation_selection',
    description: 'Students listen and choose the correctly pronounced word.',
    questions: [
      {
        questionText: 'Which audio pronounces "banana" correctly?',
        imageUrl: null,
        options: ['banana', 'banena', 'bannana', 'bonana'],
        correctAnswer: 'banana',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/banana--_gb_1.mp3'
      },
      {
        questionText: 'Which audio pronounces "apple" correctly?',
        imageUrl: null,
        options: ['apple', 'aple', 'appel', 'appl'],
        correctAnswer: 'apple',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/apple--_gb_1.mp3'
      },
      {
        questionText: 'Which audio pronounces "dog" correctly?',
        imageUrl: null,
        options: ['dog', 'dag', 'dug', 'doog'],
        correctAnswer: 'dog',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dog--_gb_1.mp3'
      }
    ]
  },

  {
    gameName: 'Drag and Arrange Jumbled Letters',
    gameType: 'jumbled_letters',
    description: 'Students arrange scrambled letters to form a meaningful word.',
    questions: [
      // {
      //   questionText: 'Arrange letters: B, I, R, D',
      //   imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/bird-1866604_1280.jpg',
      //   options: ['B', 'I', 'R', 'D'],
      //   correctAnswer: 'BIRD',
      //   audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/bird--_gb_1.mp3'
      // },
      {
        questionText: 'Arrange letters: C, A, T',
        imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
        options: ['C', 'A', 'T'],
        correctAnswer: 'CAT',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/cat--_gb_1.mp3'
      },
      // {
      //   questionText: 'Arrange letters: F, I, S, H',
      //   imageUrl: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/fish-156544_1280.png',
      //   options: ['F', 'I', 'S', 'H'],
      //   correctAnswer: 'FISH',
      //   audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/fish--_gb_1.mp3'
      // }
    ]
  },

  {
    gameName: 'Letter Pronunciation',
    gameType: 'letter_pronunciation',
    description: 'Students click letters and hear their pronunciation.',
    questions: [
      {
        questionText: 'Click letter A',
        imageUrl: null,
        options: ['A', 'B'],
        correctAnswer: 'A',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/a--_gb_1.mp3'
      },
      {
        questionText: 'Click letter B',
        imageUrl: null,
        options: ['B', 'C'],
        correctAnswer: 'B',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/b--_gb_1.mp3'
      },
      {
        questionText: 'Click letter C',
        imageUrl: null,
        options: ['C', 'D'],
        correctAnswer: 'C',
        audioUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/c--_gb_1.mp3'
      }
    ]
  }
];

const seed = async () => {
  try {
    await connectDB();

    // 🔥 Clear old data (ensures update every time)
    await Game.deleteMany({});
    await Question.deleteMany({});

    for (const definition of GAME_DEFINITIONS) {
      const { questions, ...gamePayload } = definition;

      const game = await Game.create(gamePayload);

      const questionDocs = questions.map((question) => ({
        ...question,
        gameId: game._id
      }));

      await Question.insertMany(questionDocs);
    }

    console.log('✅ Seed completed successfully with updated data.');
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();

