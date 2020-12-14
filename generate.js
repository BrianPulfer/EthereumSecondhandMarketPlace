var images = ["https://cdn.vox-cdn.com/thumbor/lCUTZMIb1B4QF2OTxNPUKPYtcSA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22015298/vpavic_4278_20201030_0120.jpg",
    "https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2019/07/UAVs-help2.jpg",
    "https://cdn7.dissolve.com/p/D2115_142_759/D2115_142_759_1200.jpg",
    "https://www.corriere.it/methode_image/2020/04/28/Tecnologia/Foto%20Tecnologia%20-%20Trattate/iphone2-k6OB--656x492@Corriere-Web-Sezioni.jpg",
    "https://www.weightlossresources.co.uk/pimg/wlr/b/bbq-healthy-og.jpg",
    "https://i.pcmag.com/imagery/reviews/01hZZX08hFKlyU6kbPE0uti-9.1569483346.fit_lpad.size_625x365.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg",
    "https://thestripe.com/wp-content/uploads/2019/06/Dyson-Hairdryer-Review-1.jpg",
    "https://static.footshop.com/236180/40335.jpg",

    ]

var titles = ["PS5", "High Performance Drone", "Baseball Bat", "iPhone", "BBQ", "E-reader", "Chess Board", "Hair Dryer", "Timberland Shoes"]

var descriptions = ["Perfect Condition", "New", "Still in Package", "Screen Slightly damaged", "Perfect for 1st August", "Read, don't code", "e3, e5, Ke2", "High performance", "Bought for 45 CHF"]

var i = 0
var a = setInterval(()=>{
    document.getElementById('bid-length').value = 1000
    document.getElementById('image-url').value = images[i]

    document.getElementById('product-title').value = titles[i]
    document.getElementById('product-description').value = descriptions[i]
    document.getElementById('create-auction-button').click()
    i++
    if(i==images.length){
    clearInterval(a)
    }
}, 1000)
