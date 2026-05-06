import prisma from "../config/db.js";

export const getCollegeReviews = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find college using slug
    const college = await prisma.college.findUnique({
      where: {
        slug,
      },

      select: {
        id: true,
      },
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    const reviews = await prisma.review.findMany({
      where: {
        collegeId: college.id,
      },

      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,

        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};