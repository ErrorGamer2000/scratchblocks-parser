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
  "procedures",
  "extension"
] as const;

type Category = typeof categories[number];

export default Category;
