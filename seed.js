const { User } = require("./models/user");
const { Type } = require("./models/type");
const { Activity } = require("./models/activity");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const config = require("config");

const data = [
	{
		name: "Education",
		activities: [
			{
				activity: "Learn Express.js",
				accessibility: 0.25,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn to greet someone in a new language",
				accessibility: 0.2,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn a new programming language",
				accessibility: 0.25,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to fold a paper crane",
				accessibility: 0.05,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn about the Golden Ratio",
				accessibility: 0.2,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn calligraphy",
				accessibility: 0.1,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn to sew on a button",
				accessibility: 0.1,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to french braid hair",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how the internet works",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn Kotlin",
				accessibility: 0.8,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn GraphQL",
				accessibility: 0.8,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to use an Arduino",
				accessibility: 0.7,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn Javascript",
				accessibility: 0.9,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Research a topic you're interested in",
				accessibility: 0.9,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	},
	{
		name: "Recreational",
		activities: [
			{
				activity: "Learn how to play a new sport",
				accessibility: 0.2,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Have a football scrimmage with some friends",
				accessibility: 0.2,
				participants: 8,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Fill out a basketball bracket",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Play a game of tennis with a friend",
				accessibility: 0.4,
				participants: 2,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to iceskate or rollerskate",
				accessibility: 0.25,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Paint the first thing you see",
				accessibility: 0.2,
				participants: 1,
				price: 0.25,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Start a blog for something you're passionate about",
				accessibility: 0.1,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Start a garden",
				accessibility: 0.35,
				participants: 1,
				price: 0.3,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Catch up on world news",
				accessibility: 0.07,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Create a personal website",
				accessibility: 0.12,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Start a collection",
				accessibility: 0.5,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to a local thrift shop",
				accessibility: 0.2,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make a couch fort",
				accessibility: 0.08,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Buy a new house decoration",
				accessibility: 0.3,
				participants: 1,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Write a thank you letter to an influential person in your life",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Clean out your car",
				accessibility: 0.08,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Write a short story",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Do something nice for someone you care about",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Think of a new business idea",
				accessibility: 0.05,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to whistle with your fingers",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to write in shorthand",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make a simple musical instrument",
				accessibility: 0.25,
				participants: 1,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to the gym",
				accessibility: 0.1,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Try a food you don't like",
				accessibility: 0.05,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Conquer one of your fears",
				accessibility: 0.1,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Repaint a room in your house",
				accessibility: 0.4,
				participants: 1,
				price: 0.3,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Pull a harmless prank on one of your friends",
				accessibility: 0.2,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to a music festival with some friends",
				accessibility: 0.2,
				participants: 4,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Binge watch a trending series",
				accessibility: 0.2,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to make a website",
				accessibility: 0.3,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Create and follow a savings plan",
				accessibility: 0.2,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Watch a classic movie",
				accessibility: 0.1,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Plan a trip to another country",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Take a hike at a local park",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Have a picnic with some friends",
				accessibility: 0.1,
				participants: 3,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Have a bonfire with your close friends",
				accessibility: 0.1,
				participants: 4,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Take a class at your local community center that interests you",
				accessibility: 0.15,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to use a french press",
				accessibility: 0.3,
				participants: 1,
				price: 0.3,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Read a formal research paper on an interesting subject",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Surprise your significant other with something considerate",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go for a run",
				accessibility: 0.9,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Play basketball with a group of friends",
				accessibility: 0.7,
				participants: 5,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go see a Broadway production",
				accessibility: 0.3,
				participants: 4,
				price: 0.8,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Come up with some business ideas",
				accessibility: 1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go on a fishing trip with some friends",
				accessibility: 0.4,
				participants: 3,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Do yoga",
				accessibility: 0.9,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Visit a nearby museum",
				accessibility: 0.7,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	},
	{
		name: "Social",
		activities: [
			{
				activity: "Text a friend you haven't talked to in a long time",
				accessibility: 0.2,
				participants: 2,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Play a game of Monopoly",
				accessibility: 0.3,
				participants: 4,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go swimming with a friend",
				accessibility: 0.1,
				participants: 2,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go see a movie in theaters with a few friends",
				accessibility: 0.3,
				participants: 4,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Catch up with a friend over a lunch date",
				accessibility: 0.15,
				participants: 2,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to a concert with local artists with some friends",
				accessibility: 0.3,
				participants: 3,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Explore the nightlife of your city",
				accessibility: 0.32,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Hold a yard sale",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Have a paper airplane contest with some friends",
				accessibility: 0.05,
				participants: 4,
				price: 0.02,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to a concert with some friends",
				accessibility: 0.4,
				participants: 4,
				price: 0.6,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to an escape room",
				accessibility: 0.3,
				participants: 4,
				price: 0.5,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to a karaoke bar with some friends",
				accessibility: 0.35,
				participants: 4,
				price: 0.5,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Take a spontaneous road trip with some friends",
				accessibility: 0.3,
				participants: 4,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Invite some friends over for a game night",
				accessibility: 0.2,
				participants: 4,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make a new friend",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Start a webinar on a topic of your choice",
				accessibility: 0.9,

				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Visit your past teachers",
				accessibility: 0.7,

				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Have a photo session with some friends",
				accessibility: 0.8,
				participants: 4,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	},
	{
		name: "DIY",
		activities: [
			{
				activity: "Find a DIY to do",
				accessibility: 0.3,
				participants: 1,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Fix something that's broken in your house",
				accessibility: 0.3,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Create a compost pile",
				accessibility: 0.15,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make tie dye shirts",
				accessibility: 0.2,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make a scrapbook with pictures of your favorite memories",
				accessibility: 0.1,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn origami",
				accessibility: 0.3,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make origami",
				accessibility: 0.6,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn woodworking",
				accessibility: 0.3,
				participants: 1,
				price: 0.3,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	},
	{
		name: "Charity",
		activities: [
			{
				activity: "Volunteer at a local animal shelter",
				accessibility: 0.5,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Find a charity and donate to it",
				accessibility: 0.1,
				participants: 1,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Donate blood at a local blood center",
				accessibility: 0.35,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Volunteer and help out at a senior center",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Volunteer at your local food shelter",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Clean out your closet and donate the clothes you've outgrown",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Pick up litter around your favorite park",
				accessibility: 0.05,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Volunteer at your local food pantry",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	},
	{
		name: 'Cooking',
		activities: [
			{
				activity: "Bake pastries for you and your neighbor",
				accessibility: 0.3,
				participants: 1,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Bake something you've never tried before",
				accessibility: 0.3,
				participants: 1,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn a new recipe",
				accessibility: 0.05,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Create a cookbook with your favorite recipes",
				accessibility: 0.05,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make bread from scratch",
				accessibility: 0.2,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make homemade ice cream",
				accessibility: 0.2,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Cook something together with someone",
				accessibility: 0.8,
				participants: 2,
				price: 0.3,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Bake a pie with some friends",
				accessibility: 0.3,
				participants: 3,
				price: 0.3,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	},
	{
		name: 'Relaxation',
		activities: [
			{
				activity: "Take your dog on a walk",
				accessibility: 0.2,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Meditate for five minutes",
				accessibility: 0.05,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Start a book you've never gotten around to reading",
				accessibility: 0.1,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Take a caffeine nap",
				accessibility: 0.08,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Take a bubble bath",
				accessibility: 0.1,
				participants: 1,
				price: 0.15,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to a nail salon",
				accessibility: 0.5,
				participants: 1,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Teach your dog a new trick",
				accessibility: 0.15,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make a to-do list for your week",
				accessibility: 0.05,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go on a long drive with no music",
				accessibility: 0.2,
				participants: 1,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Watch a movie you'd never usually watch",
				accessibility: 0.15,
				participants: 1,
				price: 0.15,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Draw and color a Mandala",
				accessibility: 0.1,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Rearrange and organize your room",
				accessibility: 0.15,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Pot some plants and put them around your house",
				accessibility: 0.3,
				participants: 1,
				price: 0.4,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Plan a vacation you've always wanted to take",
				accessibility: 0.05,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Take your cat on a walk",
				accessibility: 0.1,
				participants: 1,
				price: 0.02,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Shop at support your local farmers market",
				accessibility: 0.1,
				participants: 1,
				price: 0.2,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Listen to a new podcast",
				accessibility: 0.12,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go to the library and find an interesting book",
				accessibility: 0.2,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Go stargazing",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Start a daily journal",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	},
	{
		name: 'Music',
		activities: [
			{
				activity: "Listen to your favorite album",
				accessibility: 0.2,
				participants: 1,
				price: 0.08,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn to play a new instrument",
				accessibility: 0.6,
				participants: 1,
				price: 0.55,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Listen to a new music genre",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Start a band",
				accessibility: 0.8,
				participants: 4,
				price: 0.3,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Have a jam session with your friends",
				accessibility: 0.3,
				participants: 5,
				price: 0.1,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn the Chinese erhu",
				accessibility: 0.4,
				participants: 1,
				price: 0.6,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Listen to music you haven't heard in a while",
				accessibility: 0.9,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	},
	{
		name: 'Busywork',
		activities: [
			{
				activity: "Wash your car",
				accessibility: 0.15,
				participants: 1,
				price: 0.05,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Create or update your resume",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Clean out your garage",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn to write with your nondominant hand",
				accessibility: 0.02,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make a budget",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Make a bucket list",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Memorize the fifty states and their capitals",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Resolve a problem you've been putting off",
				accessibility: 0,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			},
			{
				activity: "Learn how to make an Alexa skill",
				accessibility: 0.1,
				participants: 1,
				price: 0,
				imageUrl: "https://res.cloudinary.com/dzr4pw4fe/image/upload/v1600351345/boring-app/photo-1598113570377-8a09690457ef_crotw1.jpg"
			}
		]
	}
];

const users = [
	{
		email: "admin@mail.com",
		name: "Admin",
		isAdmin: true
	},
	{
		email: "user@mail.com",
		name: "User"
	}
]

async function seed() {
	await mongoose.connect(config.get("db"));

	await Activity.deleteMany({});
	await Type.deleteMany({});
	await User.deleteMany({});

	// Create Users
	for (let user of users) {

		let newUser = new User({
			email: user.email,
			name: user.name,
			password: config.get("customPassword"),
			isAdmin: !!user.isAdmin
		});
		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(newUser.password, salt);
		await newUser.save();
	}

	// Create Types and Activities
	for (let type of data) {
		const { _id: typeId } = await new Type({ name: type.name }).save();
		const activities = type.activities.map(activity => {
			return {
				...activity,
				type: { _id: typeId, name: type.name },
			};
		});
		await Activity.insertMany(activities);
	}

	mongoose.disconnect();

	console.info("Done!");
}

seed();