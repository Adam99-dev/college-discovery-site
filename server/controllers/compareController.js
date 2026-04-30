import prisma from "../config/db.js";

export const compareColleges = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "College ids are required",
      });
    }

    const collegeIds = ids
      .split(",")
      .map((id) => Number(id))
      .filter((id) => !isNaN(id));

    if (collegeIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Select at least 2 colleges",
      });
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: collegeIds,
        },
      },

      select: {
        id: true,
        name: true,
        location: true,
        fees: true,
        rating: true,
        placementPercentage: true,
      },
    });

    res.status(200).json({
      success: true,
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to compare colleges",
    });
  }
};