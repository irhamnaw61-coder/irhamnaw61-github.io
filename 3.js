document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(".btn-filter");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".btn-filter.active").classList.remove("active");
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });

     const btnHitung = document.getElementById("btn-hitung-kredit");
    const resultBox = document.getElementById("hasil-kredit-box");
    const txtHasil = document.getElementById("txt-hasil-kredit");

    if (btnHitung) {
        btnHitung.addEventListener("click", function () {
            // 1. Ambil semua input data nasabah
            const namaNasabah = document.getElementById("nama_nasabah").value.trim();
            const pekerjaan = document.getElementById("pekerjaan").value;
            const gaji = parseFloat(document.getElementById("gaji").value) || 0;
            const cicilanLain = parseFloat(document.getElementById("cicilan_lain").value) || 0;
            const tanggungan = parseInt(document.getElementById("tanggungan").value);
            const statusRumah = document.querySelector('input[name="rumah"]:checked').value;
            const tenor = document.getElementById("tenor").value;

            // Validasi Input Utama
            if (namaNasabah === "" || gaji === 0) {
                alert("Harap isi nama nasabah dan pendapatan bulanan terlebih dahulu!");
                return;
            }

            // 2. SIMULASI PERHITUNGAN RISIKO FINANSIAL (LOGIKA OPERASIONAL LEASING)
            // Asumsi Biaya Hidup Minimum per Kepala Tanggungan = Rp 750.000
            const estimasiBiayaHidup = tanggungan * 750000;
            const pendapatanBersih = gaji - cicilanLain - estimasiBiayaHidup;

            // Estimasi Angsuran Motor Kasar per bulan berdasarkan Tenor
            let estimasiAngsuran = 1200000; // Standar tenor 11 bulan
            if (tenor === "23") estimasiAngsuran = 800000;
            if (tenor === "35") estimasiAngsuran = 650000;

            // Hitung DSR (Debt Service Ratio) -> Persentase angsuran dari pendapatan bersih
            const dsr = (estimasiAngsuran / pendapatanBersih) * 100;

            // Reset kelas warna box hasil
            resultBox.className = "result-box";

            // 3. PENGAMBILAN KEPUTUSAN KREDIT (DECISION MAKING SYSTEM)
            
            // Skenario REJECT OTOMATIS (Merah)
            if (pendapatanBersih <= estimasiAngsuran || dsr > 40 || (pekerjaan === "kontrak" && statusRumah === "sewa" && tenor === "35")) {
                resultBox.classList.add("danger");
                txtHasil.innerHTML = `<strong>STATUS: APLIKASI DITOLAK (High Risk)</strong><br>
                    Nasabah atas nama <b>${namaNasabah}</b> berisiko tinggi gagal bayar. 
                    Rasio Beban Utang (DSR) mencapai <b>${dsr > 0 ? dsr.toFixed(1) : 'Terlalu Tinggi'}%</b> (Batas aman maks 40%). 
                    Sisa pendapatan bersih Rp ${pendapatanBersih.toLocaleString('id-ID')} tidak mencukupi untuk ditambah angsuran motor sebesar Rp ${estimasiAngsuran.toLocaleString('id-ID')}/bulan.`;
            
            // Skenario PERLU JAMINAN / KONDISIONAL (Kuning)
            } else if (statusRumah === "sewa" || pekerjaan === "kontrak" || dsr > 30) {
                resultBox.classList.add("warning");
                txtHasil.innerHTML = `<strong>STATUS: BUTUH PENJAMIN / ANALISIS LANJUTAN (Medium Risk)</strong><br>
                    Berkas nasabah <b>${namaNasabah}</b> dapat dipertimbangkan dengan syarat. 
                    Meskipun kapasitas bayar cukup (DSR: <b>${dsr.toFixed(1)}%</b>), faktor stabilitas pekerjaan (${pekerjaan.toUpperCase()}) atau rumah (${statusRumah.toUpperCase()}) memerlukan dokumen tambahan seperti penjamin keluarga inti atau pengetatan survei lingkungan.`;
            
            // Skenario APPROVE LANGSUNG (Hijau)
            } else {
                resultBox.classList.add("success");
                txtHasil.innerHTML = `<strong>STATUS: REKOMENDASI ACC (Low Risk)</strong><br>
                    Aplikasi nasabah atas nama <b>${namaNasabah}</b> dinilai sangat sehat. 
                    Pekerjaan stabil selaku ${pekerjaan.toUpperCase()} didukung kepemilikan aset rumah sendiri. 
                    Rasio angsuran sangat aman (DSR hanya <b>${dsr.toFixed(1)}%</b>) dengan sisa uang bebas bulanan sebesar Rp ${pendapatanBersih.toLocaleString('id-ID')}. Berkas siap dikirim ke komite kredit.`;
            }
        });
    }

    const formHrd = document.getElementById("form-hrd");
    if (formHrd) {
        formHrd.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const namaHrd = document.getElementById("nama_hrd").value;
            
            alert(`Halo Bapak/Ibu dari ${namaHrd},\n\nTerima kasih banyak atas undangan wawancaranya! Simulasi pengiriman formulir sukses dilakukan.\n\nSalam hangat,\nWahyu Irhamna`);
            
            formHrd.reset();
        });
    }
});

