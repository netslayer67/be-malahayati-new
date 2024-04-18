/* Cloudinary folder name */
exports.EMP_FLD_NAME = 'malahayati_employee_photos';
exports.BARCD_FLD_NAME = 'malahayati_barcode_skpp';

/* Default findby value */
exports.DFLT_FINDBY_VAL = '_id';

/* Skpp Html Content */
exports.SKPP_HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[TITLE]</title>
    <style>
        @page {
            size: A4;
            margin: 0;
            padding: 0;
        }

        body {
            margin: 0;
            padding: 0;
        }

        ul,
        li {
            list-style: none;
        }

        .header {
            margin-top: 1rem;
            margin-left: 3rem;
            font-size: 1.5rem;
        }

        .header h1 {
            color: #cb8e1c;
        }

        .main {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        #sect_suratKuasa {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        section {
            padding-left: 2.5rem;
            padding-right: 2.5rem;
            margin-bottom: 1rem;
        }
    </style>
</head>

<body>
    <header class="header">
        <h1 style="padding: 0; margin: 0">Malahayati</h1>
        <h1 style="padding: 0; margin: 0">Consultant</h1>
    </header>
    <main class="main">
        <section id="sect_suratKuasa">
            <p style="
                        text-decoration: underline;
                        text-underline-offset: 0.2em;
                        font-weight: 400;
                        padding: 0;
                        margin: 0;
                    ">
                Surat Kuasa Pengalihan Penagihan
            </p>
            <p style="padding: 0; margin: 0">
                AHU-0038843.AH.01.01/23/MHY/SH/[SERIAL_NO]
            </p>
        </section>
        <section id="sect_yangBertandaTanganDibawah">
            <p style="margin-bottom: 0; font-size: 14.5px;">Yang bertanda tangan dibawah :</p>
            <div style="display: flex; align-items: flex-start;">
                <div style="margin-right: 5rem;">
                    <p style="margin: 0; font-size: 14.5px">Nama</p>
                    <p style="margin: 0; font-size: 14.5px">Tempat & Tanggal Lahir</p>
                    <p style="margin: 0; font-size: 14.5px">NIK</p>
                    <p style="margin: 0; font-size: 14.5px">Alamat</p>
                </div>
                <div>
                    <p style="margin: 0; font-size: 14.5px">: [NAMA_NASABAH]</p>
                    <p style="margin: 0; font-size: 14.5px">: [POB], [DOB]</p>
                    <p style="margin: 0; font-size: 14.5px">: [NIK]</p>
                    <p style="margin: 0; word-break: break-all;">: [LOCATION]</p>
                </div>
            </div>
        </section>
        <section id="sect_bodySurat">
            <div>
                <p style="padding: 0; margin: 0; font-size: 14.5px">
                    Selanjutnya disebut sebagai
                    <span style="
                                text-decoration: underline;
                                text-underline-offset: 0.2em;
                                font-weight: 600;
                            ">PEMBERI KUASA</span>
                    Yang menunjuk domisili hukum pada
                </p>
                <p style="padding: 0; margin: 0; font-size: 14.5px">
                    alamat Penerima / Pemegang kuasa ini, dengan ini
                    benar-benar memberi kuasa kepada :
                </p>
            </div>
            <div>
                <p style="margin: 0; font-size: 14.5px">
                    <span style="margin-right: 2rem">1.</span>
                    <span>Cindy Flesilia, SE</span>
                </p>
                <p style="
                            padding-left: 3rem;
                            padding-right: 3rem;
                            text-align: justify;
                            margin: 0;
                            font-size: 14.5px
                        ">
                    Yang bersangkutan adalah
                    <span style="
                                font-weight: bold;
                                margin: 0;
                                text-decoration: underline;
                                text-underline-offset: 0.1em;
                            ">Financial Consultant</span>
                    pada kantor
                    <span style="
                                font-weight: bold;
                                text-decoration: underline;
                                text-underline-offset: 0.1em;
                            ">MALAHAYATI CONSULTANT</span>
                    yang beralamat <br />
                    Kantor Pusat :
                    <strong>Graha Malahayati, Gedung Picadily, Jl. Mampang Prapatan Raya, No.2 RT/RW 006/001
                        Jakarta Selatan, Jakarta, Indonesia 12790. No Wa 081292051407</strong>
                    <br />
                    Kantor Cabang :
                    <strong>Ruko Permata Jl. Jalur Lingkar Selatan Rt.018/004
                        No.31 Desa Cibatu Kecamatan Cisaat Kabupaten
                        Sukabumi 41352. No Telpon 0266 2489257</strong>
                    <br />
                    Kantor Cabang :
                    <strong>Komplek Ruko Pesona Anggrek Blok A05 No.15A Harapan
                        Jaya , Bekasi Utara Kota Bekasi 17124</strong>
                    <br />
                    Kantor Cabang :
                    <strong>Jl. Penyelesaian Tomang IV Kav.DKI Blok.65 No.124
                        Rt.06 Rw.010 Meruya Utara , Kembangan Jakarta Barat
                        11620</strong>
                    <br />
                </p>
                <p style=" font-size: 14.5px; margin: 0">
                    Selanjutnya Baik Sendiri-sendiri maupun Bersama-sama
                    disebut sebagai
                    <span style="font-weight: bold; font-size: 15px;">PENERIMA / PEMEGANG KUASA.</span>
                </p>
                <p style="font-weight: bold; margin: 0">
                    =========================== KHUSUS
                    ==============================
                </p>
                <p style="margin: 0; font-size: 14.5px">
                    Untuk dan atas nama Pemberi Kuasa , Mewakili Pemberi
                    Kuasa dalam pengurusan dan penyelesaian Hutang Piutang
                    di beberapa aplikasi Pinjaman Online sebagai berikut :
                </p>
                <p>[PROGRESS_APP_DONE]</p>
                <p style="text-align: start; font-size: 14.5px">
                    yang berkaitan dengan pemberi kuasa sesuai pernjanjian
                    nomor <strong style="text-decoration: underline;
                    text-underline-offset: 0.1em;"><em>1947/MHY/SK/01/301123</em></strong><br> Untuk selanjutnya
                    Penerima/Pemegang Kuasa ini diberikan wewenang untuk : <br>
                    memberikan masukan-masukan hukum, mendampingi dan
                    mewakili Pemberi Kuasa, menghadap, berbicara dengan
                    pejabat / aparat bersangkutan, pemerintahan, maupun
                    swasta, melaporkan ke pihak berwajib, mengajukan upaya
                    hukum dan melakukan tindakan-tindakan lainnya dalam
                    rangka untuk memperjuangkan kepentingan dan hak-hak
                    Pemberi Kuasa, yang dibenarkan menurut ketentuan hukum
                    yang berlaku. Demikian Surat Kuasa Pengalihan Penagihan
                    ini dibuat Sebagaimana mestinya.
                </p>
                <p style="font-weight: bold;text-align: center; margin: 0; padding: 0">"KITA BANTU ORANG, TUHAN BANTU
                    KITA"</p>
            </div>
        </section>
        <section id="sect_tandaTangan" style="margin-bottom: 2rem">
            <div style="display: flex; justify-content: space-around;align-items: center;">
                <img style="width: 150px; height: 150px" src="[ttd]" alt="ttd" />
                <div style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-between;
                        ">
                    <div style="
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                            ">
                        <p style="margin: 0; text-align: justify">
                            Jakarta, [TANGGAL]
                        </p>
                        <p style="margin: 0; text-align: justify">
                            Pemberi Kuasa
                        </p>
                    </div>
                    <p style="margin-top: 4rem">
                        (&nbsp;[NAMA_NASABAH]&nbsp;)
                    </p>
                </div>
            </div>

        </section>
        <p style="color: #cb8e1c; font-weight: 900; font-size: 10px; margin-top: 5rem">
            Malahayati Consultant <br>
            <span>
                Head Office : Gedung PD Mampang Prapatan Lt.2 Jl. Mampang Praptan Raya Rt.12/001 Mp. Prapatan
                Jak-Sel 12790. Whatsapp 085724724731
                <br />
                Branch Office : Ruko Permata Jl. Jalur Lingkar Selatan Rt.018/004 No.31 Desa Cibatu Kecamatan Cisaat
                Kab Sukabumi 41352. Telp 0266 2489257
            </span>
        </p>
    </main>
</body>

</html>


`;

const BARCODE = `
<img
                        style="width: 80px; height: 80px"
                        src="data:image/png;base64,[BARCODE]"
                        alt="barcode"
                    />
`;
