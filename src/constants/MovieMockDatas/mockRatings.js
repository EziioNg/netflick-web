// mockRatings.js
const mockRatings = [
  {
    id: 1,
    name: "Azrael",
    quote: "Lion El'Jonson",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1752394994/1290087214373539941_qz4wdj.png",
    battleCry:
      "The measure of true glory is not to give battle in the bright noon of war, surrounded by brave comrades upon the field of victory, but to valiantly fight on alone in the darkness, with no hope of aid or even remembrance, and to spit defiance in midnight's eye.",
  },
  {
    id: 2,
    name: "Helbrecht",
    quote: "Eternal Crusade...",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1752394994/1290090943420043364_oi2h5i.png",
    battleCry:
      "The galaxy is the Emperor's, and anyone or anything who challenges that claim is an enemy who must be destroyed.",
  },
  {
    id: 3,
    name: "Marneus Calgar",
    quote: "Roboute Guilliman",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1752394994/1290086664680505425_jvgyh0.png",
    battleCry:
      "We are the Ultramarines, the sons of Guilliman. Whilst we draw breath, we stand. Whilst we stand, we fight. Whilst we fight, we prevail. Nothing shall stay our wrath.",
  },
  {
    id: 4,
    name: "Sa'Kan",
    quote: "Vulkan lives...",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1752394994/1290087219566215198_ip3ts2.png",
    battleCry:
      "On the Anvil of War are the strong tempered and the weak made to perish, thus are men's souls tested as metal in the forge's fire.",
  },
  {
    id: 5,
    name: "Kayvaan Shrike",
    quote: "Corvus Corax",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1752394994/1290087217582047293_u2awgk.png",
    // battleCry: "Địt cụ thằng Lorgar",
    battleCry: "Lorgar...",
  },
  {
    id: 6,
    name: "Garviel Loken",
    quote: "Luna Wolves",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1754272240/1325758762937487391_vtlmsp.png",
    battleCry:
      "I was never a Son of Horus. I was and remain a Luna Wolf. A proud son of Cthonia, a loyal servant of the Emperor, beloved by all. I am your enemy.",
  },
  {
    id: 7,
    name: "Luis Dante",
    quote: "for the Emperor and Sanguinius...",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1752394994/1290086369607286824_yxezo5.png",
    // battleCry: "Địt mẹ thằng Horus",
    battleCry: "Horus...",
  },
  {
    id: 8,
    name: "Logan Grimnar",
    quote: "For Russ and the Allfather!",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1754397037/1290088213205094441_zgfyhk.png",
    battleCry:
      "The Sons of Fenris they are, hardened in the forge of their harsh world, eager for battle and honour. They are the grey warriors, ashen like the wolf, whose greatest joy is to hear the clamour of steel amidst the din of war.",
  },
  {
    id: 9,
    name: "Jubal Khan",
    quote: "For the Emperor and the Khan!",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1754397031/1290088211732893757_lv2vmq.png",
    battleCry:
      "Warriors of Chogoris! Brothers of the Great Tribe! The star hunt calls you, do you not hear it? The battle’s red edge is your home, the respect of your kinsmen your hearth. Plunge into the enemy's breast like a blade, cut out his heart, and you will know fulfillment. The Emperor has given us strength. In return we give him victory!",
  },
  {
    id: 10,
    name: "Mansirius Thrasius",
    quote: "Scythes of the Emperor",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1754272240/1310895887836512346_nhbjk8.png",
    battleCry:
      "The Aegida was the shield, but no more. Sotha shall not be defended, but shall strike at the darkness before it can grow, and reap a bitter harvest. Put out the call to the proud men and women of this world -- they have earned the right to fight and bleed and die alongside any warrior of this Chapter, and their sons shall be our brethren. Let them turn their ploughshares into swords, and stand with us as equals. If I am to be damned then it shall be on my own terms, and red with the blood of my foes. We stand no longer as the Emperor's shield, brothers, but as his noble Scythes.",
  },
  {
    id: 11,
    name: "Tyberos",
    quote: "Carcharodons Astra",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1752402190/1325757315953070193_khhmww.png",
    battleCry: "YOU!...DO NOT SEE TYBEROS!!!",
  },
  {
    id: 12,
    name: "Kaldor Draigo",
    quote: "Grey Knights",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1754275034/1290090937980030978_u2vqh8.png",
    battleCry:
      "We are the warriors of the Grey Knights, armoured in faith, shielded by devotion and armed with purity of purpose. But greater even than these, we carry the light of the divine Emperor of Mankind into the dark places to purge the Daemonic wherever it may be found.",
  },
  {
    id: 13,
    name: "Deathwatch",
    quote: "Suffer not the alien to live",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1752402190/1290090939947421696_z1mc7e.png",
    battleCry: "He who allows the alien to live shares its crime of existence.",
  },
  {
    id: 14,
    name: "Adeptus Mechanicus",
    quote: "Praise the Omnissiah",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1754275034/1325758892931809321_hrmn3l.png",
    battleCry:
      "There is no truth in flesh, only betrayal.\n" +
      "\nThere is no strength in flesh, only weakness.\n" +
      "\nThere is no constancy in flesh, only decay.\n" +
      "\nThere is no certainty in flesh but death.",
  },
  {
    id: 15,
    name: "Inquisitor",
    // quote: "Dị giáo 🤨💀?",
    quote: "Heresy...",
    symbol:
      "https://res.cloudinary.com/doam999z1/image/upload/v1754643053/1290288805177200681_bwonbr.png",
    battleCry:
      "I come to set straight that which is twisted; to cleanse that which is unclean; to judge he who is guilty; to punish he who has sinned. These things I do in the name of the most holy God-Emperor of Mankind, and I do them gladly.",
  },
];

export default mockRatings;
