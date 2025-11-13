        var map = L.map('map').setView([-29.49528030957683, -55.200374506926934], 6.4);

        //Mapa e Direitos autorais - Maximo de Zoom que o usuario pode dar
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let Bsup = L.marker([-29.892002, -51.277140]).addTo(map).bindPopup('3º B Bup');
        let CiaComMec = L.marker([-29.194260481739818, -54.87880106122247]).addTo(map).bindPopup('11ª Cia Com Mec');
        let log10 = L.marker([-29.77419027506075, -55.8035366746956]).addTo(map).bindPopup('10ª B Log');
        let BeCmbBld = L.marker([-32.56355179852956, -53.36865303226689]).addTo(map).bindPopup('12º RC Mec');
        let bpe = L.marker([-30.063639121873855, -51.22296360352109]).addTo(map).bindPopup('3º BPE');
        let blog3 = L.marker([-31.328980261378124, -54.09811965929803]).addTo(map).bindPopup('3º B Log');
        let gaa = L.marker([-29.174037751584297, -51.19228414403041]).addTo(map).bindPopup('3º GAAAE');
