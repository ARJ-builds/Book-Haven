/* =========================================================
   BOOK HAVEN - APP.JS
   ========================================================= */


/* =========================================================
   BOOK DATABASE
   ========================================================= */

const books = [
    {
        id: "atomic-habits",
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self Help",
        year: 2018,
        pages: 320,
        desc:
            "A practical guide to building better habits, breaking bad ones, and making small changes that create remarkable results."
    },

    {
        id: "midnight-library",
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "Fiction",
        year: 2020,
        pages: 304,
        desc:
            "A thoughtful fiction story exploring choices, possibilities and the many lives a person might imagine."
    },

    {
        id: "sapiens",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "History",
        year: 2011,
        pages: 498,
        desc:
            "A broad journey through human history, from early humans to the modern world."
    },

    {
        id: "dune",
        title: "Dune",
        author: "Frank Herbert",
        genre: "Sci-Fi",
        year: 1965,
        pages: 688,
        desc:
            "An epic science-fiction adventure set on the desert planet Arrakis."
    },

    {
        id: "1984",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        year: 1949,
        pages: 328,
        desc:
            "A classic dystopian novel about surveillance, truth and individual freedom."
    },

    {
        id: "hobbit",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        year: 1937,
        pages: 310,
        desc:
            "A fantasy adventure following Bilbo Baggins on an unexpected journey."
    },

    {
        id: "rich-dad",
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        genre: "Finance",
        year: 1997,
        pages: 336,
        desc:
            "A popular introduction to personal finance and financial thinking."
    },

    {
        id: "clean-code",
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Programming",
        year: 2008,
        pages: 464,
        desc:
            "A practical programming book about writing readable and maintainable code."
    },

    {
        id: "thinking",
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Psychology",
        year: 2011,
        pages: 499,
        desc:
            "An exploration of the two systems that shape human judgment and decisions."
    },

    {
        id: "educated",
        title: "Educated",
        author: "Tara Westover",
        genre: "Memoir",
        year: 2018,
        pages: 352,
        desc:
            "A memoir about education, identity and the journey toward a wider understanding of the world."
    },

    {
        id: "martian",
        title: "The Martian",
        author: "Andy Weir",
        genre: "Sci-Fi",
        year: 2011,
        pages: 369,
        desc:
            "A fast-paced survival story about an astronaut stranded on Mars."
    },

    {
        id: "mockingbird",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        year: 1960,
        pages: 336,
        desc:
            "A coming-of-age classic centered on justice, empathy and community."
    }
];


/* =========================================================
   BOOK COVER
   ========================================================= */

function cover(book) {

    const coverUrl =
        `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.title)}-L.jpg`;

    return `
        <div class="cover">

            <img
                src="${coverUrl}"
                alt="${book.title} book cover"
                onerror="this.style.display='none'"
            >

            <div class="cover-text">

                <h3>
                    ${book.title}
                </h3>

                <p>
                    ${book.author}
                </p>

            </div>

        </div>
    `;
}


/* =========================================================
   BOOK CARD
   ========================================================= */

function card(book) {

    return `
        <article class="card">

            <a href="book.html?id=${book.id}">

                ${cover(book)}

                <h3>
                    ${book.title}
                </h3>

                <div class="author">
                    ${book.author}
                </div>

                <span class="tag">
                    ${book.genre}
                </span>

            </a>

        </article>
    `;
}


/* =========================================================
   FEATURED BOOKS
   ========================================================= */

const featured =
    document.getElementById("featured");

if (featured) {

    featured.innerHTML =
        books
            .slice(0, 4)
            .map(card)
            .join("");
}


/* =========================================================
   BOOKS PAGE
   ========================================================= */

const bookGrid =
    document.getElementById("books");

if (bookGrid) {

    const q =
        document.getElementById("q");

    const sort =
        document.getElementById("sort");

    const chips =
        document.getElementById("chips");

    const empty =
        document.getElementById("empty");


    let genre = "All";


    /* =====================================================
       CATEGORY FILTER BUTTONS
       ===================================================== */

    [
        "All",
        ...new Set(
            books.map(
                book => book.genre
            )
        )
    ].forEach(g => {

        const button =
            document.createElement("button");

        button.className =
            "chip" +
            (g === "All"
                ? " active"
                : "");

        button.textContent =
            g;


        button.onclick = () => {

            genre = g;


            document
                .querySelectorAll(".chip")
                .forEach(chip => {

                    chip.classList.remove(
                        "active"
                    );

                });


            button.classList.add(
                "active"
            );


            render();
        };


        chips.appendChild(
            button
        );

    });


    /* =====================================================
       RENDER BOOKS
       ===================================================== */

    function render() {

        let list =
            [...books];


        const search =
            (q.value || "")
                .toLowerCase()
                .trim();


        /* SEARCH */

        if (search) {

            list =
                list.filter(book => {

                    const text =
                        (
                            book.title +
                            " " +
                            book.author +
                            " " +
                            book.genre
                        ).toLowerCase();


                    return text.includes(
                        search
                    );

                });

        }


        /* CATEGORY */

        if (genre !== "All") {

            list =
                list.filter(
                    book =>
                        book.genre === genre
                );

        }


        /* SORT */

        if (
            sort &&
            sort.value === "az"
        ) {

            list.sort(
                (a, b) =>
                    a.title.localeCompare(
                        b.title
                    )
            );

        }


        if (
            sort &&
            sort.value === "author"
        ) {

            list.sort(
                (a, b) =>
                    a.author.localeCompare(
                        b.author
                    )
            );

        }


        /* DISPLAY */

        bookGrid.innerHTML =
            list
                .map(card)
                .join("");


        /* EMPTY STATE */

        if (empty) {

            empty.classList.toggle(
                "hidden",
                list.length > 0
            );

        }

    }


    /* =====================================================
       SEARCH FORM
       ===================================================== */

    const searchForm =
        document.getElementById(
            "searchForm"
        );


    if (searchForm) {

        searchForm.onsubmit =
            event => {

                event.preventDefault();

                render();

            };

    }


    /* LIVE SEARCH */

    if (q) {

        q.oninput =
            render;

    }


    /* SORT */

    if (sort) {

        sort.onchange =
            render;

    }


    /* =====================================================
       URL SEARCH
       ===================================================== */

    const initial =
        new URLSearchParams(
            location.search
        ).get("q");


    if (initial && q) {

        q.value =
            initial;

    }


    render();

}


/* =========================================================
   CATEGORIES PAGE
   ========================================================= */

const categories =
    document.getElementById(
        "categories"
    );


if (categories) {

    const names =
        [
            ...new Set(
                books.map(
                    book =>
                        book.genre
                )
            )
        ];


    const icons = [
        "📚",
        "◉",
        "✦",
        "◆",
        "●",
        "★"
    ];


    categories.innerHTML =
        names
            .map(
                (genre, index) => {

                    const count =
                        books.filter(
                            book =>
                                book.genre ===
                                genre
                        ).length;


                    return `
                        <article
                            class="category"
                            onclick="location.href='books.html?q=${encodeURIComponent(genre)}'"
                        >

                            <div class="category-icon">
                                ${icons[index % icons.length]}
                            </div>

                            <h3>
                                ${genre}
                            </h3>

                            <p>
                                ${count}
                                book(s) in this collection
                            </p>

                        </article>
                    `;

                }
            )
            .join("");

}


/* =========================================================
   BOOK DETAILS PAGE
   ========================================================= */

const details =
    document.getElementById(
        "details"
    );


if (details) {

    const id =
        new URLSearchParams(
            location.search
        ).get("id") ||
        books[0].id;


    const book =
        books.find(
            item =>
                item.id === id
        ) ||
        books[0];


    details.innerHTML = `

        <a href="books.html">
            ← Back to Books
        </a>


        <div
            class="details"
            style="margin-top:22px"
        >

            <div>
                ${cover(book)}
            </div>


            <div>

                <small>
                    ${book.genre.toUpperCase()}
                </small>


                <h1>
                    ${book.title}
                </h1>


                <div class="author">
                    ${book.author}
                </div>


                <div class="rating">

                    ★★★★★

                    <span
                        style="
                            color:#71808e;
                            font-size:12px;
                        "
                    >
                        (4.8) · Reader favorite
                    </span>

                </div>


                <p>
                    ${book.desc}
                </p>


                <p
                    style="
                        margin-top:12px
                    "
                >

                    <button
                        class="btn"
                        onclick="
                            alert(
                                'Reading mode demo'
                            )
                        "
                    >
                        Read More
                    </button>


                    <button
                        class="btn outline"
                        onclick="
                            alert(
                                'Added to wishlist (demo)'
                            )
                        "
                    >
                        ♡ Wishlist
                    </button>

                </p>


                <div class="stats">


                    <div class="stat">

                        <small>
                            AUTHOR
                        </small>

                        <b>
                            ${book.author}
                        </b>

                    </div>


                    <div class="stat">

                        <small>
                            PUBLISHED
                        </small>

                        <b>
                            ${book.year}
                        </b>

                    </div>


                    <div class="stat">

                        <small>
                            PAGES
                        </small>

                        <b>
                            ${book.pages}
                        </b>

                    </div>


                </div>

            </div>

        </div>
    `;

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

const form =
    document.getElementById(
        "contactForm"
    );


if (form) {

    form.onsubmit =
        event => {

            event.preventDefault();


            const sent =
                document.getElementById(
                    "sent"
                );


            if (sent) {

                sent.classList.remove(
                    "hidden"
                );

            }


            form.reset();

        };

}

/* BOOK HAVEN — READ MORE DETAILS */

const bookExtraDetails = {
    "atomic habits": {
        genre: "Self Help",
        year: "2018",
        pages: "320",
        description:
            "Atomic Habits by James Clear explores how small, consistent changes can help build better habits and improve everyday life."
    },
    "the midnight library": {
        genre: "Fiction",
        year: "2020",
        pages: "304",
        description:
            "Nora Seed discovers a mysterious library filled with different versions of her life. Each book offers a chance to explore another path she could have taken."
    },
    "sapiens": {
        genre: "History",
        year: "2011",
        pages: "498",
        description:
            "Sapiens by Yuval Noah Harari explores the history of humankind, from early humans to the development of modern societies."
    },
    "dune": {
        genre: "Science Fiction",
        year: "1965",
        pages: "Approx. 400",
        description:
            "Dune by Frank Herbert follows Paul Atreides on the desert planet Arrakis, where politics, survival, and control of a valuable resource shape the future."
    },
    "1984": {
        genre: "Dystopian",
        year: "1949",
        pages: "328",
        description:
            "George Orwell's dystopian novel follows Winston Smith in a society controlled by constant surveillance and strict government authority."
    },
    "the hobbit": {
        genre: "Fantasy",
        year: "1937",
        pages: "310",
        description:
            "Bilbo Baggins joins a group of dwarves on a journey to reclaim their lost treasure, discovering courage and adventure along the way."
    },
    "clean code": {
        genre: "Programming",
        year: "2008",
        pages: "464",
        description:
            "Robert C. Martin presents principles and examples for writing readable, maintainable, and well-organized software."
    },
    "the martian": {
        genre: "Science Fiction",
        year: "2011",
        pages: "Approx. 370",
        description:
            "An astronaut becomes stranded on Mars and must use scientific knowledge, engineering, and problem-solving to survive."
    }
};

function showBookDetails(button) {
    // Find the book card containing the clicked button.
    const card = button.closest(
        ".book-card, .book-item, .book, .book-card-container, article"
    );

    if (!card) {
        console.warn(
            "Book card not found. Update the selector in showBookDetails()."
        );
        return;
    }

    const titleElement = card.querySelector(
        "h2, h3, h4, .book-title, [data-book-title]"
    );

    const authorElement = card.querySelector(
        ".book-author, .author, [data-book-author]"
    );

    const imageElement = card.querySelector("img");

    const title = titleElement?.textContent.trim() || "Book Details";

    const author = authorElement?.textContent
        .replace(/^by\s+/i, "")
        .trim() || "Author information unavailable";

    const image = imageElement?.src || "";

    const key = title.toLowerCase().trim();

    const extra = bookExtraDetails[key] || {
        genre:
            card.querySelector(".book-category, .category, .genre, .book-tag")
                ?.textContent.trim() || "Not specified",
        year: "Not specified",
        pages: "Not specified",
        description:
            card.querySelector(
                ".book-description, .description, [data-book-description]"
            )?.textContent.trim() ||
            "More information about this book will be added soon."
    };

    // Close an existing details popup, if present.
    document.querySelector(".book-details-overlay")?.remove();

    const overlay = document.createElement("div");
    overlay.className = "book-details-overlay";

    overlay.innerHTML = `
        <section
            class="book-details-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Book details"
        >
            <button
                class="book-details-close"
                aria-label="Close book details"
                type="button"
            >&times;</button>

            <div class="book-details-content">
                <div>
                    <img class="book-details-cover" alt="">
                </div>

                <div>
                    <h2 class="details-title"></h2>
                    <p class="book-details-author"></p>
                    <span class="book-details-tag"></span>
                    <h3>About This Book</h3>
                    <p class="book-details-description"></p>

                    <div class="book-details-meta">
                        <span class="details-year"></span>
                        <span class="details-pages"></span>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Insert book information as text to avoid treating it as HTML.
    overlay.querySelector(".details-title").textContent = title;
    overlay.querySelector(".book-details-author").textContent =
        "By " + author;
    overlay.querySelector(".book-details-tag").textContent = extra.genre;
    overlay.querySelector(".book-details-description").textContent =
        extra.description;
    overlay.querySelector(".details-year").textContent =
        "Published: " + extra.year;
    overlay.querySelector(".details-pages").textContent =
        "Pages: " + extra.pages;

    const cover = overlay.querySelector(".book-details-cover");

    if (image) {
        cover.src = image;
    } else {
        cover.style.display = "none";
    }

    document.body.appendChild(overlay);

    const closeButton = overlay.querySelector(".book-details-close");
    closeButton.focus();

    function closeDetails() {
        overlay.remove();
        document.removeEventListener("keydown", onKeyDown);
    }

    function onKeyDown(event) {
        if (event.key === "Escape") {
            closeDetails();
        }
    }

    closeButton.addEventListener("click", closeDetails);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeDetails();
        }
    });

    document.addEventListener("keydown", onKeyDown);
}

// Works with Read More buttons added dynamically by JavaScript.
document.addEventListener("click", function (event) {
    const button = event.target.closest(
        ".read-more, .readMoreBtn, [data-action='read-more']"
    );

    if (!button) return;

    event.preventDefault();
    showBookDetails(button);
});
