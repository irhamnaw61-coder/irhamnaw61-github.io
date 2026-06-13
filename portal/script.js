var navLinks = document.querySelectorAll(".nav-item");
var newsCards = document.querySelectorAll(".news-card");

navLinks.forEach(function (link) {
    link.onclick = function (e) {
        e.preventDefault(); // Mengunci tanda pager (#) biar gak reload

        // 2. Atur kelas active
        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");

        // 3. Sesuai foto HTML lu, lu pakenya "data-category" di menu navigasi
        var targetKategori = this.getAttribute("data-category");

        // 4. Saring kartu beritanya
        newsCards.forEach(function (card) {
            // Sesuai foto HTML lu, kartu berita pakenya class "data-item"
            var kategoriArtikel = card.getAttribute("data-item");

            if (targetKategori === "all" || targetKategori === kategoriArtikel) {
                card.style.display = ""; // Muncul pake setelan asli CSS lu
            } else {
                card.style.display = "none"; // Sembunyikan kalau gak cocok
            }
        });
    };
});
