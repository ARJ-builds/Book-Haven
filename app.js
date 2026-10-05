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
