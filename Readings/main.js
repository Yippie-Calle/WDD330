const links = [{
        label: "Week1 Notes",
        url: "/week1.html"
    },
    {
        label: "Week2 Notes",
        url: "/week2.html"
    },
    {
        label: "Week3 Notes",
        url: "/week3.html"
    }
];

function addToIndex() {
    for (let i = 0; i < links.length; i++) {
        var a = document.createElement("a");
        var linkText = document.createTextNode(links[i].label);
        a.appendChild(linkText);
        a.href = links[i].url;
        var y = document.createElement("LI");
        y.appendChild(a);
        document.getElementById("indexList").appendChild(y);
    };
}