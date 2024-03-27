const getDailySales = (salesData) => {
  const today = new Date();
  const pastWeek = [];

  for (let i = 0; i < 7; i++) {
    pastWeek.unshift(new Date(today - i * 24 * 60 * 60 * 1000));
  }

  return pastWeek.map((date) => {
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

    const matchingResult = salesData.find((data) => data._id === formattedDate);

    return {
      date: formattedDate,
      totalSales: matchingResult ? matchingResult.totalSales : 0,
    };
  });
};

export default getDailySales;
