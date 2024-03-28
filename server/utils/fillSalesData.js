const fillSalesData = (salesData, duration) => {


  const today = new Date();
  const pastDate = [];

  if (duration === "week") {
    for (let i = 0; i < 7; i++) {
      pastDate.unshift(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
      );
    }
  } else {
    for (let i = 0; i < 12; i++) {
      pastDate.unshift(new Date(today.getFullYear(), today.getMonth() - i, 1));
    }
  }

  return pastDate.map((date) => {
    const format =
      duration === "week"
        ? { month: "short", day: "2-digit" }
        : { month: "short" };

    const formattedDate = date.toLocaleDateString("en-US", format);

    const matchingResult = salesData.find((data) => data._id === formattedDate);

    return {
      date: formattedDate,
      totalSales: matchingResult ? matchingResult.totalSales : 0,
    };
  });
};

export default fillSalesData;
