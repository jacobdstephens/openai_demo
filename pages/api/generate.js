import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// generatePrompt(req.body.animal),

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: req.body.question,
    max_tokens: 2000,
    temperature: 0.6,
    stop: "---END---",
  });
  res.status(200).json({ response: completion.data });

}

/* Generate Prompt from Question

Example code:
${planet} in the ${house} ruled by the ${sign}

Alternative get planet specific keys:
${sun} in the ${house} ruled by the ${sign},
${moon} in the ${house} ruled by the ${sign},
${jupiter} in the ${house} ruled by the ${sign},


J
Explain the astrology of a person who has:  
The Sun in the 12th house Ruled by Scorpio, 
The Moon in the 1st house ruled by Sagittarius, 
Jupiter in the 10th house ruled by Virgo, 
Saturn in the 10th house ruled by Virgo, 
Venus in the 1st house ruled by Sagittarius,
Mars in the 10th house ruled by Virgo, 
and Mercury in the 12th house Ruled by Scorpio?


A
Explain the astrology of a person who has:  
The Sun in the 7th house Ruled by Capricorn, 
The Moon in the 9th house ruled by Pieces, 
Jupiter in the 8th house ruled by Aquarius, 
Saturn in the 6th house ruled by Sagittarius, 
Venus in the 7th house ruled by Capricorn,
 Mars in the 5th house ruled by Scorpio, 
and Mercury in the 7th house Ruled by Capricorn?

*/

/*
function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
*/