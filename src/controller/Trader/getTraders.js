const request = require("request");
const cheerio = require("cheerio");

module.exports = (req, res, next) => {
    const borsalar = [];
    request('https://uzmanpara.milliyet.com.tr/canli-borsa/', (error, response, html) => {
        if (error && res.statusCode == 200) {
            return console.error(error);
        }
        let $ = cheerio.load(html)

        $('#acik_koyu_yeri tbody tr').each(function (i, elem) {
            if ($(this).text() !== null && $(this).text() !== '')
                borsalar[i] = $(this).text();
        });
        /////
        $('#acik_koyu_yeri2 tbody tr').each(function (i, elem) {
            if ($(this).text() !== null && $(this).text() !== '')
                borsalar.push($(this).text());
        });
        ////
        $('#acik_koyu_yeri3 tbody tr').each(function (i, elem) {
            if (
                $(this).text() !== null &&
                $(this).text() !== '' &&
                $(this).text() !== ' '
            )
                borsalar.push($(this).text());
        });

        //get BIST 100
        var lastBist;
        var spanContent = $('#imkb_kapanis_span_1').text();

        if (spanContent !== null && spanContent !== '') {
            lastBist = spanContent.trim();
        }
        var degisim = $('#imkb_yuzde_degisim_span_1').text();
        if (degisim.indexOf('-') > -1) {
            degisim = degisim;
        } else {
            degisim = '+' + degisim;
        }

        // // Adet ve Hacim verilerini çekme
        var adetHacimRegex = /:\s*(.*?)\s*:.*$/;
        var adet = $('tr:nth-child(2) td:nth-child(2)').text();

        var hacim = $('tr:nth-child(3) td:nth-child(2)').text();

        var adetMatch = adet.match(adetHacimRegex);
        var hacimMatch = hacim.match(adetHacimRegex);
        var adet = adetMatch ? adetMatch[1] : "";
        var hacim = hacimMatch ? hacimMatch[1] : "";


        var borsaName = [];
        var borsaZaman = [];
        var borsa = [];

        for (var i = 0; i < borsalar.length; i++) {
            borsaName.push(borsalar[i].match(/([a-zA-Z])\w+/g));
            borsa.push(borsalar[i].match(/[-]?([0-9]+,)\w+/g));
            borsaZaman.push(borsalar[i].match(/(\d{2}):(\d{2}):(\d{2})/g));
        }

        var borsaFiyat = [];
        var borsaDegisim = [];

        var borsa = borsa.filter(function (el) {
            return el != null;
        });

        for (var i = 0; i < borsa.length; i++) {
            borsaFiyat.push(borsa[i][0]);
            borsaDegisim.push(borsa[i][1])
            borsaZaman.push(borsa[i][5]);
        }

        borsaName.splice(0, 1);
        borsaName.splice(34, 1);
        borsaName.splice(68, 1);

        var borsaZaman = borsaZaman.filter(function (el) {
            return el != null;
        });
        var result = [];
        for (var i = 0; i < borsaName.length; i++) {

            //if borsaDegisim[i] is have - sign add -, if not have add +
            if (borsaDegisim[i].indexOf('-') > -1) {
                borsaDegisim[i] = borsaDegisim[i];
            } else {
                borsaDegisim[i] = '+' + borsaDegisim[i];
            }

            borsaObject =
            {
                Name: borsaName[i][0],
                Fiyat: borsaFiyat[i],
                Degisim: borsaDegisim[i] + ' %',
                Zaman: borsaZaman[i][0]

            }
            result.push(borsaObject);
        }

        res.json({
            BistData: {
                lastBist: lastBist,
                degisim: degisim,
                adet: adet + ' Mio Lot',
                hacim: hacim + ' Mio TL',
            },

            result: result,
        });
    }
    );

}