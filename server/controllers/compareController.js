import prisma from "../config/db.js";

// compare 3 colleges at max
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

    if (collegeIds.length > 3) {
      return res.status(400).json({
        success: false,
        message: "You can compare max 3 colleges",
      });
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: { in: collegeIds },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        state: true,
        feesMin: true,
        feesMax: true,
        rating: true,
        ranking: true,
        placementPercentage: true,
        averagePackage: true,
        highestPackage: true,
        establishedYear: true,
        totalStudents: true,
        exams: true,
        campusArea: true,
        image: true,

        courses: {
          select: {
            name: true,
            duration: true,
            fees: true,
          },
        },
      },
    });


    const orderedColleges = collegeIds.map((id) =>
      colleges.find((c) => c.id === id)
    );

    res.status(200).json({
      success: true,
      count: orderedColleges.length,
      colleges: orderedColleges,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to compare colleges",
    });
  }
};