function getCurrentSemester() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index

    let semesterString;
    let semester;
    
    // Adjust the year if the current month falls within the last 5 months of the year
    if (currentMonth >= 8) {
        currentYear++;
        semesterString = "Fall";
        semester = 1;
    } else if (currentMonth >= 1 && currentMonth <= 5) { // Check if current month falls within the first 5 months of the year
        semesterString = "Spring";
        semester = 2;
    } else { // If neither Fall nor Spring, assuming it's Summer
        semesterString = "Summer";
        semester = 3;
    }

    return { year: currentYear, semester, semesterString };
}

module.exports = getCurrentSemester;
