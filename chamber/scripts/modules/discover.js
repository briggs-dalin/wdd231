var currentDate = new Date();

function showCalendar(year, month) {
    var firstDayOfMonth = new Date(year, month - 1, 1);
    var lastDayOfMonth = new Date(year, month, 0);
    var firstWeekday = firstDayOfMonth.getDay(); 
    var totalDays = lastDayOfMonth.getDate();
    var day = 0;
    var result = "<tr>"; 
    var currentDay = 0;
    console.log(totalDays);
    var lastCell = firstWeekday + totalDays;

    // Loop up to 42 (6 rows of 7 days)
    for (var i = 1; i <= 42; i++) {
        if (i == firstWeekday + 1) {
            // Determine the starting day
            day = 1;
        }
        if (i <= firstWeekday || i >= lastCell) {
            // Empty cell
            result += "<td>&nbsp;</td>";
        } else {
            // Display the day
            if (
                day == currentDate.getDate() &&
                month == currentDate.getMonth() + 1 &&
                year == currentDate.getFullYear()
            )
                result += "<td class='today'>" + day + "</td>"; // Current day with class 'today'
            else
                result += "<td style='background-color: silver;'>" + day + "</td>"; // Apply background only to days
            day++;
        }
        if (i % 7 == 0) {
            if (day > totalDays) break;
            result += "</tr><tr>\n";
        }
    }
    result += "</tr>";

    var months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    // Calculate next month and year
    var nextMonth = month + 1;
    var nextYear = year;
    if (month + 1 > 12) {
        nextMonth = 1;
        nextYear = year + 1;
    }

    // Calculate previous month and year
    var prevMonth = month - 1;
    var prevYear = year;
    if (month - 1 < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }

    // Update the caption and tbody content
    document
        .getElementById("calendar")
        .getElementsByTagName("caption")[0].innerHTML =
        "<div>" +
        months[month - 1] + " / " + year + "</div>" +
        "<div><a href='javascript:void(0)' onclick='showCalendar(" + prevYear + "," + prevMonth + ")'>&lt;</a> " +
        "<a href='javascript:void(0)' onclick='showCalendar(" + nextYear + "," + nextMonth + ")'>&gt;</a></div>";

    document
        .getElementById("calendar")
        .getElementsByTagName("tbody")[0].innerHTML = result;
}

// Initialize the calendar with the current month
showCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-image");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy-image");
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 0;
    const article = document.querySelector("#article-02");
    if (!article) {
        console.error("Article container not found in the DOM.");
        return;
    }
    const imageContainer = document.createElement("img");
    const descriptionContainer = document.createElement("h3");
    article.appendChild(imageContainer);
    article.appendChild(descriptionContainer);
    fetch("data/discover.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((events) => {
            if (!events || events.length === 0) {
                console.error("No events found in the JSON file.");
                return;
            }
            function updateImage() {
                const event = events[currentImageIndex];
                imageContainer.src = `images/${event.image}`;
                imageContainer.alt = event.description;
                imageContainer.loading = "lazy";
                descriptionContainer.textContent = event.description;
                currentImageIndex = (currentImageIndex + 1) % events.length;
            }
            updateImage();
            setInterval(() => {
                imageContainer.classList.remove("fade-in");
                void imageContainer.offsetWidth;
                imageContainer.classList.add("fade-in");
                updateImage();
            }, 10000);
        })
        .catch((error) => {
            console.error("Error fetching the JSON file:", error);
        });

});

document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav");
    hamButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        hamButton.classList.toggle("open");
    });
});    

document.addEventListener("DOMContentLoaded", function () {
    const visitorMessageContainer = document.querySelector("#visitor-message"); // The placeholder div in article-02
    const currentDate = new Date();
    const lastVisit = localStorage.getItem("lastVisit");

    // If this is the user's first visit, display a welcome message
    if (!lastVisit) {
        visitorMessageContainer.innerHTML = "<p>Welcome! Let us know if you have any questions.</p>";
    } else {
        // Calculate the difference in days between the current date and the last visit
        const lastVisitDate = new Date(lastVisit);
        const diffTime = currentDate - lastVisitDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Display different messages based on the time difference
        if (diffDays < 1) {
            visitorMessageContainer.innerHTML = "<p>Back so soon? Awesome!</p>";
        } else if (diffDays === 1) {
            visitorMessageContainer.innerHTML = "<p>You visited 1 day ago.</p>";
        } else {
            visitorMessageContainer.innerHTML = `<p>You last visited ${diffDays} days ago.</p>`;
        }
    }
    
    document.getElementById("currentyear").textContent =
        new Date().getFullYear();
    document.getElementById(
        "lastModified"
    ).textContent = `Last Modified: ${document.lastModified}`;

    // Store the current visit date in localStorage
    localStorage.setItem("lastVisit", currentDate.toISOString());
});
