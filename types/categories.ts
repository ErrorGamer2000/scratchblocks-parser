const categories = [
  "motion",
  "looks",
  "sound",
  "events",
  "control",
  "sensing",
  "operators",
  "variables",
  "lists",
  "procedures"
] as const;

const extensionCategories = [
  "pen",
  "music",
  "videoSensing",
  "text2speech",
  "translate",
  "makeymakey",
  "microbit",
  "ev3",
  "boost",
  "wedo2",
  "gdxfor"
] as const;

type Category =
  | typeof categories[number]
  | `extension_${typeof extensionCategories[number]}`;

export default Category;
