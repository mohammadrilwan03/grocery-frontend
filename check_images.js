import https from 'https';

const urls = [
    { name: "Bananas Flickr", url: "https://loremflickr.com/600/600/bananas" },
    { name: "Grocery Flickr", url: "https://loremflickr.com/800/600/grocery" }
];

urls.forEach(item => {
    https.get(item.url, (res) => {
        // LoremFlickr redirects (302) to the actual image
        console.log(`${item.name}: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`${item.name}: ERROR ${e.message}`);
    });
});
