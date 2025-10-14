const express = require("express");
const router = express.Router();

// Import models (I'll need to create these)
// const Skills = require('./models/Skills');

router.get("/users", (req, res) => {
  res.json([{ id: 1, test: "wheee" }]);
});

// for reference for myself here on how to strucutre the backend again
// router.get("/skills", async (req, res) => {
//   try {
//     // Uncomment when you have the Skills model
//     // const skills = await Skills.find();

//     // Temporary mock data for testing
//     const skills = [];

//     if (skills.length > 0) {
//       res
//         .status(200)
//         .json({ skills, status: 200, message: "successfully fetched skills" });
//     } else {
//       res.status(404).json({
//         status: 404,
//         message: "successfully fetched, but found no skills",
//       });
//     }
//   } catch (err) {
//     console.error(err.message || "Failed while fetching skills");
//     res.status(500).json({ message: "Error fetching skills", status: 500 });
//   }
// });

module.exports = router;
