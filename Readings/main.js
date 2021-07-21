const links = [
  {
    label: "Week1 Notes",
    url: "Readings/week1.html",
  },
  {
    label: "Week2 Notes",
    url: "Readings/week2.html",
  },
  {
    label: "Week3 Notes",
    url: "Readings/week3.html",
  },
  {
    label: "Week4 Notes",
    url: "Readings/week4.html",
  },
  {
    label: "Week5 Notes",
    url: "Readings/week5.html",
  },
  {
    label: "Week6 TODO",
    url: "Readings/week6/week6.html",
  },
  {
    label: "Week7 Notes",
    url: "Readings/week7.html",
  },
  {
    label: "Week8 Notes",
    url: "Readings/week8.html",
  },
  {
    label: "Week9 Notes",
    url: "Readings/week9.html",
  },
  {
    label: "Week10 Notes",
    url: "Readings/week10.html",
  },
  {
    label: "Final Project",
    url: "Readings/Crypto/main.html",
  },
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
  }
}
